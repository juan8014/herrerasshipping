"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

export function ContactForm() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)

    // Open WhatsApp with the message
    const whatsappMessage = `Hola, soy ${formData.name}. ${formData.message}`
    const whatsappUrl = `https://wa.me/8325613488?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/8325613488", "_blank")
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#7BB5E6]/10 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#234974] mb-4">{t("contact.title")}</h2>
          <div className="w-24 h-1 bg-[#0047AB] mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-[#7BB5E6]/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#234974] mb-1">
                  {t("contact.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#234974] mb-1">
                  {t("contact.phone")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#234974] mb-1">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="bg-[#0047AB] hover:bg-[#0047AB]/90 text-white py-2 px-6 rounded-lg font-medium transition-all hover:shadow-lg flex-1"
                >
                  {t("contact.submit")}
                </Button>

                <Button
                  type="button"
                  onClick={openWhatsApp}
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white py-2 px-6 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 flex-1"
                >
                  <MessageSquare className="h-5 w-5" />
                  {t("contact.whatsapp")}
                </Button>
              </div>
            </form>
            <div className="mt-8 pt-6 border-t border-[#7BB5E6]/20">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0047AB]/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0047AB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-[#234974]">{t("footer.address")}</h4>
                  <p className="text-[#234974]/80">{t("footer.physical_address")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
