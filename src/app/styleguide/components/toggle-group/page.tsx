"use client";

import * as React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ControlledDemo() {
  const [value, setValue] = React.useState<readonly string[]>(["bold"]);
  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup
        multiple
        value={value}
        onValueChange={setValue}
        variant="outline"
      >
        <ToggleGroupItem value="bold" aria-label="Negrito">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Itálico">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Sublinhado">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
      <span className="font-mono text-xs text-muted-foreground">
        value: [{value.join(", ")}]
      </span>
    </div>
  );
}

export default function ToggleGroupPage() {
  return (
    <DocPage
      title="Toggle Group"
      description="Conjunto de toggles relacionados. Por padrão é escolha única; com multiple vários itens ficam ativos ao mesmo tempo."
      importPath={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection
        title="Múltiplo"
        description="Com multiple, vários itens ficam ativos ao mesmo tempo — como uma barra de formatação."
      >
        <Demo
          code={`<ToggleGroup multiple defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Negrito"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Itálico"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Sublinhado"><Underline /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <ToggleGroup multiple defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="Negrito">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Itálico">
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Sublinhado">
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Escolha única (padrão)"
        description="Sem multiple, o grupo se comporta como um seletor de segmento — só um item ativo."
      >
        <Demo
          code={`<ToggleGroup defaultValue={["left"]} variant="outline">
  <ToggleGroupItem value="left" aria-label="Esquerda"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Centro"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Direita"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <ToggleGroup defaultValue={["left"]} variant="outline">
            <ToggleGroupItem value="left" aria-label="Esquerda">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Centro">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Direita">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection title="Variantes e tamanhos">
        <Demo
          code={`<ToggleGroup variant="outline" size="sm">…</ToggleGroup>
<ToggleGroup variant="default" size="lg">…</ToggleGroup>`}
        >
          <ToggleGroup variant="outline" size="sm" defaultValue={["a"]}>
            <ToggleGroupItem value="a" aria-label="A" variant="outline" size="sm">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="B" variant="outline" size="sm">
              <Italic />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup size="lg" defaultValue={["a"]}>
            <ToggleGroupItem value="a" aria-label="A" size="lg">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="B" size="lg">
              <Italic />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Sem espaçamento"
        description="spacing={0} encosta os itens, formando um bloco segmentado."
      >
        <Demo
          code={`<ToggleGroup spacing={0} variant="outline" defaultValue={["left"]}>…</ToggleGroup>`}
        >
          <ToggleGroup spacing={0} variant="outline" defaultValue={["left"]}>
            <ToggleGroupItem value="left" aria-label="Esquerda" variant="outline">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Centro" variant="outline">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Direita" variant="outline">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection title="Vertical">
        <Demo
          code={`<ToggleGroup orientation="vertical">…</ToggleGroup>`}
        >
          <ToggleGroup orientation="vertical" variant="outline">
            <ToggleGroupItem value="a" aria-label="A" variant="outline">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="B" variant="outline">
              <AlignCenter />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [value, setValue] = React.useState<readonly string[]>(["bold"])

<ToggleGroup multiple value={value} onValueChange={setValue}>…</ToggleGroup>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Desabilitado">
        <Demo code={`<ToggleGroup disabled>…</ToggleGroup>`}>
          <ToggleGroup disabled defaultValue={["a"]}>
            <ToggleGroupItem value="a" aria-label="A">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="B">
              <Italic />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <ToggleGroup defaultValue={["a"]} variant="outline">
            <ToggleGroupItem value="a" aria-label="A" variant="outline">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="B" variant="outline">
              <Italic />
            </ToggleGroupItem>
          </ToggleGroup>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "readonly string[]",
              description:
                "Itens ativos. É sempre um array, mesmo na escolha única.",
            },
            {
              name: "onValueChange",
              type: "(value: readonly string[]) => void",
              description: "Disparado quando a seleção muda.",
            },
            {
              name: "multiple",
              type: "boolean",
              def: "false",
              description:
                "Permite mais de um item ativo. Sem ele o grupo é de escolha única.",
            },
            {
              name: "spacing",
              type: "number",
              def: "2",
              description: "Espaço entre os itens. Use 0 para um bloco contínuo.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description: "Direção do grupo e das setas de navegação.",
            },
            {
              name: "variant / size",
              type: '"default" | "outline" / "sm" | "default" | "lg"',
              description:
                "Repasse também para cada ToggleGroupItem para manter a aparência consistente.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O grupo é uma única parada de Tab; as setas movem entre os itens.",
            "Cada item só de ícone precisa do seu próprio aria-label.",
            "Na escolha única, prefira Tabs se a mudança troca o conteúdo da tela.",
            "variant e size aplicados na raiz não descem sozinhos: passe também nos itens.",
          ]}
          keyboard={[
            ["Tab", "Entra no grupo."],
            ["← →", "Move entre itens (orientação horizontal)."],
            ["↑ ↓", "Move entre itens (orientação vertical)."],
            ["Space / Enter", "Alterna o item em foco."],
            ["Home / End", "Primeiro ou último item."],
          ]}
          aria={[
            'role="group" na raiz',
            'aria-pressed em cada item',
            "aria-label — nome do conjunto, ex.: \"Formatação de texto\"",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
