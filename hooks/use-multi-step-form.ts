/**
 * Hook personalizado para formularios multi-paso
 *
 * Este hook gestiona la navegación entre diferentes pasos de un formulario,
 * controlando el paso actual y proporcionando funciones para avanzar y retroceder.
 */
"use client"

import { useState } from "react"

interface UseMultiStepFormProps {
  totalSteps: number
  initialStep?: number
  onStepChange?: (step: number) => void
}

/**
 * Hook para gestionar formularios de múltiples pasos
 * @param totalSteps - Número total de pasos del formulario
 * @param initialStep - Paso inicial (por defecto 0)
 * @param onStepChange - Callback opcional que se ejecuta al cambiar de paso
 * @returns Objeto con el paso actual y funciones para navegar entre pasos
 */
export function useMultiStepForm({ totalSteps, initialStep = 0, onStepChange }: UseMultiStepFormProps) {
  // Estado para el paso actual
  const [currentStep, setCurrentStep] = useState(initialStep)

  /**
   * Avanza al siguiente paso
   * @returns El nuevo paso actual
   */
  const goToNextStep = () => {
    const nextStep = Math.min(currentStep + 1, totalSteps - 1)
    setCurrentStep(nextStep)
    onStepChange?.(nextStep)
    return nextStep
  }

  /**
   * Retrocede al paso anterior
   * @returns El nuevo paso actual
   */
  const goToPrevStep = () => {
    const prevStep = Math.max(currentStep - 1, 0)
    setCurrentStep(prevStep)
    onStepChange?.(prevStep)
    return prevStep
  }

  /**
   * Va a un paso específico
   * @param step - Paso al que se quiere ir
   * @returns El nuevo paso actual (validado dentro de los límites)
   */
  const goToStep = (step: number) => {
    const validStep = Math.max(0, Math.min(step, totalSteps - 1))
    setCurrentStep(validStep)
    onStepChange?.(validStep)
    return validStep
  }

  return {
    currentStep,
    goToNextStep,
    goToPrevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    totalSteps,
  }
}
