"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, UserCheck, Map } from "lucide-react"

export function Benefits() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const benefits = [
    {
      icon: <Clock className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#0047AB]" />,
      title: t("benefits.punctual"),
      delay: 0.1,
    },
    {
      icon: <UserCheck className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#0047AB]" />,
      title: t("benefits.personalized"),
      delay: 0.3,
    },
    {
      icon: <Map className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#0047AB]" />,
      title: t("benefits.coverage"),
      delay: 0.5,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 sm:py-18 md:py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#234974] mb-3 sm:mb-4">
            {t("benefits.title")}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#0047AB] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: benefit.delay }}
              className="bg-white rounded-xl sm:rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-[#7BB5E6]/20 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#7BB5E6]/20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#234974]">{benefit.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
