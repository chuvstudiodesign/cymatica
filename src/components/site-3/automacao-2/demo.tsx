"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, Check } from "lucide-react"

import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ChladniDark } from "@/components/site-3/proposta/chladni-dark"
import { demo } from "@/lib/site-3/automacao-2"

gsap.registerPlugin(ScrollTrigger)

/**
 * A demonstração — o momento de prova da página.
 *
 * O estúdio pediu que a página mostrasse a digitação: o cliente escrevendo um
 * pedido em português e recebendo a peça. É o que transforma "automação de
 * design" de conceito em coisa.
 *
 * O segundo turno é o mais importante dos três: o "não gostei, faz outro
 * caminho". Sem ele, a cena provaria que o sistema entrega, mas não que ele
 * *cria* — que é o diferencial contra template.
 *
 * ─── A placa ao lado não é ilustração ───
 *
 * Cada turno move a placa de Chladni para um modo de vibração diferente
 * (`chladni-scene.tsx` interpola cinco). O leitor pede outro caminho, a figura
 * se reorganiza inteira, e a legenda embaixo diz "Mesma placa, outra figura".
 *
 * É o argumento comercial da vertente desenhado em vez de escrito: variação
 * infinita, identidade constante. Antes disso, a placa vivia só no herói, ao
 * lado de um título sobre velocidade, sem nada que ligasse as duas coisas — e
 * ali ela era, honestamente, um padrão de pontinhos bonito.
 *
 * O progresso é dirigido pela linha do tempo, não pelo scroll: aqui a figura
 * responde ao pedido, e é essa causalidade que carrega o sentido.
 *
 * A cena roda uma vez, ao entrar na tela. Em ritmo de leitura normal ela
 * precisava caber antes de a dobra passar — a versão anterior levava 11s e o
 * leitor médio via dois campos vazios.
 */
export function Automacao2Demo() {
  const rootRef = useRef<HTMLDivElement>(null)
  /** 0..1 — qual modo a placa desenha. Escrito pela linha do tempo. */
  const modo = useRef(0.25)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sem movimento: tudo já escrito, nada digitando.
      root.querySelectorAll<HTMLElement>("[data-prompt]").forEach((el) => {
        el.textContent = el.dataset.texto ?? ""
      })
      gsap.set(root.querySelectorAll("[data-resposta]"), { opacity: 1, y: 0 })
      gsap.set(root.querySelectorAll("[data-cursor]"), { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // `top 85%` e não `70%`: a cena precisa começar assim que a dobra
        // aponta, não quando já está no meio da tela.
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      })

      /** Um modo por turno. 0.25 · 0.5 · 0.75 caem em três figuras distintas. */
      const modos = [0.25, 0.5, 0.75]

      root.querySelectorAll<HTMLElement>("[data-turno]").forEach((turno, i) => {
        const campo = turno.querySelector<HTMLElement>("[data-prompt]")
        const resposta = turno.querySelector<HTMLElement>("[data-resposta]")
        const cursor = turno.querySelector<HTMLElement>("[data-cursor]")
        const texto = campo?.dataset.texto ?? ""
        const estado = { n: 0 }

        tl.to(cursor, { opacity: 1, duration: 0.1 }, i === 0 ? 0.1 : "+=0.25")
          .to(estado, {
            n: texto.length,
            duration: texto.length * 0.014,
            ease: "none",
            onUpdate: () => {
              if (campo) campo.textContent = texto.slice(0, Math.round(estado.n))
            },
          })
          .to(cursor, { opacity: 0, duration: 0.1 }, "+=0.18")
          .fromTo(
            resposta,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.05"
          )
          // A placa se reorganiza junto com a resposta: é a peça nova nascendo.
          .to(
            modo,
            { current: modos[i], duration: 0.9, ease: "power2.inOut" },
            "<"
          )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <LightSection>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionLabel>{demo.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {demo.title}
          </AnimatedHeading>
          <p
            data-reveal=""
            className="site-lead mt-10 max-w-[34ch] text-pretty text-muted-foreground"
          >
            {demo.body}
          </p>

          <figure data-reveal="" className="mt-14">
            {/* `ChladniDark` já resolve movimento reduzido e ausência de
                WebGL — nos dois casos ele troca a cena por uma imagem parada.
                Renderizar a cena crua aqui deixava um canvas vivo animando
                para sempre mesmo com movimento reduzido pedido, porque o
                `useFrame` da placa nunca para. */}
            <ChladniDark
              progress={modo}
              className="w-full max-w-[340px]"
              grainToken="--placa-clara-grao"
              nodeToken="--placa-clara-no"
              staticSrc="/brand/chladni-light.webp"
            />
            <figcaption className="site-label mt-6 max-w-[24ch] text-muted-foreground">
              {demo.plateCaption}
            </figcaption>
          </figure>
        </div>

        {/* `aria-hidden` na cena inteira. O texto das respostas está no DOM
            desde o servidor e os campos de pedido nascem vazios: sem isto, o
            leitor de tela ouvia as três respostas aqui, três parágrafos vazios
            no meio, e as três de novo no resumo `sr-only` abaixo. */}
        <div className="lg:col-span-7" ref={rootRef} aria-hidden="true">
          <div className="flex flex-col gap-4 rounded-2xl border border-border p-5 md:p-8">
            {demo.turnos.map((turno) => (
              <div key={turno.prompt} data-turno="" className="flex flex-col gap-4">
                {/* O pedido, como campo de conversa. */}
                <div className="flex items-start gap-4 rounded-2xl border border-border px-5 py-4">
                  <p className="min-h-[1.5em] flex-1 text-pretty">
                    <span data-prompt="" data-texto={turno.prompt} />
                    <span
                      data-cursor=""
                      aria-hidden
                      className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.18em] bg-foreground opacity-0"
                    />
                  </p>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-background"
                  >
                    <ArrowUp className="size-4" />
                  </span>
                </div>

                {/* A resposta descreve o que saiu. Não é a peça: inventar um
                    mockup de entrega prometeria um resultado específico que não
                    é o do cliente. A nota de rodapé diz isso em voz alta. */}
                <div
                  data-resposta=""
                  className="ml-6 flex items-start gap-3 text-muted-foreground opacity-0 md:ml-10"
                >
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <p className="max-w-[46ch] text-pretty text-sm">{turno.resposta}</p>
                </div>
              </div>
            ))}
          </div>

          <p
            data-reveal=""
            className="mt-6 max-w-[52ch] text-pretty text-sm text-muted-foreground"
          >
            {demo.footnote}
          </p>
        </div>
      </div>

      {/* O texto acessível da cena inteira: quem usa leitor de tela recebe o
          diálogo de uma vez, em vez de campos vazios sendo preenchidos. */}
      <p className="sr-only">
        {demo.turnos.map((t) => `${t.prompt}. ${t.resposta}`).join(" ")}
      </p>
    </LightSection>
  )
}
