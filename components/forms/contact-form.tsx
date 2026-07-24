/**
 * Componente ContactForm - Formulario de contacto
 *
 * Este componente muestra un formulario de contacto multi-paso con validación,
 * que permite a los usuarios enviar mensajes a la empresa.
 */
"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Mail, Package, ChevronRight, ChevronLeft, User } from "lucide-react"
import { FormField } from "@/components/forms/form-field"
import { FormStepIndicator } from "@/components/forms/form-step-indicator"
import { PackageSizeSelector } from "@/components/forms/package-size-selector"
import { FormSuccessMessage } from "@/components/forms/form-success-message"
import { useFormValidation } from "@/hooks/use-form-validation"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { PACKAGE_SIZES, CONTACT_INFO } from "@/lib/constants"
import type { FormData } from "@/types/form"

// Constantes para el formulario
const TOTAL_STEPS = 3
const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  email: "",
  packageSize: "medium",
  message: "",
}

export function ContactForm() {
  // Estados para controlar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Hook personalizado para validación del formulario
  const { formData, formErrors, handleChange, handleRadioChange, validateStep, validateForm, setFormData } =
    useFormValidation({
      initialData: INITIAL_FORM_DATA,
    })

  // Hook personalizado para gestionar los pasos del formulario
  const { currentStep, goToNextStep, goToPrevStep, isFirstStep, isLastStep } = useMultiStepForm({
    totalSteps: TOTAL_STEPS,
    initialStep: 0,
  })

  // Función para avanzar al siguiente paso con validación
  const nextStep = () => {
    if (validateStep(currentStep)) {
      goToNextStep()
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación final antes del envío
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulación de envío del formulario
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Función para reiniciar el formulario
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setIsSubmitted(false)
  }

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, "_blank")
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 h-full">
      {isSubmitted ? (
        // Mensaje de éxito después de enviar el formulario
        <FormSuccessMessage onReset={resetForm} />
      ) : (
        // Formulario de contacto
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Indicador de progreso */}
          <FormStepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          {/* Paso 1: Información personal */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Campo de nombre */}
              <FormField
                id="name"
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                required
                placeholder="Tu nombre completo"
                icon={<User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              />

              {/* Campo de teléfono */}
              <FormField
                id="phone"
                name="phone"
                label="Teléfono"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
                required
                placeholder="Ej: +1 (832) 561-3488"
                icon={<Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              />

              {/* Campo de correo electrónico */}
              <FormField
                id="email"
                name="email"
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                placeholder="ejemplo@correo.com"
                icon={<Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              />
            </motion.div>
          )}

          {/* Paso 2: Detalles del paquete */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Selector de tamaño de paquete */}
              <PackageSizeSelector
                selectedSize={formData.packageSize}
                onSelect={(size) => handleRadioChange("packageSize", size)}
              />
            </motion.div>
          )}

          {/* Paso 3: Mensaje */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Campo de mensaje */}
              <FormField
                id="message"
                name="message"
                label="Mensaje"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                error={formErrors.message}
                required
                placeholder="Detalles adicionales sobre tu envío..."
                rows={4}
              />

              {/* Resumen de la solicitud */}
              <div className="pt-2 sm:pt-4">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-2 sm:mr-3">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F4C81]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#234974] text-sm sm:text-base">Resumen de tu solicitud</h4>
                    <p className="text-xs sm:text-sm text-[#234974]/70">Revisa los detalles antes de enviar</p>
                  </div>
                </div>

                {/* Detalles del resumen */}
                <div className="bg-[#F8FAFC] rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#234974]/70">Tamaño del paquete:</span>
                    <span className="font-medium text-[#234974]">
                      {PACKAGE_SIZES.find((s) => s.value === formData.packageSize)?.label || formData.packageSize}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between pt-2 sm:pt-4">
            {!isFirstStep ? (
              <Button
                type="button"
                variant="outline"
                onClick={goToPrevStep}
                className="border-[#0F4C81] text-[#0F4C81] text-xs sm:text-sm h-8 sm:h-10"
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Anterior
              </Button>
            ) : (
              <div></div>
            )}

            {!isLastStep ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs sm:text-sm h-8 sm:h-10"
              >
                Siguiente
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs sm:text-sm h-8 sm:h-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar mensaje"
                )}
              </Button>
            )}
          </div>

          {/* WhatsApp Alternative */}
          <div className="pt-4 sm:pt-5 md:pt-6 border-t border-[#7BB5E6]/20 mt-4 sm:mt-5 md:mt-6">
            <Button
              type="button"
              onClick={openWhatsApp}
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full py-1.5 sm:py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
            >
              <MessageSquare className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              Contáctanos por WhatsApp
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
