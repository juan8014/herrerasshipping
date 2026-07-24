/**
 * Página de Mis Envíos - Próximamente
 *
 * Esta página muestra un mensaje de "Próximamente" para la funcionalidad
 * de seguimiento de envíos que se implementará en el futuro.
 */
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"

export default function MyShipmentsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navegación principal */}
      <Header />

      {/* Contenido principal */}
      <ComingSoon />

      {/* Pie de página */}
      <Footer />
    </main>
  )
}
