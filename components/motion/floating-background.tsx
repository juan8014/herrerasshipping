"use client"

/**
 * FloatingBackground — fondo decorativo animado para el hero, en marca Herrera's.
 * Iconos de logística (aviones, paquetes, pines, globos) flotando en loop con GSAP.
 * Aviones cruzan de izquierda a derecha; paquetes flotan y rotan; pines pulsan.
 * Decorativo (aria-hidden) y estático bajo prefers-reduced-motion.
 */

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Plane, Package, MapPin, Globe } from "lucide-react"

gsap.registerPlugin(useGSAP)

type Deco = { top: string; left: string; size: number; color: string; opacity: string }

const PLANES: Deco[] = [
  { top: "16%", left: "-8%", size: 72, color: "text-[#0F4C81]", opacity: "opacity-20" },
  { top: "44%", left: "-12%", size: 56, color: "text-[#5B9BD5]", opacity: "opacity-20" },
  { top: "70%", left: "-10%", size: 88, color: "text-[#0047AB]", opacity: "opacity-15" },
]
const PACKAGES: Deco[] = [
  { top: "28%", left: "80%", size: 64, color: "text-[#0F4C81]", opacity: "opacity-20" },
  { top: "62%", left: "14%", size: 50, color: "text-[#5B9BD5]", opacity: "opacity-20" },
  { top: "80%", left: "62%", size: 72, color: "text-[#0047AB]", opacity: "opacity-15" },
]
const PINS: Deco[] = [
  { top: "24%", left: "88%", size: 46, color: "text-[#D93025]", opacity: "opacity-20" },
  { top: "52%", left: "42%", size: 40, color: "text-[#0F4C81]", opacity: "opacity-15" },
  { top: "74%", left: "84%", size: 56, color: "text-[#5B9BD5]", opacity: "opacity-20" },
]
const GLOBES: Deco[] = [
  { top: "14%", left: "46%", size: 92, color: "text-[#7BB5E6]", opacity: "opacity-15" },
  { top: "86%", left: "8%", size: 70, color: "text-[#7BB5E6]", opacity: "opacity-10" },
]

export function FloatingBackground() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".fb-plane").forEach((el, i) => {
          gsap.to(el, {
            x: "120vw",
            y: `+=${gsap.utils.random(-24, 24)}`,
            duration: gsap.utils.random(16, 24),
            ease: "none",
            repeat: -1,
            delay: i * 3,
          })
        })
        gsap.utils.toArray<HTMLElement>(".fb-package").forEach((el, i) => {
          gsap.to(el, {
            y: -30,
            rotation: 12,
            duration: gsap.utils.random(3.5, 5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5,
          })
        })
        gsap.utils.toArray<HTMLElement>(".fb-pin").forEach((el, i) => {
          gsap.to(el, {
            scale: 1.25,
            opacity: 0.5,
            duration: gsap.utils.random(1.6, 2.4),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.4,
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-white via-[#7BB5E6]/15 to-white"
    >
      {PLANES.map((p, i) => (
        <div key={`pl-${i}`} className={`fb-plane absolute ${p.opacity}`} style={{ top: p.top, left: p.left }}>
          <Plane size={p.size} className={`${p.color} -rotate-12`} />
        </div>
      ))}
      {PACKAGES.map((p, i) => (
        <div key={`pk-${i}`} className={`fb-package absolute ${p.opacity}`} style={{ top: p.top, left: p.left }}>
          <Package size={p.size} className={p.color} />
        </div>
      ))}
      {PINS.map((p, i) => (
        <div key={`pn-${i}`} className={`fb-pin absolute ${p.opacity}`} style={{ top: p.top, left: p.left }}>
          <MapPin size={p.size} className={p.color} />
        </div>
      ))}
      {GLOBES.map((p, i) => (
        <div key={`gl-${i}`} className={`absolute ${p.opacity}`} style={{ top: p.top, left: p.left }}>
          <Globe size={p.size} className={p.color} />
        </div>
      ))}
    </div>
  )
}
