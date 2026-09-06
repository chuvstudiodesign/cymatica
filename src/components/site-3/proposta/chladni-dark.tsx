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
 * A placa de Chladni sobre fundo escuro.
 *
 * É a mesma cena da home — `components/site/chladni/chladni-scene` —, com o
 * mesmo gancho de scroll (`top bottom` → `bottom top`, com scrub), a mesma
 * reação ao ponteiro e os mesmos parâmetros de acento. O campo de grãos em DOM
 * que existia aqui antes foi aposentado: aquele era uma reconstrução da figura
 * em `transform`, não a placa de verdade.
 *
 * Este arquivo é uma cópia deliberada de `site-3/chladni-light.tsx`, e não uma
 * refatoração dele em componente compartilhado: `chladni-light` é usado pela
 * home, e generalizá-lo mexeria numa página que não faz parte desta tarefa.
 * Duplicar 80 linhas é mais barato do que arriscar a home.
 *
 * O que muda em relação à versão clara, e só isto:
 *
 *  - a placa é monocromática, sem o acento laranja. Grão em cinza, linhas
 *    nodais em branco cheio: a figura emerge do contraste entre os dois, não
 *    de mudança de matiz, e a dobra fica livre para o laranja do CTA.
 *  - os tokens são `--proposta-placa-*`, definidos em hexadecimal no
 *    `site.css`. O motivo está documentado lá: `resolveTokenColor` não
 *    consegue ler os tokens em `oklch()`, que o navegador computa para
 *    `lab()`.
 *  - a imagem de reserva é a `chladni-static.webp`, que é a renderização
 *    escura do mesmo padrão. A `chladni-light.webp` tem grão grafite e
 *    desapareceria no canvas preto.
 */
type ChladniDarkProps = {
  className?: string
  /**
   * Quem dirige a figura. Sem isto, ela segue o scroll.
   *
   * A demonstração da automação passa o próprio: lá a placa responde ao
   * pedido do cliente, e é essa causalidade que carrega o sentido — seguir o
   * scroll ali seria coincidência, não argumento.
   */
  progress?: React.RefObject<number>
  grainToken?: string
  nodeToken?: string
  /** Imagem de reserva, para movimento reduzido e para quem não tem WebGL. */
  staticSrc?: string
}

export function ChladniDark({
  className,
  progress: progressoExterno,
  grainToken = "--proposta-placa-grao",
  nodeToken = "--proposta-placa-no",
  staticSrc = "/brand/chladni-static.webp",
}: ChladniDarkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const proprio = useRef(0)
  const progress = progressoExterno ?? proprio
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode)

  useEffect(() => {
    // Progresso vindo de fora dispensa o gancho de scroll.
    if (progressoExterno) return
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
  }, [mode, progressoExterno, progress])

  return (
    <div ref={containerRef} className={cn("relative aspect-square", className)}>
      {mode === "animated" ? (
        <ChladniScene
          progress={progress}
          className="size-full"
          grainToken={grainToken}
          nodeToken={nodeToken}
          accentGamma={3.5}
          grainOpacity={0.9}
        />
      ) : mode === "static" ? (
        <Image
          src={staticSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
        />
      ) : null}
    </div>
  )
}
