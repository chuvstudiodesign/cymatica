"use server"

import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"

/**
 * Recebe o lead gerado pelo orçamento.
 *
 * A gravação é em arquivo local — suficiente para operar hoje e para não
 * perder nenhum contato. Ao publicar num ambiente sem disco persistente,
 * troque `persist` por uma chamada ao CRM ou por um webhook: o resto do fluxo
 * não muda.
 */

export type LeadResult = { ok: true } | { ok: false; error: string }

export type LeadPayload = {
  name: string
  email: string
  phone: string
  company: string
  message: string
  budget: number
  services: string[]
  size: string
  timeline: string
  estimateLow: number
  estimateHigh: number
  weeks: number
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function persist(lead: LeadPayload) {
  const dir = path.join(process.cwd(), ".leads")
  await mkdir(dir, { recursive: true })
  await appendFile(
    path.join(dir, "leads.jsonl"),
    JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }) + "\n",
    "utf8"
  )
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  // Validação no servidor: o cliente pode ser contornado.
  const name = payload.name?.trim() ?? ""
  const email = payload.email?.trim() ?? ""

  if (name.length < 2) {
    return { ok: false, error: "Informe seu nome." }
  }
  if (!EMAIL.test(email)) {
    return { ok: false, error: "Informe um email válido." }
  }

  try {
    await persist({ ...payload, name, email })
    return { ok: true }
  } catch {
    return {
      ok: false,
      error: "Não foi possível registrar agora. Escreva para contato@cymatica.studio.",
    }
  }
}
