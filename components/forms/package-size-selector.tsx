/**
 * Componente PackageSizeSelector - Selector de tamaño de paquete
 *
 * Este componente permite seleccionar el tamaño del paquete entre varias opciones,
 * con iconos y descripciones.
 */
"use client"

import { Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { PACKAGE_SIZES } from "@/lib/constants"

interface PackageSizeSelectorProps {
  selectedSize: string
  onSelect: (size: string) => void
  className?: string
}

/**
 * Componente para seleccionar el tamaño del paquete
 * @param props - Propiedades del componente
 * @returns Componente selector de tamaño de paquete
 */
export function PackageSizeSelector({ selectedSize, onSelect, className }: PackageSizeSelectorProps) {
  return (
    <div className={className}>
      {/* Etiqueta del selector */}
      <label className="block text-xs sm:text-sm font-medium text-[#234974] mb-2 sm:mb-4">Tamaño del paquete</label>

      {/* Grid de opciones de tamaño */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {PACKAGE_SIZES.map((size) => (
          <div
            key={size.value}
            onClick={() => onSelect(size.value)}
            className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all hover:bg-[#7BB5E6]/5 ${
              selectedSize === size.value ? "border-[#0F4C81] bg-[#0F4C81]/5" : "border-[#7BB5E6]/30"
            }`}
          >
            {/* Icono de paquete con tamaño variable */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2">
              <Package
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 text-[#234974]",
                  size.value === "small" && "h-3.5 w-3.5 sm:h-4 sm:w-4",
                  size.value === "large" && "h-5 w-5 sm:h-6 sm:w-6",
                )}
              />
            </div>

            {/* Etiqueta y dimensiones */}
            <span className="font-medium text-[#234974] text-sm sm:text-base">{size.label}</span>
            <span className="text-xs text-[#234974]/60 mt-0.5 sm:mt-1">{size.dimensions}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
