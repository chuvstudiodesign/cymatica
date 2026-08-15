"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const ChladniScene = dynamic(() => import("@/components/site/chladni/chladni-scene"), {
  ssr: false,
})

let webglSupport: boolean | null = null
function supportsWebGL() {
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement("canvas")
    webglSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    )
  } catch {
    webglSupport = false
  }
  return webglSupport
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
type Mode = "pending" | "animated" | "static"

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getMode = (): Mode =>
  window.matchMedia(REDUCED_MOTION).matches || !supportsWebGL() ? "static" : "animated"
const getServerMode = (): Mode => "pending"

/**
 * A placa de Chladni sobre fundo claro.
 *
 * Na primeira versão ela ficava atrás do herói escuro, onde o laranja sobre
 * preto rendia pouco: o grão cinza sumia no fundo e o acento ficava opaco.
 *
 * Aqui o campo é escuro sobre branco — a areia lê como grafite sobre papel — e
 * as linhas nodais acendem em laranja cheio, que sobre branco fica muito mais
 * saturado. É a mesma equação; só o suporte mudou.
 *
 * As cores saem dos tokens lidos no contexto `.light`, então o componente não
 * carrega cor própria: quem define é a seção em que ele é colocado.
 */
export function ChladniLight({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode)

  useEffect(() => {
    if (mode !== "animated" || !containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [mode])

  return (
    <div ref={containerRef} className={cn("relative aspect-square", className)}>
      {mode === "animated" ? (
        <ChladniScene
          progress={progress}
          className="size-full"
          grainToken="--color-ink-700"
          nodeToken="--color-brand-500"
          accentGamma={3.5}
          grainOpacity={0.9}
        />
      ) : mode === "static" ? (
        // Versão clara do padrão: mesmo algoritmo do shader, grão em grafite
        // e gama de acento 3.5 — igual ao que a cena anima.
        <Image
          src="/brand/chladni-light.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-contain"
        />
      ) : null}
    </div>
  )
}
