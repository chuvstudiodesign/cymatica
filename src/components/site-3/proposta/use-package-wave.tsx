"use client"

import { useEffect, type RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Entrada dos cartões de pacote como propagação de onda.
 *
 * Cada cartão declara `data-wave="0|1|2"`, que é a distância à crista. Zero é
 * o cartão em destaque, o ponto onde a placa foi golpeada. O escalonamento
 * percorre essa ordem, não a do DOM: a leitura vira "a onda saiu do Insane e
 * alcançou os outros", em vez de "três cartões apareceram da esquerda para a
 * direita".
 *
 * Por que não `data-reveal`, como o resto da página:
 *
 *  1. O `ScrollTrigger.batch` do provider escalona na ordem do DOM, que é
 *     justamente a direção que a marca não usa.
 *  2. Ele agrupa qualquer irmão que entre na mesma janela, então a etiqueta e
 *     o título da seção cairiam no mesmo escalonamento e diluiriam o gesto.
 *  3. Os dois escrevendo `opacity` e `y` no mesmo nó brigariam pelo estilo
 *     inline sem hora marcada.
 *
 * Sobre o estado inicial: ele é aplicado **por JavaScript e só quando o
 * elemento ainda está abaixo da dobra**. Nunca há classe `opacity-0` no HTML
 * do servidor. É deliberado: esta é a seção de preços de uma proposta enviada
 * por link, e uma falha de script não pode deixar a tabela invisível. Quem
 * abre a página já com os cartões na tela simplesmente os vê, sem animação
 * nenhuma, que é o comportamento correto para conteúdo já visível.
 */
export function usePackageWave(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-wave]"))
    if (cards.length === 0) return

    // Já visível ao carregar? Então não há entrada para coreografar.
    if (root.getBoundingClientRect().top < window.innerHeight * 0.9) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const stacked = window.matchMedia("(max-width: 767px)").matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.2,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          }
        )
        return
      }

      if (stacked) {
        // Empilhados, os três nunca dividem a mesma dobra: escalonar entre
        // eles não seria percebido. Cada um entra por conta própria.
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          )
        })
        return
      }

      const inWaveOrder = [...cards].sort(
        (a, b) => Number(a.dataset.wave) - Number(b.dataset.wave)
      )

      gsap.fromTo(
        inWaveOrder,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
