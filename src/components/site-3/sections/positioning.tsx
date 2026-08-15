import { LightSection, SectionLabel, Rule } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { CountUp } from "@/components/site-3/count-up"
import { positioning } from "@/lib/site-3/content"

/**
 * Primeira ilha clara da página.
 *
 * O corte de preto para branco acontece exatamente onde o texto muda de tom —
 * do problema do mercado para a posição do estúdio. A quebra visual carrega a
 * quebra retórica, em vez de ser alternância decorativa.
 */
export function Positioning() {
  return (
    <LightSection>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{positioning.label}</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {positioning.title}
          </AnimatedHeading>

          <p
            data-reveal=""
            className="site-lead site-measure mt-10 text-pretty text-muted-foreground"
          >
            {positioning.body}
          </p>
          <p data-reveal="" className="site-lead site-measure mt-8 text-pretty">
            {positioning.counter}
          </p>
        </div>
      </div>

      <Rule className="mt-28" />

      <dl className="mt-16 grid gap-12 sm:grid-cols-3">
        {positioning.stats.map((stat) => (
          <div key={stat.label} data-reveal="">
            <dt className="site-h2 tabular-nums">
              <CountUp value={stat.value} />
            </dt>
            <dd className="mt-4 max-w-[24ch] text-sm text-muted-foreground">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </LightSection>
  )
}
