/**
 * Chat API — Herrera's Shipping virtual assistant (server-side only).
 *
 * SECURITY: the Gemini API key lives ONLY here (process.env.GEMINI_API_KEY,
 * never NEXT_PUBLIC_*). The browser talks to this route; this route talks to
 * Gemini. The system instruction (the scope guardrail) is defined here so it
 * never ships to the client and cannot be tampered with from the browser.
 *
 * Contract: POST { messages: {role:"user"|"model", text:string}[], language?: "es"|"en" }
 * Response: streamed text/plain (assistant reply chunks).
 */

import { GoogleGenAI } from "@google/genai"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MODEL = "gemini-flash-latest"
const MAX_MESSAGES = 12
const MAX_CHARS = 2000

type ChatRole = "user" | "model"
interface ChatMessage {
  role: ChatRole
  text: string
}

const SYSTEM_INSTRUCTION = `Eres el asistente virtual oficial de una empresa líder en envío de encomiendas, paquetería y carga entre Estados Unidos y El Salvador (y viceversa). Tu objetivo principal es brindar un servicio al cliente excepcional, responder dudas frecuentes y guiar a los usuarios para que coticen, programen su envío o aprendan a utilizar la plataforma.

REGLAS ESTRICTAS DE COMPORTAMIENTO:
1. LÍMITE DE CONTEXTO: Tu conocimiento está estrictamente limitado a logística, envíos, aduanas, tarifas, tiempos de entrega, servicios de la empresa y uso de nuestra plataforma.
2. FUERA DE TEMA: Si un usuario te pregunta sobre programación, historia, recetas de cocina, opiniones personales, o cualquier tema ajeno a las encomiendas, DEBES negarte cortésmente diciendo: "Soy un asistente especializado en logística y envíos. ¿En qué puedo ayudarte con tu paquete hacia o desde El Salvador / USA?"
3. TONO: Sé amable, profesional, conciso y utiliza un lenguaje natural y cercano.
4. CONCISIÓN: Da respuestas cortas y directas. Evita bloques de texto largos. Usa viñetas cuando sea necesario.
5. DESCONOCIMIENTO: Si te preguntan el estado exacto de un paquete o una tarifa que requiere peso/medidas exactas, pide al usuario que proporcione esos datos o invítalo a usar el botón de "Rastrear" o "Cotizar" en la página.
6. ASISTENCIA DE PLATAFORMA Y CUENTAS: Si un usuario pregunta cómo crear una cuenta, cómo registrarse o cómo usar el sitio, guíalo de forma clara y paso a paso. Indícale dónde hacer clic (ej. botón "Iniciar Sesión / Registrarse") y explícale brevemente cómo funciona el flujo de envío desde su panel.

INFORMACIÓN BASE DE LA EMPRESA (Utiliza esto para responder):
- Destinos: De cualquier parte de USA a todo El Salvador (entregas a domicilio o en sucursal) y de El Salvador a USA.
- Artículos prohibidos: Armas, dinero en efectivo, perecederos sin registro, sustancias ilícitas.
- Tiempos de entrega estimados: No inventes plazos exactos. Si no tienes un dato confirmado, indica que los tiempos varían según el tipo de servicio y la ruta, e invita al usuario a cotizar o contactar a un agente para un plazo preciso.
- Requisitos para enviar: Presentar DUI o Pasaporte, y un listado detallado del contenido del paquete.
- Cómo usar la plataforma (Proceso general para explicar a clientes):
  1. Crear cuenta o iniciar sesión.
  2. Usar la herramienta de "Cotizar Envío" ingresando peso y medidas.
  3. Programar el envío y adjuntar el listado de contenido.
  4. Entregar el paquete en sucursal o solicitar recolección.
  5. Monitorear el estado desde la sección "Rastreo".

Si la conversación llega a un punto donde se necesita un humano, indica que un agente de servicio al cliente se pondrá en contacto pronto.

IDIOMA: Responde SIEMPRE en el mismo idioma en que te escribe el usuario (español o inglés). No inventes datos que no estén en esta información; ante la duda, invita a cotizar, rastrear o contactar a un agente.`

function sanitize(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return []
  const cleaned: ChatMessage[] = []
  for (const item of input) {
    if (!item || typeof item !== "object") continue
    const role = (item as ChatMessage).role
    const text = (item as ChatMessage).text
    if (role !== "user" && role !== "model") continue
    if (typeof text !== "string") continue
    const trimmed = text.trim().slice(0, MAX_CHARS)
    if (!trimmed) continue
    cleaned.push({ role, text: trimmed })
  }
  return cleaned.slice(-MAX_MESSAGES)
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: "El asistente no está configurado. Falta GEMINI_API_KEY en el servidor." },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Cuerpo de la petición inválido." }, { status: 400 })
  }

  const messages = sanitize((body as { messages?: unknown }).messages)
  if (messages.length === 0) {
    return Response.json({ error: "No hay mensajes para procesar." }, { status: 400 })
  }

  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }))

  const ai = new GoogleGenAI({ apiKey })
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let started = false

      const run = async () => {
        const result = await ai.models.generateContentStream({
          model: MODEL,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 800,
          },
        })
        for await (const chunk of result) {
          const text = chunk.text
          if (text) {
            started = true
            controller.enqueue(encoder.encode(text))
          }
        }
      }

      try {
        await run()
      } catch (err) {
        // Reintento único solo si aún no habíamos emitido texto (evita duplicar).
        if (!started) {
          try {
            await run()
          } catch (retryErr) {
            console.error("[chat] Gemini error (retry failed):", retryErr)
            controller.enqueue(
              encoder.encode("Lo siento, tuve un problema para responder. Intenta de nuevo en un momento."),
            )
          }
        } else {
          console.error("[chat] Gemini error (mid-stream):", err)
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
