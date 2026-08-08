/**
 * Services - Estilo editorial: lista con índices grandes, hairlines y aire.
 * Reveal por scroll GSAP. Copy sin cambios.
 */
"use client"

import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Clock, Zap, Package, ArrowUpRight } from "lucide-react"
import { Reveal, StaggerReveal } from "@/components/motion/reveal"

type Service = {
  Icon: LucideIcon
  title: string
  description: string
  featured?: boolean
}

export function Services() {
  const { t, language } = useLanguage()
  const eyebrow = language === "en" ? "What we offer" : "Lo que ofrecemos"
  const popular = language === "en" ? "Popular" : "Popular"

  const services: Service[] = [
    { Icon: Clock, title: t("services.regular.title"), description: t("services.regular.desc") },
    { Icon: Zap, title: t("services.express.title"), description: t("services.express.desc"), featured: true },
    { Icon: Package, title: t("services.special.title"), description: t("services.special.desc") },
  ]

  return (
    <section
      id="services"
      className="relative bg-gradient-to-b from-white to-[#7BB5E6]/[0.08] py-16 sm:py-20 md:py-28"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F4C81]">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#234974] md:text-5xl">{t("services.title")}</h2>
          <p className="mt-3 text-lg text-[#234974]/70">{t("services.subtitle")}</p>
        </Reveal>

        <StaggerReveal className="border-b border-[#234974]/10">
          {services.map(({ Icon, title, description, featured }, i) => (
            <div
              key={title}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-[#234974]/10 py-6 transition-colors hover:bg-[#0F4C81]/[0.03] sm:gap-8 sm:py-8"
            >
              <span className="font-heading text-3xl font-bold tabular-nums text-[#0F4C81]/25 transition-colors duration-300 group-hover:text-[#0F4C81] sm:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-[#0F4C81]" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[#234974] sm:text-2xl">{title}</h3>
                  {featured ? (
                    <span className="rounded-full bg-[#D93025]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#D93025]">
                      {popular}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-[#234974]/70 sm:text-base">{description}</p>
              </div>

              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-[#234974]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F4C81] sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
