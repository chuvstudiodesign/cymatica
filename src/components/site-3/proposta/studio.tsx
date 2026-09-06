import { Section, SectionLabel } from "@/components/site-3/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { studio } from "@/lib/site-3/proposta"

/**
 * Quem somos, no fim e em três frases.
 *
 * Numa proposta o estúdio é a última coisa que interessa: quem chegou até aqui
 * já decidiu se acredita no trabalho. Por isso não tem título de seção, não
 * tem lista de valores e não repete o manifesto da home. Só o símbolo, um
 * parágrafo e o fim da página.
 */
export function PropostaStudio() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{studio.label}</SectionLabel>
          <CymaticaMark
            variant="arcs"
            className="mt-8 size-12 text-muted-foreground"
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p data-reveal="" className="site-lead site-measure text-pretty">
            {studio.body}
          </p>
        </div>
      </div>
    </Section>
  )
}
