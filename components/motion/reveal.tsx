"use client"

/**
 * Scroll-reveal primitives for the landing (GSAP ScrollTrigger).
 *
 * Reveal        — fades + lifts a single block when it enters the viewport.
 * StaggerReveal — same, cascaded across its direct children (grids, card rows).
 *
 * Both reveal ONCE and stay visible, and both respect prefers-reduced-motion.
 *
 * IMPORTANT: after mount the hero video, fonts and decorative bands change the
 * page height, which leaves triggers for lower sections mis-positioned (they can
 * stay hidden because their start point is never reached). We call
 * ScrollTrigger.refresh() on load and shortly after mount to recalc positions.
 */

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function scheduleRefresh(): () => void {
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener("load", refresh)
  const id = window.setTimeout(refresh, 300)
  return () => {
    window.removeEventListener("load", refresh)
    window.clearTimeout(id)
  }
}

export function Reveal({
  children,
  className,
  y = 20,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          opacity: 0,
          y,
          duration: 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        })
      })
      const cleanupRefresh = scheduleRefresh()
      return () => {
        cleanupRefresh()
        mm.revert()
      }
    },
    { scope: ref, dependencies: [y, delay] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function StaggerReveal({
  children,
  className,
  y = 24,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(Array.from(el.children), {
          opacity: 0,
          y,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        })
      })
      const cleanupRefresh = scheduleRefresh()
      return () => {
        cleanupRefresh()
        mm.revert()
      }
    },
    { scope: ref, dependencies: [y] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
