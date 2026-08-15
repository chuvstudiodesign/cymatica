"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Calendar } from "@/components/ui/calendar";

function SingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ptBR}
        className="rounded-lg border"
      />
      <span className="font-mono text-xs text-muted-foreground">
        {date ? date.toISOString().slice(0, 10) : "nenhuma data"}
      </span>
    </div>
  );
}

function RangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>();
  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        locale={ptBR}
        className="rounded-lg border"
      />
      <span className="font-mono text-xs text-muted-foreground">
        {range?.from?.toISOString().slice(0, 10) ?? "—"} →{" "}
        {range?.to?.toISOString().slice(0, 10) ?? "—"}
      </span>
    </div>
  );
}

function MultipleDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>();
  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        locale={ptBR}
        className="rounded-lg border"
      />
      <span className="font-mono text-xs text-muted-foreground">
        {dates?.length ?? 0} data(s) selecionada(s)
      </span>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <DocPage
      title="Calendar"
      description="Grade de datas sobre o react-day-picker. Sozinha para seleção inline; dentro de um Popover, vira o Date Picker."
      importPath={`import { Calendar } from "@/components/ui/calendar"`}
      tags={["react-day-picker", "Dados"]}
    >
      <DocSection
        title="Data única (interativo)"
        description="locale={ptBR} traduz dias e meses — sem ele o calendário sai em inglês."
      >
        <Demo
          className="block"
          code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={ptBR}
  className="rounded-lg border"
/>`}
        >
          <SingleDemo />
        </Demo>
      </DocSection>

      <DocSection title="Período (interativo)">
        <Demo
          className="block"
          code={`const [range, setRange] = React.useState<DateRange | undefined>()

<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />`}
        >
          <RangeDemo />
        </Demo>
      </DocSection>

      <DocSection title="Múltiplas datas (interativo)">
        <Demo
          className="block"
          code={`const [dates, setDates] = React.useState<Date[] | undefined>()

<Calendar mode="multiple" selected={dates} onSelect={setDates} />`}
        >
          <MultipleDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Datas desabilitadas"
        description="disabled aceita datas, intervalos ou um predicado — aqui, fins de semana e o passado."
      >
        <Demo
          className="block"
          code={`<Calendar
  mode="single"
  disabled={(date) =>
    date < new Date() || date.getDay() === 0 || date.getDay() === 6
  }
/>`}
        >
          <Calendar
            mode="single"
            locale={ptBR}
            className="rounded-lg border"
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              date.getDay() === 0 ||
              date.getDay() === 6
            }
          />
        </Demo>
      </DocSection>

      <DocSection
        title="Navegação por menus"
        description="captionLayout com dropdown troca o rótulo do mês por seletores — essencial para datas distantes."
      >
        <Demo
          className="block"
          code={`<Calendar
  mode="single"
  captionLayout="dropdown"
  startMonth={new Date(2020, 0)}
  endMonth={new Date(2030, 11)}
/>`}
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            startMonth={new Date(2020, 0)}
            endMonth={new Date(2030, 11)}
            locale={ptBR}
            className="rounded-lg border"
          />
        </Demo>
      </DocSection>

      <DocSection title="Vários meses">
        <Demo
          className="block"
          code={`<Calendar mode="single" numberOfMonths={2} />`}
        >
          <Calendar
            mode="single"
            numberOfMonths={2}
            locale={ptBR}
            className="rounded-lg border"
          />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Calendar mode="single" locale={ptBR} className="rounded-lg border" />
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Repassa todas as props do react-day-picker."
          rows={[
            {
              name: "mode",
              type: '"single" | "multiple" | "range"',
              def: '"single"',
              description:
                "Determina o tipo de selected e o formato entregue a onSelect.",
            },
            {
              name: "selected / onSelect",
              type: "Date | Date[] | DateRange",
              description: "Seleção atual e callback. O tipo acompanha o mode.",
            },
            {
              name: "locale",
              type: "Locale",
              description:
                "Locale do date-fns. Use ptBR para nomes em português.",
            },
            {
              name: "disabled",
              type: "Matcher | Matcher[]",
              description:
                "Datas bloqueadas: uma data, um intervalo, ou uma função predicado.",
            },
            {
              name: "numberOfMonths",
              type: "number",
              def: "1",
              description: "Meses exibidos lado a lado.",
            },
            {
              name: "captionLayout",
              type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
              def: '"label"',
              description: "Como navegar entre meses e anos.",
            },
            {
              name: "startMonth / endMonth",
              type: "Date",
              description:
                "Limites da navegação. Obrigatórios com captionLayout dropdown.",
            },
            {
              name: "showOutsideDays",
              type: "boolean",
              def: "true",
              description: "Exibe os dias dos meses vizinhos.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A grade é uma tabela real com role=\"grid\": as setas movem dia a dia e Page Up/Down trocam de mês.",
            "Sem locale, os nomes de dias e meses são anunciados em inglês mesmo em uma página em português.",
            "Datas desabilitadas recebem aria-disabled e continuam sendo anunciadas — quem navega entende que existem mas não podem ser escolhidas.",
            "Para datas distantes, captionLayout dropdown evita dezenas de cliques em “mês anterior”.",
            "Em formulários, ofereça também entrada por texto: digitar 15/03/2027 é mais rápido que navegar até lá.",
            "Só a cor não basta para marcar o dia selecionado — o componente também usa aria-selected.",
          ]}
          keyboard={[
            ["← →", "Dia anterior ou seguinte."],
            ["↑ ↓", "Semana anterior ou seguinte."],
            ["Page Up / Page Down", "Mês anterior ou seguinte."],
            ["Shift + Page Up/Down", "Ano anterior ou seguinte."],
            ["Home / End", "Primeiro ou último dia da semana."],
            ["Enter / Space", "Seleciona o dia em foco."],
          ]}
          aria={[
            'role="grid" na tabela de dias',
            'role="gridcell" com aria-selected em cada dia',
            "aria-disabled — dias bloqueados",
            "aria-live — anúncio da troca de mês",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
