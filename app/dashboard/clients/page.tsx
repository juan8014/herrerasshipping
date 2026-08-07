import Link from "next/link"
import { Plus } from "lucide-react"
import { getClients } from "@/lib/clients-data"
import { ClientsTable } from "@/components/dashboard/clients-table"
import { Button } from "@/components/ui/button"

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string; error?: string }>
}) {
  const params = await searchParams
  const archived = params.show === "archived"
  const rows = await getClients({ archived })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#234974]">Clientes</h1>
          <p className="text-sm text-[#234974]/60">
            {archived ? "Clientes archivados" : "Cartera de clientes activos"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="border-[#7BB5E6]/40 text-[#234974]">
            <Link href={archived ? "/dashboard/clients" : "/dashboard/clients?show=archived"}>
              {archived ? "Ver activos" : "Ver archivados"}
            </Link>
          </Button>
          <Button asChild className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90">
            <Link href="/dashboard/clients/new">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nuevo cliente
            </Link>
          </Button>
        </div>
      </div>

      {params.error === "has_shipments" ? (
        <p
          role="alert"
          className="rounded-lg border border-[#D93025]/30 bg-[#D93025]/10 px-4 py-3 text-sm font-medium text-[#D93025]"
        >
          No se puede eliminar: el cliente tiene envíos en su historial. Archívalo en su lugar.
        </p>
      ) : null}

      <ClientsTable rows={rows} archived={archived} />
    </div>
  )
}
