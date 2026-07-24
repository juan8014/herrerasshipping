/**
 * Constantes reutilizables en toda la aplicación
 *
 * Este archivo centraliza valores constantes como colores, tamaños de paquete
 * e información de contacto para facilitar su mantenimiento y reutilización.
 */

// Colores principales de la aplicación
export const COLORS = {
  primary: "#0F4C81",
  primaryHover: "#0F4C81/90",
  secondary: "#234974",
  accent: "#7BB5E6",
  alert: "#D93025",
  whatsapp: "#25D366",
}

// Opciones de tamaño de paquete disponibles
export const PACKAGE_SIZES = [
  {
    value: "small",
    label: "Pequeño",
    dimensions: "Hasta 5 lbs",
  },
  {
    value: "medium",
    label: "Mediano",
    dimensions: "5-15 lbs",
  },
  {
    value: "large",
    label: "Grande",
    dimensions: "15-30 lbs",
  },
]

// Información de contacto de la empresa
export const CONTACT_INFO = {
  address: "6527 portlick dr, Katy TX 77449",
  phone: "+1 (832) 561-3488",
  email: "info@herrerasshipping.com",
  whatsapp: "18325613488",
}
