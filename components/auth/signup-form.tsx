"use client"

import { useState, type FormEvent } from "react"
import { Loader2, UserPlus } from "lucide-react"
import { createClientAccount, type SignupState } from "@/app/signup/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FieldError({ errors }: { errors?: string[] }) {
  return errors?.length ? <p className="text-xs font-medium text-[#D93025]">{errors[0]}</p> : null
}

export function SignupForm() {
  const [state, setState] = useState<SignupState>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const result = await createClientAccount(new FormData(e.currentTarget))
    if (result) {
      setState(result)
      setPending(false)
    }
  }

  const fe = state.fieldErrors ?? {}

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-[#D93025]/30 bg-[#D93025]/10 px-4 py-3 text-sm font-medium text-[#D93025]"
        >
          {state.error}
        </p>
      ) : null}

      <div className="rounded-lg bg-[#7BB5E6]/10 px-4 py-3 text-sm text-[#234974]/80">
        Verificamos tu identidad con un número de rastreo de tus paquetes y el teléfono o correo que
        registró Herrera's Shipping.
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tracking" className="text-[#234974]">
          Número de rastreo
        </Label>
        <Input
          id="tracking"
          name="tracking"
          required
          placeholder="Ej: HS26-00001"
          className="h-11 border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
        <FieldError errors={fe.tracking} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="verify" className="text-[#234974]">
          Teléfono o correo registrado
        </Label>
        <Input
          id="verify"
          name="verify"
          required
          placeholder="Tu teléfono o correo en Herrera's"
          className="h-11 border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
        <FieldError errors={fe.verify} />
      </div>

      <hr className="border-[#7BB5E6]/20" />

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[#234974]">
          Correo para iniciar sesión
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
        <FieldError errors={fe.email} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-[#234974]">
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="h-11 border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
        <FieldError errors={fe.password} />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#0F4C81] py-6 text-base font-medium text-white transition-all hover:bg-[#0F4C81]/90 hover:shadow-lg disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Creando…
          </>
        ) : (
          <>
            <UserPlus className="h-5 w-5" aria-hidden="true" />
            Crear cuenta
          </>
        )}
      </Button>
    </form>
  )
}
