/**
 * MissionVision - Estilo editorial: sin cajas, hairlines + tipografía + aire.
 * Se acompaña con la ilustración de marca (repartidor + clienta, ruta US→SV),
 * que entra por scroll (Reveal) y flota sutilmente en loop (GSAP). Respeta
 * prefers-reduced-motion. Copy sin cambios.
 */
"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/components/language-provider"
import { Shield, Eye } from "lucide-react"
import { Reveal, StaggerReveal } from "@/components/motion/reveal"

gsap.registerPlugin(useGSAP)

export function MissionVision() {
  const { t, language } = useLanguage()
  const eyebrow = language === "en" ? "Who we are" : "Quiénes somos"
  const illustrationAlt =
    language === "en"
      ? "Herrera's courier handing a package to a customer, with a plane on the US→El Salvador route"
      : "Repartidor de Herrera's entregando un paquete a una clienta, con un avión en la ruta USA→El Salvador"

  const floatRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = floatRef.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          y: -14,
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      })
      return () => mm.revert()
    },
    { scope: floatRef },
  )

  const items = [
    { Icon: Shield, label: t("mission.title"), text: t("mission.text") },
    { Icon: Eye, label: t("vision.title"), text: t("vision.text") },
  ]

  return (
    <section id="mission" className="relative bg-white py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-14">
          {/* Ilustración de marca */}
          <Reveal className="order-2 md:order-1">
            <div ref={floatRef} className="relative mx-auto w-full max-w-[520px]">
              {/* Halo suave detrás de los personajes */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#7BB5E6]/20 via-[#5B9BD5]/10 to-transparent blur-2xl"
              />
              <Image
                src="/images/delivery-illustration.png"
                alt={illustrationAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 90vw, 520px"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* Texto editorial */}
          <div className="order-1 md:order-2">
            <Reveal className="mb-6 sm:mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F4C81]">
                {eyebrow}
              </span>
            </Reveal>

            <StaggerReveal className="border-b border-[#234974]/10">
              {items.map(({ Icon, label, text }) => (
                <div
                  key={label}
                  className="group border-t border-[#234974]/10 py-6 transition-colors md:py-8"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 shrink-0 text-[#0F4C81]" strokeWidth={1.5} aria-hidden="true" />
                    <h2 className="text-2xl font-bold text-[#234974] md:text-3xl">{label}</h2>
                  </div>
                  <p className="mt-3 text-lg leading-relaxed text-[#234974]/70">{text}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
