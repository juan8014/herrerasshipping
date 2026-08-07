import type { ShipmentRow } from "@/lib/dashboard-data"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { formatCurrency, formatDate } from "@/lib/format"

export function ShipmentsTable({
  rows,
  title = "Envíos recientes",
}: {
  rows: ShipmentRow[]
  title?: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#7BB5E6]/10 px-5 py-4">
        <h2 className="font-semibold text-[#234974]">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#7BB5E6]/10 text-xs uppercase tracking-wide text-[#234974]/50">
              <th scope="col" className="px-5 py-3 font-medium">Rastreo</th>
              <th scope="col" className="px-5 py-3 font-medium">Cliente</th>
              <th scope="col" className="px-5 py-3 font-medium">Estado</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Peso</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[#234974]/50">
                  Sin envíos todavía.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[#7BB5E6]/10 transition-colors last:border-0 hover:bg-[#7BB5E6]/5"
                >
                  <td className="px-5 py-3 font-mono text-xs font-medium text-[#0F4C81]">
                    {r.tracking_number}
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-medium text-[#234974]">{r.clients?.full_name ?? "—"}</div>
                    <div className="text-xs text-[#234974]/50">{r.clients?.client_code ?? ""}</div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#234974]/80">
                    {Number(r.weight_lb).toFixed(1)} lb
                  </td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums text-[#234974]">
                    {formatCurrency(r.total_price)}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#234974]/60">
                    {formatDate(r.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
