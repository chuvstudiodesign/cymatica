"use client"

import { useState } from "react"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { Toggle } from "@base-ui/react/toggle"
import { ArrowUpRight, Check } from "lucide-react"

import { Section, SectionLabel, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import {
  automacaoWhatsappLink,
  base,
  pacotes,
  precoDosSistemas,
  sistemas,
} from "@/lib/site-3/automacao"
import { formatBRL } from "@/lib/site/pricing"

/**
 * A fundação e os sistemas somáveis.
 *
 * O preço não é uma tabela para o leitor interpretar: ele monta a conta e vê o
 * total mudar. A mesma lógica do seletor de peças da proposta, e pelo mesmo
 * motivo — o estúdio vende preço na mesa, e uma tabela estática obriga o
 * cliente a somar de cabeça para descobrir se cabe no bolso dele.
 *
 * A fundação aparece separada e sem caixa de seleção porque **não é opcional**:
 * sem ela não há o que os sistemas leiam. Deixá-la como um item marcável
 * sugeriria que dá para comprar um sistema solto, o que não existe.
 *
 * O único laranja da dobra é o botão de envio.
 */
export function AutomacaoPacotes() {
  const [escolhidos, setEscolhidos] = useState<string[]>([])

  const somaSistemas = precoDosSistemas(escolhidos)
  const total = base.price + somaSistemas

  return (
    <Section id="investimento" className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{pacotes.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {pacotes.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {pacotes.lead}
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* A fundação: fixa, sem seleção. */}
        <div data-reveal="" className="lg:col-span-5">
          <p className="site-label text-muted-foreground">{pacotes.baseLegend}</p>

          <div className="mt-6 rounded-2xl border border-border p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="site-h3">{base.name}</h3>
              <p className="site-h3 tabular-nums">{formatBRL(base.price)}</p>
            </div>

            <p className="mt-5 max-w-[38ch] text-pretty text-muted-foreground">
              {base.body}
            </p>

            <ul className="mt-8 flex flex-col gap-5 border-t border-border pt-8">
              {base.items.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0" aria-hidden />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1.5 max-w-[34ch] text-pretty text-sm text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Os sistemas: escolha do cliente. */}
        <div className="lg:col-span-7">
          <p className="site-label text-muted-foreground">
            {pacotes.sistemasLegend}
          </p>

          <ToggleGroup
            multiple
            value={escolhidos}
            onValueChange={(next) => setEscolhidos(next as string[])}
            aria-label={pacotes.sistemasLegend}
            // A lista é vertical; sem isto o Base UI mantém a orientação
            // horizontal e só ↔ move o foco. Quem apertasse ↓ e Enter
            // desmarcava o item que acabara de marcar.
            orientation="vertical"
            className="mt-6 flex flex-col gap-3"
          >
            {sistemas.map((sistema) => (
              <Toggle
                key={sistema.id}
                value={sistema.id}
                className="group/sis flex flex-wrap items-start justify-between gap-x-8 gap-y-3 rounded-2xl border border-border px-6 py-6 text-left transition-colors duration-150 outline-none hover:border-foreground/40 focus-visible:ring-3 focus-visible:ring-ring data-pressed:border-foreground data-pressed:bg-foreground/8 motion-reduce:transition-none"
              >
                <span className="flex items-start gap-4">
                  {/* Estado por caixa, não só por cor: quem não distingue as
                      duas superfícies enxerga o visto. */}
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[5px] border border-muted-foreground text-transparent transition-colors duration-150 group-data-pressed/sis:border-foreground group-data-pressed/sis:bg-foreground group-data-pressed/sis:text-background motion-reduce:transition-none"
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{sistema.name}</span>
                    <span className="mt-1.5 block max-w-[42ch] text-pretty text-sm text-muted-foreground">
                      {sistema.body}
                    </span>
                  </span>
                </span>

                <span className="tabular-nums">{formatBRL(sistema.price)}</span>
              </Toggle>
            ))}
          </ToggleGroup>

          {/* A conta. */}
          <div
            data-reveal=""
            className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8"
          >
            {/* A região viva cobre contagem **e** total. Antes só o contador
                era anunciado: quem usa leitor de tela ouvia que escolheu um
                sistema e nunca ouvia quanto passou a custar. */}
            <div aria-live="polite">
              <p className="site-label text-muted-foreground">
                {escolhidos.length === 0
                  ? pacotes.emptyLabel
                  : pacotes.counter(escolhidos.length)}
              </p>
              <p className="site-h3 mt-2 tabular-nums">{formatBRL(total)}</p>
            </div>

            <CtaButton
              render={
                <a
                  href={automacaoWhatsappLink(escolhidos)}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              {pacotes.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  )
}
