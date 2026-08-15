"use client"

import Link from "next/link"
import { ArrowDown } from "lucide-react"

import TextPressure from "@/components/reactbits/text-pressure"
import { ChladniPlate } from "@/components/site/chladni/chladni-plate"
import { Container, CtaButton } from "@/components/site/primitives"
import { hero } from "@/lib/site/content"

/**
 * Herói: a placa de Chladni ao fundo e o wordmark cinético embaixo.
 *
 * O TextPressure monta o próprio `<h1>` internamente, então o bloco visual sai
 * da árvore de acessibilidade e o `<h1>` real é a proposta de valor — que é o
 * que importa para leitor de tela e para busca.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 pb-8">
      {/* A placa vive atrás de tudo, deslocada para a direita no desktop. */}
      <div className="pointer-events-none absolute inset-0 opacity-70 md:left-1/4">
        <ChladniPlate />
      </div>

      <Container className="relative z-10 flex-1">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="site-label text-muted-foreground">{hero.label}</p>

            <h1 className="site-h2 mt-8 text-balance">{hero.title}</h1>

            <p className="site-lead site-measure mt-8 text-pretty text-muted-foreground">
              {hero.body}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
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
          <div className="flex items-end justify-between gap-8">
            <span className="site-label hidden items-center gap-2 text-muted-foreground md:flex">
              <ArrowDown className="size-3.5" aria-hidden />
              Role
            </span>
            <span className="site-label text-right text-muted-foreground">
              Belo Horizonte
              <br />
              Londres · Nápoles
            </span>
          </div>
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
