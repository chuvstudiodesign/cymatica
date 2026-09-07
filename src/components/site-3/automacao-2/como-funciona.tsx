"use client"

import { Plus } from "lucide-react"
import { Collapsible } from "@base-ui/react/collapsible"

import { Section, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { DesignSystemMosaico } from "@/components/site-3/automacao-2/design-system-mosaico"
import { SistemaLe } from "@/components/site-3/automacao-2/sistema-le"
import { CriandoPecas } from "@/components/site-3/automacao-2/criando-pecas"
import { comoFunciona, type Passo } from "@/lib/site-3/automacao-2"

/**
 * Os três passos, com a segunda camada embutida.
 *
 * A regra da página é falar o essencial na superfície e guardar profundidade
 * atrás de um "ver mais". Aqui isso não é recurso de layout: os dois primeiros
 * passos falam de design system e de cadeia de agentes, que é justamente o
 * assunto em que um empresário desiste se for obrigado a ler tudo. Na camada
 * de cima ele entende o que ganha; na de baixo, se quiser, entende como.
 *
 * Usa a primitiva do Base UI e não `ui/collapsible.tsx` por um motivo só: o
 * wrapper não expõe o `Panel` com a altura animada que o gatilho aqui precisa
 * para não pular. A API é a mesma; o que muda é o controle do painel.
 *
 * Nada de laranja nos gatilhos. São três por dobra, e três acentos é ruído —
 * o sinal de "isto abre" vem da cruz que gira, não de cor.
 */
function PassoItem({ passo }: { passo: Passo }) {
  return (
    <li data-reveal="" className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          {/* O acento da seção. Um por passo, no numeral — ele marca a
              progressão sem disputar com o título nem com o gatilho. */}
          <span className="site-label text-primary">{passo.numero}</span>
          <h3 className="site-h3 mt-6 max-w-[16ch] text-balance">{passo.title}</h3>
        </div>

        <div className="lg:col-span-8">
          <p className="site-lead max-w-[54ch] text-pretty">{passo.body}</p>

          <Collapsible.Root className="mt-8">
            <Collapsible.Trigger className="group/ver inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-150 outline-none hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring motion-reduce:transition-none">
              <Plus
                className="size-4 transition-transform duration-300 group-data-panel-open/ver:rotate-45 motion-reduce:transition-none"
                aria-hidden
              />
              {passo.detail.title}
            </Collapsible.Trigger>

            {/* `h-[var(--collapsible-panel-height)]` é a variável que o Base UI
                escreve no painel: sem ela a altura salta de 0 para auto e a
                transição não acontece. */}
            {/* `hiddenUntilFound` mantém o texto no HTML do servidor: o painel
                padrão desmonta quando fechado, e a segunda camada não existia
                sem JavaScript nem era achável pelo Ctrl+F da página. */}
            <Collapsible.Panel hiddenUntilFound className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
              <div className="flex flex-col gap-5 pt-8">
                {passo.detail.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[62ch] text-pretty text-muted-foreground">
                    {p}
                  </p>
                ))}

                {passo.detail.bullets && (
                  <ul className="mt-2 flex flex-col gap-3">
                    {passo.detail.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-pretty text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Collapsible.Panel>
          </Collapsible.Root>

          {/* A demonstração do passo. Vem depois do "ver mais" de propósito:
              quem só olha a figura entende sem abrir nada, e quem abriu já leu
              a explicação quando chega nela. */}
          {passo.numero === "01" && (
            <div data-reveal="" className="mt-14">
              <DesignSystemMosaico />
            </div>
          )}

          {passo.numero === "02" && (
            <div data-reveal="" className="mt-14">
              <SistemaLe />
            </div>
          )}

          {passo.numero === "03" && (
            <div data-reveal="" className="mt-14">
              <CriandoPecas />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function Automacao2ComoFunciona() {
  return (
    <Section id="como-funciona" className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{comoFunciona.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {comoFunciona.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {comoFunciona.lead}
          </p>
        </div>
      </div>

      <ol className="mt-24 flex flex-col gap-14">
        {comoFunciona.passos.map((passo) => (
          <PassoItem key={passo.numero} passo={passo} />
        ))}
      </ol>
    </Section>
  )
}
