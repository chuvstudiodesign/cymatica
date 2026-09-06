"use client"

import { Plus } from "lucide-react"
import { Collapsible } from "@base-ui/react/collapsible"

import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { beneficios } from "@/lib/site-3/automacao"

/**
 * Os benefícios, segunda passagem.
 *
 * A primeira, lá em cima, deu o motivo para continuar lendo. Esta é o
 * argumento para decidir — o leitor já entende o mecanismo, então dá para
 * falar de coerência sem soar vago.
 *
 * O primeiro item vem com camada de baixo, e é o único que precisa: dizer que
 * um sistema mantém a marca mais coerente que um time grande é uma afirmação
 * forte, fácil de ler como desprezo por profissionais. O "ver mais" existe
 * justamente para desfazer isso — o designer é quem opera melhor a ferramenta,
 * e a página precisa dizer isso onde a dúvida nasce, não numa nota de rodapé.
 */
export function AutomacaoBeneficios() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{beneficios.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {beneficios.title}
          </AnimatedHeading>
        </div>
      </div>

      <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {beneficios.itens.map((item) => (
          <div key={item.title} data-reveal="">
            <h3 className="site-h3 max-w-[20ch] text-balance">{item.title}</h3>
            <p className="mt-5 max-w-[44ch] text-pretty text-muted-foreground">
              {item.body}
            </p>

            {"detail" in item && item.detail && (
              <Collapsible.Root className="mt-6">
                <Collapsible.Trigger className="group/ver inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors duration-150 outline-none hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring motion-reduce:transition-none">
                  <Plus
                    className="size-4 transition-transform duration-300 group-data-panel-open/ver:rotate-45 motion-reduce:transition-none"
                    aria-hidden
                  />
                  {item.detail.title}
                </Collapsible.Trigger>

                {/* `hiddenUntilFound` mantém o texto no HTML do servidor: o painel
                padrão desmonta quando fechado, e a segunda camada não existia
                sem JavaScript nem era achável pelo Ctrl+F da página. */}
            <Collapsible.Panel hiddenUntilFound className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
                  <div className="flex flex-col gap-5 pt-6">
                    {item.detail.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 24)}
                        className="max-w-[52ch] text-pretty text-muted-foreground"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Collapsible.Panel>
              </Collapsible.Root>
            )}
          </div>
        ))}
      </div>
    </LightSection>
  )
}
