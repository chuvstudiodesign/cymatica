"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Container, SectionLabel } from "@/components/site/primitives"
import { method } from "@/lib/site/content"

gsap.registerPlugin(ScrollTrigger)

/**
 * O método em cinco etapas, percorridas na horizontal enquanto a seção fica
 * ancorada.
 *
 * O trilho é uma lista com scroll horizontal nativo. O GSAP só traduz o scroll
 * vertical em posição do trilho — o que significa que teclado, roda lateral e
 * arraste continuam funcionando, e que desligar a animação não quebra nada:
 * sem GSAP a seção vira um carrossel comum.
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
    // é desmontado deixa a section pendurada dentro do spacer, e o React falha
    // ao removê-la na navegação.
    const mm = gsap.matchMedia()

    // Só ancora onde há espaço e permissão para isso.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - track.clientWidth
        if (distance() <= 0) return

        gsap.to(track, {
          scrollLeft: distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    )

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
            <h2 className="site-h2 text-balance">{method.title}</h2>
            <p className="site-lead site-measure mt-8 text-pretty text-muted-foreground">
              {method.body}
            </p>
          </div>
        </div>
      </Container>

      <ol
        ref={trackRef}
        // `overflow-x-auto` mantém o trilho utilizável sem JS e por teclado.
        className="mt-20 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {method.steps.map((step) => (
          <li
            key={step.number}
            className="w-[min(84vw,26rem)] shrink-0 snap-start rounded-2xl border border-border bg-card p-8 md:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="site-label text-primary">{step.number}</span>
              <span className="site-label text-muted-foreground">
                {step.duration}
              </span>
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
