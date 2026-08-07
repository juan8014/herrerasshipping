"use client"

/**
 * StaggerIn - GSAP entrance stagger for its direct children (mount-time).
 *
 * The dashboard has no framer-motion, so GSAP owns its motion here (consistent
 * with the app's split: framer-motion on the landing, GSAP elsewhere). Respects
 * prefers-reduced-motion via gsap.matchMedia; clears props after so layout is
 * untouched once the animation ends.
 */

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export function StaggerIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(Array.from(el.children), {
          opacity: 0,
          y: 16,
          scale: 0.96,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.4)",
          clearProps: "all",
        })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
