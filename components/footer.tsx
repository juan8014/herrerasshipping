/**
 * Footer - Pie de página con redes sociales y copyright.
 * Reveal por scroll con GSAP. Los href="#" de redes son placeholders.
 */
"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#0F4C81] py-6 text-white sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <Reveal className="flex flex-col items-center">
          <div className="mb-3 flex gap-3 sm:mb-4 sm:gap-4">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-white/60 sm:text-sm">
            &copy; {currentYear} {t("footer.rights")}.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
