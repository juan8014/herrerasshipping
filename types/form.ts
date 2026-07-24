/**
 * Tipos relacionados con formularios
 *
 * Este archivo define interfaces y tipos utilizados en los formularios
 * de la aplicación para mejorar la seguridad de tipos.
 */

/**
 * Interfaz que define la estructura de datos del formulario de contacto
 */
export interface FormData {
  name: string
  phone: string
  email: string
  packageSize: string
  message: string
}

/**
 * Interfaz que define la estructura de errores del formulario
 */
export interface FormErrors {
  name?: string
  phone?: string
  email?: string
  message?: string
}
