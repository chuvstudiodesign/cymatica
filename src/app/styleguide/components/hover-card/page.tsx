"use client";

import { CalendarDays } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function HoverCardPage() {
  return (
    <DocPage
      title="Hover Card"
      description="Prévia rica que aparece ao pousar o ponteiro sobre um link. Complementa o conteúdo, nunca o substitui."
      importPath={`import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from "@/components/ui/hover-card"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<HoverCard>
  <HoverCardTrigger render={<Button variant="link" />}>@cymatica</HoverCardTrigger>
  <HoverCardContent className="w-72">
    <div className="flex gap-3">
      <Avatar><AvatarFallback>CY</AvatarFallback></Avatar>
      <div>
        <p className="text-sm font-semibold">Cymatica</p>
        <p className="text-sm text-muted-foreground">
          Estúdio de design de marca.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger render={<Button variant="link" />}>
              @cymatica
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>CY</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Cymatica</p>
                  <p className="text-sm text-muted-foreground">
                    A forma mais simples, intuitiva e sincera de desenvolver a
                    sua marca.
                  </p>
                  <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3" />
                    No ar desde 2025
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Demo>
      </DocSection>

      <DocSection
        title="Posicionamento"
        description="Mesmas opções de ancoragem do Popover."
      >
        <Demo
          code={`<HoverCardContent side="top" align="start" />`}
        >
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <HoverCard key={side}>
              <HoverCardTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </HoverCardTrigger>
              <HoverCardContent side={side} className="w-56">
                <p className="text-sm text-muted-foreground">
                  Prévia ancorada no lado {side}.
                </p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["HoverCard", "Raiz. Aceita openDelay e closeDelay."],
            ["HoverCardTrigger", "Elemento que dispara ao hover. Use render."],
            ["HoverCardContent", "O cartão. Aceita side, align, sideOffset."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "openDelay",
              type: "number",
              def: "700",
              description:
                "Atraso antes de abrir. Evita cartões piscando na travessia do ponteiro.",
            },
            {
              name: "closeDelay",
              type: "number",
              def: "300",
              description:
                "Atraso ao sair, dando tempo de mover o ponteiro até o cartão.",
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open: boolean) => void",
              description: "Controle manual do estado.",
            },
            {
              name: "side / align / sideOffset",
              type: "string / string / number",
              description: "Em HoverCardContent: posicionamento.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Hover Card é enriquecimento puro: quem usa toque ou teclado pode nunca vê-lo. Nada exclusivo pode morar aqui.",
            "O gatilho deve ser um link ou botão real, que leve ao mesmo conteúdo mostrado na prévia.",
            "Não use para tooltips de texto curto — Tooltip abre no foco, este componente não garante isso.",
            "O closeDelay precisa ser suficiente para atravessar o espaço entre gatilho e cartão com o mouse.",
            "Se houver ações dentro do cartão, prefira Popover, que abre por clique e é alcançável por teclado.",
          ]}
          keyboard={[
            ["Tab", "Foca o gatilho — que continua sendo um link navegável."],
            ["Escape", "Fecha o cartão."],
          ]}
          aria={[
            "aria-expanded — no gatilho enquanto o cartão está aberto",
            "aria-controls — id do cartão",
            "O conteúdo é complementar: não use role=\"tooltip\" aqui",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
