"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type CountUpProps = {
  /** Texto final, como "48h" ou "100%". Só a parte numérica é animada. */
  value: string
  className?: string
}

/**
 * Contagem crescente até o número final quando o elemento entra na tela.
 *
 * Aceita o valor já formatado ("48h", "3 min", "100%") e anima apenas os
 * dígitos, preservando prefixo e sufixo. O valor final fica no DOM desde o
 * início para leitor de tela — a animação acontece num nó separado.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/)
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const [, prefix, digits, suffix] = match
    const target = Number(digits.replace(",", "."))
    const decimals = digits.includes(",") || digits.includes(".") ? 1 : 0
    const counter = { current: 0 }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        current: target,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
        onUpdate: () => {
          const shown = counter.current.toFixed(decimals).replace(".", ",")
          element.textContent = `${prefix}${shown}${suffix}`
        },
        onComplete: () => {
          element.textContent = value
        },
      })
    }, element)

    return () => {
      ctx.revert()
      element.textContent = value
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
