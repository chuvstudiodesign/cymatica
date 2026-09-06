import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { CountUp } from "@/components/site-3/count-up"
import { deadlines, deadlinesSection } from "@/lib/site-3/proposta"

/**
 * Prazos.
 *
 * Continua a ilha clara dos pacotes: `.light + .light` no site.css zera o
 * padding de topo, então as duas leem como um bloco só. É intencional. Prazo
 * é parte da decisão de preço, não assunto separado.
 *
 * O laranja marca só o fast, que é a opção que custa a mais e precisa ser
 * lida como escolha e não como padrão.
 */
export function PropostaDeadlines() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{deadlinesSection.label}</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {deadlinesSection.title}
          </AnimatedHeading>

          <dl className="mt-16 grid gap-12 sm:grid-cols-2">
            {deadlines.map((deadline) => (
              <div
                key={deadline.id}
                data-reveal=""
                className="border-t border-border pt-8"
              >
                <dt className="flex items-center gap-2.5">
                  {/* Era laranja. Mas `.light + .light` funde Pacotes e Prazos
                      num bloco só, então este ponto cai na mesma dobra que o
                      CTA do Insane — dois acentos disputando a tela. O acento
                      fica com o botão, que é onde a decisão acontece. */}
                  {deadline.fee > 0 && (
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-foreground"
                    />
                  )}
                  <span className="site-label text-muted-foreground">
                    {deadline.name}
                  </span>
                </dt>
                <dd className="mt-6">
                  <p className="site-h2 tabular-nums">
                    <CountUp value={String(deadline.days)} />
                    <span className="site-lead ml-3 align-baseline text-muted-foreground">
                      dias úteis
                    </span>
                  </p>
                  <p className="mt-5 max-w-[34ch] text-pretty text-muted-foreground">
                    {deadline.summary}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <p
            data-reveal=""
            className="site-measure mt-20 text-pretty text-muted-foreground"
          >
            {deadlinesSection.note}
          </p>
        </div>
      </div>
    </LightSection>
  )
}
