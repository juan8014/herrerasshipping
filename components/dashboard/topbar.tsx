import { LogOut } from "lucide-react"
import { logout } from "@/app/login/actions"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export function Topbar({ title, adminEmail }: { title: string; adminEmail: string }) {
  const initial = (adminEmail.trim()[0] ?? "A").toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#7BB5E6]/20 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <MobileNav />
        <h1 className="truncate text-base font-semibold text-[#234974] sm:text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-[#234974]">Administrador</p>
          <p className="text-xs text-[#234974]/60">{adminEmail}</p>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F4C81] text-sm font-semibold text-white"
          aria-hidden="true"
        >
          {initial}
        </div>
        <form action={logout}>
          <button
            type="submit"
            aria-label="Cerrar sesión"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#234974]/70 transition-colors hover:bg-[#D93025]/10 hover:text-[#D93025]"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </header>
  )
}
