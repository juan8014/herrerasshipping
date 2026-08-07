import { createClientRecord } from "@/app/dashboard/clients/actions"
import { ClientForm } from "@/components/dashboard/client-form"

export default function NewClientPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Nuevo cliente</h1>
        <p className="text-sm text-[#234974]/60">Agrega un cliente a la cartera.</p>
      </div>
      <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-6 shadow-sm">
        <ClientForm action={createClientRecord} submitLabel="Crear cliente" />
      </div>
    </div>
  )
}
