"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          render={<Button variant="outline" className="w-full justify-between" />}
        >
          Detalhes do escopo
          <ChevronsUpDown className="size-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2 pt-3 text-sm text-muted-foreground">
          <p>Manual de marca em PDF.</p>
          <p>Kit de aplicação para redes sociais.</p>
          <p>Arquivos editáveis em .ai e .svg.</p>
        </CollapsibleContent>
      </Collapsible>
      <span className="font-mono text-xs text-muted-foreground">
        open: {String(open)}
      </span>
    </div>
  );
}

export default function CollapsiblePage() {
  return (
    <DocPage
      title="Collapsible"
      description="Mostra e esconde um bloco de conteúdo. É a peça de uma seção só — para várias, use Accordion."
      importPath={`import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"`}
      tags={["Base UI", "Layout"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Collapsible>
  <CollapsibleTrigger render={<Button variant="outline" />}>
    Ver detalhes
  </CollapsibleTrigger>
  <CollapsibleContent>
    Conteúdo revelado.
  </CollapsibleContent>
</Collapsible>`}
        >
          <Collapsible className="w-full max-w-md">
            <CollapsibleTrigger render={<Button variant="outline" />}>
              Ver detalhes
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
              A produção começa em até 48h após a confirmação do pagamento.
            </CollapsibleContent>
          </Collapsible>
        </Demo>
      </DocSection>

      <DocSection
        title="Aberto por padrão"
        description="defaultOpen deixa o conteúdo visível no primeiro render."
      >
        <Demo
          className="block"
          code={`<Collapsible defaultOpen>…</Collapsible>`}
        >
          <Collapsible defaultOpen className="w-full max-w-md">
            <CollapsibleTrigger render={<Button variant="outline" />}>
              Já aberto
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
              Este conteúdo aparece imediatamente.
            </CollapsibleContent>
          </Collapsible>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          className="block"
          code={`const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>…</Collapsible>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Lista com “ver mais”"
        description="Padrão comum: alguns itens sempre visíveis e o restante colapsado."
      >
        <Demo
          className="block"
          code={`<div>
  <Item>Identidade visual</Item>
  <Item>Site institucional</Item>
  <Collapsible>
    <CollapsibleContent>
      <Item>Social kit</Item>
      <Item>Motion</Item>
    </CollapsibleContent>
    <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
      Ver mais
    </CollapsibleTrigger>
  </Collapsible>
</div>`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <div className="rounded-lg border p-3 text-sm">Identidade visual</div>
            <div className="rounded-lg border p-3 text-sm">Site institucional</div>
            <Collapsible>
              <CollapsibleContent className="flex flex-col gap-2 pb-2">
                <div className="rounded-lg border p-3 text-sm">Social kit</div>
                <div className="rounded-lg border p-3 text-sm">Motion</div>
              </CollapsibleContent>
              <CollapsibleTrigger
                render={<Button variant="ghost" size="sm" className="w-full" />}
              >
                Ver mais
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Desabilitado">
        <Demo
          className="block"
          code={`<Collapsible disabled>…</Collapsible>`}
        >
          <Collapsible disabled className="w-full max-w-md">
            <CollapsibleTrigger render={<Button variant="outline" />}>
              Indisponível
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
              Não abre.
            </CollapsibleContent>
          </Collapsible>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Collapsible defaultOpen className="w-full">
            <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
              Alternar
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 text-sm text-muted-foreground">
              Conteúdo.
            </CollapsibleContent>
          </Collapsible>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Collapsible", "Raiz. Controla o estado aberto/fechado."],
            ["CollapsibleTrigger", "Alterna o estado. Use render para virar um Button."],
            ["CollapsibleContent", "Painel animado em altura."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "open / defaultOpen",
              type: "boolean",
              def: "false",
              description: "Estado do painel, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede a alternância.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em CollapsibleTrigger: troca o elemento renderizado, normalmente por um Button.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O gatilho precisa ser um elemento focável — use render com Button, não uma <div> com onClick.",
            "O rótulo deve descrever o conteúdo (\"Ver detalhes\"), não a mecânica (\"Expandir\").",
            "Conteúdo fechado sai da ordem de foco: nada dentro dele é alcançável por Tab.",
            "Se o gatilho fica abaixo do conteúdo, como no padrão “ver mais”, garanta que o foco permaneça visível após expandir.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o gatilho."],
            ["Enter / Space", "Abre ou fecha o painel."],
          ]}
          aria={[
            "aria-expanded — no gatilho",
            "aria-controls — id do painel",
            "hidden — aplicado ao painel fechado",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
