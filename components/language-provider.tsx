/**
 * Componente LanguageProvider - Proveedor de idiomas
 *
 * Este componente proporciona un contexto para gestionar el idioma de la aplicación,
 * permitiendo cambiar entre español e inglés y acceder a las traducciones.
 */
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations"

// Tipos para el sistema de idiomas
type Language = "es" | "en"
type TranslationKey = keyof typeof translations.es

// Interfaz para el contexto de idioma
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

// Creación del contexto con un valor por defecto para evitar el error de undefined
const defaultContextValue: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: (key) => key as string,
}

// Creación del contexto
const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

/**
 * Proveedor de idiomas que envuelve la aplicación
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Estado para almacenar el idioma actual
  const [language, setLanguage] = useState<Language>("es")
  // Estado para controlar si el componente está montado
  const [mounted, setMounted] = useState(false)

  // Efecto para cargar el idioma guardado en localStorage al iniciar
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Efecto para guardar el idioma en localStorage cuando cambia
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Función para obtener una traducción por su clave
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

/**
 * Hook personalizado para acceder al contexto de idioma
 * @returns Objeto con el idioma actual, función para cambiarlo y función para traducir
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
