/**
 * Componente Values - Sección de valores corporativos
 *
 * Este componente muestra los valores de la empresa en tarjetas con iconos,
 * organizados en dos filas. Incluye animaciones y efectos visuales.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Package, MessageSquare, Handshake, Settings, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Values() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()
  // Referencia para detectar cuando la sección es visible
  const sectionRef = useRef<HTMLElement>(null)
  // Hook para detectar cuando la sección entra en el viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Definición de los valores con sus iconos y colores
  const values = [
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("values.trust"),
      description: t("values.trust.desc"),
      emoji: "🛡️",
      color: "from-[#0F4C81] to-[#0F4C81]/80",
    },
    {
      icon: <Package className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("values.commitment"),
      description: t("values.commitment.desc"),
      emoji: "📦",
      color: "from-[#234974] to-[#234974]/80",
    },
    {
      icon: <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("values.accessibility"),
      description: t("values.accessibility.desc"),
      emoji: "💬",
      color: "from-[#5B9BD5] to-[#5B9BD5]/80",
    },
    {
      icon: <Handshake className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("values.closeness"),
      description: t("values.closeness.desc"),
      emoji: "🤝",
      color: "from-[#D93025] to-[#D93025]/80",
    },
    {
      icon: <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("values.efficiency"),
      description: t("values.efficiency.desc"),
      emoji: "⚙️",
      color: "from-[#0F4C81] to-[#5B9BD5]",
    },
  ]

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Variantes de animación para los elementos individuales
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Función para desplazarse a la sección de contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="values"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-[#7BB5E6]/10"
    >
      <div className="container mx-auto px-3 sm:px-4">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#234974] mb-3 sm:mb-4">
            {t("values.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#234974]/70 max-w-2xl mx-auto">{t("values.subtitle")}</p>
        </motion.div>

        <div className="flex flex-col space-y-6 sm:space-y-8">
          {/* Primera fila - 3 valores */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {/* Valor 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${values[0].color} flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                {values[0].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-2 sm:mb-3 flex items-center">
                {values[0].title} <span className="ml-2 text-xl sm:text-2xl">{values[0].emoji}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed flex-grow">
                {values[0].description}
              </p>
            </motion.div>

            {/* Valor 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${values[1].color} flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                {values[1].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-2 sm:mb-3 flex items-center">
                {values[1].title} <span className="ml-2 text-xl sm:text-2xl">{values[1].emoji}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed flex-grow">
                {values[1].description}
              </p>
            </motion.div>

            {/* Valor 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${values[2].color} flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                {values[2].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-2 sm:mb-3 flex items-center">
                {values[2].title} <span className="ml-2 text-xl sm:text-2xl">{values[2].emoji}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed flex-grow">
                {values[2].description}
              </p>
            </motion.div>
          </motion.div>

          {/* Segunda fila - 2 valores centrados */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {/* Valor 4 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${values[3].color} flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                {values[3].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-2 sm:mb-3 flex items-center">
                {values[3].title} <span className="ml-2 text-xl sm:text-2xl">{values[3].emoji}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed flex-grow">
                {values[3].description}
              </p>
            </motion.div>

            {/* Valor 5 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${values[4].color} flex items-center justify-center mb-4 sm:mb-6 shadow-md`}
              >
                {values[4].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-2 sm:mb-3 flex items-center">
                {values[4].title} <span className="ml-2 text-xl sm:text-2xl">{values[4].emoji}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed flex-grow">
                {values[4].description}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Botón CTA al final de la sección */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Button
            onClick={scrollToContact}
            className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] flex items-center gap-2"
          >
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
