"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users, Tag, Globe, Truck, Plane, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clientes", icon: Users },
  { href: "/dashboard/shipments", label: "Envíos", icon: Package },
  { href: "/dashboard/transit", label: "Tránsito", icon: Plane },
  { href: "/dashboard/deliveries", label: "Entregas SV", icon: Truck },
  { href: "/dashboard/us-deliveries", label: "Entregas USA", icon: Home },
  { href: "/dashboard/rates", label: "Tarifas", icon: Tag },
]

/** Shared dashboard navigation, used by the desktop sidebar and the mobile drawer. */
export function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 flex-col">
      <nav className="flex-1 space-y-1 p-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-[#0F4C81] text-white" : "text-[#234974] hover:bg-[#7BB5E6]/10",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[#7BB5E6]/20 p-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#234974]/70 transition-colors hover:bg-[#7BB5E6]/10"
        >
          <Globe className="h-5 w-5" aria-hidden="true" />
          Ver sitio público
        </Link>
      </div>
    </div>
  )
}
