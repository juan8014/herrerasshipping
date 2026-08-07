import { getTransitBoard } from "@/lib/transit-data"
import { TransitBoard } from "@/components/dashboard/transit-board"

export default async function TransitPage() {
  const board = await getTransitBoard()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Tránsito</h1>
        <p className="text-sm text-[#234974]/60">
          Avanzá los paquetes por el tramo internacional, de USA a El Salvador. Al llegar al país
          pasan al tablero de Entregas.
        </p>
      </div>

      <TransitBoard received={board.received} toAirport={board.toAirport} inTransit={board.inTransit} />
    </div>
  )
}
