"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Container, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { method } from "@/lib/site-3/content"

gsap.registerPlugin(ScrollTrigger)

/**
 * O método em cinco etapas, percorridas na horizontal enquanto a seção fica
 * ancorada.
 *
 * A âncora é `position: sticky` do CSS, e não o `pin` do ScrollTrigger.
 *
 * O `pin` envolve o elemento num `pin-spacer` que ele insere no DOM, e isso
 * quebra o React: ao navegar, ele tenta remover a section do pai original, que
 * já não é mais o pai, e falha com "NotFoundError: The object can not be found
 * here". Sincronizar melhor a limpeza só mudava o momento do problema.
 *
 * Com sticky, o ScrollTrigger não encosta na estrutura da página: apenas lê a
 * posição do scroll e escreve `transform` no trilho. Nada é inserido, nada é
 * movido, e não há o que dessincronizar com o React.
 *
 * A altura extra que sustenta a âncora vem de `--trilho`, variável CSS escrita
 * pelo efeito. Sem JS, em tela estreita ou com movimento reduzido, ela fica
 * zerada e a seção vira um carrossel rolável comum.
 */
export function Method() {
  const outerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!outer || !viewport || !track) return

    const mm = gsap.matchMedia()

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // `offsetWidth` do trilho, e não `scrollWidth` do contêiner: num
        // contêiner de scroll flex, os navegadores descartam o padding final ao
        // calcular `scrollWidth`, e o último cartão parava colado na borda.
        const distance = () =>
          Math.max(0, track.offsetWidth - viewport.clientWidth)

        const aplicarAltura = () =>
          outer.style.setProperty("--trilho", `${distance()}px`)

        aplicarAltura()
        gsap.set(viewport, { overflow: "hidden", scrollSnapType: "none" })

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: aplicarAltura,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          outer.style.removeProperty("--trilho")
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

      {/* A altura extra é o curso da âncora: quanto mais largo o trilho, mais
          scroll a seção segura antes de soltar. */}
      <div
        ref={outerRef}
        className="relative mt-20 lg:h-[calc(100svh+var(--trilho,0px))]"
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
          {/* Contêiner de scroll e trilho separados: um só elemento acumulando
              as duas funções faz o navegador ignorar o padding final. */}
          <div
            ref={viewportRef}
            className="w-full snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      </div>
    </section>
  )
}
