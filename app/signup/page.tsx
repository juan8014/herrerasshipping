import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata = {
  title: "Crear cuenta | Herrera's Shipping",
  robots: "noindex, nofollow",
}

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-[#7BB5E6]/15 px-4 py-12">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-[#7BB5E6]/20 bg-white/90 p-8 shadow-xl backdrop-blur-sm sm:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <Image
              src="/images/logo.png"
              alt="Herrera's Shipping"
              width={180}
              height={60}
              className="mb-6 h-auto w-40"
              priority
            />
            <h1 className="text-2xl font-bold text-[#234974]">Creá tu cuenta</h1>
            <p className="mt-1 text-sm text-[#234974]/70">
              Seguí todos tus envíos en un solo lugar.
            </p>
          </div>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-[#234974]/70">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-medium text-[#0047AB] hover:underline">
              Iniciar sesión
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
