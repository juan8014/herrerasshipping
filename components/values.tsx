/**
 * Values - Estilo editorial: lista con índices grandes, hairlines y aire,
 * acompañada por la lámina de escenas de marca a la derecha (entra por scroll
 * y flota sutilmente con GSAP, respetando prefers-reduced-motion). Copy sin cambios.
 */
"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Shield, Package, MessageSquare, Handshake, Settings, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, StaggerReveal } from "@/components/motion/reveal"

gsap.registerPlugin(useGSAP)

type Value = {
  Icon: LucideIcon
  title: string
  description: string
  emoji: string
}

export function Values() {
  const { t, language } = useLanguage()
  const eyebrow = language === "en" ? "Our values" : "Nuestros valores"
  const illustrationAlt =
    language === "en"
      ? "Illustrated scenes of Herrera's values: commitment, closeness, efficiency, quality, security, and tracking"
      : "Escenas ilustradas de los valores de Herrera's: compromiso, cercanía, eficiencia, calidad, seguridad y seguimiento"

  const floatRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = floatRef.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          y: -14,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      })
      return () => mm.revert()
    },
    { scope: floatRef },
  )

  const values: Value[] = [
    { Icon: Shield, title: t("values.trust"), description: t("values.trust.desc"), emoji: "🛡️" },
    { Icon: Package, title: t("values.commitment"), description: t("values.commitment.desc"), emoji: "📦" },
    { Icon: MessageSquare, title: t("values.accessibility"), description: t("values.accessibility.desc"), emoji: "💬" },
    { Icon: Handshake, title: t("values.closeness"), description: t("values.closeness.desc"), emoji: "🤝" },
    { Icon: Settings, title: t("values.efficiency"), description: t("values.efficiency.desc"), emoji: "⚙️" },
  ]

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="values"
      className="relative bg-gradient-to-b from-[#7BB5E6]/[0.06] to-white py-16 sm:py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F4C81]">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#234974] md:text-5xl">{t("values.title")}</h2>
          <p className="mt-3 text-lg text-[#234974]/70">{t("values.subtitle")}</p>
        </Reveal>

        <div className="grid items-center gap-10 md:grid-cols-[1fr_0.85fr] md:gap-14">
          {/* Lista editorial de valores */}
          <StaggerReveal className="order-2 border-b border-[#234974]/10 md:order-1">
            {values.map(({ Icon, title, description, emoji }, i) => (
              <div
                key={title}
                className="group grid grid-cols-[auto_1fr] items-start gap-4 border-t border-[#234974]/10 py-6 transition-colors hover:bg-[#0F4C81]/[0.03] sm:gap-6 sm:py-7"
              >
                <span className="font-heading text-3xl font-bold tabular-nums text-[#0F4C81]/25 transition-colors duration-300 group-hover:text-[#0F4C81] sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Icon className="h-5 w-5 shrink-0 text-[#0F4C81]" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="text-lg font-bold text-[#234974] sm:text-2xl">{title}</h3>
                    <span className="text-lg" aria-hidden="true">
                      {emoji}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-sm text-[#234974]/70 sm:text-base">{description}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>

          {/* Lámina de escenas de marca */}
          <Reveal className="order-1 md:order-2">
            <div ref={floatRef} className="relative mx-auto w-full max-w-[460px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-[#7BB5E6]/20 via-[#5B9BD5]/10 to-transparent blur-2xl"
              />
              <Image
                src="/images/valores.jpg"
                alt={illustrationAlt}
                width={1024}
                height={943}
                sizes="(max-width: 768px) 90vw, 460px"
                className="h-auto w-full rounded-2xl shadow-[0_20px_60px_rgba(15,76,129,0.15)] ring-1 ring-[#234974]/5"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 sm:mt-12">
          <Button
            onClick={scrollToContact}
            className="flex items-center gap-2 rounded-full bg-[#0F4C81] px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#0F4C81]/90 hover:shadow-lg sm:text-base"
          >
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
