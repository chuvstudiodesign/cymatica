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
import { Switch } from "@/components/ui/switch";

function ControlledDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Switch id="priority" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="priority">Entrega prioritária</Label>
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        checked: {String(on)}
      </span>
    </div>
  );
}

export default function SwitchPage() {
  return (
    <DocPage
      title="Switch"
      description="Alterna uma configuração com efeito imediato. Diferente do checkbox, não espera o envio de um formulário."
      importPath={`import { Switch } from "@/components/ui/switch"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<div className="flex items-center gap-3">
  <Switch id="airplane" />
  <Label htmlFor="airplane">Modo avião</Label>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Switch id="airplane" />
            <Label htmlFor="airplane">Modo avião</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Tamanhos">
        <Demo
          code={`<Switch size="sm" />
<Switch size="default" />`}
        >
          <div className="flex items-center gap-2">
            <Switch id="sm" size="sm" defaultChecked />
            <Label htmlFor="sm">sm</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="df" size="default" defaultChecked />
            <Label htmlFor="df">default</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          code={`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch disabled defaultChecked />`}
        >
          <Switch aria-label="Desligado" />
          <Switch aria-label="Ligado" defaultChecked />
          <Switch aria-label="Desabilitado" disabled />
          <Switch aria-label="Desabilitado e ligado" disabled defaultChecked />
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [on, setOn] = React.useState(true)

<Switch checked={on} onCheckedChange={setOn} />`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Em uma linha de configuração"
        description="Padrão de tela de ajustes: rótulo e descrição à esquerda, controle à direita."
      >
        <Demo
          code={`<div className="flex items-center justify-between gap-6">
  <div className="flex flex-col">
    <Label htmlFor="nf">Notificações</Label>
    <span className="text-xs text-muted-foreground">
      Avisar quando a proposta for aceita.
    </span>
  </div>
  <Switch id="nf" defaultChecked />
</div>`}
        >
          <div className="flex w-full max-w-md items-center justify-between gap-6">
            <div className="flex flex-col">
              <Label htmlFor="nf">Notificações</Label>
              <span className="text-xs text-muted-foreground">
                Avisar quando a proposta for aceita.
              </span>
            </div>
            <Switch id="nf" defaultChecked />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Switch aria-label="Off" />
          <Switch aria-label="On" defaultChecked />
          <Switch aria-label="Disabled" disabled defaultChecked />
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
              name: "size",
              type: '"sm" | "default"',
              def: '"default"',
              description: "Tamanho do trilho e do polegar.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede interação.",
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
            "Use Switch quando a mudança tem efeito imediato; use Checkbox quando o valor só vale após enviar o formulário.",
            "O rótulo deve descrever o que é ligado, não o estado atual: \"Notificações\", não \"Notificações ativadas\".",
            "Não dependa apenas da cor para indicar o estado — a posição do polegar também comunica.",
            "Switches sem rótulo visível precisam de aria-label.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o switch."],
            ["Space / Enter", "Alterna o estado."],
          ]}
          aria={[
            'role="switch"',
            'aria-checked="true" | "false"',
            "aria-labelledby / aria-label",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
