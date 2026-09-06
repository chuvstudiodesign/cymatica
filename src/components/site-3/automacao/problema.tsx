import { Section, SectionLabel, Rule } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { problema } from "@/lib/site-3/automacao"

/**
 * A dor, antes da cura.
 *
 * Seção curta de propósito: ela não convence ninguém, só faz o leitor se
 * reconhecer. Quem não vive esse problema não é cliente desta página, e é bom
 * que descubra isso no segundo bloco em vez de no oitavo.
 *
 * Sem laranja aqui. A dobra do problema é a única da página em que não há nada
 * a destacar — o acento pertence ao que resolve, não ao que dói.
 */
export function AutomacaoProblema() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{problema.label}</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {problema.title}
          </AnimatedHeading>

          <p
            data-reveal=""
            className="site-lead site-measure mt-12 text-pretty text-muted-foreground"
          >
            {problema.body}
          </p>
        </div>
      </div>

      <Rule className="mt-28" />

      <dl className="mt-16 grid gap-12 sm:grid-cols-3">
        {problema.pontos.map((ponto) => (
          <div key={ponto.title} data-reveal="">
            <span aria-hidden className="block h-px w-10 bg-border" />
            <dt className="site-h3 mt-8 max-w-[18ch] text-balance">{ponto.title}</dt>
            <dd className="mt-4 max-w-[32ch] text-pretty text-muted-foreground">
              {ponto.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
