"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { CymaticaMark } from "@/components/site/cymatica-mark"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * O design system da Cymatica, mostrado em vez de explicado.
 *
 * O passo 1 diz que a identidade vira estrutura. Dizer isso a um empresário
 * não constrói imagem nenhuma na cabeça dele — ele nunca viu um design system.
 * Este painel é a resposta: as peças reais da nossa própria marca, dispostas
 * num mosaico, sem uma linha de explicação dentro.
 *
 * Usar a Cymatica como exemplo é deliberado. Inventar a marca de um cliente
 * fictício seria mostrar um design que não existe; aqui cada célula é material
 * de verdade, tirado do sistema que sustenta o site que ele está lendo.
 *
 * Sobre a etiqueta: o estúdio pediu para testar com o nome de cada peça em
 * caixa alta no rodapé da célula. Fica dentro da célula, nunca sobre o
 * mosaico, e em mono — é legenda de catálogo, não título.
 *
 * O mosaico é 16:9 no desktop. No celular vira uma coluna: 16:9 numa tela de
 * 390px daria 219px de altura, e nenhuma das peças seria legível.
 */

/** As células, com o quanto ocupam da grade de 4 colunas. */
const CELULAS = [
  { id: "logotipo", label: "Logotipo", span: "col-span-2 row-span-2" },
  { id: "paleta", label: "Paleta de cores", span: "col-span-2 row-span-1" },
  { id: "tipografia", label: "Tipografia", span: "col-span-2 row-span-1" },
  { id: "botoes", label: "Botões", span: "col-span-1 row-span-1" },
  { id: "cartao", label: "Cartão", span: "col-span-2 row-span-1" },
  { id: "arcos", label: "Ícones", span: "col-span-1 row-span-1" },
] as const

/** Moldura de cada peça. A etiqueta vive aqui, e não no conteúdo. */
function Celula({
  label,
  span,
  className,
  children,
}: {
  label: string
  span: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <figure
      data-celula=""
      className={cn(
        "relative flex min-h-[7rem] flex-col justify-center overflow-hidden rounded-xl border border-border",
        span,
        className
      )}
    >
      <div className="flex flex-1 items-center justify-center p-5">{children}</div>
      <figcaption className="site-label px-2.5 pb-2.5 text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  )
}

export function DesignSystemMosaico({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      // As células entram como quem monta o painel: sobem e assentam, em
      // ordem de leitura. Nada de "sendo gerado por prompt" — a ideia foi
      // levantada e descartada pelo estúdio, e ela contaria a história errada:
      // o design system é feito por gente.
      gsap.from("[data-celula]", {
        opacity: 0,
        y: 18,
        scale: 0.97,
        duration: 0.55,
        ease: "power3.out",
        stagger: { amount: 0.4 },
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full grid-cols-2 gap-3 sm:grid-cols-4",
        "lg:aspect-video lg:auto-rows-fr",
        className
      )}
    >
      {/* Logotipo — o único bloco de laranja cheio da página, e é legítimo:
          aqui o laranja não decora, ele É a peça sendo exibida. */}
      <Celula
        label={CELULAS[0].label}
        span={CELULAS[0].span}
        className="border-transparent bg-primary text-primary-foreground"
      >
        <CymaticaMark variant="plate" className="size-16 lg:size-24" />
      </Celula>

      {/* Paleta — só os campos de cor, sem código nem nome. */}
      <Celula label={CELULAS[1].label} span={CELULAS[1].span}>
        <div className="flex h-full w-full gap-1.5">
          {[
            "bg-primary",
            "bg-foreground",
            "bg-muted-foreground",
            "bg-border",
            "bg-background",
          ].map((c) => (
            <span
              key={c}
              className={cn("h-full flex-1 rounded-md border border-border", c)}
            />
          ))}
        </div>
      </Celula>

      {/* Tipografia — a palavra cortada pela moldura. Ampliada assim ela para
          de ser leitura e vira desenho, que é o ponto: mostrar a letra, não
          escrever o nome. */}
      <Celula label={CELULAS[2].label} span={CELULAS[2].span}>
        <p
          aria-hidden
          className="w-full origin-left scale-[2.1] text-[2.4rem] leading-none font-medium tracking-[-0.045em] whitespace-nowrap lg:scale-[2.6]"
        >
          Cymatica
        </p>
      </Celula>

      {/* Botões — os componentes reais, nos dois estados. */}
      <Celula label={CELULAS[3].label} span={CELULAS[3].span}>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="w-full rounded-full bg-primary px-3 py-1.5 text-center text-[0.6rem] font-medium text-primary-foreground">
            Botão
          </span>
          <span className="w-full rounded-full border border-border px-3 py-1.5 text-center text-[0.6rem] text-muted-foreground">
            Botão
          </span>
        </div>
      </Celula>

      {/* Cartão — a estrutura, não o conteúdo: barras no lugar do texto, para
          o olho ler "composição" e não tentar ler palavra. */}
      <Celula label={CELULAS[4].label} span={CELULAS[4].span}>
        <div className="w-full rounded-lg border border-border p-3">
          <span className="block h-1.5 w-8 rounded-full bg-primary" />
          <span className="mt-2.5 block h-2 w-3/4 rounded-full bg-foreground/70" />
          <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-muted-foreground/40" />
          <span className="mt-3 block h-4 w-14 rounded-full border border-border" />
        </div>
      </Celula>

      {/* Ícones — as variantes do símbolo, que é de onde os ícones da marca
          derivam. */}
      <Celula label={CELULAS[5].label} span={CELULAS[5].span}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CymaticaMark variant="arcs" className="size-6" />
          <CymaticaMark variant="nodes" className="size-6" />
          <CymaticaMark variant="star" className="size-6" />
        </div>
      </Celula>
    </div>
  )
}
