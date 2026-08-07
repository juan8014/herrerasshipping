import type { ShipmentStatus } from "@/lib/database.types"
import { statusMeta } from "@/lib/format"

export function StatusBreakdown({
  counts,
  total,
}: {
  counts: { status: ShipmentStatus; count: number }[]
  total: number
}) {
  return (
    <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-[#234974]">Estados de envíos</h2>
      <div className="mt-4 space-y-3">
        {counts.map(({ status, count }) => {
          const meta = statusMeta(status)
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          return (
            <div key={status}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[#234974]/80">
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                  {meta.label}
                </span>
                <span className="font-medium tabular-nums text-[#234974]">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#7BB5E6]/10">
                <div
                  className={`h-full rounded-full ${meta.dot}`}
                  style={{ width: `${pct}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
