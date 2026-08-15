"use client"

import Link from "next/link"
import { ArrowDown } from "lucide-react"

import TextPressure from "@/components/reactbits/text-pressure"
import { Container, CtaButton } from "@/components/site-3/primitives"
import { MorphingMark } from "@/components/site-3/morphing-mark"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { hero } from "@/lib/site-3/content"

/**
 * Herói: tipografia e o símbolo respirando.
 *
 * A placa de Chladni saiu daqui. Sobre o canvas preto ela rendia pouco — o grão
 * cinza sumia no fundo e o laranja ficava opaco. Foi para a seção clara de IA,
 * onde o mesmo padrão aparece como grafite sobre papel.
 *
 * No lugar entrou o próprio símbolo da marca atravessando suas quatro variantes
 * oficiais, que são a mesma figura em modos de vibração diferentes. Mais
 * discreto, mais limpo e mais fiel à identidade do que um campo de partículas.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-12%] hidden w-[46vw] max-w-[680px] -translate-y-1/2 text-ink-800 lg:block"
      >
        <MorphingMark />
      </div>

      <Container className="relative z-10 flex-1">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="site-label text-muted-foreground">{hero.label}</p>

            <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance" delay={0.1}>
              {hero.title}
            </AnimatedHeading>

            <p
              data-reveal=""
              className="site-lead site-measure mt-8 text-pretty text-muted-foreground"
            >
              {hero.body}
            </p>

            <div data-reveal="" className="mt-12 flex flex-wrap items-center gap-3">
              <CtaButton render={<Link href={hero.primaryCta.href} />}>
                {hero.primaryCta.label}
              </CtaButton>
              <CtaButton
                variant="ghost"
                render={<Link href={hero.secondaryCta.href} />}
                className="text-muted-foreground hover:text-foreground"
              >
                {hero.secondaryCta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-10">
        <Container>
          <span className="site-label flex items-center gap-2 text-muted-foreground">
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
            Role
          </span>
        </Container>

        {/* Wordmark cinético: deforma o peso da Figtree conforme o cursor
            se aproxima. Decorativo — o nome já está no cabeçalho. */}
        <div
          aria-hidden
          className="mt-6 h-[14vw] min-h-16 w-full px-6 md:px-12 lg:px-20"
        >
          <TextPressure
            as="div"
            text={hero.display}
            className="text-foreground"
            minFontSize={48}
          />
        </div>
      </div>
    </section>
  )
}
