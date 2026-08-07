"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

function toNumber(value: FormDataEntryValue | null): number {
  return Number(String(value ?? "").trim())
}

/** Turns a human label into a stable category key: "Compra en línea" -> "compra_en_linea". */
function slugify(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

function invalid(label: string, rate: number, fee: number): boolean {
  return !label || Number.isNaN(rate) || rate < 0 || Number.isNaN(fee) || fee < 0
}

function revalidateRates() {
  revalidatePath("/dashboard/rates")
  revalidatePath("/dashboard/shipments/new")
}

export async function updateRate(category: string, formData: FormData) {
  const label = String(formData.get("label") ?? "").trim()
  const rate_per_lb = toNumber(formData.get("rate_per_lb"))
  const default_fee = toNumber(formData.get("default_fee"))
  const active = formData.get("active") === "on"

  if (invalid(label, rate_per_lb, default_fee)) {
    redirect("/dashboard/rates?error=invalid")
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("rates")
    .update({ label, rate_per_lb, default_fee, active })
    .eq("category", category)
  if (error) redirect("/dashboard/rates?error=save")

  revalidateRates()
  redirect("/dashboard/rates?saved=1")
}

export async function createRate(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim()
  const rate_per_lb = toNumber(formData.get("rate_per_lb"))
  const default_fee = toNumber(formData.get("default_fee"))

  if (invalid(label, rate_per_lb, default_fee)) {
    redirect("/dashboard/rates?error=invalid")
  }

  const category = slugify(label)
  if (!category) redirect("/dashboard/rates?error=invalid")

  const supabase = await createClient()
  const { error } = await supabase.from("rates").insert({ category, label, rate_per_lb, default_fee })
  // A duplicate category key (PK) is the most likely failure.
  if (error) redirect("/dashboard/rates?error=exists")

  revalidateRates()
  redirect("/dashboard/rates?saved=1")
}
