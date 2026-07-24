/**
 * Componente ContactInfo - Información de contacto
 *
 * Este componente muestra la información de contacto de la empresa
 * con iconos y animaciones en un diseño atractivo.
 */
"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Plane } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"
import { useLanguage } from "@/components/language-provider"

export function ContactInfo() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()

  // Elementos de información de contacto
  const contactItems = [
    {
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.address"),
      content: t("contact.physical_address"),
    },
    {
      icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.phone_label"),
      content: CONTACT_INFO.phone,
    },
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.email"),
      content: CONTACT_INFO.email,
    },
  ]

  return (
    <div className="bg-gradient-to-br from-[#0F4C81] to-[#234974] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl h-full relative overflow-hidden flex flex-col">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-pattern opacity-10" />

      {/* Avión animado */}
      <motion.div
        className="absolute right-4 top-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Plane className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/30 transform -rotate-45" />
      </motion.div>

      <div className="relative z-10 flex-1">
        {/* Título y descripción */}
        <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-1 sm:mb-2">{t("contact.info.title")}</h3>
        <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">{t("contact.info.desc")}</p>

        {/* Lista de información de contacto */}
        <div className="space-y-3 sm:space-y-4">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 sm:gap-4">
              {/* Icono */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              {/* Información */}
              <div>
                <h4 className="font-medium text-base sm:text-lg">{item.title}</h4>
                <p className="text-white/80 text-sm sm:text-base">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
