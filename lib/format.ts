import type { ShipmentStatus } from "@/lib/database.types"

/** Visual metadata per shipment status: Spanish label + Soft-UI badge classes. */
export const STATUS_META: Record<ShipmentStatus, { label: string; badge: string; dot: string }> = {
  received: { label: "Recibido", badge: "bg-[#7BB5E6]/15 text-[#234974]", dot: "bg-[#5B9BD5]" },
  to_airport: { label: "Rumbo al aeropuerto", badge: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  in_transit: { label: "En tránsito al país", badge: "bg-[#0047AB]/10 text-[#0047AB]", dot: "bg-[#0047AB]" },
  at_customs: { label: "En el país", badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  out_for_delivery: { label: "En camino", badge: "bg-[#5B9BD5]/15 text-[#0F4C81]", dot: "bg-[#5B9BD5]" },
  delivered: { label: "Entregado", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  cancelled: { label: "Cancelado", badge: "bg-[#D93025]/10 text-[#D93025]", dot: "bg-[#D93025]" },
}

export const STATUS_ORDER: ShipmentStatus[] = [
  "received",
  "to_airport",
  "in_transit",
  "at_customs",
  "out_for_delivery",
  "delivered",
  "cancelled",
]

export function statusMeta(status: string) {
  return (
    STATUS_META[status as ShipmentStatus] ?? {
      label: status,
      badge: "bg-muted text-foreground",
      dot: "bg-slate-400",
    }
  )
}

const currencyFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
export function formatCurrency(value: number | string | null | undefined): string {
  return currencyFmt.format(Number(value ?? 0))
}

const dateFmt = new Intl.DateTimeFormat("es-SV", { day: "2-digit", month: "short", year: "numeric" })
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  return dateFmt.format(new Date(iso))
}

const dateTimeFmt = new Intl.DateTimeFormat("es-SV", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
})
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—"
  return dateTimeFmt.format(new Date(iso))
}
