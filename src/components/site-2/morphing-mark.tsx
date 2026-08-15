"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

import { cn } from "@/lib/utils"
import { markPaths } from "@/components/site/mark-paths"

/**
 * O símbolo da marca atravessando suas quatro variantes oficiais.
 *
 * As quatro não são enfeites: são a mesma figura de Chladni em modos de
 * vibração diferentes. Alternar entre elas é a marca mudando de frequência.
 *
 * A geometria vem do arquivo da marca como contorno **preenchido** — traçado já
 * convertido em forma. Por isso a transição não usa `stroke-dasharray`, que
 * desenharia o contorno do contorno: cada variante se monta por path, com
 * escala e opacidade escalonadas, e se desfaz do mesmo jeito. Lê como a areia
 * se reorganizando quando a frequência muda.
 */
const ORDER = ["star", "plate", "arcs", "nodes"] as const

const HOLD = 2.2
const FADE = 0.85

export function MorphingMark({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return

    const groups = Array.from(svg.querySelectorAll<SVGGElement>("[data-variant]"))
    if (groups.length === 0) return

    // Sem movimento, a figura completa fica parada — é a variante principal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      groups.forEach((group) =>
        gsap.set(group, { opacity: group.dataset.variant === "plate" ? 1 : 0 })
      )
      return
    }

    const ctx = gsap.context(() => {
      const paths = groups.map((group) =>
        Array.from(group.querySelectorAll<SVGPathElement>("path"))
      )

      gsap.set(groups, { opacity: 0, transformOrigin: "50% 50%" })
      gsap.set(paths.flat(), { opacity: 0, scale: 0.82, transformOrigin: "50% 50%" })

      const timeline = gsap.timeline({ repeat: -1 })

      groups.forEach((group, index) => {
        timeline
          .set(group, { opacity: 1 })
          .to(paths[index], {
            opacity: 1,
            scale: 1,
            duration: FADE,
            ease: "expo.out",
            stagger: 0.07,
          })
          .to({}, { duration: HOLD })
          .to(paths[index], {
            opacity: 0,
            scale: 1.14,
            duration: FADE * 0.8,
            ease: "power2.in",
            stagger: 0.05,
          })
          .set(group, { opacity: 0 })
          .set(paths[index], { scale: 0.82 })
      })
    }, svg)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
      className={cn("size-full", className)}
    >
      {ORDER.map((variant) => (
        <g key={variant} data-variant={variant}>
          {markPaths[variant].map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      ))}
    </svg>
  )
}
