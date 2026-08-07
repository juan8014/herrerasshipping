import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Shipment } from "@/lib/database.types"

export type TransitRow = Shipment & {
  clients: { full_name: string; departamento: string | null } | null
  rates: { label: string } | null
}

/**
 * Packages moving through the international leg (USA -> El Salvador), grouped by
 * stage. Once a package reaches "at_customs" it leaves this board and appears on
 * the department delivery board instead.
 */
export async function getTransitBoard(): Promise<{
  received: TransitRow[]
  toAirport: TransitRow[]
  inTransit: TransitRow[]
}> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("*, clients(full_name, departamento), rates(label)")
    .in("status", ["received", "to_airport", "in_transit"])
    .order("created_at", { ascending: false })

  const rows = (data ?? []) as unknown as TransitRow[]
  return {
    received: rows.filter((r) => r.status === "received"),
    toAirport: rows.filter((r) => r.status === "to_airport"),
    inTransit: rows.filter((r) => r.status === "in_transit"),
  }
}
