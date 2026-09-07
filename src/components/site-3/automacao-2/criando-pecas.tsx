"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp } from "lucide-react"

import { CymaticaMark } from "@/components/site/cymatica-mark"
import {
  PecaApresentacao,
  PecaMotion,
  PecaPost,
  PecaSite,
} from "@/components/site-3/automacao-2/pecas"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * O pulo do gato: o cliente pede, e a peça aparece.
 *
 * Chat à esquerda, entrega à direita, um pedido por sistema vendido — mídia
 * social, apresentação, motion e site. É a seção que fecha o argumento: as
 * duas cenas anteriores mostram como o sistema é montado; esta mostra o que
 * ele faz depois de montado.
 *
 * As peças são desenhadas de verdade, no design system da Cymatica (ver
 * `pecas.tsx`). Um wireframe cinza aqui destruiria a promessa da página, que é
 * material com qualidade de design.
 *
 * A cena roda em laço, e aqui isso é certo: são quatro pedidos, e o leitor que
 * chega no meio precisa poder ver o ciclo inteiro sem recarregar. É o oposto
 * da demonstração do herói, que é única e pontual.
 */

const PEDIDOS = [
  { prompt: "Cria um post de Dia dos Pais", Peca: PecaPost },
  { prompt: "Agora uma apresentação comercial", Peca: PecaApresentacao },
  { prompt: "Um vídeo em motion para a campanha", Peca: PecaMotion },
  { prompt: "E um site, com o herói pronto", Peca: PecaSite },
] as const

export function CriandoPecas({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const campo = root.querySelector<HTMLElement>("[data-campo]")
    const pecas = root.querySelectorAll<HTMLElement>("[data-peca]")
    const textos = PEDIDOS.map((p) => p.prompt)

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sem movimento: o primeiro pedido escrito e a primeira peça na tela.
      if (campo) campo.textContent = textos[0]
      gsap.set(pecas[0], { opacity: 1, y: 0 })
      gsap.set(root.querySelectorAll("[data-cursor]"), { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
        repeat: -1,
      })

      textos.forEach((texto, i) => {
        const estado = { n: 0 }
        tl.set("[data-cursor]", { opacity: 1 })
          .to(estado, {
            n: texto.length,
            duration: texto.length * 0.028,
            ease: "none",
            onUpdate: () => {
              if (campo) campo.textContent = texto.slice(0, Math.round(estado.n))
            },
          })
          .to("[data-cursor]", { opacity: 0, duration: 0.1 }, "+=0.25")
          // A peça sobe para o lugar. A anterior sai antes, para nunca haver
          // duas na tela disputando a atenção.
          .to(pecas[(i + textos.length - 1) % textos.length], {
            opacity: 0,
            y: -14,
            duration: 0.3,
            ease: "power2.in",
          })
          .fromTo(
            pecas[i],
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              // Sem isto o GSAP aplica o estado "from" no instante em que a
              // linha do tempo é montada, e as quatro peças iam a zero antes
              // de a cena sequer começar — a primeira sumia junto.
              immediateRender: false,
            }
          )
          .to({}, { duration: 1.9 })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid gap-8 rounded-2xl border border-border p-5 sm:p-8 lg:grid-cols-[1fr_16rem] lg:items-center",
        className
      )}
    >
      {/* O pedido */}
      <div className="flex flex-col justify-center" aria-hidden>
        <div className="flex items-center gap-2">
          <CymaticaMark variant="arcs" className="size-4 text-primary" />
          <span className="site-label text-muted-foreground">
            Sistema de criação
          </span>
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-border px-5 py-4">
          <p className="min-h-[1.5em] flex-1 text-pretty">
            <span data-campo="" />
            <span
              data-cursor=""
              className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.18em] bg-foreground"
            />
          </p>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background">
            <ArrowUp className="size-4" />
          </span>
        </div>

        <p className="mt-5 max-w-[44ch] text-pretty text-sm text-muted-foreground">
          Cada peça sai no seu padrão, pronta para publicar. Você pede a
          próxima sem esperar ninguém.
        </p>
      </div>

      {/* A entrega. As quatro ocupam o mesmo lugar; só uma aparece por vez. */}
      <div className="relative mx-auto w-full max-w-[16rem]">
        <div className="aspect-4/5 w-full">
          {PEDIDOS.map(({ prompt, Peca }, i) => (
            <div
              key={prompt}
              data-peca=""
              className={cn(
                "absolute inset-0",
                i === 0 ? "opacity-100" : "opacity-0"
              )}
            >
              <Peca />
            </div>
          ))}
        </div>
      </div>

      {/* A cena inteira, para quem usa leitor de tela. */}
      <p className="sr-only">
        Demonstração: um pedido escrito devolve a peça pronta no padrão da
        marca. {PEDIDOS.map((p) => p.prompt).join(". ")}.
      </p>
    </div>
  )
}
