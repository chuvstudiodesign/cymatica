"use client";

import * as React from "react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const planos = [
  ["essencial", "Essencial", "Identidade visual básica"],
  ["completo", "Completo", "Marca + site + social"],
  ["sob-medida", "Sob medida", "Escopo definido com o time"],
];

function ControlledDemo() {
  const [value, setValue] = React.useState("completo");
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={value} onValueChange={(v) => setValue(String(v))}>
        {planos.map(([v, title]) => (
          <div key={v} className="flex items-center gap-3">
            <RadioGroupItem value={v} id={`c-${v}`} />
            <Label htmlFor={`c-${v}`}>{title}</Label>
          </div>
        ))}
      </RadioGroup>
      <span className="font-mono text-xs text-muted-foreground">
        value: {value}
      </span>
    </div>
  );
}

export default function RadioGroupPage() {
  return (
    <DocPage
      title="Radio Group"
      description="Escolha única entre opções mutuamente exclusivas, todas visíveis ao mesmo tempo."
      importPath={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<RadioGroup defaultValue="essencial">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="essencial" id="essencial" />
    <Label htmlFor="essencial">Essencial</Label>
  </div>
  …
</RadioGroup>`}
        >
          <RadioGroup defaultValue="essencial" className="flex flex-col gap-3">
            {planos.map(([v, title]) => (
              <div key={v} className="flex items-center gap-3">
                <RadioGroupItem value={v} id={v} />
                <Label htmlFor={v}>{title}</Label>
              </div>
            ))}
          </RadioGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Com descrição"
        description="Alinhe o controle ao topo quando o rótulo tiver uma segunda linha."
      >
        <Demo
          code={`<div className="flex items-start gap-3">
  <RadioGroupItem value="completo" id="d-completo" className="mt-0.5" />
  <div className="flex flex-col">
    <Label htmlFor="d-completo">Completo</Label>
    <span className="text-xs text-muted-foreground">Marca + site + social</span>
  </div>
</div>`}
        >
          <RadioGroup defaultValue="completo" className="flex flex-col gap-3">
            {planos.map(([v, title, desc]) => (
              <div key={v} className="flex items-start gap-3">
                <RadioGroupItem value={v} id={`d-${v}`} className="mt-0.5" />
                <div className="flex flex-col">
                  <Label htmlFor={`d-${v}`}>{title}</Label>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Demo>
      </DocSection>

      <DocSection title="Horizontal">
        <Demo
          code={`<RadioGroup defaultValue="mensal" className="flex flex-row gap-6">…</RadioGroup>`}
        >
          <RadioGroup defaultValue="mensal" className="flex flex-row gap-6">
            {[
              ["mensal", "Mensal"],
              ["anual", "Anual"],
            ].map(([v, title]) => (
              <div key={v} className="flex items-center gap-2">
                <RadioGroupItem value={v} id={`h-${v}`} />
                <Label htmlFor={`h-${v}`}>{title}</Label>
              </div>
            ))}
          </RadioGroup>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [value, setValue] = React.useState("completo")

<RadioGroup value={value} onValueChange={(v) => setValue(String(v))}>…</RadioGroup>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<RadioGroup disabled>…</RadioGroup>
<RadioGroupItem value="x" disabled />`}
        >
          <RadioGroup defaultValue="a" disabled className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="a" id="dis-a" />
              <Label htmlFor="dis-a">Grupo desabilitado</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="b" id="dis-b" />
              <Label htmlFor="dis-b">Outra opção</Label>
            </div>
          </RadioGroup>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <RadioGroup defaultValue="1" className="flex flex-row gap-4">
            <RadioGroupItem value="1" aria-label="Um" />
            <RadioGroupItem value="2" aria-label="Dois" />
            <RadioGroupItem value="3" disabled aria-label="Três" />
          </RadioGroup>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "string",
              description: "Valor selecionado, controlado ou não.",
            },
            {
              name: "onValueChange",
              type: "(value: unknown) => void",
              description: "Disparado quando a seleção muda.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o grupo inteiro.",
            },
            {
              name: "name",
              type: "string",
              description: "Nome enviado no submit do formulário.",
            },
            {
              name: "required",
              type: "boolean",
              def: "false",
              description: "Exige que uma opção esteja selecionada.",
            },
            {
              name: "value (item)",
              type: "string",
              description: "Em RadioGroupItem: valor daquela opção. Obrigatório.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O grupo inteiro é uma única parada de Tab: as setas navegam entre as opções.",
            "Selecionar é imediato ao navegar com setas — não exija um clique adicional.",
            "Use Radio Group a partir de duas opções exclusivas; para ligar/desligar um único item use Switch ou Checkbox.",
            "Dê um nome ao grupo com aria-labelledby apontando para o título da pergunta.",
          ]}
          keyboard={[
            ["Tab", "Entra no grupo, focando a opção selecionada."],
            ["↑ ←", "Seleciona a opção anterior."],
            ["↓ →", "Seleciona a próxima opção."],
            ["Space", "Seleciona a opção em foco."],
          ]}
          aria={[
            'role="radiogroup" com aria-labelledby',
            'role="radio" e aria-checked em cada item',
            "aria-required — quando a escolha é obrigatória",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
