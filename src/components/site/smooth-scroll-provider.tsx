"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * Instala o scroll suave e a revelação por scroll de todo o site.
 *
 * O ScrollSmoother exige a estrutura `#smooth-wrapper > #smooth-content`, que
 * o layout monta. Elementos fixos (cabeçalho, CTA flutuante) ficam FORA do
 * wrapper — dentro dele o `position: fixed` deixa de grudar.
 *
 * Com `prefers-reduced-motion` nada disso é criado: a página vira um documento
 * comum, com o scroll nativo do navegador e o conteúdo já visível.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      document.documentElement.setAttribute("data-reveal-ready", "")
      return
    }

    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        // No toque, o scroll nativo é melhor que qualquer interpolação.
        smoothTouch: false,
        normalizeScroll: true,
      })

      // A revelação é declarativa: qualquer elemento com [data-reveal] entra.
      // `data-reveal-delay` escalona irmãos sem precisar de JS por seção.
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]")
      targets.forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0)
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        })
      })

      document.documentElement.setAttribute("data-reveal-ready", "")
    })

    return () => {
      ctx.revert()
      smootherRef.current = null
      document.documentElement.removeAttribute("data-reveal-ready")
    }
    // Remonta a cada navegação: os alvos da rota anterior deixam de existir e
    // triggers órfãos degradariam o scroll ao longo da sessão.
  }, [pathname])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
