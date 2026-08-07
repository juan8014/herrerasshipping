import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getAuthContext } from "@/lib/auth"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"

export const metadata = {
  title: "Panel | Herrera's Shipping",
  robots: "noindex, nofollow",
}

// Admin-gated and data-backed: always rendered per request, never prerendered.
export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Admin-only. Middleware already blocked anonymous users; this enforces the role.
  const { user, role } = await getAuthContext()
  if (!user || role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FB]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Panel de administración" adminEmail={user.email ?? ""} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
