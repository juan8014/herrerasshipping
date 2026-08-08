/**
 * Hero - Sección principal con video de fondo y animación GSAP de entrada.
 *
 * Adaptado a la marca Herrera's (azul + Lexend). Bilingüe (ES/EN) vía el
 * language-provider. El navbar lo provee el componente Header (no se duplica).
 * La entrada usa GSAP (gsap.fromTo con stagger) y respeta prefers-reduced-motion.
 */
"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRightCircle, Plane, Package, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { FloatingBackground } from "@/components/motion/floating-background"
import { UsFlag, SvFlag } from "@/components/ui/flags"

gsap.registerPlugin(useGSAP)

const COPY = {
  es: {
    a: "Envía",
    b: "Tus",
    c: "Encomiendas",
    l2a: "De USA",
    l2b: "a El Salvador",
    l2c: "y viceversa",
    subtitle:
      "Conectando Estados Unidos y El Salvador sin estrés. Transportamos tus paquetes, documentos y carga en ambas direcciones con entrega garantizada, rastreo en tiempo real y la mejor tarifa.",
    cta: "Programa tu Envío",
  },
  en: {
    a: "Send",
    b: "Your",
    c: "Packages",
    l2a: "From the USA",
    l2b: "to El Salvador",
    l2c: "and back",
    subtitle:
      "Connecting the United States and El Salvador stress-free. We move your packages, documents, and cargo in both directions with guaranteed delivery, real-time tracking, and the best rates.",
    cta: "Schedule your Shipment",
  },
} as const

const inlineIcon = "inline-block h-6 w-6 align-middle text-[#0F4C81] relative -top-0.5 mx-1.5"

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { language } = useLanguage()
  const t = language === "en" ? COPY.en : COPY.es

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".hero-element",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Fondo animado flotante (aviones/paquetes/pines en loop GSAP), en marca */}
      <FloatingBackground />

      {/* Overlay claro para asegurar legibilidad del texto sobre los iconos */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-white/30" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-12 pt-[clamp(96px,12vw,140px)] sm:px-8">
        <div className="mx-auto max-w-[720px] text-center">
          <h1
            className="hero-element font-heading font-bold text-[#234974]"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            {t.a}
            <Plane className={inlineIcon} aria-hidden="true" />
            {t.b}
            <Package className={inlineIcon} aria-hidden="true" />
            {t.c}
            <br />
            {t.l2a}
            <UsFlag className="relative -top-0.5 mx-1.5 inline-block h-6 w-9 align-middle rounded-[3px] shadow-sm ring-1 ring-black/5" />
            {t.l2b}
            <SvFlag className="relative -top-0.5 mx-1.5 inline-block h-6 w-9 align-middle rounded-[3px] shadow-sm ring-1 ring-black/5" />
            {t.l2c}
            <Globe className={inlineIcon} aria-hidden="true" />
          </h1>

          <p
            className="hero-element mx-auto mt-6 max-w-[600px] text-[#234974]/80"
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", lineHeight: 1.65 }}
          >
            {t.subtitle}
          </p>

          <div className="hero-element mt-8 flex justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0F4C81] px-6 py-4 font-medium text-white shadow-[0_4px_24px_rgba(15,76,129,0.28)] transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ minWidth: 210, fontSize: "clamp(0.95rem, 2vw, 1.05rem)" }}
            >
              {t.cta}
              <ArrowRightCircle className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
