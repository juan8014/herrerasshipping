/**
 * Componente MissionVision - Sección de misión y visión
 *
 * Este componente muestra la misión y visión de la empresa en dos tarjetas
 * con animaciones y efectos visuales.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Eye } from "lucide-react"

export function MissionVision() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()
  // Referencia para detectar cuando la sección es visible
  const sectionRef = useRef<HTMLElement>(null)
  // Hook para detectar cuando la sección entra en el viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Variantes de animación para los elementos individuales
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="mission" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12"
        >
          {/* Tarjeta de Misión */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#7BB5E6]/20 transform hover:translate-y-[-5px] transition-transform duration-300 group"
          >
            {/* Icono con gradiente */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#5B9BD5] flex items-center justify-center mb-6 sm:mb-8 group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>

            {/* Título de la misión */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#234974] mb-4 sm:mb-6">
              {t("mission.title")}
            </h2>

            {/* Texto de la misión */}
            <p className="text-[#234974]/80 leading-relaxed text-sm sm:text-base md:text-lg">{t("mission.text")}</p>
          </motion.div>

          {/* Tarjeta de Visión */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#7BB5E6]/20 transform hover:translate-y-[-5px] transition-transform duration-300 group"
          >
            {/* Icono con gradiente */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0047AB] to-[#7BB5E6] flex items-center justify-center mb-6 sm:mb-8 group-hover:shadow-lg transition-shadow duration-300">
              <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
            </div>

            {/* Título de la visión */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#234974] mb-4 sm:mb-6">
              {t("vision.title")}
            </h2>

            {/* Texto de la visión */}
            <p className="text-[#234974]/80 leading-relaxed text-sm sm:text-base md:text-lg">{t("vision.text")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
