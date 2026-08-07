import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Pencil,
  Package,
  CheckCircle2,
  Truck,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"
import { getClientDetail } from "@/lib/clients-data"
import { formatCurrency, formatDate } from "@/lib/format"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string | null
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7BB5E6]/15 text-[#0F4C81]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-[#234974]/50">{label}</p>
        <p className="truncate font-medium text-[#234974]">{value?.trim() ? value : "—"}</p>
      </div>
    </div>
  )
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = await getClientDetail(id)
  if (!detail) notFound()

  const { client, shipments, stats } = detail

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#234974]/70 transition-colors hover:text-[#0047AB]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a clientes
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#234974]">{client.full_name}</h1>
              {client.archived_at ? (
                <span className="rounded-full bg-[#234974]/10 px-2.5 py-1 text-xs font-medium text-[#234974]/70">
                  Archivado
                </span>
              ) : null}
            </div>
            <p className="font-mono text-sm text-[#0F4C81]">{client.client_code}</p>
          </div>
          <Button asChild className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90">
            <Link href={`/dashboard/clients/${client.id}/edit`}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      {/* Contact card */}
      <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem icon={Mail} label="Correo" value={client.email} />
          <InfoItem icon={Phone} label="Teléfono" value={client.phone} />
          <InfoItem icon={Calendar} label="Cliente desde" value={formatDate(client.created_at)} />
          <InfoItem icon={MapPin} label="Dirección" value={client.address} />
          <InfoItem icon={MapPin} label="Ciudad" value={client.city} />
          <InfoItem icon={MapPin} label="País" value={client.country} />
        </div>
        {client.notes?.trim() ? (
          <div className="mt-5 rounded-xl bg-[#7BB5E6]/5 p-4">
            <p className="text-xs uppercase tracking-wide text-[#234974]/50">Notas</p>
            <p className="mt-1 text-sm text-[#234974]/80">{client.notes}</p>
          </div>
        ) : null}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <KpiCard
          label="Envíos totales"
          value={String(stats.total)}
          icon={Package}
          accent="bg-[#0047AB]/10 text-[#0047AB]"
        />
        <KpiCard
          label="En proceso"
          value={String(stats.active)}
          icon={Truck}
          accent="bg-[#5B9BD5]/15 text-[#0F4C81]"
        />
        <KpiCard
          label="Entregados"
          value={String(stats.delivered)}
          icon={CheckCircle2}
          accent="bg-emerald-100 text-emerald-600"
        />
        <KpiCard
          label="Total facturado"
          value={formatCurrency(stats.revenue)}
          icon={DollarSign}
          accent="bg-[#D93025]/10 text-[#D93025]"
        />
      </div>

      {/* Shipment history */}
      <div className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
        <div className="border-b border-[#7BB5E6]/10 px-5 py-4">
          <h2 className="font-semibold text-[#234974]">Historial de envíos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#7BB5E6]/10 text-xs uppercase tracking-wide text-[#234974]/50">
                <th scope="col" className="px-5 py-3 font-medium">Rastreo</th>
                <th scope="col" className="px-5 py-3 font-medium">Categoría</th>
                <th scope="col" className="px-5 py-3 font-medium">Estado</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Peso</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[#234974]/50">
                    Este cliente todavía no tiene envíos.
                  </td>
                </tr>
              ) : (
                shipments.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-[#7BB5E6]/10 transition-colors last:border-0 hover:bg-[#7BB5E6]/5"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-medium text-[#0F4C81]">
                      {s.tracking_number}
                    </td>
                    <td className="px-5 py-3 text-[#234974]/80">{s.rates?.label ?? s.category}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums text-[#234974]/80">
                      {Number(s.weight_lb).toFixed(1)} lb
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums text-[#234974]">
                      {formatCurrency(s.total_price)}
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums text-[#234974]/60">
                      {formatDate(s.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
