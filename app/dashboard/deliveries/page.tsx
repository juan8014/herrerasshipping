import Link from "next/link"
import type { Departamento } from "@/lib/database.types"
import { DEPARTAMENTOS } from "@/lib/departamentos"
import { getDeliveryBoard, getInCountryCounts } from "@/lib/deliveries-data"
import { DeliveryBoard } from "@/components/dashboard/delivery-board"
import { cn } from "@/lib/utils"

export default async function DeliveriesPage({
  searchParams,
}: {
  searchParams: Promise<{ dep?: string }>
}) {
  const params = await searchParams
  const selected: Departamento = DEPARTAMENTOS.includes(params.dep as Departamento)
    ? (params.dep as Departamento)
    : "San Salvador"

  const [counts, board] = await Promise.all([getInCountryCounts(), getDeliveryBoard(selected)])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Entregas</h1>
        <p className="text-sm text-[#234974]/60">
          Elegí un departamento y marcá los paquetes que salen a repartir.
        </p>
      </div>

      {/* Selector de departamento */}
      <div className="flex flex-wrap gap-2">
        {DEPARTAMENTOS.map((dep) => {
          const active = dep === selected
          const n = counts[dep] ?? 0
          return (
            <Link
              key={dep}
              href={`/dashboard/deliveries?dep=${encodeURIComponent(dep)}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#0F4C81] text-white"
                  : "border border-[#7BB5E6]/30 bg-white text-[#234974] hover:bg-[#7BB5E6]/10",
              )}
            >
              {dep}
              {n > 0 ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs tabular-nums",
                    active ? "bg-white/20 text-white" : "bg-[#D93025]/10 text-[#D93025]",
                  )}
                >
                  {n}
                </span>
              ) : null}
            </Link>
          )
        })}
      </div>

      <DeliveryBoard departamento={selected} inCountry={board.inCountry} onTheWay={board.onTheWay} />
    </div>
  )
}
