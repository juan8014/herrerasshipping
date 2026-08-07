"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, PackageSearch } from "lucide-react"
import type { TransitRow } from "@/lib/transit-data"
import { updateShipmentsStatus } from "@/app/dashboard/deliveries/actions"
import { Button } from "@/components/ui/button"

function StageSection({
  title,
  rows,
  nextStatus,
  buttonLabel,
  note,
}: {
  title: string
  rows: TransitRow[]
  nextStatus: string
  buttonLabel: string
  note: string
}) {
  const router = useRouter()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [pending, setPending] = useState(false)

  const allSelected = rows.length > 0 && selected.size === rows.length

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
  }

  async function advance() {
    setPending(true)
    await updateShipmentsStatus({ ids: [...selected], status: nextStatus, note })
    setSelected(new Set())
    setPending(false)
    router.refresh()
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#7BB5E6]/10 px-5 py-4">
        <h2 className="font-semibold text-[#234974]">
          {title} <span className="text-[#234974]/50">({rows.length})</span>
        </h2>
        <Button
          onClick={advance}
          disabled={pending || selected.size === 0}
          className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 disabled:opacity-50"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
          {buttonLabel}
          {selected.size > 0 ? ` (${selected.size})` : ""}
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="px-5 py-8 text-center text-[#234974]/50">
          <PackageSearch className="mx-auto mb-2 h-6 w-6 text-[#234974]/30" aria-hidden="true" />
          Sin paquetes en esta etapa.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#7BB5E6]/10 text-xs uppercase tracking-wide text-[#234974]/50">
                <th scope="col" className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Seleccionar todos"
                    className="h-4 w-4 rounded border-[#7BB5E6]/50 accent-[#0F4C81]"
                  />
                </th>
                <th scope="col" className="px-5 py-3 font-medium">Rastreo</th>
                <th scope="col" className="px-5 py-3 font-medium">Cliente</th>
                <th scope="col" className="px-5 py-3 font-medium">Destino</th>
                <th scope="col" className="px-5 py-3 font-medium">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[#7BB5E6]/10 transition-colors last:border-0 hover:bg-[#7BB5E6]/5"
                >
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                      aria-label={`Seleccionar ${r.tracking_number}`}
                      className="h-4 w-4 rounded border-[#7BB5E6]/50 accent-[#0F4C81]"
                    />
                  </td>
                  <td className="px-5 py-3 font-mono text-xs font-medium text-[#0F4C81]">{r.tracking_number}</td>
                  <td className="px-5 py-3 font-medium text-[#234974]">{r.clients?.full_name ?? "—"}</td>
                  <td className="px-5 py-3 text-[#234974]/80">{r.clients?.departamento ?? "—"}</td>
                  <td className="px-5 py-3 text-[#234974]/80">{r.rates?.label ?? r.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export function TransitBoard({
  received,
  toAirport,
  inTransit,
}: {
  received: TransitRow[]
  toAirport: TransitRow[]
  inTransit: TransitRow[]
}) {
  return (
    <div className="space-y-6">
      <StageSection
        title="Recibido"
        rows={received}
        nextStatus="to_airport"
        buttonLabel="Marcar rumbo al aeropuerto"
        note="Rumbo al aeropuerto"
      />
      <StageSection
        title="Rumbo al aeropuerto"
        rows={toAirport}
        nextStatus="in_transit"
        buttonLabel="Marcar en tránsito"
        note="En tránsito al país de destino"
      />
      <StageSection
        title="En tránsito al país"
        rows={inTransit}
        nextStatus="at_customs"
        buttonLabel="Marcar llegó al país"
        note="Llegó al país de destino"
      />
    </div>
  )
}
