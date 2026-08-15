"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, SplitText)

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3" | "p"
  /** Texto puro. Ver a nota sobre `dangerouslySetInnerHTML` abaixo. */
  children: string
  className?: string
  /** Atraso extra, para escalonar em relação a outros elementos da seção. */
  delay?: number
  stagger?: number
}

const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

/**
 * Título revelado linha a linha, subindo de trás de uma máscara.
 *
 * Em vez de o texto aparecer por opacidade, cada linha emerge de baixo, como
 * se estivesse escondida atrás da própria caixa. O `mask: "lines"` do SplitText
 * cria o contêiner de recorte para isso.
 *
 * Sobre o `dangerouslySetInnerHTML`: o SplitText reescreve os filhos do
 * elemento, e ao desfazer recria os nós de texto do zero. O React continua
 * guardando referência aos nós originais, que a essa altura estão órfãos, e
 * quebra ao tentar removê-los na navegação com
 * "NotFoundError: The object can not be found here".
 *
 * Marcar a subárvore como HTML bruto resolve na raiz: o React passa a tratá-la
 * como opaca, nunca percorre os filhos e, ao desmontar, remove apenas o
 * elemento externo, que é dele. O texto continua presente no HTML do servidor,
 * então busca e leitor de tela não perdem nada. O conteúdo vem do arquivo de
 * copy do próprio site e ainda assim é escapado.
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
    let cancelled = false

    // A divisão em linhas depende da métrica final da fonte. Dividir antes de
    // a Figtree carregar produz quebras erradas que ficam congeladas.
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return
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

    return () => {
      cancelled = true
      // A ordem importa: desfazer a divisão devolve o elemento ao estado que o
      // React conhece antes que ele seja desmontado.
      split?.revert()
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill())
    }
  }, [delay, stagger])

  return (
    <Tag
      ref={ref}
      className={cn("opacity-0 [.no-js_&]:opacity-100", className)}
      dangerouslySetInnerHTML={{ __html: escapar(children) }}
    />
  )
}
