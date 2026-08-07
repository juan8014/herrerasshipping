"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type StatusUpdateResult = { ok: boolean; error?: string }

/**
 * Moves one or many shipments to a new status through the transactional RPC,
 * which also writes a tracking event for each one (keeps public tracking in
 * sync). Used by the delivery board for bulk dispatch and per-row delivery.
 */
export async function updateShipmentsStatus(input: {
  ids: string[]
  status: string
  note?: string
  location?: string
}): Promise<StatusUpdateResult> {
  if (input.ids.length === 0) {
    return { ok: false, error: "No seleccionaste ningún paquete." }
  }

  const supabase = await createClient()
  const { error } = await supabase.rpc("update_shipments_status", {
    p_ids: input.ids,
    p_status: input.status,
    p_note: input.note ?? null,
    p_location: input.location ?? null,
  })

  if (error) return { ok: false, error: "No se pudo actualizar el estado." }

  revalidatePath("/dashboard/deliveries")
  revalidatePath("/dashboard/us-deliveries")
  revalidatePath("/dashboard/transit")
  revalidatePath("/dashboard")
  return { ok: true }
}
