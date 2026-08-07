import Link from "next/link"
import { getClientOptions, getRateOptions } from "@/lib/shipments-data"
import { ShipmentForm } from "@/components/dashboard/shipment-form"
import { Button } from "@/components/ui/button"

export default async function NewShipmentPage() {
  const [clients, rates] = await Promise.all([getClientOptions(), getRateOptions()])

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Nuevo envío</h1>
        <p className="text-sm text-[#234974]/60">
          La tarifa y el costo se congelan al crear el envío.
        </p>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-8 text-center shadow-sm">
          <p className="font-medium text-[#234974]">Primero necesitás un cliente en la cartera.</p>
          <p className="mb-4 text-sm text-[#234974]/60">
            No hay clientes activos para asignar el envío.
          </p>
          <Button asChild className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90">
            <Link href="/dashboard/clients/new">Crear cliente</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-6 shadow-sm">
          <ShipmentForm clients={clients} rates={rates} />
        </div>
      )}
    </div>
  )
}
