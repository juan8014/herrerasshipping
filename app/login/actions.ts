"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type LoginState = { error?: string }

/**
 * Signs the user in and gates dashboard access to admins only.
 * Non-admin credentials are immediately signed out and rejected.
 */
export async function login(formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Ingresa tu correo y contraseña." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: "Correo o contraseña incorrectos." }
  }

  // Access to the dashboard is gated by DB role, not a hardcoded allowlist.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()

  if (profile?.role === "admin") redirect("/dashboard")
  if (profile?.role === "client") redirect("/account")

  await supabase.auth.signOut()
  return { error: "Tu cuenta no tiene un rol asignado. Contactá al equipo." }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
