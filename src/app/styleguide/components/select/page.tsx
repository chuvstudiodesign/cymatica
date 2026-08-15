"use client";

import * as React from "react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const escopos = [
  { label: "Escolha um escopo", value: null },
  { label: "Identidade visual", value: "identidade" },
  { label: "Site institucional", value: "site" },
  { label: "Social kit", value: "social" },
  { label: "Motion", value: "motion" },
];

function ControlledDemo() {
  const [value, setValue] = React.useState<string | null>("site");
  return (
    <div className="flex flex-col gap-3">
      <Select items={escopos} value={value} onValueChange={setValue}>
        <SelectTrigger className="w-64">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {escopos.map((i) => (
            <SelectItem key={String(i.value)} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="font-mono text-xs text-muted-foreground">
        value: {String(value)}
      </span>
    </div>
  );
}

export default function SelectPage() {
  return (
    <DocPage
      title="Select"
      description="Escolhe um valor de uma lista. A raiz recebe items para saber renderizar o valor selecionado no gatilho."
      importPath={`import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection
        title="Básico"
        description="items é obrigatório para que SelectValue consiga exibir o rótulo, não o value cru."
      >
        <Demo
          code={`const items = [
  { label: "Escolha um escopo", value: null },
  { label: "Identidade visual", value: "identidade" },
]

<Select items={items}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {items.map((i) => (
      <SelectItem key={String(i.value)} value={i.value}>{i.label}</SelectItem>
    ))}
  </SelectContent>
</Select>`}
        >
          <Select items={escopos}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Demo>
      </DocSection>

      <DocSection title="Tamanhos">
        <Demo
          code={`<SelectTrigger size="sm">…</SelectTrigger>
<SelectTrigger size="default">…</SelectTrigger>`}
        >
          <Select items={escopos}>
            <SelectTrigger size="sm" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={escopos}>
            <SelectTrigger size="default" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Demo>
      </DocSection>

      <DocSection
        title="Grupos e separadores"
        description="SelectLabel nomeia cada grupo; SelectSeparator divide visualmente."
      >
        <Demo
          code={`<SelectContent>
  <SelectGroup>
    <SelectLabel>Design</SelectLabel>
    <SelectItem value="identidade">Identidade visual</SelectItem>
    <SelectItem value="motion">Motion</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Web</SelectLabel>
    <SelectItem value="site">Site institucional</SelectItem>
  </SelectGroup>
</SelectContent>`}
        >
          <Select
            items={[
              { label: "Escolha", value: null },
              { label: "Identidade visual", value: "identidade" },
              { label: "Motion", value: "motion" },
              { label: "Site institucional", value: "site" },
            ]}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Design</SelectLabel>
                <SelectItem value="identidade">Identidade visual</SelectItem>
                <SelectItem value="motion">Motion</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Web</SelectLabel>
                <SelectItem value="site">Site institucional</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [value, setValue] = React.useState("site")

<Select items={items} value={value} onValueChange={setValue}>…</Select>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<Select items={items} disabled>…</Select>
<SelectTrigger aria-invalid>…</SelectTrigger>`}
        >
          <Select items={escopos} disabled>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={escopos}>
            <SelectTrigger aria-invalid className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Demo>
      </DocSection>

      <DocSection
        title="Select nativo"
        description="Para listas longas e simples, o NativeSelect entrega a UI do sistema — melhor no mobile."
      >
        <Demo
          code={`<NativeSelect>
  <NativeSelectOption value="identidade">Identidade visual</NativeSelectOption>
  <NativeSelectOption value="site">Site institucional</NativeSelectOption>
</NativeSelect>`}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="ns">Escopo</Label>
            <NativeSelect id="ns" className="w-64">
              <NativeSelectOption value="identidade">
                Identidade visual
              </NativeSelectOption>
              <NativeSelectOption value="site">
                Site institucional
              </NativeSelectOption>
              <NativeSelectOption value="motion">Motion</NativeSelectOption>
            </NativeSelect>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Select items={escopos}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Select", "Raiz. Recebe items, value/defaultValue e onValueChange."],
            ["SelectTrigger", "Botão que abre a lista. Aceita size."],
            ["SelectValue", "Exibe o rótulo do item selecionado."],
            ["SelectContent", "Popup posicionado. Aceita side, align, sideOffset."],
            ["SelectGroup", "Agrupa itens relacionados."],
            ["SelectLabel", "Título de um grupo."],
            ["SelectItem", "Opção selecionável. Requer value."],
            ["SelectSeparator", "Divisória entre grupos."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Select (raiz)"
          rows={[
            {
              name: "items",
              type: "{ label: string; value: T }[]",
              description:
                "Lista usada para resolver o rótulo exibido em SelectValue.",
            },
            {
              name: "value / defaultValue",
              type: "T | null",
              description: "Valor selecionado, controlado ou não.",
            },
            {
              name: "onValueChange",
              type: "(value: T) => void",
              description: "Disparado ao escolher um item.",
            },
            {
              name: "multiple",
              type: "boolean",
              def: "false",
              description: "Permite selecionar vários valores.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o controle inteiro.",
            },
            {
              name: "side / align / sideOffset",
              type: "string | number",
              def: '"bottom" / "center" / 4',
              description: "Posicionamento do popup (em SelectContent).",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O gatilho expõe o valor atual como nome acessível — por isso SelectValue precisa dos items.",
            "Digitar letras com a lista aberta pula para o item correspondente.",
            "Use um item placeholder com value null em vez de deixar o gatilho vazio.",
            "Em listas muito longas ou em mobile, o NativeSelect costuma ser a escolha mais acessível.",
          ]}
          keyboard={[
            ["Space / Enter", "Abre a lista; seleciona o item em foco."],
            ["↑ ↓", "Navega entre as opções."],
            ["Home / End", "Vai para a primeira ou última opção."],
            ["A–Z", "Salta para a opção iniciada pela letra."],
            ["Escape", "Fecha sem alterar a seleção."],
          ]}
          aria={[
            'role="combobox" no gatilho, role="listbox" no popup',
            'aria-expanded, aria-controls, aria-activedescendant',
            'role="option" e aria-selected em cada item',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
