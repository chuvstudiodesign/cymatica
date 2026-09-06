"use client"

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * Campo de grãos que assenta nas linhas nodais da placa.
 *
 * É o único momento dramático da página, e está na seção que carrega o
 * argumento: o mesmo material, organizado, vale mais. Grãos espalhados ao
 * acaso migram para a figura exata quando a seção entra na tela. Caos vira
 * ordem, e a ordem é função da frequência.
 *
 * Não é efeito inventado. A equação e o laço de relaxação são os mesmos do
 * `chladni-shader.ts` que roda em WebGL na seção de IA da home:
 *
 *     f(x,y) = a·sin(πmx)·sin(πny) + b·sin(πnx)·sin(πmy)
 *
 * A placa e este campo desenham a mesma figura; muda só o suporte. Aqui é DOM
 * puro, sem WebGL, sem canvas e sem dependência nova: nós escrevendo
 * `transform` durante 1,2s, uma vez, e nunca mais.
 *
 * Fica na coluna vazia à esquerda, e não atrás do texto: centralizado, os
 * grãos caíam sobre os parágrafos e liam como sujeira na tela em vez de
 * figura. Só a partir de `lg`, onde existe essa coluna — no celular o texto
 * ocupa a largura toda e não há lugar para a placa que não seja em cima
 * dele.
 *
 * Inteiramente decorativo. `aria-hidden`, sem texto, e ausente quando não há
 * JavaScript. Nada de informação vive aqui.
 */

/**
 * O modo de vibração é o do logotipo, não um qualquer.
 *
 * `m=4, n=5` produzia uma malha de ~18 linhas nodais cruzadas. Com 150 grãos
 * sobravam oito por linha, e o campo não resolvia em figura: resolvia em
 * poeira, que é exatamente a "partícula aleatória" que a marca proíbe.
 *
 * `m=3, n=2` é o modo que `chladni-scene.tsx` usa como forma do símbolo —
 * quatro quadrantes lobados com arcos nos cantos. Linhas muito mais grossas,
 * legíveis com esta contagem. A dobra do argumento passa a desenhar a própria
 * marca em areia enquanto o texto defende a tese.
 */
const M = 3
const N = 2
/** Lado da grade de semeadura. 46² = 2116 candidatos, dos quais sobram ~430. */
const LADO = 46
/** Quão perto da curva o grão precisa parar para ser aceito. */
const TOLERANCIA = 0.012
/** Espaçamento mínimo entre dois grãos, para a linha não empelotar. */
const MIN_DIST = 0.028

const f = (x: number, y: number) =>
  Math.sin(Math.PI * M * x) * Math.sin(Math.PI * N * y) -
  Math.sin(Math.PI * N * x) * Math.sin(Math.PI * M * y)

function gradiente(x: number, y: number): [number, number] {
  const e = 0.0015
  return [
    (f(x + e, y) - f(x - e, y)) / (2 * e),
    (f(x, y + e) - f(x, y - e)) / (2 * e),
  ]
}

/** Newton em direção à curva f = 0. Oito passos bastam para convergir. */
function assentar(x: number, y: number): [number, number] {
  for (let i = 0; i < 8; i += 1) {
    const v = f(x, y)
    const [gx, gy] = gradiente(x, y)
    const gg = gx * gx + gy * gy
    if (gg < 1e-5) break
    x = Math.min(1, Math.max(-1, x - ((v * gx) / gg) * 0.9))
    y = Math.min(1, Math.max(-1, y - ((v * gy) / gg) * 0.9))
  }
  return [x, y]
}

