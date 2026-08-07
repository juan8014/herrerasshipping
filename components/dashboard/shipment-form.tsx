"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { createShipment, type ShipmentFormState } from "@/app/dashboard/shipments/actions"
import type { ClientOption, RateOption } from "@/lib/shipments-data"
import type { ShipmentDirection } from "@/lib/database.types"
import { US_STATES } from "@/lib/us-states"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const selectClass =
  "h-10 rounded-md border border-[#7BB5E6]/40 bg-white px-3 text-sm text-[#234974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

function Err({ errors }: { errors?: string[] }) {
  return errors?.length ? <p className="text-xs font-medium text-[#D93025]">{errors[0]}</p> : null
}

export function ShipmentForm({ clients, rates }: { clients: ClientOption[]; rates: RateOption[] }) {
  const [state, setState] = useState<ShipmentFormState>({})
  const [pending, setPending] = useState(false)
  const [direction, setDirection] = useState<ShipmentDirection>("usa_to_sv")
  const [category, setCategory] = useState("")
  const [weight, setWeight] = useState("")
  const [fee, setFee] = useState("")

  const rate = rates.find((r) => r.category === category)
  const ratePerLb = rate?.rate_per_lb ?? 0
  const effectiveFee = fee.trim() === "" ? (rate?.default_fee ?? 0) : Number(fee) || 0
  const total = (Number(weight) || 0) * ratePerLb + effectiveFee
  const toUsa = direction === "sv_to_usa"

  function onCategoryChange(cat: string) {
    setCategory(cat)
    const r = rates.find((x) => x.category === cat)
    setFee(r ? String(r.default_fee) : "")
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const result = await createShipment(new FormData(e.currentTarget))
    if (result) {
      setState(result)
      setPending(false)
    }
  }

  const fe = state.fieldErrors ?? {}

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-[#D93025]/30 bg-[#D93025]/10 px-4 py-3 text-sm font-medium text-[#D93025]"
        >
          {state.error}
        </p>
      ) : null}

      {/* Sentido del envío */}
      <input type="hidden" name="direction" value={direction} />
      <div className="flex flex-col gap-2">
        <Label className="text-[#234974]">Sentido del envío</Label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "usa_to_sv", label: "USA → El Salvador" },
              { value: "sv_to_usa", label: "El Salvador → USA" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDirection(opt.value)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                direction === opt.value
                  ? "border-[#0F4C81] bg-[#0F4C81] text-white"
                  : "border-[#7BB5E6]/40 bg-white text-[#234974] hover:bg-[#7BB5E6]/10",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="client_id" className="text-[#234974]">
            Cliente <span className="text-[#D93025]">*</span>
          </Label>
          <select id="client_id" name="client_id" required defaultValue="" className={selectClass}>
            <option value="">— Seleccionar —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} ({c.client_code})
              </option>
            ))}
          </select>
          <p className="text-xs text-[#234974]/50">
            {toUsa ? "Remitente (cartera, en El Salvador)" : "Destinatario (cartera, en El Salvador)"}
          </p>
          <Err errors={fe.client_id} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="category" className="text-[#234974]">
            Categoría <span className="text-[#D93025]">*</span>
          </Label>
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={selectClass}
          >
            <option value="">— Seleccionar —</option>
            {rates.map((r) => (
              <option key={r.category} value={r.category}>
                {r.label}
              </option>
            ))}
          </select>
          <Err errors={fe.category} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="weight_lb" className="text-[#234974]">
            Peso (lb) <span className="text-[#D93025]">*</span>
          </Label>
          <Input
            id="weight_lb"
            name="weight_lb"
            type="number"
            step="0.1"
            min="0"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-[#7BB5E6]/40 bg-white text-[#234974]"
          />
          <Err errors={fe.weight_lb} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="shipping_fee" className="text-[#234974]">
            Costo de envío
          </Label>
          <Input
            id="shipping_fee"
            name="shipping_fee"
            type="number"
            step="0.01"
            min="0"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="border-[#7BB5E6]/40 bg-white text-[#234974]"
          />
          <Err errors={fe.shipping_fee} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="description" className="text-[#234974]">
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={2}
            className="border-[#7BB5E6]/40 bg-white text-[#234974]"
          />
        </div>
      </div>

      {/* Destino en USA — solo para SV -> USA */}
      {toUsa ? (
        <div className="space-y-5 rounded-xl border border-[#7BB5E6]/30 bg-[#7BB5E6]/5 p-4">
          <p className="text-sm font-semibold text-[#234974]">Destino en USA</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="us_recipient" className="text-[#234974]">
                Destinatario <span className="text-[#D93025]">*</span>
              </Label>
              <Input id="us_recipient" name="us_recipient" className="border-[#7BB5E6]/40 bg-white text-[#234974]" />
              <Err errors={fe.us_recipient} />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="us_address" className="text-[#234974]">
                Dirección <span className="text-[#D93025]">*</span>
              </Label>
              <Input id="us_address" name="us_address" className="border-[#7BB5E6]/40 bg-white text-[#234974]" />
              <Err errors={fe.us_address} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="us_city" className="text-[#234974]">
                Ciudad <span className="text-[#D93025]">*</span>
              </Label>
              <Input id="us_city" name="us_city" className="border-[#7BB5E6]/40 bg-white text-[#234974]" />
              <Err errors={fe.us_city} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="us_state" className="text-[#234974]">
                Estado <span className="text-[#D93025]">*</span>
              </Label>
              <select id="us_state" name="us_state" defaultValue="" className={selectClass}>
                <option value="">— Seleccionar —</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Err errors={fe.us_state} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="us_zip" className="text-[#234974]">
                ZIP
              </Label>
              <Input id="us_zip" name="us_zip" className="border-[#7BB5E6]/40 bg-white text-[#234974]" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Preview de precio en vivo (el server re-calcula con la tarifa real) */}
      <div className="flex items-center justify-between rounded-xl bg-[#7BB5E6]/5 p-4">
        <p className="text-sm text-[#234974]/70">
          {rate
            ? `${formatCurrency(ratePerLb)}/lb × ${Number(weight) || 0} lb + ${formatCurrency(effectiveFee)} de envío`
            : "Seleccioná categoría y peso para ver el total"}
        </p>
        <p className="text-xl font-bold tabular-nums text-[#234974]">{formatCurrency(total)}</p>
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          disabled={pending}
          className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          Crear envío
        </Button>
        <Button asChild variant="outline" className="border-[#7BB5E6]/40 text-[#234974]">
          <Link href="/dashboard/shipments">Cancelar</Link>
        </Button>
      </div>
    </form>
  )
}
