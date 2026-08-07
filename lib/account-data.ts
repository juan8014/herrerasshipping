import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Shipment } from "@/lib/database.types"

export type AccountEvent = {
  status: string
  note: string | null
  location: string | null
  created_at: string
}

export type AccountShipment = Shipment & {
  rates: { label: string } | null
  shipment_events: AccountEvent[]
}

/**
 * Shipments belonging to the logged-in client, with their tracking events.
 * Runs under the client's session, so RLS (client_read_own_shipments /
 * client_read_own_events) scopes it to their own packages automatically.
 */
export async function getMyShipments(): Promise<AccountShipment[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("*, rates(label), shipment_events(status, note, location, created_at)")
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "shipment_events", ascending: true })
  return (data ?? []) as unknown as AccountShipment[]
}
