"use client";

import * as React from "react";

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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function DrawerPage() {
  return (
    <DocPage
      title="Drawer"
      description="Painel que sobe a partir da borda e responde a gestos de arraste. Pensado para o mobile, onde um Dialog centralizado fica desconfortável."
      importPath={`import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Abrir</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Nova proposta</DrawerTitle>
      <DrawerDescription>Informe o valor disponível.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Continuar</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>
              Abrir gaveta
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nova proposta</DrawerTitle>
                <DrawerDescription>
                  Informe quanto você pode investir e recebe o escopo na hora.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <Field>
                  <FieldLabel htmlFor="dr-valor">Valor</FieldLabel>
                  <Input id="dr-valor" placeholder="R$ 2450" />
                </Field>
              </div>
              <DrawerFooter>
                <Button>Continuar</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancelar
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Demo>
      </DocSection>

      <DocSection
        title="Direção do gesto"
        description="swipeDirection fica na raiz e define de qual borda a gaveta entra e para onde o arraste a dispensa."
      >
        <Demo
          code={`<Drawer swipeDirection="down">…</Drawer>   {/* entra por baixo */}
<Drawer swipeDirection="right">…</Drawer>  {/* entra pela direita */}`}
        >
          {(["down", "up", "left", "right"] as const).map((dir) => (
            <Drawer key={dir} swipeDirection={dir}>
              <DrawerTrigger render={<Button variant="outline" size="sm" />}>
                {dir}
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Gaveta {dir}</DrawerTitle>
                  <DrawerDescription>
                    Arraste na direção {dir} para dispensar.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="outline" />}>
                    Fechar
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </Demo>
      </DocSection>

      <DocSection
        title="Alça e pontos de parada"
        description="showSwipeHandle desenha a alça; snapPoints define alturas intermediárias."
      >
        <Demo
          code={`<Drawer showSwipeHandle snapPoints={[0.4, 1]}>…</Drawer>`}
        >
          <Drawer showSwipeHandle snapPoints={[0.4, 1]}>
            <DrawerTrigger render={<Button variant="outline" />}>
              Com alça e paradas
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Detalhes da proposta</DrawerTitle>
                <DrawerDescription>
                  Arraste a alça para expandir até a altura total.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                A gaveta para em 40% e em 100% da altura da tela.
              </div>
            </DrawerContent>
          </Drawer>
        </Demo>
      </DocSection>

      <DocSection
        title="Drawer ou Sheet ou Dialog"
        description="Os três são overlays modais; o que muda é o gesto e o contexto de uso."
      >
        <Demo className="block">
          <div className="w-full overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left">
                  <th className="p-3 font-medium">Componente</th>
                  <th className="p-3 font-medium">Use quando</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b align-top">
                  <td className="p-3 font-mono text-xs">Dialog</td>
                  <td className="p-3 text-muted-foreground">
                    Tarefa focada no desktop, com formulário curto.
                  </td>
                </tr>
                <tr className="border-b align-top">
                  <td className="p-3 font-mono text-xs">Sheet</td>
                  <td className="p-3 text-muted-foreground">
                    Painel lateral persistente: filtros, detalhes, edição rápida.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 font-mono text-xs">Drawer</td>
                  <td className="p-3 text-muted-foreground">
                    Mobile, onde o gesto de arraste e o alcance do polegar importam.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Drawer", "Raiz. Controla open e onOpenChange."],
            ["DrawerTrigger", "Abre a gaveta. Use render."],
            ["DrawerContent", "Painel arrastável, renderizado em portal com overlay."],
            ["DrawerSwipeHandle", "Alça visual que indica o gesto."],
            ["DrawerHeader / DrawerTitle / DrawerDescription", "Cabeçalho e semântica."],
            ["DrawerFooter", "Ações, empilhadas no mobile."],
            ["DrawerClose", "Fecha a gaveta. Use render."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "open / defaultOpen",
              type: "boolean",
              def: "false",
              description: "Estado da gaveta, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "swipeDirection",
              type: '"down" | "up" | "left" | "right"',
              def: '"down"',
              description:
                "Na raiz: borda de entrada e direção do gesto que dispensa a gaveta.",
            },
            {
              name: "showSwipeHandle",
              type: "boolean",
              def: "false",
              description: "Na raiz: desenha a alça de arraste no topo do painel.",
            },
            {
              name: "snapPoints",
              type: "number[]",
              description:
                "Na raiz: alturas intermediárias como fração da tela, ex.: [0.4, 1].",
            },
            {
              name: "modal",
              type: "boolean",
              def: "true",
              description: "Bloqueia a interação com o restante da página.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "DrawerTitle é obrigatório, como em qualquer diálogo. Use sr-only se o desenho não comportar título visível.",
            "O arraste é um atalho, não o único caminho: sempre ofereça um botão de fechar e mantenha Escape funcionando.",
            "A alça de arraste precisa ter área de toque suficiente — o mínimo confortável é 44px.",
            "Evite gavetas muito altas: o conteúdo precisa caber sem competir com o teclado virtual.",
            "O foco fica preso na gaveta e retorna ao gatilho ao fechar.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre a partir do gatilho."],
            ["Tab", "Circula entre os focáveis, sem sair da gaveta."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'role="dialog" com aria-modal="true"',
            "aria-labelledby — aponta para o DrawerTitle",
            "aria-describedby — aponta para o DrawerDescription",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
