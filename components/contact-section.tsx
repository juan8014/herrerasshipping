"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import {
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  Package,
  Plane,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Form state
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    packageSize: "medium",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing again
    if (name === "phone" || name === "email") {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    // Acepta formatos como: +1 (123) 456-7890, 123-456-7890, 1234567890
    const phoneRegex = /^(\+\d{1,3}\s?)?($$\d{1,4}$$\s?)?[\d\-\s]{7,15}$/
    return phoneRegex.test(phone)
  }

  const validateStep = () => {
    if (formStep === 0) {
      let isValid = true
      const newErrors = { phone: "", email: "" }

      // Validate phone
      if (formData.phone && !validatePhone(formData.phone)) {
        newErrors.phone = "Por favor, ingresa un número de teléfono válido"
        isValid = false
      }

      // Validate email (only if provided, as it might be optional)
      if (formData.email && !validateEmail(formData.email)) {
        newErrors.email = "Por favor, ingresa un correo electrónico válido"
        isValid = false
      }

      setFormErrors(newErrors)
      return isValid
    }
    return true
  }

  const nextStep = () => {
    if (validateStep()) {
      setFormStep((prev) => Math.min(prev + 1, 2))
    }
  }

  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation before submission
    if (!validateStep()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/18325613488", "_blank")
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.address"),
      content: t("contact.physical_address"),
    },
    {
      icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.phone_label"),
      content: "+1 (832) 561-3488",
    },
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#0047AB]" />,
      title: t("contact.email"),
      content: "info@herrerasshipping.com",
    },
  ]

  const packageSizes = [
    {
      value: "small",
      label: "Pequeño",
      dimensions: "Hasta 5 lbs",
    },
    {
      value: "medium",
      label: "Mediano",
      dimensions: "5-15 lbs",
    },
    {
      value: "large",
      label: "Grande",
      dimensions: "15-30 lbs",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#7BB5E6]/10 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#0047AB]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#7BB5E6]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#234974] mb-3 sm:mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#234974]/70 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border border-[#7BB5E6]/20 h-full">
              {isSubmitted ? (
                <AnimatePresence>
                  <motion.div
                    className="flex flex-col items-center justify-center h-full py-8 sm:py-10 md:py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mb-4 sm:mb-6 relative"
                    >
                      <Image
                        src="/images/logo.png"
                        alt="Herrera's Shipping Logo"
                        width={120}
                        height={55}
                        className="h-auto w-24 sm:w-28 md:w-32"
                      />
                      <motion.div
                        className="absolute -inset-2 sm:-inset-3 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.2, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                        style={{
                          background: "radial-gradient(circle, rgba(11,99,188,0.3) 0%, rgba(125,185,232,0) 70%)",
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 sm:mb-6"
                    >
                      <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-green-600" />
                    </motion.div>

                    <motion.h3
                      className="text-xl sm:text-2xl md:text-2xl font-bold text-[#234974] mb-3 sm:mb-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      ¡Gracias por contactarnos!
                    </motion.h3>

                    <motion.p
                      className="text-sm sm:text-base text-[#234974]/70 text-center mb-6 sm:mb-8 px-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-sm sm:text-base"
                      >
                        Enviar otro mensaje
                      </Button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Progress Indicator */}
                  <div className="mb-5 sm:mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-medium text-[#234974]">Paso {formStep + 1} de 3</span>
                      <span className="text-xs sm:text-sm text-[#234974]/60">
                        {formStep === 0 ? "Información personal" : formStep === 1 ? "Detalles del envío" : "Mensaje"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-[#7BB5E6]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0F4C81] transition-all duration-300 rounded-full"
                        style={{ width: `${((formStep + 1) / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 1: Personal Information */}
                  {formStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 sm:space-y-5 md:space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs sm:text-sm font-medium text-[#234974] mb-1 sm:mb-2"
                        >
                          {t("contact.name")}
                        </label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg pl-8 sm:pl-10 text-sm sm:text-base"
                          />
                          <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#0F4C81]/60">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="sm:w-4 sm:h-4"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs sm:text-sm font-medium text-[#234974] mb-1 sm:mb-2"
                        >
                          {t("contact.phone")}
                        </label>
                        <div className="relative">
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className={cn(
                              "w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg pl-8 sm:pl-10 text-sm sm:text-base",
                              formErrors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            )}
                            placeholder="Ej: +1 (832) 561-3488"
                          />
                          <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#0F4C81]/60">
                            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                        {formErrors.phone && (
                          <div className="flex items-center mt-1 text-red-500 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs sm:text-sm font-medium text-[#234974] mb-1 sm:mb-2"
                        >
                          Correo electrónico
                        </label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={cn(
                              "w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg pl-8 sm:pl-10 text-sm sm:text-base",
                              formErrors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            )}
                            placeholder="ejemplo@correo.com"
                          />
                          <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#0F4C81]/60">
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                        {formErrors.email && (
                          <div className="flex items-center mt-1 text-red-500 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.email}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Package Details */}
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 sm:space-y-5 md:space-y-6"
                    >
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#234974] mb-2 sm:mb-4">
                          Tamaño del paquete
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          {packageSizes.map((size) => (
                            <div
                              key={size.value}
                              onClick={() => handleRadioChange("packageSize", size.value)}
                              className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all hover:bg-[#7BB5E6]/5 ${
                                formData.packageSize === size.value
                                  ? "border-[#0F4C81] bg-[#0F4C81]/5"
                                  : "border-[#7BB5E6]/30"
                              }`}
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 sm:mb-2">
                                <Package
                                  className={cn(
                                    "h-4 w-4 sm:h-5 sm:w-5 text-[#234974]",
                                    size.value === "small" && "h-3.5 w-3.5 sm:h-4 sm:w-4",
                                    size.value === "large" && "h-5 w-5 sm:h-6 sm:w-6",
                                  )}
                                />
                              </div>
                              <span className="font-medium text-[#234974] text-sm sm:text-base">{size.label}</span>
                              <span className="text-xs text-[#234974]/60 mt-0.5 sm:mt-1">{size.dimensions}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 sm:space-y-5 md:space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs sm:text-sm font-medium text-[#234974] mb-1 sm:mb-2"
                        >
                          {t("contact.message")}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="w-full border-[#7BB5E6]/30 focus:border-[#0047AB] focus:ring-[#0047AB] rounded-lg text-sm sm:text-base"
                          placeholder="Detalles adicionales sobre tu envío..."
                        />
                      </div>

                      <div className="pt-2 sm:pt-4">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-2 sm:mr-3">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F4C81]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#234974] text-sm sm:text-base">Resumen de tu solicitud</h4>
                            <p className="text-xs sm:text-sm text-[#234974]/70">Revisa los detalles antes de enviar</p>
                          </div>
                        </div>

                        <div className="bg-[#F8FAFC] rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#234974]/70">Tamaño del paquete:</span>
                            <span className="font-medium text-[#234974]">
                              {packageSizes.find((s) => s.value === formData.packageSize)?.label ||
                                formData.packageSize}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-2 sm:pt-4">
                    {formStep > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-[#0F4C81] text-[#0F4C81] text-xs sm:text-sm h-8 sm:h-10"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Anterior
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {formStep < 2 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs sm:text-sm h-8 sm:h-10"
                      >
                        Siguiente
                        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs sm:text-sm h-8 sm:h-10"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          "Enviar mensaje"
                        )}
                      </Button>
                    )}
                  </div>

                  {/* WhatsApp Alternative */}
                  <div className="pt-4 sm:pt-5 md:pt-6 border-t border-[#7BB5E6]/20 mt-4 sm:mt-5 md:mt-6">
                    <Button
                      type="button"
                      onClick={openWhatsApp}
                      className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full py-1.5 sm:py-2 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    >
                      <MessageSquare className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      {t("contact.whatsapp")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-[#0F4C81] to-[#234974] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl h-full relative overflow-hidden flex flex-col">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-pattern opacity-10" />

              {/* Animated Plane */}
              <motion.div
                className="absolute right-4 top-20"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Plane className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/30 transform -rotate-45" />
              </motion.div>

              <div className="relative z-10 flex-1">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-1 sm:mb-2">{t("contact.info.title")}</h3>
                <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">{t("contact.info.desc")}</p>

                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">{item.title}</h4>
                        <p className="text-white/80 text-sm sm:text-base">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
