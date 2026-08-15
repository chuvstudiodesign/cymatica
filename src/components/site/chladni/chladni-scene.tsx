"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { resolveTokenColor } from "@/lib/site/resolve-token-color"
import { chladniVertexShader, chladniFragmentShader } from "./chladni-shader"

/** PRNG determinístico — mesma semente, mesmo campo de grãos. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Modos de vibração pelos quais a placa passa conforme a página rola. */
const MODES: Array<[number, number]> = [
  [1, 2],
  [3, 2],
  [4, 5],
  [6, 3],
  [5, 8],
]

type Palette = {
  /** Token da cor do grão assentado. */
  grainToken: string
  /** Token da cor das linhas nodais — o acento da marca. */
  nodeToken: string
  /** Quanto o acento é restrito. Maior = mais campo permanece grão. */
  accentGamma: number
  grainOpacity: number
}

type PlateProps = Palette & {
  /** 0..1 — progresso do scroll, interpola entre os modos. */
  progress: React.RefObject<number>
  count: number
}

function Plate({
  progress,
  count,
  grainToken,
  nodeToken,
  accentGamma,
  grainOpacity,
}: PlateProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size } = useThree()

  const geometry = useMemo(() => {
    // PRNG semeado em vez de Math.random: a distribuição dos grãos passa a ser
    // pura e determinística, então o campo é idêntico a cada carregamento.
    const random = mulberry32(0x0f5100)
    const seeds = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      seeds[i * 3] = random()
      seeds[i * 3 + 1] = random()
      seeds[i * 3 + 2] = 0
      // Distribuição enviesada para grãos pequenos: alguns poucos maiores dão
      // textura sem que o campo inteiro pese.
      scales[i] = 0.55 + random() * random() * 1.6
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(seeds, 3))
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1))
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uM: { value: MODES[0][0] },
      uN: { value: MODES[0][1] },
      uA: { value: 1 },
      uB: { value: -1 },
      uMouse: { value: new THREE.Vector2(2, 2) },
      uMouseForce: { value: 0 },
      uSize: { value: 12 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: grainOpacity },
      uAccentGamma: { value: accentGamma },
      // Preenchidas depois da montagem: ler a folha de estilo durante o render
      // seria efeito colateral, e o valor não muda entre um quadro e outro.
      uColorGrain: { value: new THREE.Color(1, 1, 1) },
      uColorNode: { value: new THREE.Color(1, 1, 1) },
    }),
    []
  )

  // Escreve no material, não no objeto memoizado: o material é o sistema
  // externo que de fato guarda o estado, e mutar a memo confundiria o React.
  useEffect(() => {
    const u = materialRef.current?.uniforms
    if (!u) return
    u.uColorGrain.value.setRGB(...resolveTokenColor(grainToken))
    u.uColorNode.value.setRGB(...resolveTokenColor(nodeToken))
    u.uOpacity.value = grainOpacity
    u.uAccentGamma.value = accentGamma
  }, [grainToken, nodeToken, grainOpacity, accentGamma])

  const pointer = useRef(new THREE.Vector2(2, 2))
  const smoothed = useRef(0)

  // `useFrame` é o laço de renderização do React Three Fiber: roda a cada
  // quadro, fora do ciclo do React, e escrever nos uniforms do material é
  // exatamente o que anima o shader. A regra de imutabilidade não distingue
  // esse caso de uma mutação de estado durante o render.
  /* eslint-disable react-hooks/immutability -- ver nota acima */
  useFrame((state, delta) => {
    const u = materialRef.current?.uniforms
    if (!u) return

    // Interpola entre os modos ao longo do scroll. Como a posição convergida é
    // função contínua de (m,n), o padrão inteiro se reorganiza sem salto.
    const t = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1) * (MODES.length - 1)
    const i = Math.min(Math.floor(t), MODES.length - 2)
    const f = t - i
    u.uM.value = THREE.MathUtils.lerp(MODES[i][0], MODES[i + 1][0], f)
    u.uN.value = THREE.MathUtils.lerp(MODES[i][1], MODES[i + 1][1], f)

    // Respiração lenta: a placa nunca fica completamente parada.
    u.uB.value = -1 + Math.sin(state.clock.elapsedTime * 0.25) * 0.12

    pointer.current.set(state.pointer.x, state.pointer.y)
    u.uMouse.value.lerp(pointer.current, 1 - Math.exp(-6 * delta))

    const target = state.pointer.length() > 0.01 ? 0.55 : 0
    smoothed.current += (target - smoothed.current) * (1 - Math.exp(-4 * delta))
    u.uMouseForce.value = smoothed.current

    u.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2)
  })
  /* eslint-enable react-hooks/immutability */

  // A placa é quadrada e cabe inteira na menor dimensão da viewport.
  const scale = Math.min(viewport.width, viewport.height) * 0.5

  return (
    <points geometry={geometry} scale={[scale, scale, 1]} key={size.width}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={chladniVertexShader}
        fragmentShader={chladniFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export type ChladniSceneProps = Partial<Palette> & {
  progress: React.RefObject<number>
  className?: string
}

export default function ChladniScene({
  progress,
  className,
  grainToken = "--color-ink-500",
  nodeToken = "--color-brand-500",
  accentGamma = 6,
  grainOpacity = 1,
}: ChladniSceneProps) {
  // Aparelho modesto recebe menos grãos; o padrão continua legível.
  const count = useMemo(() => {
    if (typeof window === "undefined") return 12000
    const cores = navigator.hardwareConcurrency ?? 4
    const narrow = window.innerWidth < 768
    if (narrow || cores <= 4) return 6000
    return 18000
  }, [])

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      <Plate
        progress={progress}
        count={count}
        grainToken={grainToken}
        nodeToken={nodeToken}
        accentGamma={accentGamma}
        grainOpacity={grainOpacity}
      />
    </Canvas>
  )
}