/** Ruído determinístico: servidor e cliente precisam gerar o mesmo campo. */
function ruido(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

/**
 * Distância do ponto à curva nodal mais próxima, normalizada pelo gradiente.
 *
 * `f` cresce rápido longe da curva, então `|f|` sozinho não diz distância.
 * Dividir pelo módulo do gradiente converte para distância aproximada — é o
 * que permite descartar o grão que "assentou" num lugar onde a curva nem
 * passa, que era metade do defeito visual.
 */
function distancia(x: number, y: number) {
  const [gx, gy] = gradiente(x, y)
  const g = Math.hypot(gx, gy)
  return g < 1e-6 ? Infinity : Math.abs(f(x, y)) / g
}

const LARGA = "(min-width: 1024px)"

/**
 * Se a placa cabe na tela — a mesma largura do `lg:block` que a revela.
 *
 * `useSyncExternalStore` e não estado com efeito: o instantâneo do servidor é
 * `false`, então os grãos nunca saem no HTML, e no cliente o valor já chega
 * certo na primeira renderização, sem um segundo passe. É o mesmo padrão que
 * `proposal-modal.tsx` usa para detectar o smoother.
 */
function useTelaLarga() {
  return useSyncExternalStore(
    (onChange) => {
      const q = window.matchMedia(LARGA)
      q.addEventListener("change", onChange)
      return () => q.removeEventListener("change", onChange)
    },
    () => window.matchMedia(LARGA).matches,
    () => false
  )
}

export function NodalField({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  /**
   * Os grãos não existem no HTML do servidor.
   *
   * São 260 spans `aria-hidden`, ~30KB, que não dizem nada a ninguém e ficam
   * invisíveis até o JavaScript rodar — 21% do documento, na frente do LCP, e
   * enviados até para o celular, onde a placa está `hidden`. Montar só no
   * cliente tira esse peso do caminho crítico sem mudar nada na tela.
   */
  const montado = useTelaLarga()

  /**
   * Ordenado pela distância entre o ponto de repouso e o centro. Com essa
   * ordem, o stagger linear do GSAP já lê como propagação do centro para as
   * bordas, sem precisar de `from: "center"` numa grade que não é grade.
   */
  const grains = useMemo(() => {
    /**
     * Semeadura em grade, não em ruído.
     *
     * Sortear posições e empurrar cada uma para a curva deixava a linha
     * grossa em alguns trechos e vazada em outros — a olho, lia como grão
     * desalinhado e não como figura. Partindo de uma grade regular, cada
     * célula contribui com no máximo um grão e o espaçamento ao longo da
     * curva fica parelho. O jitter mínimo só evita que a amostra pareça
     * milimetrada demais.
     */
    const out: { x0: number; y0: number; x1: number; y1: number; r: number }[] = []
    for (let i = 0; i < LADO; i += 1) {
      for (let j = 0; j < LADO; j += 1) {
        const jx = (ruido(i * LADO + j) - 0.5) * (2 / LADO) * 0.5
        const jy = (ruido((i * LADO + j) * 2 + 7) - 0.5) * (2 / LADO) * 0.5
        const sx = ((i + 0.5) / LADO) * 2 - 1 + jx
        const sy = ((j + 0.5) / LADO) * 2 - 1 + jy
        const [x1, y1] = assentar(sx, sy)
        // Só fica quem realmente pousou sobre uma linha nodal.
        if (distancia(x1, y1) > TOLERANCIA) continue
        // Descarta quem colidiu com um grão já assentado: dois pontos no
        // mesmo lugar viram um borrão e roubam densidade do resto da curva.
        if (out.some((g) => Math.hypot(g.x1 - x1, g.y1 - y1) < MIN_DIST)) continue
        out.push({ x0: sx, y0: sy, x1, y1, r: Math.hypot(x1, y1) })
      }
    }
    return out.sort((a, b) => a.r - b.r)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const plate = plateRef.current
    if (!root || !plate) return

    const half = () => plate.clientWidth / 2
    const at = (el: Element) => grains[Number((el as HTMLElement).dataset.grain)]

    const toX = (_: number, el: Element) => at(el).x1 * half()
    const toY = (_: number, el: Element) => at(el).y1 * half()
    const fromX = (_: number, el: Element) => at(el).x0 * half()
    const fromY = (_: number, el: Element) => at(el).y0 * half()

    let settled = false
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      const all = gsap.utils.toArray<HTMLElement>("[data-grain]")

      mm.add(
        {
          // Alinhado ao `lg:block` da placa. Abaixo disso ela está `hidden`,
          // então não há o que coreografar — e nenhum grão é sequer montado.
          visivel: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { visivel, reduced } = context.conditions as {
            visivel: boolean
            reduced: boolean
          }
          if (!visivel) return

          const active = all

          if (reduced) {
            // Sem migração: a figura já chega formada e só acende.
            gsap.set(active, { x: toX, y: toY })
            gsap.to(active, {
              opacity: 1,
              duration: 0.2,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top 85%", once: true },
            })
            settled = true
            return
          }

          gsap.set(active, { x: fromX, y: fromY })

          gsap
            .timeline({
              scrollTrigger: { trigger: root, start: "top 70%", once: true },
              // `will-change` num lote só, e removido no fim: deixá-lo fixo em
              // 150 nós consome memória de GPU pelo resto da sessão.
              onStart: () => gsap.set(active, { willChange: "transform" }),
              onComplete: () => {
                gsap.set(active, { willChange: "auto" })
                settled = true
              },
            })
            .to(active, {
              opacity: 1,
              duration: 0.4,
              ease: "none",
              stagger: { amount: 0.25 },
            })
            .to(
              active,
              {
                x: toX,
                y: toY,
                duration: 1.2,
                ease: "expo.out",
                stagger: { amount: 0.55 },
              },
              "-=0.15"
            )
        }
      )

      // Redimensionar reposiciona sem reanimar: a figura é relativa ao lado da
      // placa, e reanimar a cada arraste de janela seria movimento sem causa.
      const observer = new ResizeObserver(() => {
        if (!settled) return
        gsap.set(all, { x: toX, y: toY })
      })
      observer.observe(plate)
      return () => observer.disconnect()
    }, rootRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [grains, montado])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        ref={plateRef}
        className="absolute top-1/2 left-0 hidden size-[380px] -translate-y-1/2 lg:block"
      >
        {montado &&
          grains.map((_, i) => (
          <span
            key={i}
            data-grain={i}
            className={cn(
              "absolute top-1/2 left-1/2 rounded-full opacity-0",
              // O grão que assenta mais perto do centro é o ponto nodal do
              // símbolo. É o único laranja desta dobra.
              i === 0 ? "size-[6px] bg-brand-500" : "size-[2px] bg-foreground/40"
              )}
            />
          ))}
      </div>
    </div>
  )
}
