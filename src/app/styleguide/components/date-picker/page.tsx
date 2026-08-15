"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

function ControlledDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={date} onValueChange={setDate} />
      <span className="font-mono text-xs text-muted-foreground">
        {date ? date.toISOString().slice(0, 10) : "undefined"}
      </span>
    </div>
  );
}

function RangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>();
  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker value={range} onValueChange={setRange} />
      <span className="font-mono text-xs text-muted-foreground">
        {range?.from ? range.from.toISOString().slice(0, 10) : "—"} →{" "}
        {range?.to ? range.to.toISOString().slice(0, 10) : "—"}
      </span>
    </div>
  );
}

export default function DatePickerPage() {
  return (
    <DocPage
      title="Date Picker"
      description="Seleção de data em um popover. Não é um item do registry — a documentação oficial o descreve como composição, e aqui ela virou um componente do projeto."
      importPath={`import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"`}
      tags={["Composição", "Formulários"]}
    >
      <DocSection
        title="Básico"
        description="Popover + Calendar + Button, com rótulo formatado em português pelo date-fns."
      >
        <Demo
          code={`<DatePicker placeholder="Escolha uma data" />`}
        >
          <DatePicker />
        </Demo>
      </DocSection>

      <DocSection title="Com valor inicial">
        <Demo code={`<DatePicker defaultValue={new Date(2026, 7, 14)} />`}>
          <DatePicker defaultValue={new Date(2026, 7, 14)} />
        </Demo>
      </DocSection>

      <DocSection
        title="Formato de exibição"
        description="displayFormat aceita qualquer padrão do date-fns."
      >
        <Demo
          code={`<DatePicker displayFormat="dd/MM/yyyy" defaultValue={new Date()} />
<DatePicker displayFormat="EEEE, dd MMM" defaultValue={new Date()} />`}
        >
          <DatePicker displayFormat="dd/MM/yyyy" defaultValue={new Date()} />
          <DatePicker displayFormat="EEEE, dd MMM" defaultValue={new Date()} />
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<DatePicker value={date} onValueChange={setDate} />`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Período (interativo)"
        description="DateRangePicker mostra dois meses e só fecha quando o período está completo."
      >
        <Demo
          code={`const [range, setRange] = React.useState<DateRange | undefined>()

<DateRangePicker value={range} onValueChange={setRange} />`}
        >
          <RangeDemo />
        </Demo>
      </DocSection>

      <DocSection title="Em um formulário">
        <Demo
          code={`<Field>
  <FieldLabel htmlFor="prazo">Prazo desejado</FieldLabel>
  <DatePicker id="prazo" />
  <FieldDescription>Considere ao menos 15 dias de produção.</FieldDescription>
</Field>`}
        >
          <div className="w-full max-w-md">
            <Field>
              <FieldLabel htmlFor="prazo">Prazo desejado</FieldLabel>
              <DatePicker id="prazo" />
              <FieldDescription>
                Considere ao menos 15 dias de produção.
              </FieldDescription>
            </Field>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<DatePicker disabled />
<DatePicker aria-invalid />`}
        >
          <DatePicker disabled />
          <DatePicker aria-invalid placeholder="Data obrigatória" />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <DatePicker defaultValue={new Date()} />
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="DatePicker"
          rows={[
            {
              name: "value / defaultValue",
              type: "Date | undefined",
              description: "Data selecionada, controlada ou não.",
            },
            {
              name: "onValueChange",
              type: "(date: Date | undefined) => void",
              description: "Disparado ao escolher uma data. O popover fecha em seguida.",
            },
            {
              name: "placeholder",
              type: "string",
              def: '"Escolha uma data"',
              description: "Texto do gatilho quando não há data selecionada.",
            },
            {
              name: "displayFormat",
              type: "string",
              def: `"dd 'de' MMMM 'de' yyyy"`,
              description: "Formato date-fns usado no rótulo do gatilho.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o gatilho.",
            },
            {
              name: "id",
              type: "string",
              description: "Repassado ao botão, para associar com FieldLabel.",
            },
          ]}
        />
        <PropsTable
          caption="DateRangePicker — além das acima"
          rows={[
            {
              name: "value / defaultValue",
              type: "DateRange | undefined",
              description: "Período com from e to.",
            },
            {
              name: "numberOfMonths",
              type: "number",
              def: "2",
              description: "Quantidade de meses exibidos lado a lado.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O gatilho anuncia a data escolhida, não só o ícone — por isso o rótulo formatado fica dentro do botão.",
            "autoFocus no Calendar leva o foco para a grade assim que o popover abre, e Escape devolve o foco ao gatilho.",
            "Ofereça também entrada por texto em fluxos críticos: navegar meses por teclado é lento para datas distantes.",
            "O locale ptBR traduz nomes de dias e meses, o que os leitores de tela anunciam em português.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre o calendário a partir do gatilho."],
            ["← → ↑ ↓", "Move entre os dias."],
            ["Page Up / Page Down", "Mês anterior ou seguinte."],
            ["Home / End", "Início ou fim da semana."],
            ["Enter", "Seleciona o dia em foco."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'aria-expanded e aria-haspopup="dialog" no gatilho',
            'role="grid" na tabela do calendário',
            "aria-selected no dia escolhido",
            "aria-invalid — quando a data é obrigatória e falta",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
