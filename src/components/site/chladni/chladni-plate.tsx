"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const ChladniScene = dynamic(() => import("./chladni-scene"), { ssr: false })

/** Testado uma vez só: criar contexto WebGL a cada render seria caro. */
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

function getMode(): Mode {
  return window.matchMedia(REDUCED_MOTION).matches || !supportsWebGL()
    ? "static"
    : "animated"
}

/** No servidor não há como saber — nada é renderizado até o cliente decidir. */
const getServerMode = (): Mode => "pending"

/**
 * A placa de Chladni do herói.
 *
 * Três níveis de degradação, decididos antes de montar o canvas:
 *   1. sem WebGL            → imagem estática do padrão
 *   2. movimento reduzido   → imagem estática do padrão
 *   3. tudo disponível      → cena animada, reagindo a cursor e scroll
 *
 * O progresso do scroll é lido pelo ScrollTrigger — dono único da posição —
 * e escrito num ref. A cena consome esse ref, sem criar um segundo listener
 * que dessincronizaria do scroll suave.
 */
export function ChladniPlate({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  // A preferência de movimento é um sistema externo, e pode mudar durante a
  // sessão — `useSyncExternalStore` acompanha isso sem efeito nem re-render
  // em cascata.
  const mode = useSyncExternalStore(subscribe, getMode, getServerMode)

  useEffect(() => {
    if (mode !== "animated" || !containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=250%",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [mode])

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)}>
      {mode === "animated" ? (
        <ChladniScene progress={progress} className="size-full" />
      ) : mode === "static" ? (
        <Image
          src="/brand/chladni-static.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain opacity-80"
        />
      ) : null}
    </div>
  )
}
