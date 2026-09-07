import { Container, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ScrollCta } from "@/components/site-3/proposta/scroll-cta"
import { ChladniDark } from "@/components/site-3/proposta/chladni-dark"
import { hero, whatsappLink } from "@/lib/site-3/automacao-2"

/**
 * Herói da automação.
 *
 * A placa de Chladni está aqui como argumento, não como enfeite. Esta é a
 * página em que a metáfora da marca deixa de ser metáfora: o design system é a
 * frequência, e cada peça produzida é uma figura daquela mesma frequência —
 * sempre diferente, sempre reconhecível como sendo da mesma placa. Variação
 * infinita, identidade constante, que é exatamente o que se está vendendo.
 *
 * Por isso ela ocupa a dobra inteira ao lado do título, e não uma marca d'água
 * cortada no canto.
 */
export function Automacao2Hero() {
  return (
    <section className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="site-label text-muted-foreground">{hero.label}</p>

            <AnimatedHeading as="h1" className="site-h1 mt-8 text-balance" delay={0.1}>
              {hero.title}
            </AnimatedHeading>

            <p
              data-reveal=""
              className="site-lead site-measure mt-10 text-pretty text-muted-foreground"
            >
              {hero.body}
            </p>

            <div data-reveal="" className="mt-12 flex flex-wrap items-center gap-3">
              <ScrollCta target={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ScrollCta>

              <CtaButton
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                render={
                  <a
                    href={whatsappLink(hero.secondaryCta.message)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                {hero.secondaryCta.label}
              </CtaButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ChladniDark className="mx-auto w-full max-w-[420px]" />
          </div>
        </div>
      </Container>
    </section>
  )
}
