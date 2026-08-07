/**
 * Página de Rastreo público
 *
 * Permite a cualquier persona rastrear un envío por su número, sin iniciar
 * sesión. Consulta la función segura `track_package`, que solo expone campos
 * públicos del envío y su historial de eventos.
 */
import Link from "next/link"
import { PackageSearch } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackForm } from "@/components/tracking/track-form"

export const metadata = {
  title: "Rastrear envío | Herrera's Shipping",
  description: "Rastrea tu paquete de Herrera's Shipping con tu número de rastreo.",
}

export default function TrackingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-[#7BB5E6]/10 to-white px-4 pb-20 pt-28 sm:pt-32">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#0047AB]/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F4C81]/10 px-3 py-1 text-sm font-medium text-[#0F4C81]">
            <PackageSearch className="h-4 w-4" aria-hidden="true" />
            Rastreo de envíos
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#234974] sm:text-4xl md:text-5xl">
            Rastrea tu paquete
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#234974]/70 sm:text-lg">
            Ingresa tu número de rastreo para ver el estado y el historial de tu envío.
          </p>

          <div className="mt-8 text-left">
            <TrackForm />
          </div>

          <p className="mt-6 text-sm text-[#234974]/70">
            ¿Querés ver todos tus envíos en un solo lugar?{" "}
            <Link href="/signup" className="font-medium text-[#0047AB] hover:underline">
              Creá tu cuenta
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
