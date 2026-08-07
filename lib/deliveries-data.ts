import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Departamento, Shipment } from "@/lib/database.types"

export type DeliveryRow = Shipment & {
  clients: { full_name: string; client_code: string; address: string | null } | null
  rates: { label: string } | null
}

/**
 * Packages for one department, split into the two actionable buckets:
 *  - inCountry  (at_customs): arrived, waiting to be dispatched.
 *  - onTheWay   (out_for_delivery): dispatched, pending delivery.
 */
export async function getDeliveryBoard(
  departamento: Departamento,
): Promise<{ inCountry: DeliveryRow[]; onTheWay: DeliveryRow[] }> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("shipments")
    .select("*, clients!inner(full_name, client_code, address, departamento), rates(label)")
    .eq("direction", "usa_to_sv")
    .filter("clients.departamento", "eq", departamento)
    .in("status", ["at_customs", "out_for_delivery"])
    .order("created_at", { ascending: false })

  const rows = (data ?? []) as unknown as DeliveryRow[]
  return {
    inCountry: rows.filter((r) => r.status === "at_customs"),
    onTheWay: rows.filter((r) => r.status === "out_for_delivery"),
  }
}

/** Count of "in country" (at_customs) packages per department, for the selector badges. */
export async function getInCountryCounts(): Promise<Record<string, number>> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("clients!inner(departamento)")
    .eq("direction", "usa_to_sv")
    .eq("status", "at_customs")

  const counts: Record<string, number> = {}
  for (const row of (data ?? []) as unknown as { clients: { departamento: string | null } | null }[]) {
    const dep = row.clients?.departamento
    if (dep) counts[dep] = (counts[dep] ?? 0) + 1
  }
  return counts
}
