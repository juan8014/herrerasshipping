import Image from "next/image"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

/** Fixed sidebar for large screens. On mobile the nav lives in MobileNav (drawer). */
export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[#7BB5E6]/20 bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-[#7BB5E6]/20 px-6">
        <Image
          src="/images/logo.png"
          alt="Herrera's Shipping"
          width={140}
          height={40}
          className="h-9 w-auto"
        />
      </div>
      <DashboardNav />
    </aside>
  )
}
