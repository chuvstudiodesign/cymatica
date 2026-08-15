import Link from "next/link"

import CurvedLoop from "@/components/reactbits/curved-loop"
import { Container, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { closingCta } from "@/lib/site-3/content"

/**
 * Encerramento: a faixa curva com a frase da marca, e o último convite.
 *
 * O CurvedLoop é decorativo — o texto já aparece no rodapé, então some da
 * árvore de acessibilidade para não ser lido duas vezes.
 */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-border pt-28 pb-28 md:pt-40 md:pb-40">
      <div aria-hidden className="text-muted-foreground/30">
        <CurvedLoop
          marqueeText="Vibração ✦ vira ✦ forma ✦"
          speed={1.2}
          curveAmount={220}
          interactive={false}
          className="fill-current"
        />
      </div>

      <Container className="relative z-10 mt-20 text-center">
        <AnimatedHeading className="site-h2 mx-auto max-w-[16ch] text-balance">
          {closingCta.title}
        </AnimatedHeading>

        <p
          data-reveal=""
          className="site-lead mx-auto mt-8 max-w-[46ch] text-pretty text-muted-foreground"
        >
          {closingCta.body}
        </p>

        <div data-reveal="" className="mt-12 flex justify-center">
          <CtaButton render={<Link href={closingCta.cta.href} />}>
            {closingCta.cta.label}
          </CtaButton>
        </div>
      </Container>
    </section>
  )
}
