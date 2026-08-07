import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Shipment } from "@/lib/database.types"

export type UsDeliveryRow = Shipment & {
  clients: { full_name: string; client_code: string } | null
  rates: { label: string } | null
}

/**
 * SV -> USA packages for one US state, split into actionable buckets:
 *  - inCountry (at_customs): arrived in the US, waiting to be dispatched.
 *  - onTheWay  (out_for_delivery): dispatched, pending delivery to the address.
 */
export async function getUsDeliveryBoard(
  state: string,
): Promise<{ inCountry: UsDeliveryRow[]; onTheWay: UsDeliveryRow[] }> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("*, clients(full_name, client_code), rates(label)")
    .eq("direction", "sv_to_usa")
    .eq("us_state", state)
    .in("status", ["at_customs", "out_for_delivery"])
    .order("created_at", { ascending: false })

  const rows = (data ?? []) as unknown as UsDeliveryRow[]
  return {
    inCountry: rows.filter((r) => r.status === "at_customs"),
    onTheWay: rows.filter((r) => r.status === "out_for_delivery"),
  }
}

/** US states with active SV->USA delivery work + their "waiting" (at_customs) count. */
export async function getUsActiveStates(): Promise<{ state: string; waiting: number }[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("shipments")
    .select("us_state, status")
    .eq("direction", "sv_to_usa")
    .in("status", ["at_customs", "out_for_delivery"])

  const waiting = new Map<string, number>()
  for (const row of (data ?? []) as { us_state: string | null; status: string }[]) {
    const s = row.us_state
    if (!s) continue
    if (!waiting.has(s)) waiting.set(s, 0)
    if (row.status === "at_customs") waiting.set(s, (waiting.get(s) ?? 0) + 1)
  }

  return [...waiting.entries()]
    .map(([state, count]) => ({ state, waiting: count }))
    .sort((a, b) => a.state.localeCompare(b.state))
}
