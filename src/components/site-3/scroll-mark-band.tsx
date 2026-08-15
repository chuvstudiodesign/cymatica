"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"
import { markPaths } from "@/components/site/mark-paths"

gsap.registerPlugin(ScrollTrigger)

/**
 * Faixa de símbolos que responde ao scroll. Existe só no mobile.
 *
 * No desktop o herói tem a marca reagindo ao ponteiro e o wordmark deformando
 * sob o cursor. No toque não há nenhum dos dois, e aquela área ficava um bloco
 * preto inerte. Aqui o gesto que o usuário de fato tem, o scroll, vira o
 * controle.
 *
 * O que se move não é enfeite: são as quatro variantes oficiais do símbolo, que
 * são a mesma figura de Chladni em modos de vibração diferentes. Rolar a
 * página muda a frequência e o padrão se reorganiza, que é literalmente o
 * conceito da marca. Nenhuma biblioteca traria isso, porque o material é da
 * própria Cymatica.
 *
 * A faixa desliza na horizontal enquanto a página desce, e os símbolos giram
 * proporcionalmente. Tudo em transform, sem tocar em layout.
 */
const ORDEM = ["plate", "star", "arcs", "nodes", "plate", "star", "arcs"] as const

export function ScrollMarkBand({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trilho = container.querySelector<HTMLElement>("[data-trilho]")
      const marcas = gsap.utils.toArray<SVGElement>("[data-marca]", container)
      if (!trilho) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          // Percorre desde a entrada até a saída da faixa na tela, então o
          // movimento acompanha o dedo durante todo o trajeto.
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      })

      tl.fromTo(trilho, { xPercent: 4 }, { xPercent: -30, ease: "none" }, 0)
      tl.fromTo(marcas, { rotate: -18 }, { rotate: 18, ease: "none" }, 0)

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative overflow-hidden py-10", className)}
    >
      {/* Régua de referência atrás da faixa, no espírito de instrumento. */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />

      <div data-trilho className="relative flex items-center gap-10 will-change-transform">
        {ORDEM.map((variante, i) => (
          <svg
            key={i}
            data-marca
            viewBox="0 0 100 100"
            className={cn(
              "size-16 shrink-0",
              // Um único símbolo em laranja, para a faixa ter um ponto de
              // atenção sem virar uma fileira acesa.
              i === 1 ? "text-primary" : "text-ink-700"
            )}
            fill="currentColor"
          >
            {markPaths[variante].map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        ))}
      </div>
    </div>
  )
}
