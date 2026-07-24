"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

/**
 * Proveedor de tema que permite cambiar entre modo claro y oscuro
 * @param props - Propiedades del proveedor de tema
 * @returns Componente proveedor de tema
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
