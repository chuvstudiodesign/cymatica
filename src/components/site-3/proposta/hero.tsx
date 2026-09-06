import { Container, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { MorphingMark } from "@/components/site-3/morphing-mark"
import { ScrollCta } from "@/components/site-3/proposta/scroll-cta"
import { hero, whatsappLink } from "@/lib/site-3/proposta"

/**
 * Herói da proposta.
 *
 * Mesma gramática do herói da home, uma oitava abaixo: isto é um documento
 * dirigido a uma pessoa, não a porta de entrada de um site. Por isso não ocupa
 * a tela inteira nem repete o wordmark cinético.
 *
 * O símbolo atravessando suas quatro variantes é o único elemento espetacular
 * da dobra. Ele já trata `prefers-reduced-motion` por dentro.
 *
 * A personalização acontece aqui e só aqui. Vem depois do título, numa linha
 * curta com o ponto nodal ao lado, para o Juliano reconhecer que a página é
 * dele sem que a página passe o resto do tempo falando dele.
 */
export function PropostaHero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-14%] hidden w-[40vw] max-w-[560px] -translate-y-1/2 text-ink-800 lg:block"
      >
        <MorphingMark />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="site-label text-muted-foreground">{hero.label}</p>

            <AnimatedHeading as="h1" className="site-h1 mt-8 text-balance" delay={0.1}>
              {hero.title}
            </AnimatedHeading>

            {/* O único ponto de laranja desta dobra. */}
            <p
              data-reveal=""
              className="mt-8 flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand-500"
              />
              {hero.personalizacao}
            </p>

            <p
              data-reveal=""
              className="site-lead site-measure mt-8 text-pretty text-muted-foreground"
            >
              {hero.body}
            </p>

            <div data-reveal="" className="mt-12 flex flex-wrap items-center gap-3">
              <ScrollCta
                target={hero.primaryCta.href}
                variant="outline"
                className="border-border"
              >
                {hero.primaryCta.label}
              </ScrollCta>
              <CtaButton
                variant="ghost"
                render={
                  <a
                    href={whatsappLink(hero.secondaryCta.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="text-muted-foreground hover:text-foreground"
              >
                {hero.secondaryCta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
