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
import { Slider } from "@/components/ui/slider";

function BudgetDemo() {
  const [value, setValue] = React.useState<number | readonly number[]>([2450]);
  const amount = Array.isArray(value) ? value[0] : value;

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="budget">Orçamento</Label>
        <span className="font-mono text-sm">
          {amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
      <Slider
        id="budget"
        min={500}
        max={20000}
        step={50}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
}

export default function SliderPage() {
  return (
    <DocPage
      title="Slider"
      description="Seleciona um número dentro de um intervalo. Aceita um ou vários polegares para faixas."
      importPath={`import { Slider } from "@/components/ui/slider"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Slider defaultValue={[50]} />`}
        >
          <div className="w-full max-w-md">
            <Slider defaultValue={[50]} aria-label="Valor" />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Faixa"
        description="Dois valores no array produzem dois polegares e selecionam um intervalo."
      >
        <Demo code={`<Slider defaultValue={[25, 75]} />`}>
          <div className="w-full max-w-md">
            <Slider defaultValue={[25, 75]} aria-label="Faixa de preço" />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Passo e limites"
        description="step controla a granularidade; min e max definem o intervalo."
      >
        <Demo
          code={`<Slider defaultValue={[40]} min={0} max={100} step={10} />`}
        >
          <div className="w-full max-w-md">
            <Slider
              defaultValue={[40]}
              min={0}
              max={100}
              step={10}
              aria-label="Passo de 10"
            />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [value, setValue] = React.useState([2450])

<Slider min={500} max={20000} step={50} value={value} onValueChange={setValue} />`}
        >
          <BudgetDemo />
        </Demo>
      </DocSection>

      <DocSection title="Vertical">
        <Demo
          code={`<Slider orientation="vertical" defaultValue={[60]} />`}
        >
          <div className="h-48">
            <Slider
              orientation="vertical"
              defaultValue={[60]}
              aria-label="Volume"
            />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Desabilitado">
        <Demo code={`<Slider defaultValue={[35]} disabled />`}>
          <div className="w-full max-w-md">
            <Slider defaultValue={[35]} disabled aria-label="Desabilitado" />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Slider defaultValue={[60]} aria-label="Preview" />
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "number | number[]",
              def: "[min, max]",
              description:
                "Valor atual. Um array com dois itens cria um slider de faixa.",
            },
            {
              name: "onValueChange",
              type: "(value: number | number[]) => void",
              description: "Disparado continuamente durante o arraste.",
            },
            {
              name: "onValueCommitted",
              type: "(value: number | number[]) => void",
              description:
                "Disparado apenas ao soltar — ideal para requisições de rede.",
            },
            {
              name: "min / max",
              type: "number",
              def: "0 / 100",
              description: "Limites do intervalo.",
            },
            {
              name: "step",
              type: "number",
              def: "1",
              description: "Incremento mínimo entre valores.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description: "Direção do trilho.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede interação e reduz a opacidade.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Cada polegar é um slider próprio e precisa de nome acessível — use aria-label quando não houver Label visível.",
            "Mostre o valor numérico junto do controle: ler a posição do polegar não é preciso o bastante.",
            "Prefira onValueCommitted para efeitos caros; onValueChange dispara a cada pixel arrastado.",
            "Um step muito fino inviabiliza o ajuste por teclado — cada seta move exatamente um step.",
          ]}
          keyboard={[
            ["← ↓", "Diminui um step."],
            ["→ ↑", "Aumenta um step."],
            ["Page Up / Page Down", "Move em incrementos maiores."],
            ["Home / End", "Vai para o mínimo ou o máximo."],
          ]}
          aria={[
            'role="slider"',
            "aria-valuenow / aria-valuemin / aria-valuemax",
            "aria-valuetext — quando o número cru não é significativo (ex.: moeda)",
            "aria-orientation",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
