"use client";

import * as React from "react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

function Target({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
      {children ?? "Clique com o botão direito aqui"}
    </div>
  );
}

function StatefulDemo() {
  const [grade, setGrade] = React.useState(true);
  const [zoom, setZoom] = React.useState("100");
  return (
    <ContextMenu>
      <ContextMenuTrigger render={<Target />} />
      <ContextMenuContent>
        <ContextMenuLabel>Visualização</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={grade}
          onCheckedChange={(v) => setGrade(Boolean(v))}
        >
          Mostrar grade
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          value={zoom}
          onValueChange={(v) => setZoom(String(v))}
        >
          <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default function ContextMenuPage() {
  return (
    <DocPage
      title="Context Menu"
      description="Menu aberto pelo botão direito ou por toque longo, ancorado na posição do ponteiro."
      importPath={`import {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup,
  ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`}
      tags={["Base UI", "Navegação"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<ContextMenu>
  <ContextMenuTrigger render={<div className="h-32 border" />} />
  <ContextMenuContent>
    <ContextMenuItem>Renomear <ContextMenuShortcut>F2</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem>Duplicar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger render={<Target />} />
            <ContextMenuContent>
              <ContextMenuGroup>
                <ContextMenuItem>
                  Renomear
                  <ContextMenuShortcut>F2</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  Duplicar
                  <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>Mover</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Com submenu"
        description="A mesma estrutura do Dropdown Menu, ancorada no ponteiro."
      >
        <Demo
          className="block"
          code={`<ContextMenuSub>
  <ContextMenuSubTrigger>Exportar como</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>PNG</ContextMenuItem>
    <ContextMenuItem>SVG</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}
        >
          <ContextMenu>
            <ContextMenuTrigger render={<Target>Botão direito para exportar</Target>} />
            <ContextMenuContent>
              <ContextMenuItem>Abrir</ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Exportar como</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>PNG</ContextMenuItem>
                  <ContextMenuItem>SVG</ContextMenuItem>
                  <ContextMenuItem>PDF</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Itens de seleção (interativo)"
        description="Checkbox e radio funcionam igual ao Dropdown Menu."
      >
        <Demo className="block">
          <StatefulDemo />
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["ContextMenu", "Raiz."],
            ["ContextMenuTrigger", "Área que responde ao botão direito. Use render."],
            ["ContextMenuContent", "Popup ancorado no ponteiro."],
            ["ContextMenuItem", "Ação. Aceita variant destructive e disabled."],
            ["ContextMenuCheckboxItem / RadioGroup / RadioItem", "Itens de seleção."],
            ["ContextMenuSub / SubTrigger / SubContent", "Submenu aninhado."],
            ["ContextMenuLabel / Separator / Shortcut", "Título, divisória e atalho."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em ContextMenuTrigger: o elemento que passa a responder ao botão direito.",
            },
            {
              name: "variant",
              type: '"default" | "destructive"',
              def: '"default"',
              description: "Em ContextMenuItem: destaca ações perigosas.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Item inativo.",
            },
            {
              name: "checked / onCheckedChange",
              type: "boolean / (checked: boolean) => void",
              description: "Em ContextMenuCheckboxItem.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Este é o padrão menos descobrível da biblioteca: nada indica visualmente que o botão direito faz algo.",
            "Toda ação do menu de contexto precisa existir em outro lugar da interface — um botão de ações, um dropdown, um atalho.",
            "No touch, o menu abre com toque longo; em teclado, pela tecla de menu de contexto ou Shift+F10.",
            "Não substitua o menu nativo do navegador em áreas de texto: copiar, colar e inspecionar precisam continuar disponíveis.",
          ]}
          keyboard={[
            ["Shift + F10", "Abre o menu de contexto do elemento em foco."],
            ["Tecla de menu", "Abre o menu de contexto."],
            ["↑ ↓", "Move entre os itens."],
            ["→ ←", "Abre e fecha submenus."],
            ["Escape", "Fecha o menu."],
          ]}
          aria={[
            'role="menu" no popup',
            'role="menuitem" / "menuitemcheckbox" / "menuitemradio"',
            "aria-expanded — no gatilho de submenu",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
