import type { LucideIcon } from "lucide-react"

export function KpiCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  icon: LucideIcon
  accent: string
}) {
  return (
    <div className="rounded-2xl border border-[#7BB5E6]/20 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#234974]/70">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums text-[#234974]">{value}</p>
    </div>
  )
}
