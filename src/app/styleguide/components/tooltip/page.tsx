"use client";

import { Info, Plus, Trash2 } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="Rótulo flutuante que aparece no hover e no foco. Só para texto curto e não essencial."
      importPath={`import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection
        title="Básico"
        description="TooltipProvider já está no layout raiz do projeto, então não é preciso repetir."
      >
        <Demo
          code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="icon" />}>
    <Plus />
  </TooltipTrigger>
  <TooltipContent>Adicionar projeto</TooltipContent>
</Tooltip>`}
        >
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" size="icon" aria-label="Adicionar" />}
            >
              <Plus />
            </TooltipTrigger>
            <TooltipContent>Adicionar projeto</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Com texto
            </TooltipTrigger>
            <TooltipContent>Explicação complementar</TooltipContent>
          </Tooltip>
        </Demo>
      </DocSection>

      <DocSection
        title="Posicionamento"
        description="side e sideOffset controlam onde a dica aparece."
      >
        <Demo
          code={`<TooltipContent side="top" />
<TooltipContent side="right" sideOffset={8} />`}
        >
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </TooltipTrigger>
              <TooltipContent side={side}>Dica no lado {side}</TooltipContent>
            </Tooltip>
          ))}
        </Demo>
      </DocSection>

      <DocSection
        title="Atraso de abertura"
        description="delay evita que dicas pisquem enquanto o ponteiro atravessa a tela."
      >
        <Demo
          code={`<TooltipProvider delay={0}>…</TooltipProvider>
<TooltipProvider delay={700}>…</TooltipProvider>`}
        >
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                Imediato
              </TooltipTrigger>
              <TooltipContent>Sem atraso</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delay={700}>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                700ms
              </TooltipTrigger>
              <TooltipContent>Depois de uma pausa</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Demo>
      </DocSection>

      <DocSection
        title="Em botões só de ícone"
        description="A dica complementa, mas não substitui o aria-label: no toque ela nunca aparece."
      >
        <Demo
          code={`<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Excluir" />}>
    <Trash2 />
  </TooltipTrigger>
  <TooltipContent>Excluir</TooltipContent>
</Tooltip>`}
        >
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" aria-label="Excluir" />}
            >
              <Trash2 />
            </TooltipTrigger>
            <TooltipContent>Excluir</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" aria-label="Sobre" />}
            >
              <Info />
            </TooltipTrigger>
            <TooltipContent>Sobre este projeto</TooltipContent>
          </Tooltip>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["TooltipProvider", "Compartilha o atraso entre as dicas. Já está no layout raiz."],
            ["Tooltip", "Raiz de uma dica."],
            ["TooltipTrigger", "Elemento que dispara. Use render."],
            ["TooltipContent", "A dica. Aceita side, align, sideOffset."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "delay",
              type: "number",
              description:
                "Em TooltipProvider: atraso em ms antes de abrir no hover.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              def: '"top"',
              description: "Lado preferido da dica.",
            },
            {
              name: "align / sideOffset",
              type: '"start" | "center" | "end" / number',
              description: "Alinhamento e distância em relação ao gatilho.",
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open: boolean) => void",
              description: "Controle manual, raramente necessário.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Tooltips não existem no toque. Nada essencial pode viver apenas dentro de uma: rótulos vão em aria-label, instruções em texto visível.",
            "O gatilho precisa ser focável — a dica tem que abrir também com Tab, não só com o mouse.",
            "Não coloque links ou botões dentro da dica: ela desaparece antes de alcançá-los. Para isso existe o Popover.",
            "Mantenha o texto em uma linha ou duas; dicas longas são lidas fora de contexto.",
            "Escape fecha a dica sem tirar o foco do gatilho.",
          ]}
          keyboard={[
            ["Tab", "Foca o gatilho e abre a dica."],
            ["Escape", "Fecha a dica, mantendo o foco."],
          ]}
          aria={[
            'role="tooltip" no conteúdo',
            "aria-describedby — liga o gatilho à dica",
            "aria-label — o nome acessível de fato, quando só há ícone",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
