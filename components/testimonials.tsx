"use client"

import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: t("testimonials.client1.name"),
      text: t("testimonials.client1.text"),
      image: "/images/testimonial1.png",
      rating: 5,
    },
    {
      name: t("testimonials.client2.name"),
      text: t("testimonials.client2.text"),
      image: "/images/testimonial2.png",
      rating: 5,
    },
    {
      name: t("testimonials.client3.name"),
      text: t("testimonials.client3.text"),
      image: "/images/testimonial3.png",
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#234974] mb-4">{t("testimonials.title")}</h2>
          <p className="text-xl text-[#234974]/70 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 text-[#0047AB]/10 hidden md:block">
              <Quote className="h-24 w-24" />
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#7BB5E6]/20 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#7BB5E6]/30 flex-shrink-0 relative">
                  <Image
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#234974]/80 italic mb-6 text-lg md:text-xl leading-relaxed">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <h3 className="text-2xl font-bold text-[#234974]">{testimonials[activeIndex].name}</h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === activeIndex ? "bg-[#0047AB] w-10" : "bg-[#7BB5E6]/40",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#234974] pointer-events-auto transform -translate-x-1/2 hover:bg-[#0047AB] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#234974] pointer-events-auto transform translate-x-1/2 hover:bg-[#0047AB] hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
