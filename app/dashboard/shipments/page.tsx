import Link from "next/link"
import { Plus } from "lucide-react"
import { getShipments } from "@/lib/shipments-data"
import { ShipmentsTable } from "@/components/dashboard/shipments-table"
import { Button } from "@/components/ui/button"

export default async function ShipmentsPage() {
  const rows = await getShipments()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#234974]">Envíos</h1>
          <p className="text-sm text-[#234974]/60">Todos los paquetes registrados.</p>
        </div>
        <Button asChild className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90">
          <Link href="/dashboard/shipments/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nuevo envío
          </Link>
        </Button>
      </div>

      <ShipmentsTable rows={rows} title="Listado de envíos" />
    </div>
  )
}
