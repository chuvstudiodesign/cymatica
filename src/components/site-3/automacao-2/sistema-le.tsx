"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

import { CymaticaMark } from "@/components/site/cymatica-mark"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * O passo 2, desenhado: o sistema de criação lendo o design system.
 *
 * A esquerda é o mesmo mosaico do passo 1, condensado. As peças se juntam num
 * maço — o gesto de agrupar arquivos — e atravessam para o chat da direita.
 * Quando chegam, o chat passa a produzir.
 *
 * O que a cena precisa provar é uma coisa só, e é a que o cliente não acredita
 * de graça: **a máquina não inventa um estilo, ela lê o seu.** Por isso o
 * movimento vai da marca para o chat, e nunca o contrário.
 *
 * A digitação da direita não escreve frase legível de propósito. Uma frase ali
 * disputaria leitura com a legenda e com o que vem depois; o que importa é o
 * gesto de estar processando.
 */

/** As peças que viajam. Miniaturas do que o mosaico mostra por inteiro. */
const PECAS = [
  { id: "logo", className: "bg-primary" },
  { id: "cor", className: "bg-foreground" },
  { id: "tipo", className: "border border-border bg-card" },
  { id: "comp", className: "border border-border bg-card" },
] as const

export function SistemaLe({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduzido) {
      // Sem movimento, a cena vira o estado final: as peças já chegaram e o
      // chat já está trabalhando. A informação é a mesma; só não se vê o
      // caminho.
      gsap.set(root.querySelectorAll("[data-peca]"), { opacity: 0 })
      gsap.set(root.querySelectorAll("[data-status]"), { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
        repeat: -1,
        repeatDelay: 1.6,
      })

      const alvo = () => {
        const chat = root.querySelector<HTMLElement>("[data-chat]")
        const palco = root.querySelector<HTMLElement>("[data-palco]")
        if (!chat || !palco) return { x: 0, y: 0 }
        const c = chat.getBoundingClientRect()
        const p = palco.getBoundingClientRect()
        return { x: c.left - p.left + c.width / 2, y: c.top - p.top + c.height / 2 }
      }

      tl.set("[data-status]", { opacity: 0 })
        .set("[data-peca]", { opacity: 1, x: 0, y: 0, scale: 1 })
        // As peças se agrupam: param de ser quatro coisas e viram um maço.
        .to("[data-peca]", {
          x: (i) => [0, -14, -28, -42][i] ?? 0,
          y: (i) => [0, 4, 8, 12][i] ?? 0,
          scale: 0.92,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.04,
        })
        // E atravessam para o chat.
        .to("[data-peca]", {
          x: () => alvo().x,
          y: () => alvo().y,
          scale: 0.2,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          stagger: 0.05,
        })
        .to("[data-status]", { opacity: 1, duration: 0.35 }, "-=0.2")
        .to("[data-cursor]", {
          opacity: 0,
          duration: 0.45,
          repeat: 5,
          yoyo: true,
          ease: "none",
        })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn("w-full", className)}
      role="img"
      aria-label="Diagrama: as peças do design system são entregues ao sistema de criação, que passa a produzir a partir delas."
    >
      <div
        data-palco=""
        className="relative grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6 sm:p-8 lg:aspect-video"
      >
        {/* Esquerda — o design system, condensado. */}
        <div>
          <p className="site-label text-muted-foreground">Design system</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {PECAS.map((peca, i) => (
              <span
                key={peca.id}
                data-peca=""
                className={cn(
                  "flex aspect-4/3 items-center justify-center rounded-lg",
                  peca.className
                )}
              >
                {i === 0 && (
                  <CymaticaMark
                    variant="plate"
                    className="size-6 text-primary-foreground"
                  />
                )}
                {i === 2 && (
                  <span className="text-lg leading-none font-medium">Aa</span>
                )}
                {i === 3 && (
                  <span className="flex w-2/3 flex-col gap-1">
                    <span className="h-1 rounded-full bg-primary" />
                    <span className="h-1 rounded-full bg-muted-foreground/50" />
                    <span className="h-1 w-2/3 rounded-full bg-muted-foreground/30" />
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* O meio — a seta e a frase que explica a cena inteira. */}
        <div className="flex flex-col items-center gap-3 sm:max-w-[13rem]">
          <ArrowRight
            className="size-5 shrink-0 rotate-90 text-muted-foreground sm:rotate-0"
            aria-hidden
          />
          <p className="text-center text-pretty text-sm text-muted-foreground">
            O nosso sistema de criação lê o seu design system.
          </p>
        </div>

        {/* Direita — o sistema, trabalhando. */}
        <div
          data-chat=""
          className="rounded-xl border border-border bg-card p-4 sm:p-5"
        >
          <div className="flex items-center gap-2">
            <CymaticaMark variant="arcs" className="size-4 text-primary" />
            <span className="site-label text-muted-foreground">
              Sistema de criação
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <span className="h-2 w-4/5 rounded-full bg-muted-foreground/25" />
            <span className="h-2 w-3/5 rounded-full bg-muted-foreground/25" />
            <span className="flex items-center gap-1">
              <span className="h-2 w-2/5 rounded-full bg-muted-foreground/25" />
              <span
                data-cursor=""
                aria-hidden
                className="inline-block h-3 w-px bg-foreground"
              />
            </span>
          </div>

          <p
            data-status=""
            className="mt-6 border-t border-border pt-4 text-sm text-pretty opacity-0"
          >
            Criando a partir do seu design system.
          </p>
        </div>
      </div>
    </div>
  )
}
