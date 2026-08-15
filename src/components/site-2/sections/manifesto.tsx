import { Section, SectionLabel } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { manifesto } from "@/lib/site-2/content"

/**
 * O conceito da marca, dito uma vez e sem rodeio.
 *
 * Seção de silêncio deliberado: uma ideia, muito vazio em volta. As três linhas
 * sobem uma a uma de trás da máscara, o que dá à explicação o ritmo de uma
 * frase sendo revelada em vez de um parágrafo aparecendo inteiro.
 */
export function Manifesto() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel>{manifesto.label}</SectionLabel>
          <div data-reveal="" className="mt-10 hidden lg:block">
            <CymaticaMark variant="arcs" className="size-16 text-muted-foreground" />
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col gap-3">
            {manifesto.lines.map((line, i) => (
              <AnimatedHeading
                key={line}
                as="p"
                className="site-h3 text-balance text-muted-foreground"
                delay={i * 0.12}
              >
                {line}
              </AnimatedHeading>
            ))}
          </div>

          <AnimatedHeading className="site-h2 mt-16 text-balance" delay={0.2}>
            {manifesto.statement}
          </AnimatedHeading>

          <p
            data-reveal=""
            className="site-lead site-measure mt-10 text-pretty text-muted-foreground"
          >
            {manifesto.body}
          </p>
        </div>
      </div>
    </Section>
  )
}
