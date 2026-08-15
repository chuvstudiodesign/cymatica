"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Section, SectionLabel, CtaButton } from "@/components/site/primitives"
import { formatBRL, parseBRL } from "@/lib/site/pricing"

/**
 * A promessa da marca, jogada logo na home: diga quanto pode investir.
 *
 * O campo só coleta o valor e leva para o fluxo completo — a estimativa de
 * verdade acontece em /site/orcamento, que é onde o escopo é definido.
 */
export function BudgetTeaser() {
  const router = useRouter()
  const [value, setValue] = useState("")

  const amount = parseBRL(value)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const query = amount > 0 ? `?budget=${amount}` : ""
    router.push(`/site/orcamento${query}`)
  }

  return (
    <Section className="border-t border-border">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>Orçamento</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <h2 className="site-h2 text-balance">
            Digite quanto você pode investir.
          </h2>
          <p className="site-lead site-measure mt-8 text-pretty text-muted-foreground">
            Em três minutos você sai com escopo, entregáveis, prazo e faixa de
            investimento. Sem cadastro para ver o resultado.
          </p>

          <form onSubmit={submit} className="mt-12 flex flex-wrap items-center gap-3">
            <div className="relative">
              <label htmlFor="budget-teaser" className="sr-only">
                Quanto você pode investir, em reais
              </label>
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2 text-muted-foreground"
              >
                R$
              </span>
              <input
                id="budget-teaser"
                inputMode="numeric"
                autoComplete="off"
                placeholder="15.000"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => amount > 0 && setValue(formatBRL(amount, false))}
                className="h-13 w-56 rounded-full border border-input bg-transparent pr-6 pl-13 text-lg tabular-nums outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <CtaButton type="submit">
              Ver minha proposta
              <ArrowRight className="size-4" aria-hidden />
            </CtaButton>
          </form>
        </div>
      </div>
    </Section>
  )
}
