import Image from "next/image"

import { cn } from "@/lib/utils"
import { social } from "@/lib/site-3/proposta"

/**
 * Slot do case de mídia social.
 *
 * Para trocar a imagem, mexa só em `lib/site-3/proposta.ts`, no bloco
 * `social.case`: caminho em `src`, descrição em `alt` e as dimensões reais do
 * arquivo em `width`/`height`.
 *
 * A moldura **não tem proporção própria**: ela recebe a da imagem, calculada a
 * partir dessas dimensões. Antes havia um `aspect-4/3` fixo com
 * `object-cover`, o que cortava as bordas de um arquivo quase quadrado — num
 * feed 3×3, cortar significa comer uma fileira inteira de publicações. Agora a
 * imagem entra inteira e a caixa se ajusta a ela.
 *
 * Enquanto não há arquivo, o lugar não fica vazio nem exibe esqueleto de
 * carregamento, que comunicaria erro. Fica um campo de interferência: dois
 * feixes de anéis concêntricos com origens diferentes, desenhados em
 * `--color-border`, que ao se sobreporem produzem franjas. É o mesmo fenômeno
 * que organiza a areia numa placa de Chladni, feito com duas linhas de CSS e
 * nenhum quadro por segundo.
 *
 * Sem JS, sem canvas, sem loop: não há o que degradar em
 * `prefers-reduced-motion`.
 */
export function CaseSlot({ className }: { className?: string }) {
  const { src, alt, caption, width, height } = social.case

  return (
    <figure className={cn("w-full", className)}>
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-card"
        // Sem imagem ainda, o campo de interferência precisa de alguma
        // proporção para existir; com imagem, quem manda é o arquivo.
        style={{ aspectRatio: src ? `${width} / ${height}` : "4 / 3" }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="h-auto w-full"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage: [
                  "repeating-radial-gradient(circle at 28% 34%, var(--color-border) 0 1px, transparent 1px 15px)",
                  "repeating-radial-gradient(circle at 74% 70%, var(--color-border) 0 1px, transparent 1px 15px)",
                ].join(", "),
                maskImage:
                  "radial-gradient(ellipse at 50% 50%, black 30%, transparent 76%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 50%, black 30%, transparent 76%)",
              }}
            />
            <p className="site-label absolute bottom-6 left-6 text-muted-foreground">
              Case em produção
            </p>
          </>
        )}
      </div>

      {caption && (
        <figcaption className="mt-5 max-w-[42ch] text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
