/**
 * Componente FormStepIndicator - Indicador de pasos de formulario
 *
 * Este componente muestra el progreso actual en un formulario multi-paso,
 * con una barra de progreso y etiquetas para cada paso.
 */
interface FormStepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
}

/**
 * Componente para mostrar el progreso en formularios multi-paso
 * @param props - Propiedades del componente
 * @returns Componente indicador de pasos
 */
export function FormStepIndicator({
  currentStep,
  totalSteps,
  stepLabels = ["Información personal", "Detalles del envío", "Mensaje"],
}: FormStepIndicatorProps) {
  return (
    <div className="mb-5 sm:mb-6 md:mb-8">
      {/* Información textual del paso actual */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-[#234974]">
          Paso {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-xs sm:text-sm text-[#234974]/60">
          {stepLabels[currentStep] || `Paso ${currentStep + 1}`}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-1.5 sm:h-2 bg-[#7BB5E6]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0F4C81] transition-all duration-300 rounded-full"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
