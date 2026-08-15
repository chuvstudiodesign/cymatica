import { Section, SectionLabel, Reveal, Rule } from "@/components/site/primitives"
import { positioning } from "@/lib/site/content"

/** O problema que a Cymatica resolve, dito sem meio-termo. */
export function Positioning() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{positioning.label}</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="site-h2 text-balance">{positioning.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="site-lead site-measure mt-10 text-pretty text-muted-foreground">
              {positioning.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="site-lead site-measure mt-8 text-pretty">
              {positioning.counter}
            </p>
          </Reveal>
        </div>
      </div>

      <Rule className="mt-28" />

      <dl className="mt-16 grid gap-12 sm:grid-cols-3">
        {positioning.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <dt className="site-h2 tabular-nums">{stat.value}</dt>
            <dd className="mt-4 max-w-[24ch] text-sm text-muted-foreground">
              {stat.label}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
