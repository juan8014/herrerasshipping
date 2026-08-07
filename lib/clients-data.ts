import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Client, Shipment, ShipmentStatus } from "@/lib/database.types"

/** A client row with its embedded shipment count (PostgREST aggregate). */
export type ClientRow = Client & { shipments: { count: number }[] }

/** Number of shipments linked to a client row. */
export function shipmentCount(row: ClientRow): number {
  return row.shipments?.[0]?.count ?? 0
}

/**
 * Lists the client portfolio. By default returns active clients; pass
 * `archived: true` for the archived ones. Soft-deleted (archived) clients keep
 * their history and never appear in the active list.
 */
export async function getClients({ archived = false }: { archived?: boolean } = {}): Promise<ClientRow[]> {
  const supabase = await createClient()
  const query = supabase
    .from("clients")
    .select("*, shipments(count)")
    .order("created_at", { ascending: false })

  const { data } = archived
    ? await query.not("archived_at", "is", null)
    : await query.is("archived_at", null)

  return (data ?? []) as ClientRow[]
}

export async function getClientById(id: string): Promise<Client | null> {
  const supabase = await createClient()
  const { data } = await supabase.from("clients").select("*").eq("id", id).single()
  return data ?? null
}

/** A shipment row with its category label embedded from `rates`. */
export type ClientShipmentRow = Shipment & { rates: { label: string } | null }

export type ClientDetail = {
  client: Client
  shipments: ClientShipmentRow[]
  stats: { total: number; delivered: number; active: number; revenue: number }
}

const ACTIVE_STATUSES: ShipmentStatus[] = ["received", "in_transit", "at_customs", "out_for_delivery"]

/**
 * Loads a client together with their full shipment history and rolled-up
 * totals. Returns null when the client id does not exist.
 */
export async function getClientDetail(id: string): Promise<ClientDetail | null> {
  const supabase = await createClient()

  const { data: client } = await supabase.from("clients").select("*").eq("id", id).single()
  if (!client) return null

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*, rates(label)")
    .eq("client_id", id)
    .order("created_at", { ascending: false })

  const rows = (shipments ?? []) as ClientShipmentRow[]
  const revenue = rows
    .filter((r) => r.status !== "cancelled")
    .reduce((sum, r) => sum + Number(r.total_price ?? 0), 0)

  return {
    client,
    shipments: rows,
    stats: {
      total: rows.length,
      delivered: rows.filter((r) => r.status === "delivered").length,
      active: rows.filter((r) => ACTIVE_STATUSES.includes(r.status as ShipmentStatus)).length,
      revenue,
    },
  }
}
