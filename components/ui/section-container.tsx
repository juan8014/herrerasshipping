/**
 * Componente SectionContainer - Contenedor de sección
 *
 * Este componente reutilizable proporciona un contenedor consistente para las secciones
 * con fondo, espaciado y detección de visibilidad.
 */
"use client"

import type React from "react"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  bgClassName?: string
  withBackground?: boolean
}

/**
 * Componente contenedor para secciones con estructura y estilos consistentes
 * @param props - Propiedades del componente
 * @returns Componente contenedor de sección
 */
export function SectionContainer({
  id,
  className,
  children,
  bgClassName,
  withBackground = true,
}: SectionContainerProps) {
  // Referencia para detectar cuando la sección es visible
  const sectionRef = useRef<HTMLElement>(null)
  // Hook para detectar cuando la sección entra en el viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id={id} ref={sectionRef} className={cn("py-16 sm:py-20 md:py-24 relative overflow-hidden", className)}>
      {/* Elementos de fondo decorativos (opcionales) */}
      {withBackground && (
        <div className={cn("absolute inset-0 overflow-hidden", bgClassName)}>
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
        </div>
      )}

      {/* Contenido de la sección */}
      <div className="container mx-auto px-3 sm:px-4 relative z-10">{children}</div>
    </section>
  )
}
