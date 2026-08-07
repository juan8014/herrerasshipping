"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/server"

const signupSchema = z.object({
  email: z.string().trim().email("Correo inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  tracking: z.string().trim().min(1, "Ingresá un número de rastreo."),
  verify: z.string().trim().min(1, "Ingresá tu teléfono o correo registrado."),
})

export type SignupState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "")
}

/**
 * Second factor: the value the person types must match the phone or email on
 * record for the client that owns the tracking number. Email is matched exactly
 * (case-insensitive); phone by its last 8 digits (ignores country code/format).
 */
function verificationMatches(input: string, client: { email: string | null; phone: string | null }): boolean {
  const normalized = input.trim().toLowerCase()

  if (client.email && client.email.trim().toLowerCase() === normalized) return true

  if (client.phone) {
    const a = digitsOnly(input)
    const b = digitsOnly(client.phone)
    if (a.length >= 8 && b.length >= 8 && a.slice(-8) === b.slice(-8)) return true
  }
  return false
}

export async function createClientAccount(formData: FormData): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    tracking: formData.get("tracking"),
    verify: formData.get("verify"),
  })
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors }
  const { email, password, tracking, verify } = parsed.data

  // Service role: we verify identity ourselves (tracking + phone/email) before
  // creating a confirmed account.
  const admin = createAdminClient()

  // 1. Tracking number -> shipment -> owning client.
  const { data: shipment } = await admin
    .from("shipments")
    .select("client_id, clients(id, email, phone)")
    .eq("tracking_number", tracking)
    .single()

  const client = shipment?.clients as unknown as
    | { id: string; email: string | null; phone: string | null }
    | null
  if (!client) return { error: "No encontramos ese número de rastreo." }

  // 2. Second factor.
  if (!verificationMatches(verify, client)) {
    return { error: "El teléfono o correo no coincide con el registro de ese envío." }
  }

  // 3. One account per client.
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("client_id", client.id)
    .limit(1)
  if (existing && existing.length > 0) {
    return { error: "Este cliente ya tiene una cuenta. Iniciá sesión o contactá al equipo." }
  }

  // 4. Create the confirmed auth user (identity already verified above).
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (createErr || !created.user) {
    return { error: "No se pudo crear la cuenta. ¿Ya existe una cuenta con ese correo?" }
  }

  // 5. Link the profile to the client record (upsert is race-safe vs. the
  //    handle_new_user trigger that already created the profile row).
  const { error: linkErr } = await admin
    .from("profiles")
    .upsert({ id: created.user.id, client_id: client.id, email, role: "client" })
  if (linkErr) {
    return { error: "Tu cuenta se creó, pero no se pudo vincular. Contactá al equipo." }
  }

  redirect("/login?created=1")
}
