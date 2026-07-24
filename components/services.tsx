/**
 * Componente Services - Sección de servicios ofrecidos
 *
 * Este componente muestra los servicios que ofrece la empresa en tarjetas
 * con iconos, títulos y descripciones. Incluye animaciones y efectos visuales.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Zap, Package } from "lucide-react"

export function Services() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()
  // Referencia para detectar cuando la sección es visible
  const sectionRef = useRef<HTMLElement>(null)
  // Hook para detectar cuando la sección entra en el viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Definición de los servicios con sus iconos y colores
  const services = [
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("services.regular.title"),
      description: t("services.regular.desc"),
      color: "from-[#0F4C81] to-[#5B9BD5]",
      delay: 0.1,
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("services.express.title"),
      description: t("services.express.desc"),
      color: "from-[#D93025] to-[#D93025]/80",
      delay: 0.3,
    },
    {
      icon: <Package className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
      title: t("services.special.title"),
      description: t("services.special.desc"),
      color: "from-[#234974] to-[#234974]/80",
      delay: 0.5,
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#234974] mb-3 sm:mb-4">
            {t("services.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#234974]/70 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Grid de tarjetas de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 flex flex-col items-center text-center h-full hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Icono con gradiente */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-6`}
              >
                {service.icon}
              </div>

              {/* Título del servicio */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#234974] mb-3 sm:mb-4">{service.title}</h3>

              {/* Descripción del servicio */}
              <p className="text-sm sm:text-base text-[#234974]/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
