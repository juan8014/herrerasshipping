"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import type { ClientFormState } from "@/app/dashboard/clients/actions"
import type { Client } from "@/lib/database.types"
import { DEPARTAMENTOS } from "@/lib/departamentos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormAction = (formData: FormData) => Promise<ClientFormState>

function Field({
  id,
  label,
  defaultValue,
  type = "text",
  required = false,
  errors,
}: {
  id: string
  label: string
  defaultValue?: string | null
  type?: string
  required?: boolean
  errors?: string[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-[#234974]">
        {label} {required ? <span className="text-[#D93025]">*</span> : null}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="border-[#7BB5E6]/40 bg-white text-[#234974]"
      />
      {errors?.length ? <p className="text-xs font-medium text-[#D93025]">{errors[0]}</p> : null}
    </div>
  )
}

export function ClientForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: FormAction
  defaultValues?: Partial<Client>
  submitLabel: string
}) {
  const [state, setState] = useState<ClientFormState>({})
  const [pending, setPending] = useState(false)
  const fieldErrors = state.fieldErrors ?? {}

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    // On success the action redirects to the list; only errors return here.
    const result = await action(formData)
    if (result) {
      setState(result)
      setPending(false)
    }
  }

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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="full_name" label="Nombre completo" required defaultValue={defaultValues?.full_name} errors={fieldErrors.full_name} />
        <Field id="email" label="Correo" type="email" defaultValue={defaultValues?.email} errors={fieldErrors.email} />
        <Field id="phone" label="Teléfono" defaultValue={defaultValues?.phone} errors={fieldErrors.phone} />
        <Field id="city" label="Ciudad" defaultValue={defaultValues?.city} errors={fieldErrors.city} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="departamento" className="text-[#234974]">
            Departamento
          </Label>
          <select
            id="departamento"
            name="departamento"
            defaultValue={defaultValues?.departamento ?? ""}
            className="h-10 rounded-md border border-[#7BB5E6]/40 bg-white px-3 text-sm text-[#234974] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">— Seleccionar —</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <Field id="address" label="Dirección" defaultValue={defaultValues?.address} errors={fieldErrors.address} />
        <Field id="country" label="País" defaultValue={defaultValues?.country} errors={fieldErrors.country} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes" className="text-[#234974]">
          Notas
        </Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
          className="border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={pending}
          className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {submitLabel}
        </Button>
        <Button asChild variant="outline" className="border-[#7BB5E6]/40 text-[#234974]">
          <Link href="/dashboard/clients">Cancelar</Link>
        </Button>
      </div>
    </form>
  )
}
