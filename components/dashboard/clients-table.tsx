import Link from "next/link"
import { Pencil, Archive, RotateCcw, Trash2, Users } from "lucide-react"
import type { ClientRow } from "@/lib/clients-data"
import { shipmentCount } from "@/lib/clients-data"
import { archiveClient, restoreClient, deleteClient } from "@/app/dashboard/clients/actions"

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#234974]/70 transition-colors hover:bg-[#7BB5E6]/15 hover:text-[#0047AB]"
    >
      {children}
    </button>
  )
}

export function ClientsTable({ rows, archived }: { rows: ClientRow[]; archived: boolean }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-12 text-center shadow-sm">
        <Users className="mx-auto mb-3 h-8 w-8 text-[#234974]/30" aria-hidden="true" />
        <p className="font-medium text-[#234974]">
          {archived ? "No hay clientes archivados." : "Todavía no hay clientes en la cartera."}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#7BB5E6]/20 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#7BB5E6]/10 text-xs uppercase tracking-wide text-[#234974]/50">
              <th scope="col" className="px-5 py-3 font-medium">Código</th>
              <th scope="col" className="px-5 py-3 font-medium">Cliente</th>
              <th scope="col" className="px-5 py-3 font-medium">Teléfono</th>
              <th scope="col" className="px-5 py-3 font-medium">Ciudad</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Envíos</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const count = shipmentCount(c)
              return (
                <tr
                  key={c.id}
                  className="border-b border-[#7BB5E6]/10 transition-colors last:border-0 hover:bg-[#7BB5E6]/5"
                >
                  <td className="px-5 py-3 font-mono text-xs font-medium text-[#0F4C81]">{c.client_code}</td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/dashboard/clients/${c.id}`}
                      className="font-medium text-[#234974] transition-colors hover:text-[#0047AB] hover:underline"
                    >
                      {c.full_name}
                    </Link>
                    <div className="text-xs text-[#234974]/50">{c.email ?? "—"}</div>
                  </td>
                  <td className="px-5 py-3 text-[#234974]/80">{c.phone ?? "—"}</td>
                  <td className="px-5 py-3 text-[#234974]/80">{c.city ?? "—"}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#234974]">{count}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {archived ? (
                        <>
                          <form action={restoreClient.bind(null, c.id)}>
                            <IconButton label="Restaurar">
                              <RotateCcw className="h-4 w-4" aria-hidden="true" />
                            </IconButton>
                          </form>
                          {count === 0 ? (
                            <form action={deleteClient.bind(null, c.id)}>
                              <IconButton label="Eliminar definitivamente">
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </IconButton>
                            </form>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/dashboard/clients/${c.id}/edit`}
                            aria-label="Editar"
                            title="Editar"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#234974]/70 transition-colors hover:bg-[#7BB5E6]/15 hover:text-[#0047AB]"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <form action={archiveClient.bind(null, c.id)}>
                            <IconButton label="Archivar">
                              <Archive className="h-4 w-4" aria-hidden="true" />
                            </IconButton>
                          </form>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
