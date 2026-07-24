import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"

// Configuración de la fuente Inter con subconjunto latino
const inter = Inter({ subsets: ["latin"] })

// Metadatos de la aplicación para SEO
export const metadata: Metadata = {
  title: "Herrera's Shipping | Envíos de USA a El Salvador Seguros y Rápidos",
  description:
    "Herrera's Shipping conecta familias con envíos seguros desde Estados Unidos hacia El Salvador. Servicio confiable, puntual y cercano.",
  keywords:
    "envíos a El Salvador, shipping USA El Salvador, paquetería El Salvador, envíos económicos, Herrera's Shipping, envío de paquetes salvadoreños USA",
  authors: [{ name: "Herrera's Shipping" }],
  openGraph: {
    title: "Herrera's Shipping - Envíos USA a El Salvador",
    description:
      "Envíos rápidos, seguros y personalizados desde Estados Unidos hacia El Salvador. ¡Un servicio que une familias!",
    images: ["/images/og-image.png"],
  },
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
    generator: 'v0.dev'
}

/**
 * Componente de layout raíz que envuelve toda la aplicación
 * @param children - Componentes hijos a renderizar dentro del layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.herrerasshipping.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {/* Proveedor de temas para modo claro/oscuro */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Proveedor de idiomas para internacionalización */}
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
