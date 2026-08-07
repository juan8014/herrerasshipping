"use client"

import { useState, type FormEvent } from "react"
import { Loader2, LogIn } from "lucide-react"
import { login } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ initialError }: { initialError?: string }) {
  const [error, setError] = useState<string | undefined>(initialError)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(undefined)
    const formData = new FormData(e.currentTarget)
    // On success the action redirects to /dashboard; only errors return here.
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-[#D93025]/30 bg-[#D93025]/10 px-4 py-3 text-sm font-medium text-[#D93025]"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[#234974]">
          Correo electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@herrerasshipping.com"
          className="h-12 rounded-lg border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-[#234974]">
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="h-12 rounded-lg border-[#7BB5E6]/40 bg-white text-[#234974]"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#0F4C81] py-6 text-base font-medium text-white transition-all hover:bg-[#0F4C81]/90 hover:shadow-lg disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Ingresando…
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" aria-hidden="true" />
            Iniciar sesión
          </>
        )}
      </Button>
    </form>
  )
}
