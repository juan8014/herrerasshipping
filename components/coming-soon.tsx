/**
 * Componente ComingSoon - Página de próximamente
 *
 * Este componente muestra un mensaje de "Próximamente" para funcionalidades
 * que estarán disponibles en el futuro, como el seguimiento de envíos.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ComingSoon() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()

  return (
    <section className="flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#7BB5E6]/10 to-white relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-[#7BB5E6]/20 text-center"
        >
          {/* Icono animado */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 1, times: [0, 0.5, 1] }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0047AB]/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-[#0047AB]" />
          </motion.div>

          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Herrera's Shipping Logo"
              width={180}
              height={60}
              className="h-auto w-36 sm:w-44 mx-auto"
            />
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#234974] mb-4">{t("coming_soon.title")}</h1>

          {/* Descripción */}
          <p className="text-lg sm:text-xl text-[#234974]/70 mb-6 max-w-2xl mx-auto">{t("coming_soon.tracking")}</p>

          {/* Ilustración de paquete */}
          <motion.div
            className="my-8 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
              <Package className="w-full h-full text-[#0047AB]/80" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0, 71, 171, 0)",
                    "0 0 0 10px rgba(0, 71, 171, 0.1)",
                    "0 0 0 0 rgba(0, 71, 171, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </motion.div>

          {/* Mensaje de login */}
          <p className="text-base sm:text-lg text-[#234974]/70 mb-8">{t("coming_soon.login")}</p>

          {/* Botón para volver */}
          <Button asChild className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white px-6 py-2 rounded-full">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("coming_soon.back")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
