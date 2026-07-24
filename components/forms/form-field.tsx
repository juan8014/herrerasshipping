/**
 * Componente FormField - Campo de formulario
 *
 * Este componente reutilizable proporciona un campo de formulario con etiqueta,
 * validación, mensajes de error e iconos.
 */
"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  icon?: React.ReactNode
  className?: string
  rows?: number
}

/**
 * Componente para campos de formulario con validación y mensajes de error
 * @param props - Propiedades del componente
 * @returns Componente de campo de formulario
 */
export function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  icon,
  className,
  rows,
}: FormFieldProps) {
  // Determinar si es un área de texto o un input normal
  const isTextarea = type === "textarea"

  return (
    <div className={className}>
      {/* Etiqueta del campo */}
      <label htmlFor={id} className="block text-xs sm:text-sm font-medium text-[#234974] mb-1 sm:mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Renderizar textarea o input según el tipo */}
        {isTextarea ? (
          <Textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows || 4}
            required={required}
            placeholder={placeholder}
            className={cn(
              "w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg text-sm sm:text-base",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              icon && "pl-8 sm:pl-10",
            )}
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={cn(
              "w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg text-sm sm:text-base",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              icon && "pl-8 sm:pl-10",
            )}
          />
        )}

        {/* Icono opcional */}
        {icon && (
          <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#0F4C81]/60">{icon}</div>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}
