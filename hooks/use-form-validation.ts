/**
 * Hook personalizado para validación de formularios
 *
 * Este hook gestiona el estado del formulario, la validación de campos
 * y los mensajes de error para formularios.
 */
"use client"

import type React from "react"

import { useState } from "react"
import { validateEmail, validatePhone, validateName } from "@/lib/validators"
import type { FormData, FormErrors } from "@/types/form"

interface UseFormValidationProps {
  initialData: FormData
}

/**
 * Hook para gestionar la validación de formularios
 * @param initialData - Datos iniciales del formulario
 * @returns Objeto con estado del formulario, errores y funciones de manejo
 */
export function useFormValidation({ initialData }: UseFormValidationProps) {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<FormData>(initialData)
  // Estado para los errores de validación
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  /**
   * Maneja cambios en los campos del formulario
   * @param e - Evento de cambio
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a escribir de nuevo
    if (Object.keys(formErrors).includes(name)) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  /**
   * Maneja cambios en campos de tipo radio
   * @param name - Nombre del campo
   * @param value - Valor seleccionado
   */
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Valida un paso específico del formulario
   * @param step - Número del paso a validar
   * @returns true si el paso es válido, false en caso contrario
   */
  const validateStep = (step: number): boolean => {
    if (step === 0) {
      let isValid = true
      const newErrors: FormErrors = {}

      // Validar nombre
      if (!validateName(formData.name)) {
        newErrors.name = "Por favor, ingresa un nombre válido"
        isValid = false
      }

      // Validar teléfono
      if (formData.phone && !validatePhone(formData.phone)) {
        newErrors.phone = "Por favor, ingresa un número de teléfono válido"
        isValid = false
      }

      // Validar email (solo si se proporciona, ya que podría ser opcional)
      if (formData.email && !validateEmail(formData.email)) {
        newErrors.email = "Por favor, ingresa un correo electrónico válido"
        isValid = false
      }

      setFormErrors(newErrors)
      return isValid
    }

    if (step === 2) {
      let isValid = true
      const newErrors: FormErrors = {}

      // Validar mensaje
      if (!formData.message.trim()) {
        newErrors.message = "Por favor, ingresa un mensaje"
        isValid = false
      }

      setFormErrors(newErrors)
      return isValid
    }

    return true
  }

  /**
   * Valida todo el formulario
   * @returns true si todo el formulario es válido, false en caso contrario
   */
  const validateForm = (): boolean => {
    // Validar todos los pasos
    const step0Valid = validateStep(0)
    const step2Valid = validateStep(2)

    return step0Valid && step2Valid
  }

  return {
    formData,
    formErrors,
    handleChange,
    handleRadioChange,
    validateStep,
    validateForm,
    setFormData,
  }
}
