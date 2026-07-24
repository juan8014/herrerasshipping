/**
 * Componente ContactSection - Sección de contacto
 *
 * Este componente combina el formulario de contacto y la información de contacto
 * en una sección completa con animaciones y diseño responsivo.
 */
"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeader } from "@/components/ui/section-header"
import { ContactForm } from "@/components/forms/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"
import { useLanguage } from "@/components/language-provider"

export function ContactSection() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()

  return (
    <SectionContainer id="contact" className="bg-gradient-to-b from-[#7BB5E6]/10 to-white">
      {/* Encabezado de la sección */}
      <SectionHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {/* Formulario de contacto interactivo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>

        {/* Información de contacto */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactInfo />
        </motion.div>
      </div>
    </SectionContainer>
  )
}
