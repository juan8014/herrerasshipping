import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Shipment } from "@/lib/database.types"

export type ShipmentListRow = Shipment & {
  clients: { full_name: string; client_code: string } | null
  rates: { label: string } | null
}

export async function getShipments(): Promise<ShipmentListRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("*, clients(full_name, client_code), rates(label)")
    .order("created_at", { ascending: false })
  return (data ?? []) as unknown as ShipmentListRow[]
}

export type ClientOption = { id: string; full_name: string; client_code: string }

export async function getClientOptions(): Promise<ClientOption[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("clients")
    .select("id, full_name, client_code")
    .is("archived_at", null)
    .order("full_name")
  return (data ?? []) as ClientOption[]
}

export type RateOption = {
  category: string
  label: string
  rate_per_lb: number
  default_fee: number
}

export async function getRateOptions(): Promise<RateOption[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("rates")
    .select("category, label, rate_per_lb, default_fee")
    .eq("active", true)
    .order("label")
  return (data ?? []) as RateOption[]
}
