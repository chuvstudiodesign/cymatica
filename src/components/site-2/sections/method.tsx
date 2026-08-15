"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Container, SectionLabel } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { method } from "@/lib/site-2/content"

gsap.registerPlugin(ScrollTrigger)

/**
 * O método em cinco etapas, percorridas na horizontal enquanto a seção fica
 * ancorada.
 *
 * A primeira versão travava e saltava da etapa 1 para a 5. Três causas somadas:
 *
 *   1. animava `scrollLeft`, uma propriedade de scroll nativo;
 *   2. o `normalizeScroll` do ScrollSmoother sequestra a roda do mouse e
 *      quebra qualquer contêiner de scroll aninhado;
 *   3. o `snap-mandatory` puxava o trilho de volta no meio do tween.
 *
 * Agora o trilho é movido por `x` — transform puro, resolvido na GPU, sem
 * disputa com o scroll nativo. O `normalizeScroll` foi desligado no provider e
 * o snap só existe no modo sem ancoragem.
 *
 * Sem JS, em telas estreitas ou com movimento reduzido, o trilho continua um
 * carrossel rolável de verdade — nada depende da animação para funcionar.
 */
export function Method() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // `gsap.matchMedia()` e não `ScrollTrigger.matchMedia()`: o segundo está
    // descontinuado desde o GSAP 3.11 e não participa do ciclo de limpeza.
    // Como `pin: true` envolve a section num `pin-spacer`, um trigger que não
    // é desmontado deixa a section pendurada dentro do spacer. O React então
    // tenta removê-la do pai original na navegação e falha com
    // "NotFoundError: The object can not be found here".
    const mm = gsap.matchMedia()

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
          // Distância recalculada a cada refresh: no primeiro layout a largura
          // ainda não é confiável, e um valor congelado aqui foi o que fazia a
          // animação inteira acontecer em poucos pixels de scroll.
          const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
          if (distance() === 0) return

          // Com o trilho movido por transform, o scroll nativo do contêiner
          // sairia de sincronia — desligamos os dois enquanto durar a âncora.
          gsap.set(track, { overflow: "hidden", scrollSnapType: "none" })

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
      }
    )

    // Devolve a section ao pai original antes de o React desmontá-la.
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-border py-28 md:py-40"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>{method.label}</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <AnimatedHeading className="site-h2 text-balance">
              {method.title}
            </AnimatedHeading>
            <p
              data-reveal=""
              className="site-lead site-measure mt-8 text-pretty text-muted-foreground"
            >
              {method.body}
            </p>
          </div>
        </div>
      </Container>

      <ol
        ref={trackRef}
        className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {method.steps.map((step, i) => (
          <li
            key={step.number}
            className="group/step w-[min(84vw,26rem)] shrink-0 snap-start rounded-2xl border border-border bg-card p-8 transition-colors duration-500 hover:border-primary/40 md:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="site-label text-primary">{step.number}</span>
              <span className="site-label text-muted-foreground">
                {step.duration}
              </span>
            </div>

            {/* Barra de progresso da etapa: preenche conforme avança na série. */}
            <div className="mt-8 h-px w-full bg-border">
              <div
                className="h-px bg-primary transition-[width] duration-700"
                style={{ width: `${((i + 1) / method.steps.length) * 100}%` }}
              />
            </div>

            <h3 className="site-h3 mt-10">{step.name}</h3>
            <p className="mt-5 text-pretty text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
