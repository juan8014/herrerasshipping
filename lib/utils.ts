/**
 * Utilidades generales para la aplicación
 *
 * Este archivo contiene funciones de utilidad reutilizables en toda la aplicación,
 * como la función cn para combinar clases de Tailwind CSS.
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind CSS de manera eficiente
 * @param inputs - Clases CSS a combinar
 * @returns Cadena de clases combinada y optimizada
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea una fecha en formato legible
 * @param date - Fecha a formatear
 * @returns Fecha formateada como string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

/**
 * Retrasa la ejecución por un tiempo determinado
 * @param ms - Milisegundos a esperar
 * @returns Promesa que se resuelve después del tiempo especificado
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
