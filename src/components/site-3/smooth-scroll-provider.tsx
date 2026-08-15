"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * Scroll suave e coreografia de revelação de todo o /site-3.
 *
 * Diferenças em relação à primeira versão:
 *
 * - `normalizeScroll` desligado. Ele sequestra a roda do mouse para uniformizar
 *   o comportamento entre navegadores, e nisso quebra qualquer contêiner de
 *   scroll aninhado — foi a causa do trilho das etapas travando.
 * - Elementos com `data-parallax` ganham deslocamento proporcional ao scroll,
 *   via `effects` do ScrollSmoother.
 * - Revelação com escalonamento por lote: irmãos que entram juntos na tela são
 *   animados em sequência, o que dá ritmo sem precisar de delay manual.
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
        smooth: 1.15,
        effects: true,
        smoothTouch: false,
      })

      // Revelação em lote: o ScrollTrigger agrupa o que entra na mesma janela
      // e escalona automaticamente, em vez de cada elemento animar sozinho.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.07,
            overwrite: true,
          }),
      })

      // Elementos individuais podem pedir um atraso próprio.
      gsap.utils.toArray<HTMLElement>("[data-reveal-delay]").forEach((el) => {
        const delay = Number(el.dataset.revealDelay)
        if (delay) gsap.set(el, { transitionDelay: `${delay}s` })
      })

      document.documentElement.setAttribute("data-reveal-ready", "")
      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      smootherRef.current = null
      document.documentElement.removeAttribute("data-reveal-ready")
    }
  }, [pathname])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
