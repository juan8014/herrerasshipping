import { Package, Truck, CheckCircle2, DollarSign, Users } from "lucide-react"
import { getDashboardData } from "@/lib/dashboard-data"
import { formatCurrency } from "@/lib/format"
import { StaggerIn } from "@/components/dashboard/stagger-in"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { ShipmentsTable } from "@/components/dashboard/shipments-table"
import { StatusBreakdown } from "@/components/dashboard/status-breakdown"

export default async function DashboardPage() {
  const { kpis, statusCounts, recent } = await getDashboardData()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#234974]">Resumen</h1>

      <StaggerIn className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Envíos totales"
          value={String(kpis.totalShipments)}
          icon={Package}
          accent="bg-[#0047AB]/10 text-[#0047AB]"
        />
        <KpiCard
          label="En proceso"
          value={String(kpis.activeShipments)}
          icon={Truck}
          accent="bg-[#5B9BD5]/15 text-[#0F4C81]"
        />
        <KpiCard
          label="Entregados"
          value={String(kpis.deliveredShipments)}
          icon={CheckCircle2}
          accent="bg-emerald-100 text-emerald-600"
        />
        <KpiCard
          label="Ingresos"
          value={formatCurrency(kpis.revenue)}
          icon={DollarSign}
          accent="bg-[#D93025]/10 text-[#D93025]"
        />
      </StaggerIn>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ShipmentsTable rows={recent} />
        </div>

        <div className="space-y-6">
          <StatusBreakdown counts={statusCounts} total={kpis.totalShipments} />

          <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-[#0F4C81]">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-[#234974]/70">Clientes registrados</p>
                <p className="text-2xl font-bold tabular-nums text-[#234974]">{kpis.clientCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
