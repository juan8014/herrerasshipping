"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

export function Stats() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const stats = [
    {
      value: "5+",
      label: t("stats.years"),
      color: "text-[#0047AB]",
      delay: 0.1,
    },
    {
      value: "1000+",
      label: t("stats.clients"),
      color: "text-[#234974]",
      delay: 0.2,
    },
    {
      value: "10000+",
      label: t("stats.packages"),
      color: "text-[#D93025]",
      delay: 0.3,
    },
    {
      value: "80%",
      label: t("stats.coverage"),
      color: "text-[#0047AB]",
      delay: 0.4,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-[#0F4C81] to-[#234974] text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t("stats.title")}</h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl transform scale-150" />
                <div className="relative bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <div className={cn("text-5xl font-bold mb-2", stat.color)}>{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
