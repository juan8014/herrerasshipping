/**
 * Componente Hero - Sección principal de bienvenida
 *
 * Este componente muestra la sección principal de la página con un título llamativo,
 * subtítulo, botones de acción y una ilustración. Incluye animaciones y efectos visuales.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"
import { Parallax } from "@/components/parallax"

export function Hero() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()

  // Función para desplazarse a la sección de contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Función para desplazarse a la sección de misión
  const scrollToMission = () => {
    const missionSection = document.getElementById("mission")
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden bg-gradient-to-br from-white via-white to-[#7BB5E6]/10"
    >
      {/* Elementos de fondo decorativos (parallax GSAP) */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.25} className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <Parallax speed={-0.18} className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
        <Parallax speed={0.12} className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#D93025]/5 blur-3xl" />
      </div>

      {/* Patrón de fondo con cuadrícula */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-3 sm:px-4 z-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Contenido izquierdo - Texto y botones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            {/* Badge de servicio confiable */}
            <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-[#0047AB]/10 text-[#0047AB] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0047AB] mr-1.5 sm:mr-2"></span>
              {t("hero.badge")}
            </div>

            {/* Título principal con banderas */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#234974] mb-4 sm:mb-6 leading-tight">
              {t("hero.title")}
              <span className="text-[#0047AB] ml-2 whitespace-nowrap">🇺🇸✈️🇸🇻</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg md:text-xl text-[#234974]/80 max-w-xl mb-6 sm:mb-8">
              {t("hero.subtitle")}
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Botón principal - Solicitar envío */}
              <Button
                onClick={scrollToContact}
                className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-6 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all hover:shadow-lg hover:translate-y-[-2px] flex items-center justify-center gap-2"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              {/* Botón secundario - Conocer más */}
              <Button
                onClick={scrollToMission}
                variant="outline"
                className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81]/10 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-6 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                {t("hero.secondary_cta")}
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Animación de ruta de envío */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 sm:mt-12 flex items-center"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 text-[#234974]/70 text-xs sm:text-sm">
                {/* Origen - USA */}
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0047AB]/10">
                  <span className="font-bold text-[#0047AB] text-xs sm:text-sm">US</span>
                </div>

                {/* Línea animada entre origen y destino */}
                <div className="relative w-16 sm:w-24 h-[2px] bg-[#234974]/20 overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-4 sm:w-6 h-full bg-[#0047AB]"
                  />
                </div>

                {/* Destino - El Salvador */}
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#D93025]/10">
                  <span className="font-bold text-[#D93025] text-xs sm:text-sm">SV</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contenido derecho - Ilustración */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end mt-4 sm:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <Image
                src="/images/delivery-illustration.png"
                alt="Delivery Illustration"
                width={500}
                height={500}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
