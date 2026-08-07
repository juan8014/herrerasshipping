import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Shipment, ShipmentStatus } from "@/lib/database.types"
import { STATUS_ORDER } from "@/lib/format"

export type ShipmentRow = Shipment & {
  clients: { full_name: string; client_code: string } | null
}

export type DashboardData = {
  kpis: {
    totalShipments: number
    activeShipments: number
    deliveredShipments: number
    revenue: number
    clientCount: number
  }
  statusCounts: { status: ShipmentStatus; count: number }[]
  recent: ShipmentRow[]
}

const ACTIVE_STATUSES: ShipmentStatus[] = ["received", "in_transit", "at_customs", "out_for_delivery"]

/**
 * Loads everything the overview needs in two round-trips. Runs under the
 * authenticated admin's session, so RLS applies.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()

  const [shipmentsRes, clientsRes] = await Promise.all([
    supabase
      .from("shipments")
      .select("*, clients(full_name, client_code)")
      .order("created_at", { ascending: false }),
    supabase.from("clients").select("id", { count: "exact", head: true }),
  ])

  const rows = (shipmentsRes.data ?? []) as ShipmentRow[]
  const clientCount = clientsRes.count ?? 0

  const revenue = rows
    .filter((r) => r.status !== "cancelled")
    .reduce((sum, r) => sum + Number(r.total_price ?? 0), 0)

  const statusCounts = STATUS_ORDER.map((status) => ({
    status,
    count: rows.filter((r) => r.status === status).length,
  }))

  return {
    kpis: {
      totalShipments: rows.length,
      activeShipments: rows.filter((r) => ACTIVE_STATUSES.includes(r.status as ShipmentStatus)).length,
      deliveredShipments: rows.filter((r) => r.status === "delivered").length,
      revenue,
      clientCount,
    },
    statusCounts,
    recent: rows.slice(0, 8),
  }
}
