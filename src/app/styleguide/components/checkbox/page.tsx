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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function IndeterminateDemo() {
  const items = ["Marca", "Site", "Social"];
  const [checked, setChecked] = React.useState<string[]>(["Marca"]);
  const all = checked.length === items.length;
  const some = checked.length > 0 && !all;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox
          id="all"
          checked={all}
          indeterminate={some}
          onCheckedChange={(v) => setChecked(v ? items : [])}
        />
        <Label htmlFor="all">Selecionar tudo</Label>
      </div>
      <div className="flex flex-col gap-3 pl-6">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Checkbox
              id={item}
              checked={checked.includes(item)}
              onCheckedChange={(v) =>
                setChecked((prev) =>
                  v ? [...prev, item] : prev.filter((i) => i !== item),
                )
              }
            />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CheckboxPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Alterna um valor booleano. Suporta estado indeterminado para seleções parciais."
      importPath={`import { Checkbox } from "@/components/ui/checkbox"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos</Label>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Aceito os termos</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<Checkbox defaultChecked />
<Checkbox indeterminate />
<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="s1" defaultChecked />
            <Label htmlFor="s1">Marcado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s2" indeterminate />
            <Label htmlFor="s2">Indeterminado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s3" disabled />
            <Label htmlFor="s3">Desabilitado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s4" disabled defaultChecked />
            <Label htmlFor="s4">Desabilitado + marcado</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Seleção parental (interativo)"
        description="O pai fica indeterminado quando só parte dos filhos está marcada."
      >
        <Demo
          code={`const [checked, setChecked] = React.useState(["Marca"])
const all = checked.length === items.length
const some = checked.length > 0 && !all

<Checkbox
  checked={all}
  indeterminate={some}
  onCheckedChange={(v) => setChecked(v ? items : [])}
/>`}
        >
          <IndeterminateDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Com descrição"
        description="Aumente a área clicável envolvendo rótulo e descrição em um bloco."
      >
        <Demo
          code={`<div className="flex items-start gap-3">
  <Checkbox id="news" className="mt-0.5" />
  <div className="flex flex-col">
    <Label htmlFor="news">Novidades</Label>
    <span className="text-xs text-muted-foreground">
      No máximo um e-mail por mês.
    </span>
  </div>
</div>`}
        >
          <div className="flex items-start gap-3">
            <Checkbox id="news" className="mt-0.5" />
            <div className="flex flex-col">
              <Label htmlFor="news">Novidades</Label>
              <span className="text-xs text-muted-foreground">
                No máximo um e-mail por mês.
              </span>
            </div>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
          <Checkbox />
          <Checkbox disabled defaultChecked />
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "checked",
              type: "boolean",
              description: "Estado controlado.",
            },
            {
              name: "defaultChecked",
              type: "boolean",
              def: "false",
              description: "Estado inicial no modo não controlado.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              description: "Disparado quando o estado muda.",
            },
            {
              name: "indeterminate",
              type: "boolean",
              def: "false",
              description:
                "Exibe o traço de estado misto. Visual apenas — checked continua sendo a fonte da verdade.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede interação.",
            },
            {
              name: "required",
              type: "boolean",
              def: "false",
              description: "Marca o campo como obrigatório no formulário.",
            },
            {
              name: "name",
              type: "string",
              description: "Nome enviado no submit do formulário.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Renderiza um input com role=\"checkbox\" e mantém o estado exposto via aria-checked.",
            "Sempre associe um Label pelo htmlFor — o clique no rótulo passa a alternar o controle.",
            "O estado indeterminado é anunciado como \"mixed\" por leitores de tela.",
            "Para grupos de opções mutuamente exclusivas use Radio Group, não Checkbox.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o checkbox."],
            ["Space", "Alterna entre marcado e desmarcado."],
          ]}
          aria={[
            'role="checkbox"',
            'aria-checked="true" | "false" | "mixed"',
            "aria-labelledby / aria-describedby",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
