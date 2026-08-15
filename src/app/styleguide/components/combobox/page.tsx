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
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const servicos = [
  "Identidade visual",
  "Naming",
  "Site institucional",
  "Landing page",
  "Social kit",
  "Motion",
  "Embalagem",
  "Design system",
];

function MultiDemo() {
  const [value, setValue] = React.useState<string[]>(["Naming"]);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Combobox items={servicos} multiple value={value} onValueChange={setValue}>
        <ComboboxChips>
          {value.map((v) => (
            <ComboboxChip key={v} aria-label={v}>
              {v}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Adicionar serviço…" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>Nenhum serviço encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <span className="font-mono text-xs text-muted-foreground">
        {value.length} selecionado(s)
      </span>
    </div>
  );
}

export default function ComboboxPage() {
  return (
    <DocPage
      title="Combobox"
      description="Campo de texto com lista filtrável. Combina busca por digitação com seleção — a escolha certa quando a lista é longa demais para um Select."
      importPath={`import {
  Combobox, ComboboxContent, ComboboxEmpty,
  ComboboxInput, ComboboxItem, ComboboxList,
} from "@/components/ui/combobox"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection
        title="Básico"
        description="ComboboxList recebe uma função como filho e a chama para cada item filtrado."
      >
        <Demo
          code={`<Combobox items={servicos}>
  <ComboboxInput placeholder="Buscar serviço" />
  <ComboboxContent>
    <ComboboxEmpty>Nenhum serviço encontrado.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        >
          <div className="w-full max-w-sm">
            <Combobox items={servicos}>
              <ComboboxInput placeholder="Buscar serviço" />
              <ComboboxContent>
                <ComboboxEmpty>Nenhum serviço encontrado.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com botão de limpar"
        description="showClear adiciona um botão para zerar a seleção sem apagar caractere por caractere."
      >
        <Demo
          code={`<ComboboxInput placeholder="Buscar serviço" showClear />`}
        >
          <div className="w-full max-w-sm">
            <Combobox items={servicos} defaultValue="Motion">
              <ComboboxInput placeholder="Buscar serviço" showClear />
              <ComboboxContent>
                <ComboboxEmpty>Nenhum serviço encontrado.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Múltipla seleção (interativo)"
        description="Com multiple, os valores viram chips removíveis dentro do próprio campo."
      >
        <Demo
          code={`const [value, setValue] = React.useState(["Naming"])

<Combobox items={servicos} multiple value={value} onValueChange={setValue}>
  <ComboboxChips>
    {value.map((v) => <ComboboxChip key={v}>{v}</ComboboxChip>)}
    <ComboboxChipsInput placeholder="Adicionar serviço…" />
  </ComboboxChips>
  <ComboboxContent>…</ComboboxContent>
</Combobox>`}
        >
          <MultiDemo />
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<ComboboxInput disabled />
<ComboboxInput aria-invalid />`}
        >
          <div className="w-full max-w-sm">
            <Combobox items={servicos}>
              <ComboboxInput placeholder="Desabilitado" disabled />
            </Combobox>
          </div>
          <div className="w-full max-w-sm">
            <Combobox items={servicos}>
              <ComboboxInput placeholder="Inválido" aria-invalid />
              <ComboboxContent>
                <ComboboxEmpty>Nada aqui.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Combobox items={servicos}>
              <ComboboxInput placeholder="Buscar serviço" />
            </Combobox>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Combobox", "Raiz. Recebe items, value, multiple e onValueChange."],
            ["ComboboxInput", "Campo de busca. Aceita showTrigger e showClear."],
            ["ComboboxChips", "Contêiner dos chips no modo múltiplo."],
            ["ComboboxChip", "Chip removível de um valor selecionado."],
            ["ComboboxChipsInput", "Campo de digitação dentro dos chips."],
            ["ComboboxContent", "Popup. Aceita side, align, sideOffset, anchor."],
            ["ComboboxList", "Recebe uma função (item) => ReactNode."],
            ["ComboboxItem", "Opção selecionável. Requer value."],
            ["ComboboxEmpty", "Exibido quando o filtro não retorna nada."],
            ["ComboboxGroup / ComboboxLabel", "Agrupamento e título de grupo."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Combobox (raiz)"
          rows={[
            {
              name: "items",
              type: "T[]",
              description: "Conjunto completo de opções, filtrado conforme se digita.",
            },
            {
              name: "value / defaultValue",
              type: "T | T[] | null",
              description: "Seleção atual. Vira array quando multiple está ativo.",
            },
            {
              name: "onValueChange",
              type: "(value: T | T[]) => void",
              description: "Disparado quando a seleção muda.",
            },
            {
              name: "multiple",
              type: "boolean",
              def: "false",
              description: "Permite selecionar vários itens, exibidos como chips.",
            },
            {
              name: "showClear",
              type: "boolean",
              def: "false",
              description: "Em ComboboxInput: exibe o botão de limpar.",
            },
            {
              name: "showTrigger",
              type: "boolean",
              def: "true",
              description: "Em ComboboxInput: exibe a seta que abre a lista.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Sempre forneça ComboboxEmpty: sem ele, um filtro sem resultado deixa o popup mudo.",
            "Os chips do modo múltiplo são removíveis por teclado — não dependa só do clique no X.",
            "O campo mantém aria-activedescendant apontando para a opção em destaque, sem tirar o foco do input.",
            "Se a lista vier de busca assíncrona, anuncie o carregamento em uma região aria-live.",
          ]}
          keyboard={[
            ["↓", "Abre a lista e move para a primeira opção."],
            ["↑ ↓", "Navega entre as opções filtradas."],
            ["Enter", "Seleciona a opção em destaque."],
            ["Escape", "Fecha a lista mantendo o texto digitado."],
            ["Backspace", "No modo múltiplo com campo vazio, remove o último chip."],
          ]}
          aria={[
            'role="combobox" com aria-expanded e aria-controls',
            "aria-activedescendant — opção em destaque",
            'role="listbox" e role="option" no popup',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
