/**
 * Componente ScrollToTop - Botón para volver al inicio
 *
 * Este componente muestra un botón flotante que aparece cuando el usuario
 * hace scroll hacia abajo, permitiéndole volver rápidamente al inicio de la página.
 */
"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ScrollToTop() {
  // Estado para controlar la visibilidad del botón
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para detectar el scroll y mostrar/ocultar el botón
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario ha hecho scroll más de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Agregar el evento de scroll
    window.addEventListener("scroll", toggleVisibility)

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Función para desplazarse al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white shadow-lg flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
