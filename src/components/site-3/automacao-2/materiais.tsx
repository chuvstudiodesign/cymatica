import { Section, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { materiais } from "@/lib/site-3/automacao-2"

/**
 * A lista de materiais.
 *
 * Concretiza o que as três seções anteriores explicaram em abstrato. É a
 * resposta à pergunta que o leitor está fazendo desde o herói: "sim, mas o que
 * exatamente eu recebo?".
 *
 * Lista corrida, sem cartão nem ícone: sete itens em cartões virariam uma
 * grade de blocos disputando atenção, e nenhum deles é mais importante que o
 * outro. Aqui o valor está na extensão da lista, não em cada item.
 */
export function Automacao2Materiais() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{materiais.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {materiais.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="flex flex-col">
            {materiais.itens.map((item) => (
              <div
                key={item.name}
                data-reveal=""
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-border py-6 first:pt-0"
              >
                <dt className="site-h3">{item.name}</dt>
                <dd className="max-w-[36ch] text-pretty text-muted-foreground">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
