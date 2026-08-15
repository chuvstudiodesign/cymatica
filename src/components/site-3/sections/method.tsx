"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Container, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { method } from "@/lib/site-3/content"

gsap.registerPlugin(ScrollTrigger)

/**
 * O método em cinco etapas, percorridas na horizontal enquanto o trilho fica
 * ancorado.
 *
 * A âncora é o `pin` do ScrollTrigger, e o elemento ancorado é o bloco interno
 * do trilho, nunca a `<section>`. Essa distinção é o ponto todo.
 *
 * O `pin` envolve o elemento ancorado num `pin-spacer` que insere no DOM. Ao
 * desmontar a página, o React remove apenas o nó mais externo de cada subárvore
 * apagada: aqui, a `<section>`. Se a ancorada for a própria section, o pai dela
 * passa a ser o spacer, o React procura no pai antigo e falha com
 * "NotFoundError: The object can not be found here". Ancorando um filho, a
 * section mantém o pai original, o React a remove sem erro e o spacer sai
 * junto, dentro dela.
 *
 * `position: sticky` foi tentado como alternativa e não serve: o
 * `#smooth-wrapper` do ScrollSmoother tem `overflow: hidden`, o que desativa
 * sticky em toda a subárvore. Daí não haver trava nenhuma e sobrar a altura
 * reservada para uma âncora que nunca prendia.
 *
 * Sem JS, em tela estreita ou com movimento reduzido, o trilho continua um
 * carrossel rolável de verdade.
 */
export function Method() {
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!pin || !viewport || !track) return

    const mm = gsap.matchMedia()

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // `offsetWidth` do trilho, e não `scrollWidth` do contêiner: num
        // contêiner de scroll flex, os navegadores descartam o padding final ao
        // calcular `scrollWidth`, e o último cartão parava colado na borda.
        const distance = () =>
          Math.max(0, track.offsetWidth - viewport.clientWidth)

        if (distance() === 0) return

        // Com o trilho movido por transform, o scroll nativo do contêiner
        // sairia de sincronia. Os dois ficam desligados durante a âncora.
        gsap.set(viewport, { overflow: "hidden", scrollSnapType: "none" })

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            // Gatilho e elemento ancorado são o mesmo bloco interno. O
            // `pin-spacer` nasce aqui dentro e nunca envolve a section.
            trigger: pin,
            pin: true,
            // Prende quando o trilho chega ao centro da tela. Como ele é mais
            // baixo que a janela, ancorar pelo topo deixaria um vão acima.
            start: "center center",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section className="border-t border-border py-28 md:py-40">
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

      <div ref={pinRef} className="mt-20">
        {/* Contêiner de scroll e trilho separados: um só elemento acumulando as
            duas funções faz o navegador ignorar o padding final na medição. */}
        <div
          ref={viewportRef}
          className="snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol ref={trackRef} className="flex w-max gap-6 px-6 md:px-12 lg:px-20">
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

                {/* Barra de progresso: preenche conforme avança na série. */}
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
        </div>
      </div>
    </section>
  )
}
