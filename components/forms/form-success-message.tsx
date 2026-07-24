/**
 * Componente FormSuccessMessage - Mensaje de éxito del formulario
 *
 * Este componente muestra un mensaje de éxito animado después de enviar un formulario,
 * con logo, icono de confirmación y botón para reiniciar.
 */
"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FormSuccessMessageProps {
  onReset: () => void
  title?: string
  message?: string
  buttonText?: string
}

/**
 * Componente para mostrar un mensaje de éxito después de enviar un formulario
 * @param props - Propiedades del componente
 * @returns Componente de mensaje de éxito
 */
export function FormSuccessMessage({
  onReset,
  title = "¡Gracias por contactarnos!",
  message = "Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.",
  buttonText = "Enviar otro mensaje",
}: FormSuccessMessageProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full py-8 sm:py-10 md:py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Logo con efecto de brillo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-4 sm:mb-6 relative"
      >
        <Image
          src="/images/logo.png"
          alt="Herrera's Shipping Logo"
          width={120}
          height={55}
          className="h-auto w-24 sm:w-28 md:w-32"
        />
        <motion.div
          className="absolute -inset-2 sm:-inset-3 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(11,99,188,0.3) 0%, rgba(125,185,232,0) 70%)",
          }}
        />
      </motion.div>

      {/* Icono de confirmación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 sm:mb-6"
      >
        <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-green-600" />
      </motion.div>

      {/* Título del mensaje */}
      <motion.h3
        className="text-xl sm:text-2xl md:text-2xl font-bold text-[#234974] mb-3 sm:mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {title}
      </motion.h3>

      {/* Texto del mensaje */}
      <motion.p
        className="text-sm sm:text-base text-[#234974]/70 text-center mb-6 sm:mb-8 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {message}
      </motion.p>

      {/* Botón para reiniciar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button onClick={onReset} className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-sm sm:text-base">
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  )
}
