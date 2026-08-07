import Link from "next/link"
import { getUsDeliveryBoard, getUsActiveStates } from "@/lib/us-deliveries-data"
import { UsDeliveryBoard } from "@/components/dashboard/us-delivery-board"
import { US_STATES } from "@/lib/us-states"
import { cn } from "@/lib/utils"

export default async function UsDeliveriesPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>
}) {
  const params = await searchParams
  const active = await getUsActiveStates()

  const requested =
    params.state && (US_STATES as readonly string[]).includes(params.state) ? params.state : undefined
  const selected = requested ?? active[0]?.state ?? "Texas"
  const board = await getUsDeliveryBoard(selected)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Entregas USA</h1>
        <p className="text-sm text-[#234974]/60">
          Reparto de los envíos El Salvador → USA, por estado de destino.
        </p>
      </div>

      {active.length === 0 ? (
        <p className="rounded-lg border border-[#7BB5E6]/20 bg-white px-4 py-3 text-sm text-[#234974]/60">
          No hay paquetes El Salvador → USA esperando reparto por ahora.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {active.map(({ state, waiting }) => {
              const isActive = state === selected
              return (
                <Link
                  key={state}
                  href={`/dashboard/us-deliveries?state=${encodeURIComponent(state)}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#0F4C81] text-white"
                      : "border border-[#7BB5E6]/30 bg-white text-[#234974] hover:bg-[#7BB5E6]/10",
                  )}
                >
                  {state}
                  {waiting > 0 ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-xs tabular-nums",
                        isActive ? "bg-white/20 text-white" : "bg-[#D93025]/10 text-[#D93025]",
                      )}
                    >
                      {waiting}
                    </span>
                  ) : null}
                </Link>
              )
            })}
          </div>

          <UsDeliveryBoard state={selected} inCountry={board.inCountry} onTheWay={board.onTheWay} />
        </>
      )}
    </div>
  )
}
