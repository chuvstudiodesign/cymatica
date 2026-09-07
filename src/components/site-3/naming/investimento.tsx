"use client"

import { useState } from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import {
  investimento,
  namingWhatsappLink,
  prazos,
  type Prazo,
} from "@/lib/site-3/naming"
import { formatBRL } from "@/lib/site/pricing"

/**
 * Preço e prazo, na mesma dobra.
 *
 * Naming não tem pacote maior e menor — cortar etapa aqui significaria entregar
 * nome pior. Então a única escolha do cliente é a velocidade, e o total muda na
 * frente dele em vez de virar conta de cabeça.
 *
 * O único laranja da dobra é o botão de aprovação.
 */
export function NamingInvestimento() {
  const [id, setId] = useState<Prazo["id"]>("padrao")
  const prazo = prazos.find((p) => p.id === id) ?? prazos[0]
  const total = investimento.price + prazo.fee

  return (
    <Section id="investimento" className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{investimento.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {investimento.title}
          </AnimatedHeading>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="" className="lg:col-span-5">
          <div className="rounded-2xl border border-border p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="site-h3 max-w-[14ch] text-balance">
                {investimento.name}
              </h3>
              <p className="site-h3 tabular-nums">
                {formatBRL(investimento.price)}
              </p>
            </div>
            <p className="mt-6 max-w-[40ch] text-pretty text-muted-foreground">
              {investimento.body}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="site-label text-muted-foreground">
            {investimento.prazoLegend}
          </p>

          <RadioGroup
            value={id}
            onValueChange={(v) => setId(v as Prazo["id"])}
            aria-label={investimento.prazoLegend}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            {prazos.map((p) => (
              <Radio.Root
                key={p.id}
                value={p.id}
                className="flex flex-col gap-3 rounded-2xl border border-border px-6 py-6 text-left transition-colors duration-150 outline-none hover:border-foreground/40 focus-visible:ring-3 focus-visible:ring-ring data-checked:border-foreground data-checked:bg-foreground/8 motion-reduce:transition-none"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-4 shrink-0 place-content-center rounded-full border border-current"
                  >
                    <Radio.Indicator className="size-2 rounded-full bg-current" />
                  </span>
                  <span className="site-label">{p.name}</span>
                </span>
                <span className="site-h3">{p.days} dias úteis</span>
                <span className="max-w-[34ch] text-pretty text-sm text-muted-foreground">
                  {p.summary}
                </span>
              </Radio.Root>
            ))}
          </RadioGroup>

          <div
            data-reveal=""
            className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8"
          >
            {/* Contagem e total na mesma região viva: quem não vê a tela
                precisa ouvir o preço mudar junto com a escolha. */}
            <div aria-live="polite">
              <p className="site-label text-muted-foreground">
                {investimento.totalLabel}
              </p>
              <p className="site-h3 mt-2 tabular-nums">{formatBRL(total)}</p>
            </div>

            <CtaButton
              render={
                <a
                  href={namingWhatsappLink(prazo)}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              {investimento.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
