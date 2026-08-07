import { getRates } from "@/lib/rates-data"
import { updateRate, createRate } from "@/app/dashboard/rates/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ERRORS: Record<string, string> = {
  invalid: "Revisá los datos: el nombre es obligatorio y los montos no pueden ser negativos.",
  exists: "Ya existe una categoría con ese nombre.",
  save: "No se pudo guardar la tarifa.",
}

export default async function RatesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const params = await searchParams
  const rates = await getRates()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#234974]">Tarifas</h1>
        <p className="text-sm text-[#234974]/60">
          Precios por categoría de paquete. Los envíos ya creados conservan su tarifa; los cambios
          aplican a los nuevos.
        </p>
      </div>

      {params.saved ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Cambios guardados.
        </p>
      ) : null}
      {params.error ? (
        <p
          role="alert"
          className="rounded-lg border border-[#D93025]/30 bg-[#D93025]/10 px-4 py-3 text-sm font-medium text-[#D93025]"
        >
          {ERRORS[params.error] ?? "Ocurrió un error."}
        </p>
      ) : null}

      {/* Tarifas existentes */}
      <div className="space-y-3">
        {rates.map((r) => (
          <form
            key={r.category}
            action={updateRate.bind(null, r.category)}
            className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-[#234974]/50">{r.category}</span>
              <label className="flex items-center gap-2 text-sm text-[#234974]">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={r.active}
                  className="h-4 w-4 rounded border-[#7BB5E6]/50 accent-[#0F4C81]"
                />
                Activa
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`label-${r.category}`} className="text-xs text-[#234974]/70">
                  Nombre
                </Label>
                <Input
                  id={`label-${r.category}`}
                  name="label"
                  defaultValue={r.label}
                  required
                  className="border-[#7BB5E6]/40 bg-white text-[#234974]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`rate-${r.category}`} className="text-xs text-[#234974]/70">
                  Tarifa/lb
                </Label>
                <Input
                  id={`rate-${r.category}`}
                  name="rate_per_lb"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={r.rate_per_lb}
                  className="w-28 border-[#7BB5E6]/40 bg-white text-[#234974]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`fee-${r.category}`} className="text-xs text-[#234974]/70">
                  Fee
                </Label>
                <Input
                  id={`fee-${r.category}`}
                  name="default_fee"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={r.default_fee}
                  className="w-28 border-[#7BB5E6]/40 bg-white text-[#234974]"
                />
              </div>
              <Button type="submit" className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90">
                Guardar
              </Button>
            </div>
          </form>
        ))}
      </div>

      {/* Agregar categoría */}
      <form
        action={createRate}
        className="rounded-2xl border border-dashed border-[#7BB5E6]/40 bg-white p-5 shadow-sm"
      >
        <h2 className="mb-3 font-semibold text-[#234974]">Agregar categoría</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-label" className="text-xs text-[#234974]/70">
              Nombre
            </Label>
            <Input
              id="new-label"
              name="label"
              required
              placeholder="Ej: Electrónica"
              className="border-[#7BB5E6]/40 bg-white text-[#234974]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-rate" className="text-xs text-[#234974]/70">
              Tarifa/lb
            </Label>
            <Input
              id="new-rate"
              name="rate_per_lb"
              type="number"
              step="0.01"
              min="0"
              defaultValue="0"
              className="w-28 border-[#7BB5E6]/40 bg-white text-[#234974]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-fee" className="text-xs text-[#234974]/70">
              Fee
            </Label>
            <Input
              id="new-fee"
              name="default_fee"
              type="number"
              step="0.01"
              min="0"
              defaultValue="0"
              className="w-28 border-[#7BB5E6]/40 bg-white text-[#234974]"
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81]/10"
          >
            Agregar
          </Button>
        </div>
      </form>
    </div>
  )
}
