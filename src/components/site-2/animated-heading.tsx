"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, SplitText)

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3" | "p"
  children: React.ReactNode
  className?: string
  /** Atraso extra, para escalonar em relação a outros elementos da seção. */
  delay?: number
  stagger?: number
}

/**
 * Título revelado linha a linha, subindo de trás de uma máscara.
 *
 * É o gesto que separa um site de estúdio de um site comum: em vez de o texto
 * aparecer por opacidade, cada linha emerge de baixo, como se estivesse
 * escondida atrás da própria caixa. O `mask: "lines"` do SplitText cria o
 * contêiner de recorte para isso.
 *
 * O texto original permanece no DOM durante a divisão, então leitor de tela e
 * busca continuam vendo a frase inteira.
 */
export function AnimatedHeading({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  stagger = 0.09,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { opacity: 1 })
      return
    }

    let split: SplitText | null = null
    const ctx = gsap.context(() => {})

    // A divisão em linhas depende da métrica final da fonte. Dividir antes de
    // a Figtree carregar produz quebras erradas que ficam congeladas.
    const run = () => {
      ctx.add(() => {
        try {
          split = SplitText.create(element, { type: "lines", mask: "lines" })
          gsap.from(split.lines, {
            yPercent: 115,
            duration: 0.95,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          })
        } catch {
          // Título ilegível é pior que título sem animação.
        } finally {
          gsap.set(element, { opacity: 1 })
        }
      })
    }

    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) run()
    })

    return () => {
      cancelled = true
      ctx.revert()
      split?.revert()
    }
  }, [delay, stagger])

  return (
    // Começa invisível para não haver salto entre o texto plano e as linhas já
    // divididas; o CSS devolve a opacidade se o JS não rodar.
    <Tag ref={ref} className={cn("opacity-0 [.no-js_&]:opacity-100", className)}>
      {children}
    </Tag>
  )
}
