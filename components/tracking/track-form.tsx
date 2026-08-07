"use client"

import { useState, type FormEvent } from "react"
import { Search, Loader2, PackageSearch } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { ShipmentTimeline } from "@/components/tracking/shipment-timeline"
import { formatDate } from "@/lib/format"

type TrackEvent = { status: string; note: string | null; location: string | null; created_at: string }
type TrackResult = {
  tracking_number: string
  category: string
  weight_lb: number
  status: string
  created_at: string
  delivered_at: string | null
  events: TrackEvent[]
}

export function TrackForm() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackResult | null>(null)
  const [notFound, setNotFound] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = code.trim()
    if (!q) return

    setLoading(true)
    setNotFound(false)
    setResult(null)

    const supabase = createClient()
    const { data, error } = await supabase.rpc("track_package", { p_tracking: q })

    setLoading(false)
    // The RPC returns null when no shipment matches the tracking number.
    if (error || data == null) {
      setNotFound(true)
      return
    }
    setResult(data as unknown as TrackResult)
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#234974]/40"
            aria-hidden="true"
          />
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej: HS26-00001"
            aria-label="Número de rastreo"
            className="h-14 rounded-full border-[#7BB5E6]/40 bg-white pl-12 text-base text-[#234974]"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-14 rounded-full bg-[#0F4C81] px-8 text-base font-medium text-white hover:bg-[#0F4C81]/90"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-5 w-5" aria-hidden="true" />
          )}
          Rastrear
        </Button>
      </form>

      {notFound ? (
        <div className="mt-6 rounded-2xl border border-[#D93025]/20 bg-[#D93025]/5 p-6 text-center">
          <PackageSearch className="mx-auto mb-2 h-8 w-8 text-[#D93025]" aria-hidden="true" />
          <p className="font-medium text-[#234974]">No encontramos ese número de rastreo.</p>
          <p className="text-sm text-[#234974]/60">Verifica el código e inténtalo de nuevo.</p>
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
          <div className="border-b border-[#7BB5E6]/10 bg-[#7BB5E6]/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#234974]/50">Número de rastreo</p>
                <p className="font-mono text-lg font-bold text-[#0F4C81]">{result.tracking_number}</p>
              </div>
              <StatusBadge status={result.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-[#234974]/50">Categoría</p>
                <p className="font-medium text-[#234974]">{result.category}</p>
              </div>
              <div>
                <p className="text-[#234974]/50">Peso</p>
                <p className="font-medium tabular-nums text-[#234974]">
                  {Number(result.weight_lb).toFixed(1)} lb
                </p>
              </div>
              <div>
                <p className="text-[#234974]/50">Enviado</p>
                <p className="font-medium text-[#234974]">{formatDate(result.created_at)}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="mb-4 font-semibold text-[#234974]">Historial</h2>
            <ShipmentTimeline events={result.events} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
