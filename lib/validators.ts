/**
 * Funciones de validación para formularios
 *
 * Este archivo contiene funciones reutilizables para validar diferentes
 * tipos de datos en formularios, como correos electrónicos y teléfonos.
 */

/**
 * Valida un correo electrónico
 * @param email Correo electrónico a validar
 * @returns true si el correo es válido, false en caso contrario
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida un número de teléfono
 * @param phone Número de teléfono a validar
 * @returns true si el teléfono es válido, false en caso contrario
 */
export const validatePhone = (phone: string): boolean => {
  // Acepta formatos como: +1 (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^(\+\d{1,3}\s?)?($$\d{1,4}$$\s?)?[\d\-\s]{7,15}$/
  return phoneRegex.test(phone)
}

/**
 * Valida un nombre
 * @param name Nombre a validar
 * @returns true si el nombre es válido, false en caso contrario
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}
