"use client"

/**
 * Parallax - Scroll-linked parallax wrapper (GSAP ScrollTrigger)
 *
 * Applies a subtle, scrub-linked vertical drift to purely decorative elements
 * (e.g. background blobs). Scoped intentionally to nodes that are NOT animated
 * by framer-motion, so the two systems never fight over the same element:
 * framer-motion owns content reveals, GSAP owns scroll-scrubbed depth.
 *
 * Respects `prefers-reduced-motion` via gsap.matchMedia: when the user opts out,
 * no motion is applied and the element renders statically.
 */

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ParallaxProps {
  /** Optional content; usually empty for decorative layers. */
  children?: ReactNode
  /** Utility classes for positioning/appearance (same as the div it replaces). */
  className?: string
  /**
   * Drift as a fraction of the element's height. The layer travels from
   * `-speed` to `+speed` (symmetric around its resting position) across the
   * scroll range. Keep it small (0.1-0.4) for depth without distraction.
   */
  speed?: number
}

export function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [speed] },
  )

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  )
}
