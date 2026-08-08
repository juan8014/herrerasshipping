"use client"

/**
 * TravelingPackage — decorative band: a dashed US→SV flight route with a package
 * that glides left→right as the band scrolls through the viewport (GSAP scrub).
 * Purely decorative (aria-hidden). Static under prefers-reduced-motion.
 */

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Package } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function TravelingPackage() {
  const root = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = root.current
      const track = trackRef.current
      const icon = iconRef.current
      if (!section || !track || !icon) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          icon,
          { x: 0 },
          {
            x: () => track.offsetWidth - icon.offsetWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative overflow-hidden bg-gradient-to-r from-white via-[#7BB5E6]/5 to-white py-10 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-8">
        <div ref={trackRef} className="relative h-9">
          {/* Dashed route */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#7BB5E6]/50" />

          {/* Origin (US) */}
          <span className="absolute left-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#0047AB]/10 text-[10px] font-bold text-[#0047AB]">
            US
          </span>
          {/* Destination (SV) */}
          <span className="absolute right-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#D93025]/10 text-[10px] font-bold text-[#D93025]">
            SV
          </span>

          {/* Traveling package */}
          <div ref={iconRef} className="absolute left-0 top-0 z-20">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81] text-white shadow-lg shadow-[#0F4C81]/30">
              <Package className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
