import { notFound } from "next/navigation"
import { getClientById } from "@/lib/clients-data"
import { updateClientRecord } from "@/app/dashboard/clients/actions"
import { ClientForm } from "@/components/dashboard/client-form"

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClientById(id)
  if (!client) notFound()

  const action = updateClientRecord.bind(null, id)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Editar cliente</h1>
        <p className="font-mono text-sm text-[#0F4C81]">{client.client_code}</p>
      </div>
      <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-6 shadow-sm">
        <ClientForm action={action} defaultValues={client} submitLabel="Guardar cambios" />
      </div>
    </div>
  )
}
