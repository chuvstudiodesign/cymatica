import { Section, SectionLabel, Reveal } from "@/components/site/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { manifesto } from "@/lib/site/content"

/**
 * O conceito da marca, dito uma vez e sem rodeio.
 *
 * Seção de silêncio deliberado: uma ideia, muito vazio em volta. Serve para dar
 * peso à frase e para o olho descansar antes do orçamento.
 */
export function Manifesto() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel>{manifesto.label}</SectionLabel>
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            <CymaticaMark variant="arcs" className="size-16 text-muted-foreground" />
          </Reveal>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col gap-3">
            {manifesto.lines.map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                <p className="site-h3 text-muted-foreground text-balance">{line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="site-h2 mt-16 text-balance">{manifesto.statement}</p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="site-lead site-measure mt-10 text-pretty text-muted-foreground">
              {manifesto.body}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
