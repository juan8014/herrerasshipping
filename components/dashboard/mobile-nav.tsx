"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

/** Hamburger + slide-in drawer that holds the dashboard nav on small screens. */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#234974] transition-colors hover:bg-[#7BB5E6]/10 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-64 flex-col p-0">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <SheetDescription className="sr-only">
          Navegación del panel de administración
        </SheetDescription>
        <div className="flex h-16 items-center border-b border-[#7BB5E6]/20 px-6">
          <Image
            src="/images/logo.png"
            alt="Herrera's Shipping"
            width={140}
            height={40}
            className="h-9 w-auto"
          />
        </div>
        <DashboardNav onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
