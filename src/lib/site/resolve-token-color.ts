/**
 * Resolve um token de cor da folha de estilo para RGB normalizado.
 *
 * Os tokens da Cymatica são declarados em `oklch()`, que o WebGL não entende.
 * Em vez de duplicar os valores em hex — o que criaria uma segunda fonte da
 * verdade, fadada a divergir — deixamos o próprio navegador resolver: um
 * elemento sonda recebe a cor e lemos o valor computado, sempre em `rgb()`.
 */
export function resolveTokenColor(token: string): [number, number, number] {
  if (typeof window === "undefined") return [1, 1, 1]

  const probe = document.createElement("span")
  probe.style.cssText = `color: var(${token}); position: absolute; opacity: 0; pointer-events: none;`
  document.body.appendChild(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()

  const match = computed.match(/-?[\d.]+/g)
  if (!match || match.length < 3) return [1, 1, 1]

  return [
    Number(match[0]) / 255,
    Number(match[1]) / 255,
    Number(match[2]) / 255,
  ]
}
