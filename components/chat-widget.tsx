/**
 * ChatWidget - Asistente virtual flotante (esquina inferior derecha).
 *
 * Habla con /api/chat (server-side) que a su vez llama a Gemini. La key nunca
 * está en el cliente. Respuestas por streaming. Bilingüe (ES/EN) según el
 * language-provider. Interacción animada con framer-motion (no scroll → no GSAP).
 */
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type Role = "user" | "model"
interface Message {
  role: Role
  text: string
}

const COPY = {
  es: {
    title: "Asistente Herrera's",
    subtitle: "Envíos USA ⇄ El Salvador",
    greeting:
      "¡Hola! 👋 Soy el asistente de Herrera's Shipping. ¿En qué puedo ayudarte con tu envío hacia o desde El Salvador / USA?",
    placeholder: "Escribí tu consulta...",
    send: "Enviar",
    open: "Abrir chat de ayuda",
    close: "Cerrar chat",
  },
  en: {
    title: "Herrera's Assistant",
    subtitle: "Shipping USA ⇄ El Salvador",
    greeting:
      "Hi! 👋 I'm the Herrera's Shipping assistant. How can I help you with your shipment to or from El Salvador / USA?",
    placeholder: "Type your question...",
    send: "Send",
    open: "Open help chat",
    close: "Close chat",
  },
} as const

export function ChatWidget() {
  const { language } = useLanguage()
  const c = language === "en" ? COPY.en : COPY.es

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll al último mensaje.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  // Foco en el input al abrir.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const history: Message[] = [...messages, { role: "user", text }]
    setMessages(history)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, language }),
      })

      if (!res.ok || !res.body) {
        const fallback =
          language === "en"
            ? "Sorry, the assistant is unavailable right now. Please try again later."
            : "Perdón, el asistente no está disponible en este momento. Probá de nuevo más tarde."
        setMessages([...history, { role: "model", text: fallback }])
        return
      }

      // Insertamos un mensaje vacío del modelo y lo vamos llenando con el stream.
      setMessages([...history, { role: "model", text: "" }])
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages([...history, { role: "model", text: acc }])
      }
    } catch {
      const fallback =
        language === "en"
          ? "Sorry, something went wrong. Please try again."
          : "Perdón, ocurrió un error. Intentá de nuevo."
      setMessages([...history, { role: "model", text: fallback }])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const shown: Message[] = messages.length === 0 ? [{ role: "model", text: c.greeting }] : messages

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 right-0 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-[#234974]/10 bg-white shadow-[0_24px_70px_rgba(15,76,129,0.25)]"
            role="dialog"
            aria-label={c.title}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#0F4C81] px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{c.title}</p>
                  <p className="text-[11px] text-white/70">{c.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                aria-label={c.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mensajes */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#7BB5E6]/[0.06] px-4 py-4">
              {shown.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[#0F4C81] px-3.5 py-2 text-sm text-white"
                        : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-[#234974]/10 bg-white px-3.5 py-2 text-sm text-[#234974]"
                    }
                  >
                    {m.text || (loading ? "…" : "")}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-[#234974]/10 bg-white px-3.5 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-[#0F4C81]" aria-hidden="true" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-[#234974]/10 bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={c.placeholder}
                className="min-w-0 flex-1 rounded-full border border-[#234974]/15 bg-white px-4 py-2.5 text-sm text-[#234974] outline-none placeholder:text-[#234974]/40 focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
                aria-label={c.placeholder}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F4C81] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={c.send}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón lanzador */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-[0_10px_30px_rgba(15,76,129,0.4)] transition-all hover:scale-105 hover:brightness-110 active:scale-95"
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
