/**
 * Componente Footer - Pie de página
 *
 * Este componente muestra el pie de página con iconos de redes sociales
 * y la información de copyright.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  // Hook para acceder a las traducciones
  const { t } = useLanguage()
  // Obtener el año actual para el copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F4C81] text-white py-4 sm:py-6 relative">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col items-center">
          {/* Iconos de redes sociales */}
          <div className="flex space-x-6 sm:space-x-8 mb-3 sm:mb-4">
            {/* Facebook */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            {/* Instagram */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            {/* Twitter */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            {/* LinkedIn */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>

          {/* Texto de copyright */}
          <p className="text-white/50 text-xs sm:text-sm text-center">
            &copy; {currentYear} {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
