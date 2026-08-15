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
import { Textarea } from "@/components/ui/textarea";

function CounterDemo() {
  const max = 180;
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="brief">Briefing</Label>
      <Textarea
        id="brief"
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Conte em poucas linhas o que a sua marca precisa."
        aria-describedby="brief-count"
      />
      <span
        id="brief-count"
        className="self-end font-mono text-xs text-muted-foreground"
      >
        {value.length}/{max}
      </span>
    </div>
  );
}

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="Campo de texto de múltiplas linhas para conteúdo mais longo."
      importPath={`import { Textarea } from "@/components/ui/textarea"`}
      tags={["Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Label htmlFor="msg">Mensagem</Label>
<Textarea id="msg" placeholder="Escreva sua mensagem…" />`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <Label htmlFor="msg">Mensagem</Label>
            <Textarea id="msg" placeholder="Escreva sua mensagem…" />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          className="flex-col items-stretch"
          code={`<Textarea placeholder="Normal" />
<Textarea placeholder="Desabilitado" disabled />
<Textarea defaultValue="Somente leitura" readOnly />
<Textarea placeholder="Inválido" aria-invalid />`}
        >
          <Textarea placeholder="Normal" />
          <Textarea placeholder="Desabilitado" disabled />
          <Textarea defaultValue="Somente leitura" readOnly />
          <Textarea placeholder="Inválido" aria-invalid />
        </Demo>
      </DocSection>

      <DocSection title="Altura fixa">
        <Demo
          code={`<Textarea rows={8} className="resize-none" />`}
          description="rows define a altura inicial; resize-none impede o arraste."
        >
          <Textarea
            rows={8}
            className="resize-none"
            placeholder="Oito linhas, sem redimensionar."
          />
        </Demo>
      </DocSection>

      <DocSection
        title="Com contador (interativo)"
        description="O contador é associado ao campo por aria-describedby, então é anunciado junto."
      >
        <Demo
          code={`const [value, setValue] = React.useState("")

<Textarea
  maxLength={180}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  aria-describedby="brief-count"
/>
<span id="brief-count">{value.length}/180</span>`}
        >
          <CounterDemo />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Textarea placeholder="Placeholder" />
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Herda todos os atributos de <textarea>."
          rows={[
            {
              name: "rows",
              type: "number",
              description: "Número de linhas visíveis, definindo a altura inicial.",
            },
            {
              name: "maxLength",
              type: "number",
              description: "Limite de caracteres imposto pelo navegador.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o campo.",
            },
            {
              name: "readOnly",
              type: "boolean",
              def: "false",
              description: "Impede edição mantendo o conteúdo selecionável.",
            },
            {
              name: "aria-invalid",
              type: "boolean",
              description: "Ativa o estilo de erro usando --destructive.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Associe sempre um Label pelo htmlFor.",
            "Contadores e dicas devem ser ligados por aria-describedby, senão passam despercebidos.",
            "Evite maxLength sem feedback visível: o campo simplesmente para de aceitar texto, o que confunde.",
            "Não capture a tecla Enter para enviar sem oferecer alternativa — Enter é quebra de linha aqui.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o campo."],
            ["Enter", "Insere quebra de linha."],
            ["Shift + Tab", "Volta ao elemento anterior."],
          ]}
          aria={[
            "aria-describedby — contador, dica ou erro",
            "aria-invalid — estado de erro",
            "aria-required — campo obrigatório",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
