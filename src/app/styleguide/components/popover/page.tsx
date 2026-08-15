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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverPage() {
  return (
    <DocPage
      title="Popover"
      description="Painel flutuante ancorado em um gatilho. Diferente do Tooltip, aceita conteúdo interativo e só abre por clique."
      importPath={`import {
  Popover, PopoverContent, PopoverDescription,
  PopoverHeader, PopoverTitle, PopoverTrigger,
} from "@/components/ui/popover"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Dimensões</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensões</PopoverTitle>
      <PopoverDescription>Ajuste o tamanho da entrega.</PopoverDescription>
    </PopoverHeader>
    <FieldGroup>…</FieldGroup>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Dimensões
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <PopoverHeader>
                <PopoverTitle>Dimensões</PopoverTitle>
                <PopoverDescription>
                  Ajuste o tamanho da entrega.
                </PopoverDescription>
              </PopoverHeader>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="pw">Largura</FieldLabel>
                  <Input id="pw" defaultValue="1440" className="w-24" />
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="ph">Altura</FieldLabel>
                  <Input id="ph" defaultValue="900" className="w-24" />
                </Field>
              </FieldGroup>
            </PopoverContent>
          </Popover>
        </Demo>
      </DocSection>

      <DocSection
        title="Posicionamento"
        description="side escolhe o lado, align o alinhamento e sideOffset a distância do gatilho."
      >
        <Demo
          code={`<PopoverContent side="top" align="start" sideOffset={8} />`}
        >
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Popover key={side}>
              <PopoverTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </PopoverTrigger>
              <PopoverContent side={side} className="w-48">
                <PopoverDescription>
                  Ancorado no lado {side} do gatilho.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          ))}
        </Demo>
      </DocSection>

      <DocSection
        title="Popover ou Tooltip ou Dialog"
        description="A escolha depende de quanto o conteúdo exige do usuário."
      >
        <Demo className="block">
          <div className="w-full overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left">
                  <th className="p-3 font-medium">Componente</th>
                  <th className="p-3 font-medium">Conteúdo</th>
                  <th className="p-3 font-medium">Abre com</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b align-top">
                  <td className="p-3 font-mono text-xs">Tooltip</td>
                  <td className="p-3 text-muted-foreground">Texto curto, não interativo</td>
                  <td className="p-3 text-muted-foreground">Hover e foco</td>
                </tr>
                <tr className="border-b align-top">
                  <td className="p-3 font-mono text-xs">Popover</td>
                  <td className="p-3 text-muted-foreground">Controles e formulários curtos</td>
                  <td className="p-3 text-muted-foreground">Clique</td>
                </tr>
                <tr className="align-top">
                  <td className="p-3 font-mono text-xs">Dialog</td>
                  <td className="p-3 text-muted-foreground">Tarefa que exige atenção plena</td>
                  <td className="p-3 text-muted-foreground">Clique, com bloqueio da página</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Popover", "Raiz. Controla open e onOpenChange."],
            ["PopoverTrigger", "Elemento âncora. Use render."],
            ["PopoverContent", "Painel. Aceita side, align, sideOffset."],
            ["PopoverHeader", "Área de título."],
            ["PopoverTitle", "Título do painel."],
            ["PopoverDescription", "Texto de apoio."],
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
              description: "Estado do painel, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              def: '"bottom"',
              description: "Lado preferido. Vira automaticamente se não couber.",
            },
            {
              name: "align",
              type: '"start" | "center" | "end"',
              def: '"center"',
              description: "Alinhamento em relação ao gatilho.",
            },
            {
              name: "sideOffset",
              type: "number",
              def: "4",
              description: "Distância entre painel e gatilho, em pixels.",
            },
            {
              name: "modal",
              type: "boolean",
              def: "false",
              description:
                "Quando true, bloqueia a interação com o restante da página.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Popover abre por clique, nunca por hover: conteúdo interativo em hover é inalcançável no toque e frustrante no mouse.",
            "O foco vai para o painel ao abrir e volta ao gatilho ao fechar.",
            "Se o conteúdo tem título, ligue-o por aria-labelledby usando PopoverTitle.",
            "O painel reposiciona sozinho quando não cabe no lado pedido — não force uma posição fixa.",
            "Para conteúdo puramente informativo e curto, Tooltip é mais adequado.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre a partir do gatilho."],
            ["Tab", "Percorre os controles dentro do painel."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'aria-haspopup="dialog" e aria-expanded no gatilho',
            "aria-controls — id do painel",
            "aria-labelledby — aponta para o PopoverTitle",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
