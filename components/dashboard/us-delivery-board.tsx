"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Truck, PackageCheck, Loader2, PackageSearch } from "lucide-react"
import type { UsDeliveryRow } from "@/lib/us-deliveries-data"
import { updateShipmentsStatus } from "@/app/dashboard/deliveries/actions"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"

export function UsDeliveryBoard({
  state,
  inCountry,
  onTheWay,
}: {
  state: string
  inCountry: UsDeliveryRow[]
  onTheWay: UsDeliveryRow[]
}) {
  const router = useRouter()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [pending, setPending] = useState(false)

  const allSelected = inCountry.length > 0 && selected.size === inCountry.length

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(inCountry.map((r) => r.id)))
  }

  function run(ids: string[], status: string, note: string) {
    setPending(true)
    updateShipmentsStatus({ ids, status, note, location: state }).then(() => {
      setSelected(new Set())
      setPending(false)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      {/* En el país (USA) — listos para despachar */}
      <section className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#7BB5E6]/10 px-5 py-4">
          <h2 className="font-semibold text-[#234974]">
            En el país (USA) <span className="text-[#234974]/50">({inCountry.length})</span>
          </h2>
          <Button
            onClick={() => run([...selected], "out_for_delivery", `En camino en ${state}`)}
            disabled={pending || selected.size === 0}
            className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 disabled:opacity-50"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Truck className="h-4 w-4" aria-hidden="true" />
            )}
            Marcar en camino{selected.size > 0 ? ` (${selected.size})` : ""}
          </Button>
        </div>

        {inCountry.length === 0 ? (
          <div className="px-5 py-10 text-center text-[#234974]/50">
            <PackageSearch className="mx-auto mb-2 h-7 w-7 text-[#234974]/30" aria-hidden="true" />
            No hay paquetes esperando reparto en {state}.
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
                  <th scope="col" className="px-5 py-3 font-medium">Destinatario</th>
                  <th scope="col" className="px-5 py-3 font-medium">Dirección</th>
                  <th scope="col" className="px-5 py-3 font-medium">Categoría</th>
                </tr>
              </thead>
              <tbody>
                {inCountry.map((r) => (
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
                    <td className="px-5 py-3 font-medium text-[#234974]">{r.us_recipient ?? "—"}</td>
                    <td className="px-5 py-3 text-[#234974]/70">
                      {[r.us_address, r.us_city].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-5 py-3 text-[#234974]/80">{r.rates?.label ?? r.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* En camino — pendientes de entregar */}
      <section className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
        <div className="border-b border-[#7BB5E6]/10 px-5 py-4">
          <h2 className="font-semibold text-[#234974]">
            En camino <span className="text-[#234974]/50">({onTheWay.length})</span>
          </h2>
        </div>

        {onTheWay.length === 0 ? (
          <div className="px-5 py-10 text-center text-[#234974]/50">
            No hay paquetes en camino en {state}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#7BB5E6]/10 text-xs uppercase tracking-wide text-[#234974]/50">
                  <th scope="col" className="px-5 py-3 font-medium">Rastreo</th>
                  <th scope="col" className="px-5 py-3 font-medium">Destinatario</th>
                  <th scope="col" className="px-5 py-3 font-medium">Estado</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {onTheWay.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#7BB5E6]/10 transition-colors last:border-0 hover:bg-[#7BB5E6]/5"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-medium text-[#0F4C81]">{r.tracking_number}</td>
                    <td className="px-5 py-3 font-medium text-[#234974]">{r.us_recipient ?? "—"}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={pending}
                        onClick={() => run([r.id], "delivered", `Entregado en ${state}`)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <PackageCheck className="h-4 w-4" aria-hidden="true" />
                        Entregado
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
