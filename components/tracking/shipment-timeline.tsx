import { MapPin } from "lucide-react"
import { statusMeta, formatDateTime } from "@/lib/format"

type TimelineEvent = {
  status: string
  note: string | null
  location: string | null
  created_at: string
}

/**
 * Vertical tracking timeline. Server-safe (no client hooks) so it can be used
 * both in the public tracking form and the logged-in client portal.
 */
export function ShipmentTimeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-[#234974]/60">Sin eventos registrados todavía.</p>
  }

  return (
    <ol className="relative space-y-6 border-l-2 border-[#7BB5E6]/20 pl-6">
      {events.map((ev, i) => {
        const meta = statusMeta(ev.status)
        return (
          <li key={i} className="relative">
            <span
              className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white ${meta.dot}`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-[#234974]">{meta.label}</span>
              <span className="text-xs text-[#234974]/50">{formatDateTime(ev.created_at)}</span>
            </div>
            {ev.note ? <p className="text-sm text-[#234974]/70">{ev.note}</p> : null}
            {ev.location ? (
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#234974]/50">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {ev.location}
              </p>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
