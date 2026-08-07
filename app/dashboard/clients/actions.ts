"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DEPARTAMENTOS } from "@/lib/departamentos"
import type { Departamento } from "@/lib/database.types"

const clientSchema = z.object({
  full_name: z.string().trim().min(1, "El nombre es obligatorio."),
  email: z.string().trim().email("Correo inválido.").or(z.literal("")).optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  city: z.string().trim().optional(),
  departamento: z.enum(DEPARTAMENTOS).or(z.literal("")).optional(),
  country: z.string().trim().optional(),
  notes: z.string().trim().optional(),
})

export type ClientFormState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
}

function parse(formData: FormData) {
  return clientSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    departamento: formData.get("departamento"),
    country: formData.get("country"),
    notes: formData.get("notes"),
  })
}

/** Empty strings become null so optional columns stay clean. */
function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

function toRow(data: z.infer<typeof clientSchema>) {
  return {
    full_name: data.full_name,
    email: emptyToNull(data.email),
    phone: emptyToNull(data.phone),
    address: emptyToNull(data.address),
    city: emptyToNull(data.city),
    departamento: emptyToNull(data.departamento) as Departamento | null,
    country: emptyToNull(data.country),
    notes: emptyToNull(data.notes),
  }
}

export async function createClientRecord(formData: FormData): Promise<ClientFormState> {
  const parsed = parse(formData)
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors }

  const supabase = await createClient()
  const { error } = await supabase.from("clients").insert(toRow(parsed.data))
  if (error) return { error: "No se pudo crear el cliente." }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}

export async function updateClientRecord(
  id: string,
  formData: FormData,
): Promise<ClientFormState> {
  const parsed = parse(formData)
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors }

  const supabase = await createClient()
  const { error } = await supabase.from("clients").update(toRow(parsed.data)).eq("id", id)
  if (error) return { error: "No se pudo guardar el cliente." }

  revalidatePath("/dashboard/clients")
  redirect("/dashboard/clients")
}

export async function archiveClient(id: string) {
  const supabase = await createClient()
  await supabase.from("clients").update({ archived_at: new Date().toISOString() }).eq("id", id)
  revalidatePath("/dashboard/clients")
}

export async function restoreClient(id: string) {
  const supabase = await createClient()
  await supabase.from("clients").update({ archived_at: null }).eq("id", id)
  revalidatePath("/dashboard/clients")
}

export async function deleteClient(id: string) {
  const supabase = await createClient()
  // FK is `on delete restrict`: a client with shipments cannot be hard-deleted.
  const { error } = await supabase.from("clients").delete().eq("id", id)
  revalidatePath("/dashboard/clients")
  if (error) {
    redirect("/dashboard/clients?show=archived&error=has_shipments")
  }
}
