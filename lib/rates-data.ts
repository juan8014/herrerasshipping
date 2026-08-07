import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Rate } from "@/lib/database.types"

export async function getRates(): Promise<Rate[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("rates").select("*").order("label")
  return (data ?? []) as Rate[]
}
