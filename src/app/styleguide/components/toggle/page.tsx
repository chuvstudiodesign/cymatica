"use client";

import * as React from "react";
import { Bold, Italic, Star, Underline } from "lucide-react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Toggle } from "@/components/ui/toggle";

function ControlledDemo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Favorito">
        <Star />
      </Toggle>
      <span className="font-mono text-xs text-muted-foreground">
        pressed: {String(pressed)}
      </span>
    </div>
  );
}

export default function TogglePage() {
  return (
    <DocPage
      title="Toggle"
      description="Botão de dois estados que permanece pressionado. Use para formatação e filtros, não para navegação."
      importPath={`import { Toggle, toggleVariants } from "@/components/ui/toggle"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Toggle aria-label="Negrito"><Bold /></Toggle>`}
        >
          <Toggle aria-label="Negrito">
            <Bold />
          </Toggle>
          <Toggle aria-label="Itálico" defaultPressed>
            <Italic />
          </Toggle>
        </Demo>
      </DocSection>

      <DocSection title="Variantes">
        <Demo
          code={`<Toggle variant="default"><Bold /></Toggle>
<Toggle variant="outline"><Bold /></Toggle>`}
        >
          <Toggle variant="default" aria-label="Default">
            <Bold />
          </Toggle>
          <Toggle variant="outline" aria-label="Outline">
            <Bold />
          </Toggle>
        </Demo>
      </DocSection>

      <DocSection title="Tamanhos">
        <Demo
          code={`<Toggle size="sm"><Bold /></Toggle>
<Toggle size="default"><Bold /></Toggle>
<Toggle size="lg"><Bold /></Toggle>`}
        >
          <Toggle size="sm" aria-label="Small">
            <Bold />
          </Toggle>
          <Toggle size="default" aria-label="Default">
            <Bold />
          </Toggle>
          <Toggle size="lg" aria-label="Large">
            <Bold />
          </Toggle>
        </Demo>
      </DocSection>

      <DocSection title="Com texto">
        <Demo
          code={`<Toggle variant="outline"><Underline /> Sublinhado</Toggle>`}
        >
          <Toggle variant="outline">
            <Underline /> Sublinhado
          </Toggle>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [pressed, setPressed] = React.useState(false)

<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Favorito">
  <Star />
</Toggle>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Desabilitado">
        <Demo code={`<Toggle disabled><Bold /></Toggle>`}>
          <Toggle disabled aria-label="Desabilitado">
            <Bold />
          </Toggle>
          <Toggle disabled defaultPressed aria-label="Desabilitado pressionado">
            <Italic />
          </Toggle>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Toggle aria-label="Off">
            <Bold />
          </Toggle>
          <Toggle defaultPressed aria-label="On">
            <Italic />
          </Toggle>
          <Toggle variant="outline" aria-label="Outline">
            <Underline />
          </Toggle>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "pressed",
              type: "boolean",
              description: "Estado controlado.",
            },
            {
              name: "defaultPressed",
              type: "boolean",
              def: "false",
              description: "Estado inicial no modo não controlado.",
            },
            {
              name: "onPressedChange",
              type: "(pressed: boolean) => void",
              description: "Disparado quando o estado muda.",
            },
            {
              name: "variant",
              type: '"default" | "outline"',
              def: '"default"',
              description: "Aparência visual.",
            },
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              def: '"default"',
              description: "Tamanho do controle.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede interação.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Toggles só de ícone exigem aria-label — sem ele o botão não tem nome acessível.",
            "O estado é anunciado por aria-pressed; não escreva \"ativado\" dentro do rótulo.",
            "Se as opções forem mutuamente exclusivas, use Toggle Group com um único valor.",
            "Não use Toggle para navegar ou submeter: ele comunica um estado persistente, não uma ação.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o toggle."],
            ["Space / Enter", "Alterna o estado pressionado."],
          ]}
          aria={[
            'aria-pressed="true" | "false"',
            "aria-label — obrigatório quando só há ícone",
            "aria-disabled — quando permanece focável mas inativo",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
