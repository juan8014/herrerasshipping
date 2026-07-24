/**
 * Página principal de la aplicación Herrera's Shipping
 *
 * Esta página contiene todas las secciones principales del sitio web,
 * organizadas en un orden lógico para presentar la información de la empresa.
 */
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MissionVision } from "@/components/mission-vision"
import { Values } from "@/components/values"
import { Services } from "@/components/services"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navegación principal */}
      <Header />

      {/* Sección de bienvenida */}
      <Hero />

      {/* Sección de misión y visión */}
      <MissionVision />

      {/* Sección de valores corporativos */}
      <Values />

      {/* Sección de servicios ofrecidos */}
      <Services />

      {/* Sección de contacto con formulario */}
      <ContactSection />

      {/* Pie de página con información legal y redes sociales */}
      <Footer />

      {/* Botón para volver al inicio de la página */}
      <ScrollToTop />
    </main>
  )
}
