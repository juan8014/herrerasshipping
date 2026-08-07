import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LogOut, PackageSearch } from "lucide-react"
import { getAuthContext } from "@/lib/auth"
import { getMyShipments } from "@/lib/account-data"
import { logout } from "@/app/login/actions"
import { formatCurrency, formatDate } from "@/lib/format"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { ShipmentTimeline } from "@/components/tracking/shipment-timeline"

export const metadata = {
  title: "Mis envíos | Herrera's Shipping",
  robots: "noindex, nofollow",
}

export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const { user, role } = await getAuthContext()
  if (!user) redirect("/login")
  if (role === "admin") redirect("/dashboard")

  const shipments = await getMyShipments()

  return (
    <main className="min-h-screen bg-[#F4F7FB]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#7BB5E6]/20 bg-white/80 px-4 backdrop-blur-md sm:px-6">
        <Link href="/">
          <Image src="/images/logo.png" alt="Herrera's Shipping" width={140} height={40} className="h-9 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-[#234974]/70 sm:block">{user.email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#234974]/70 transition-colors hover:bg-[#D93025]/10 hover:text-[#D93025]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Salir
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold text-[#234974]">Mis envíos</h1>
        <p className="mb-6 text-sm text-[#234974]/60">
          El historial completo de tus paquetes con Herrera's Shipping.
        </p>

        {shipments.length === 0 ? (
          <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-12 text-center shadow-sm">
            <PackageSearch className="mx-auto mb-3 h-8 w-8 text-[#234974]/30" aria-hidden="true" />
            <p className="font-medium text-[#234974]">Todavía no tenés envíos registrados.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shipments.map((s) => (
              <article key={s.id} className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#7BB5E6]/10 bg-[#7BB5E6]/5 p-5">
                  <div>
                    <p className="font-mono text-sm font-bold text-[#0F4C81]">{s.tracking_number}</p>
                    <p className="text-xs text-[#234974]/60">
                      {s.rates?.label ?? s.category} · {Number(s.weight_lb).toFixed(1)} lb ·{" "}
                      {formatCurrency(s.total_price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={s.status} />
                    <p className="mt-1 text-xs text-[#234974]/50">{formatDate(s.created_at)}</p>
                  </div>
                </div>
                <div className="p-5">
                  <ShipmentTimeline events={s.shipment_events} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
