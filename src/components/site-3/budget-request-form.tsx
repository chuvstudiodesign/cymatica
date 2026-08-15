"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CtaButton } from "@/components/site-3/primitives"
import { whatsappLink } from "@/lib/site-3/content"
import { formatBRL, parseBRL } from "@/lib/site/pricing"

/**
 * Pedido de orçamento, versão simples.
 *
 * A calculadora ao vivo saiu de cena enquanto a tabela de preços é revista.
 * Aqui o cliente diz quanto pode investir e o que precisa; a proposta volta
 * pelo WhatsApp, feita à mão. A lógica de precificação continua no projeto
 * (`lib/site/pricing.ts`) para quando a calculadora voltar.
 */
export function BudgetRequestForm() {
  const [values, setValues] = useState({
    nome: "",
    empresa: "",
    email: "",
    budget: "",
    projeto: "",
  })

  const amount = parseBRL(values.budget)
  const completo =
    values.nome.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email) &&
    values.projeto.trim().length > 10

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  function enviar(event: React.FormEvent) {
    event.preventDefault()
    if (!completo) return
    const mensagem = [
      "*Pedido de orçamento — Cymatica*",
      "",
      `*Nome:* ${values.nome}`,
      values.empresa && `*Empresa:* ${values.empresa}`,
      `*Email:* ${values.email}`,
      amount > 0 && `*Investimento previsto:* ${formatBRL(amount)}`,
      "",
      "*Projeto:*",
      values.projeto,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(whatsappLink(mensagem), "_blank", "noopener")
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="orc-nome" className="text-sm text-muted-foreground">
            Nome <span className="text-primary">*</span>
          </label>
          <Input id="orc-nome" required value={values.nome} onChange={update("nome")} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="orc-empresa" className="text-sm text-muted-foreground">
            Empresa
          </label>
          <Input id="orc-empresa" value={values.empresa} onChange={update("empresa")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="orc-email" className="text-sm text-muted-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <Input
            id="orc-email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="orc-budget" className="text-sm text-muted-foreground">
            Quanto você pode investir
          </label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
            >
              R$
            </span>
            <Input
              id="orc-budget"
              inputMode="numeric"
              autoComplete="off"
              placeholder="15.000"
              className="pl-11 tabular-nums"
              value={values.budget}
              onChange={update("budget")}
              onBlur={() =>
                amount > 0 &&
                setValues((c) => ({ ...c, budget: formatBRL(amount, false) }))
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="orc-projeto" className="text-sm text-muted-foreground">
          O que você precisa <span className="text-primary">*</span>
        </label>
        <Textarea
          id="orc-projeto"
          rows={5}
          required
          placeholder="Identidade nova, site, embalagem, aplicativo…"
          value={values.projeto}
          onChange={update("projeto")}
        />
      </div>

      <div className="mt-4">
        <CtaButton type="submit" disabled={!completo}>
          Enviar pelo WhatsApp
          <ArrowRight className="size-4" aria-hidden />
        </CtaButton>
        <p className="mt-5 max-w-[52ch] text-sm text-muted-foreground">
          Montamos a proposta à mão e voltamos com escopo, entregáveis e prazo.
          Você confere a mensagem antes de enviar.
        </p>
      </div>
    </form>
  )
}
