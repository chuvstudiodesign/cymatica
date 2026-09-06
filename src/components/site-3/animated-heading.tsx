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

    /**
     * A divisão em linhas depende da métrica final da fonte: dividir antes de
     * a Figtree carregar produz quebras erradas que ficam congeladas.
     *
     * Mas esperar `document.fonts.ready` sem teto custava caro. O título nasce
     * em `opacity-0`, e num carregamento lento ele ficava invisível enquanto a
     * fonte não chegasse — medido em 4094ms com a `.woff2` atrasada em 4s. Isso
     * anula o `display: swap` justamente no maior texto da dobra: o navegador
     * pinta na fonte de reserva e o nosso CSS esconde assim mesmo.
     *
     * Com o teto de 300ms, o pior caso vira "aparece na fonte de reserva e a
     * quebra é recalculada quando a real chega" — que é o comportamento que o
     * `swap` promete. O caso normal não muda: a fonte local resolve em poucos
     * milissegundos e a corrida termina no `fonts.ready` mesmo.
     */
    const fontesProntas = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 300)),
    ])

    fontesProntas.then(() => {
      if (cancelled || !ref.current) return
      try {
        split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          // Sem `linesClass` o SplitText não dá classe nenhuma à linha, e a
          // máscara — que é um clone dela — também sai sem classe. Nomear a
          // linha é o que nos deixa alcançar a máscara pelo CSS, em
          // `.site-line-mask`, para alargar a área de recorte.
          linesClass: "site-line",
        })
        // Ver `.is-split` no site.css: segura as margens negativas das
        // máscaras, que colapsariam entre si num contexto de bloco.
        element.classList.add("is-split")
        gsap.from(split.lines, {
          // 135 e não 115 porque a máscara agora recorta 0.2em além da caixa
          // de linha. A linha precisa começar abaixo dessa borda maior, senão
          // aparece um naco dela antes de a animação começar.
          yPercent: 135,
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
      element.classList.remove("is-split")
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
