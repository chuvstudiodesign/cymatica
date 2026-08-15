"use client"

import Link from "next/link"

import FuzzyText from "@/components/reactbits/fuzzy-text"
import { Container, CtaButton } from "@/components/site/primitives"

/**
 * 404 no vocabulário da marca: o texto vira ruído — o estado anterior à forma.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] items-center py-40">
      <Container>
        <div aria-hidden className="text-foreground">
          <FuzzyText fontSize="clamp(4rem, 18vw, 14rem)" baseIntensity={0.14}>
            404
          </FuzzyText>
        </div>

        <h1 className="site-h3 mt-16 text-balance">
          Esta página não chegou a virar forma.
        </h1>
        <p className="site-lead mt-6 max-w-[44ch] text-pretty text-muted-foreground">
          O endereço não existe ou saiu do ar. Os projetos e serviços continuam
          onde estavam.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <CtaButton render={<Link href="/site" />}>Voltar ao início</CtaButton>
          <CtaButton
            variant="ghost"
            render={<Link href="/site/projetos" />}
            className="text-muted-foreground hover:text-foreground"
          >
            Ver projetos
          </CtaButton>
        </div>
      </Container>
    </div>
  )
}
