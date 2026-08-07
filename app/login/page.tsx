import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { getAuthContext } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Iniciar sesión | Herrera's Shipping",
  robots: "noindex, nofollow",
}

// Auth-gated: depends on the request session, never statically prerendered.
export const dynamic = "force-dynamic"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string; created?: string }>
}) {
  const params = await searchParams

  // Already authenticated? Send them where they belong.
  const { user, role } = await getAuthContext()
  if (user && role === "admin") redirect("/dashboard")
  if (user && role === "client") redirect("/account")

  const initialError =
    params.error === "not_admin"
      ? "Esta cuenta no tiene acceso al panel de administración."
      : undefined

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-[#7BB5E6]/15 px-4">
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-[#7BB5E6]/20 bg-white/90 p-8 shadow-xl backdrop-blur-sm sm:p-10">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              src="/images/logo.png"
              alt="Herrera's Shipping"
              width={180}
              height={60}
              className="mb-6 h-auto w-40"
              priority
            />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-medium text-[#0F4C81]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Panel de administración
            </span>
            <h1 className="mt-4 text-2xl font-bold text-[#234974]">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-[#234974]/70">
              Acceso exclusivo para el equipo de Herrera's Shipping.
            </p>
          </div>

          {params.created ? (
            <p className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Cuenta creada. Ya podés iniciar sesión.
            </p>
          ) : null}

          <LoginForm initialError={initialError} />

          <p className="mt-6 text-center text-sm text-[#234974]/70">
            ¿Sos cliente y es tu primera vez?{" "}
            <Link href="/signup" className="font-medium text-[#0047AB] hover:underline">
              Creá tu cuenta
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#234974]/70 transition-colors hover:text-[#0047AB]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
