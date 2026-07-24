/**
 * Componente SectionHeader - Encabezado de sección
 *
 * Este componente reutilizable muestra un encabezado de sección con título,
 * subtítulo opcional y un divisor, con animaciones y estilos personalizables.
 */
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  dividerClassName?: string
  showDivider?: boolean
  delay?: number
}

/**
 * Componente para mostrar encabezados de sección consistentes
 * @param props - Propiedades del componente
 * @returns Componente de encabezado de sección
 */
export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName,
  subtitleClassName,
  dividerClassName,
  showDivider = true,
  delay = 0,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={cn("mb-10 sm:mb-12 md:mb-16", centered && "text-center", className)}
    >
      {/* Título de la sección */}
      <h2 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold text-[#234974] mb-3 sm:mb-4", titleClassName)}>
        {title}
      </h2>

      {/* Subtítulo opcional */}
      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg md:text-xl text-[#234974]/70 max-w-2xl",
            centered && "mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Divisor opcional */}
      {showDivider && (
        <div
          className={cn(
            "w-16 sm:w-20 md:w-24 h-1 bg-[#0047AB] rounded-full mt-4",
            centered && "mx-auto",
            dividerClassName,
          )}
        />
      )}
    </motion.div>
  )
}
