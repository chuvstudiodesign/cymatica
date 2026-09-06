"use client"

import { ToggleGroup } from "@base-ui/react/toggle-group"
import { Toggle } from "@base-ui/react/toggle"

import { pieceGroups } from "@/lib/site-3/proposta"
import { formatBRL } from "@/lib/site/pricing"

/**
 * A grade de peças Plus.
 *
 * Usa as primitivas cruas do Base UI, não o wrapper `ui/toggle-group.tsx`: o
 * wrapper fixa `w-fit`, `flex-row` e a altura do `toggleVariants`, e desfazer
 * isso custaria mais className do que escrever do zero. A primitiva entrega o
 * que interessa e nada além: `aria-pressed`, roving tabindex e navegação por
 * seta entre os itens.
 *
 * Um único ToggleGroup embrulha os quatro grupos. São 29 itens numa grade que
 * quebra linha, então a seta anda linearmente pela lista, não em cruz. É o
 * comportamento padrão de barra de ferramentas e não promete nada além disso.
 *
 * Seleção pré-cognitiva por inversão de superfície: o item marcado troca de
 * lado com o fundo. Nada de laranja aqui. O único acento do modal é o botão de
 * envio, e a inversão é mais legível que cor em 29 alvos ao mesmo tempo.
 *
 * Os grupos são só o nome. A linha de contexto que cada um tinha ("o que o
 * cliente encosta a mão quando senta") somava quatro parágrafos a uma tela que
 * já pedia uma decisão: virava leitura, não escolha. O nome basta para separar
 * salão de entrega.
 */
export function PiecePicker({
  value,
  onValueChange,
}: {
  value: string[]
  onValueChange: (next: string[]) => void
}) {
  return (
    <ToggleGroup
      multiple
      value={value}
      onValueChange={(next) => onValueChange(next)}
      aria-label="Peças de design"
      className="flex flex-col gap-12"
    >
      {pieceGroups.map((group) => (
        <div key={group.id}>
          <p id={`grupo-${group.id}`} className="site-label text-muted-foreground">
            {group.name}
          </p>

          {/* Sem isto os quatro grupos existem só visualmente: quem navega por
              leitor de tela ouviria 29 botões numa lista plana, sem saber que
              "Cardápio" é do salão e "Sacola" é da entrega. */}
          <div
            role="group"
            aria-labelledby={`grupo-${group.id}`}
            className="mt-4 flex flex-wrap gap-2"
          >
            {group.pieces.map((piece) => (
              <Toggle
                key={piece.name}
                value={piece.name}
                className="group/piece flex items-center gap-2.5 rounded-full border border-border px-4 py-3 text-sm text-muted-foreground transition-[color,background-color,border-color] duration-100 ease-out outline-none select-none hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring data-pressed:border-foreground data-pressed:bg-foreground data-pressed:text-background data-pressed:duration-150 motion-reduce:transition-none"
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 scale-100 rounded-full border border-current opacity-40 transition-[opacity,transform] duration-90 ease-[cubic-bezier(0.65,0,0.35,1)] group-data-pressed/piece:scale-110 group-data-pressed/piece:bg-current group-data-pressed/piece:opacity-100 group-data-pressed/piece:delay-40 group-data-pressed/piece:duration-200 group-data-pressed/piece:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                />
                {piece.name}
                {/* O preço vive no próprio alvo: decidir "quero" e "quanto
                    custa" em lugares diferentes obriga o olho a ir e voltar. */}
                <span className="font-mono text-xs text-current/55 tabular-nums">
                  {formatBRL(piece.price)}
                </span>
              </Toggle>
            ))}
          </div>
        </div>
      ))}
    </ToggleGroup>
  )
}
