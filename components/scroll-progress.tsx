"use client"

/**
 * ScrollProgress - Top-of-page reading progress bar (GSAP ScrollTrigger)
 *
 * A thin fixed bar that fills from 0 to 100% as the document is scrolled. Pure
 * GSAP ScrollTrigger driven by document scroll progress; it touches no
 * framer-motion node. Hidden from assistive tech and disabled under
 * reduced-motion (the bar simply stays empty).
 */

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = barRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      )
    })

    return () => mm.revert()
  })

  return (
    <div aria-hidden="true" className="fixed left-0 top-0 z-[100] h-1 w-full">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#0F4C81] via-[#5B9BD5] to-[#D93025]"
      />
    </div>
  )
}
