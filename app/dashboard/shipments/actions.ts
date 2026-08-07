"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const baseSchema = z.object({
  direction: z.enum(["usa_to_sv", "sv_to_usa"]),
  client_id: z.string().uuid("Seleccioná un cliente."),
  category: z.string().min(1, "Seleccioná una categoría."),
  description: z.string().trim().optional(),
  weight_lb: z.coerce.number().positive("El peso debe ser mayor a 0."),
})

// Destino en USA, requerido solo cuando el envío va SV -> USA.
const usSchema = z.object({
  us_recipient: z.string().trim().min(1, "Ingresá el nombre del destinatario."),
  us_address: z.string().trim().min(1, "Ingresá la dirección."),
  us_city: z.string().trim().min(1, "Ingresá la ciudad."),
  us_state: z.string().trim().min(1, "Seleccioná el estado."),
  us_zip: z.string().trim().optional(),
})

export type ShipmentFormState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export async function createShipment(formData: FormData): Promise<ShipmentFormState> {
  const base = baseSchema.safeParse({
    direction: formData.get("direction"),
    client_id: formData.get("client_id"),
    category: formData.get("category"),
    description: formData.get("description"),
    weight_lb: formData.get("weight_lb"),
  })
  if (!base.success) return { fieldErrors: base.error.flatten().fieldErrors }
  const d = base.data

  let us: z.infer<typeof usSchema> | null = null
  if (d.direction === "sv_to_usa") {
    const usParsed = usSchema.safeParse({
      us_recipient: formData.get("us_recipient"),
      us_address: formData.get("us_address"),
      us_city: formData.get("us_city"),
      us_state: formData.get("us_state"),
      us_zip: formData.get("us_zip"),
    })
    if (!usParsed.success) return { fieldErrors: usParsed.error.flatten().fieldErrors }
    us = usParsed.data
  }

  const supabase = await createClient()

  // Snapshot the rate (authoritative, never trust the client).
  const { data: rate } = await supabase
    .from("rates")
    .select("rate_per_lb, default_fee")
    .eq("category", d.category)
    .single()
  if (!rate) return { error: "La categoría seleccionada no existe." }

  const rawFee = String(formData.get("shipping_fee") ?? "").trim()
  const shipping_fee = rawFee === "" ? Number(rate.default_fee) : Number(rawFee)
  if (Number.isNaN(shipping_fee) || shipping_fee < 0) {
    return { fieldErrors: { shipping_fee: ["Costo de envío inválido."] } }
  }

  const { error } = await supabase.from("shipments").insert({
    direction: d.direction,
    client_id: d.client_id,
    category: d.category,
    description: d.description?.trim() || null,
    weight_lb: d.weight_lb,
    rate_per_lb: Number(rate.rate_per_lb),
    shipping_fee,
    us_recipient: us?.us_recipient ?? null,
    us_address: us?.us_address ?? null,
    us_city: us?.us_city ?? null,
    us_state: us?.us_state ?? null,
    us_zip: us?.us_zip?.trim() || null,
  })
  if (error) return { error: "No se pudo crear el envío." }

  revalidatePath("/dashboard/shipments")
  revalidatePath("/dashboard/transit")
  revalidatePath("/dashboard")
  redirect("/dashboard/shipments")
}
