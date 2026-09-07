"use client"

import { CymaticaMark } from "@/components/site/cymatica-mark"
import { cn } from "@/lib/utils"

/**
 * As quatro peças que o sistema entrega, desenhadas de verdade.
 *
 * Cada uma é 4:5 e vive no design system da Cymatica: o mesmo laranja, a mesma
 * Figtree, o mesmo símbolo, a mesma disciplina de espaço. Não são wireframes
 * nem mockups cinzentos — se a página promete material com qualidade de
 * design, a demonstração precisa entregar material com qualidade de design.
 *
 * Nada de foto de banco de imagem. O estúdio cogitou uma foto de Dia dos Pais
 * em preto e branco; como o arquivo não existe, as peças são compostas
 * tipograficamente, que além de honesto é mais fiel à marca. Trocar por foto
 * depois é mexer num bloco.
 *
 * Todas decorativas para leitor de tela: quem não vê a tela recebe a descrição
 * na cena que as embrulha, não quatro composições sendo lidas campo a campo.
 */

const moldura =
  "relative aspect-4/5 w-full overflow-hidden rounded-xl border border-border"

/** 1 · Post para mídia social — Dia dos Pais. */
export function PecaPost({ className }: { className?: string }) {
  return (
    <div className={cn(moldura, "bg-background", className)} aria-hidden>
      <div className="flex h-full flex-col justify-between p-5">
        <CymaticaMark variant="plate" className="size-7 text-foreground" />

        <div>
          {/* O laranja entra numa palavra só. É o acento da peça. */}
          <p className="text-[1.7rem] leading-[0.95] font-medium tracking-[-0.03em] text-balance">
            Para quem
            <br />
            ensinou você
            <br />
            a <span className="text-primary">construir</span>.
          </p>
          <p className="mt-4 max-w-[22ch] text-[0.6rem] leading-relaxed text-muted-foreground">
            Feliz Dia dos Pais.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="site-label text-[0.5rem] text-muted-foreground">
            cymatica.pro
          </span>
          <span className="h-px w-10 bg-border" />
        </div>
      </div>
    </div>
  )
}

/** 2 · Apresentação comercial — capa e sumário empilhados. */
export function PecaApresentacao({ className }: { className?: string }) {
  return (
    <div className={cn(moldura, "bg-background", className)} aria-hidden>
      <div className="flex h-full flex-col">
        {/* Capa */}
        <div className="flex flex-1 flex-col justify-between border-b border-border bg-card p-4">
          <span className="site-label text-[0.5rem] text-muted-foreground">
            Proposta
          </span>
          <p className="text-[1.15rem] leading-[1] font-medium tracking-[-0.03em] text-balance">
            Identidade que
            <br />
            sustenta preço.
          </p>
          <div className="flex items-center gap-1.5">
            <CymaticaMark variant="plate" className="size-3.5" />
            <span className="text-[0.5rem] text-muted-foreground">Cymatica</span>
          </div>
        </div>

        {/* Sumário */}
        <div className="flex flex-1 flex-col justify-center gap-2 p-4">
          <span className="site-label text-[0.5rem] text-muted-foreground">
            Sumário
          </span>
          {["O diagnóstico", "O escopo", "Prazo e investimento"].map((t, i) => (
            <div
              key={t}
              className="flex items-baseline gap-2 border-b border-border pb-1.5"
            >
              <span
                className={cn(
                  "text-[0.5rem] tabular-nums",
                  i === 0 ? "text-primary" : "text-muted-foreground"
                )}
              >
                0{i + 1}
              </span>
              <span className="text-[0.62rem]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** 3 · Motion — a figura de Chladni reorganizando sobre a tipografia. */
export function PecaMotion({ className }: { className?: string }) {
  return (
    <div className={cn(moldura, "bg-card", className)} aria-hidden>
      <div className="relative flex h-full flex-col items-center justify-center p-5">
        {/* Os anéis rodam devagar: é a vibração do próprio conceito da marca,
            e dá ao vídeo um propósito além de "algo se mexendo". */}
        <div
          className="absolute inset-0 opacity-40 motion-safe:animate-[spin_28s_linear_infinite]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, var(--color-border) 0 1px, transparent 1px 13px)",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 25%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 25%, transparent 72%)",
          }}
        />

        <div className="relative text-center">
          <p className="text-[1.5rem] leading-[0.95] font-medium tracking-[-0.03em]">
            Design é
            <br />
            <span className="text-primary">vibração</span>
            <br />
            que vira forma.
          </p>
        </div>

        <span className="site-label absolute bottom-4 text-[0.5rem] text-muted-foreground">
          00:06
        </span>
      </div>
    </div>
  )
}

/** 4 · Site — o herói, como aparece no celular. */
export function PecaSite({ className }: { className?: string }) {
  return (
    <div className={cn(moldura, "bg-background", className)} aria-hidden>
      <div className="flex h-full flex-col">
        {/* Barra do navegador, para ler como tela e não como cartaz. */}
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-muted-foreground/15" />
        </div>

        <div className="flex flex-1 flex-col justify-center p-4">
          <span className="site-label text-[0.5rem] text-muted-foreground">
            Estúdio
          </span>
          <p className="mt-3 text-[1.25rem] leading-[0.98] font-medium tracking-[-0.03em] text-balance">
            Marca que
            <br />
            trabalha
            <br />
            enquanto
            <br />
            você dorme.
          </p>
          <span className="mt-5 w-fit rounded-full bg-primary px-3 py-1.5 text-[0.55rem] font-medium text-primary-foreground">
            Começar
          </span>

          <div className="mt-6 flex gap-1.5">
            <span className="h-8 flex-1 rounded-md border border-border" />
            <span className="h-8 flex-1 rounded-md border border-border" />
            <span className="h-8 flex-1 rounded-md border border-border" />
          </div>
        </div>
      </div>
    </div>
  )
}
