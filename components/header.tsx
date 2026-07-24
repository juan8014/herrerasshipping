/**
 * Componente Header - Barra de navegación principal
 *
 * Este componente muestra la barra de navegación superior con el logo,
 * enlaces de navegación, selector de idioma y botón de contacto.
 * Incluye versiones para escritorio y móvil con menú desplegable.
 */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  // Estado para controlar si el usuario ha hecho scroll
  const [isScrolled, setIsScrolled] = useState(false)
  // Estado para controlar si el menú móvil está abierto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Hook para acceder a las traducciones y cambiar el idioma
  const { language, setLanguage, t } = useLanguage()

  // Efecto para detectar el scroll y cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para alternar entre idiomas
  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  // Elementos de navegación con sus enlaces y etiquetas
  const navItems = [
    { href: "#home", label: t("nav.home") },
    { href: "#mission", label: t("nav.mission") },
    { href: "#services", label: t("nav.services") },
    { href: "#contact", label: t("nav.contact") },
    { href: "/my-shipments", label: t("nav.my_shipments") },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Cambia el estilo según si el usuario ha hecho scroll
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3",
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
        {/* Logo con efecto hover */}
        <Link href="/" className="flex items-center group">
          <div className="transition-transform duration-300 ease-in-out transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Herrera's Shipping Logo"
              width={150}
              height={150}
              className="h-10 sm:h-12 md:h-14 w-auto transition-all duration-300"
            />
          </div>
        </Link>

        {/* Navegación para escritorio - oculta en móvil */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#234974] hover:text-[#0047AB] font-medium transition-colors relative group text-sm xl:text-base"
            >
              {item.label}
              {/* Línea animada debajo del enlace en hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0047AB] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Acciones para escritorio - selector de idioma y botón de contacto */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Selector de idioma desplegable */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-[#234974] hover:text-[#0047AB] hover:bg-[#7BB5E6]/10"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "es" ? "Español" : "English"}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("es")}>
                <span className={language === "es" ? "font-bold" : ""}>Español</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <span className={language === "en" ? "font-bold" : ""}>English</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botón de contacto */}
          <Button asChild className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white rounded-full px-4 xl:px-6 text-sm">
            <Link href="#contact">{t("hero.cta")}</Link>
          </Button>
        </div>

        {/* Botones para móvil - selector de idioma y menú hamburguesa */}
        <div className="flex items-center lg:hidden">
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="mr-1 flex items-center gap-1 text-[#234974] p-1 sm:p-2"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">{language === "es" ? "ES" : "EN"}</span>
          </Button>
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="ghost"
            size="sm"
            className="text-[#234974] p-1 sm:p-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-3 px-4 flex flex-col space-y-3 animate-in slide-in-from-top">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#234974] hover:text-[#0047AB] font-medium transition-colors py-2 border-b border-gray-100 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white w-full mt-2">
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              {t("hero.cta")}
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}
