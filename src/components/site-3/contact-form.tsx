"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CtaButton } from "@/components/site-3/primitives"
import { whatsappLink } from "@/lib/site-3/content"

/**
 * Contato direto, pelo WhatsApp.
 *
 * A versão anterior gravava o lead em disco por Server Action. Isso funciona
 * em máquina local e falha em hospedagem sem disco persistente, que é o caso
 * da Vercel: o formulário mostraria erro em produção. Como os outros
 * formulários do site já vão para o WhatsApp, este segue o mesmo caminho e
 * passa a ter um destino que existe de verdade.
 */
export function ContactForm() {
  const [values, setValues] = useState({
    nome: "",
    empresa: "",
    telefone: "",
    mensagem: "",
  })

  const completo =
    values.nome.trim().length > 1 && values.mensagem.trim().length > 10

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  function enviar(event: React.FormEvent) {
    event.preventDefault()
    if (!completo) return
    const texto = [
      "*Contato — Cymatica*",
      "",
      `*Nome:* ${values.nome}`,
      values.empresa && `*Empresa:* ${values.empresa}`,
      values.telefone && `*Telefone:* ${values.telefone}`,
      "",
      "*Mensagem:*",
      values.mensagem,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(whatsappLink(texto), "_blank", "noopener")
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ct-nome" className="text-sm text-muted-foreground">
            Nome <span className="text-primary">*</span>
          </label>
          <Input id="ct-nome" required value={values.nome} onChange={update("nome")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ct-empresa" className="text-sm text-muted-foreground">
            Empresa
          </label>
          <Input id="ct-empresa" value={values.empresa} onChange={update("empresa")} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ct-telefone" className="text-sm text-muted-foreground">
          Telefone
        </label>
        <Input
          id="ct-telefone"
          type="tel"
          value={values.telefone}
          onChange={update("telefone")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ct-mensagem" className="text-sm text-muted-foreground">
          Sobre o projeto <span className="text-primary">*</span>
        </label>
        <Textarea
          id="ct-mensagem"
          rows={5}
          required
          value={values.mensagem}
          onChange={update("mensagem")}
        />
      </div>

      <div className="mt-4">
        <CtaButton type="submit" disabled={!completo}>
          Enviar pelo WhatsApp
          <ArrowRight className="size-4" aria-hidden />
        </CtaButton>
        <p className="mt-5 max-w-[52ch] text-sm text-muted-foreground">
          A mensagem abre já preenchida na nossa conversa. Você confere antes de
          enviar.
        </p>
      </div>
    </form>
  )
}
