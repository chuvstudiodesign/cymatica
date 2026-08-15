"use client";

import * as React from "react";
import {
  CreditCard,
  LogOut,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CheckboxDemo() {
  const [cols, setCols] = React.useState({
    escopo: true,
    valor: true,
    prazo: false,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Colunas
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Exibir colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(cols) as (keyof typeof cols)[]).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={cols[key]}
            onCheckedChange={(v) =>
              setCols((prev) => ({ ...prev, [key]: Boolean(v) }))
            }
            className="capitalize"
          >
            {key}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RadioDemo() {
  const [ordem, setOrdem] = React.useState("recentes");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Ordenar
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={ordem}
          onValueChange={(v) => setOrdem(String(v))}
        >
          <DropdownMenuRadioItem value="recentes">
            Mais recentes
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="antigos">
            Mais antigos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="valor">Maior valor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DropdownMenuPage() {
  return (
    <DocPage
      title="Dropdown Menu"
      description="Menu de ações disparado por um botão. Suporta itens de seleção, submenus e atalhos."
      importPath={`import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`}
      tags={["Base UI", "Navegação"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Abrir
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User /> Perfil</DropdownMenuItem>
    <DropdownMenuItem><Settings /> Ajustes</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Abrir menu
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User /> Perfil
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard /> Cobrança
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Ajustes
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Itens de seleção (interativo)"
        description="Checkbox para múltipla escolha, radio para escolha única. O menu permanece aberto ao marcar."
      >
        <Demo
          code={`<DropdownMenuCheckboxItem checked={cols.escopo} onCheckedChange={…}>
  Escopo
</DropdownMenuCheckboxItem>

<DropdownMenuRadioGroup value={ordem} onValueChange={…}>
  <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
        >
          <CheckboxDemo />
          <RadioDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Submenu"
        description="Abre ao passar o mouse ou com a seta para a direita."
      >
        <Demo
          code={`<DropdownMenuSub>
  <DropdownMenuSubTrigger><UserPlus /> Convidar</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Por e-mail</DropdownMenuItem>
    <DropdownMenuItem>Copiar link</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Com submenu
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Novo projeto</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus /> Convidar time
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Por e-mail</DropdownMenuItem>
                  <DropdownMenuItem>Copiar link</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Arquivar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Alinhamento"
        description="align e side posicionam o popup em relação ao gatilho."
      >
        <Demo
          code={`<DropdownMenuContent align="start" />
<DropdownMenuContent align="center" />
<DropdownMenuContent align="end" />
<DropdownMenuContent side="top" />`}
        >
          {(["start", "center", "end"] as const).map((align) => (
            <DropdownMenu key={align}>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                {align}
              </DropdownMenuTrigger>
              <DropdownMenuContent align={align}>
                <DropdownMenuItem>Item um</DropdownMenuItem>
                <DropdownMenuItem>Item dois</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["DropdownMenu", "Raiz. Controla open e onOpenChange."],
            ["DropdownMenuTrigger", "Botão que abre o menu. Use render."],
            ["DropdownMenuContent", "Popup. Aceita side, align, sideOffset."],
            ["DropdownMenuGroup", "Agrupa itens relacionados."],
            ["DropdownMenuLabel", "Título não interativo de um grupo."],
            ["DropdownMenuItem", "Ação. Aceita variant destructive e disabled."],
            ["DropdownMenuCheckboxItem", "Item alternável, com marca de seleção."],
            ["DropdownMenuRadioGroup / RadioItem", "Escolha única dentro do menu."],
            ["DropdownMenuSub / SubTrigger / SubContent", "Submenu aninhado."],
            ["DropdownMenuSeparator", "Divisória entre grupos."],
            ["DropdownMenuShortcut", "Atalho de teclado alinhado à direita."],
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
              description: "Estado do menu, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "align / side / sideOffset",
              type: '"start" | "center" | "end" / "top" | "right" | "bottom" | "left" / number',
              description: "Em DropdownMenuContent: posicionamento do popup.",
            },
            {
              name: "variant",
              type: '"default" | "destructive"',
              def: '"default"',
              description: "Em DropdownMenuItem: destaca ações perigosas.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Item inativo, pulado na navegação por teclado.",
            },
            {
              name: "checked / onCheckedChange",
              type: "boolean / (checked: boolean) => void",
              description: "Em DropdownMenuCheckboxItem.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O gatilho precisa ser focável — sempre use render com Button, nunca uma div com onClick.",
            "Digitar letras com o menu aberto salta para o item correspondente.",
            "DropdownMenuShortcut é apenas visual: o atalho real precisa ser registrado no seu código.",
            "Ações destrutivas devem usar variant=\"destructive\" e, quando irreversíveis, abrir um AlertDialog de confirmação.",
            "Ao fechar, o foco volta ao gatilho — não o mova manualmente.",
          ]}
          keyboard={[
            ["Enter / Space / ↓", "Abre o menu a partir do gatilho."],
            ["↑ ↓", "Move entre os itens."],
            ["→", "Abre um submenu."],
            ["←", "Fecha o submenu e volta ao item pai."],
            ["Home / End", "Primeiro ou último item."],
            ["A–Z", "Salta para o item iniciado pela letra."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'aria-haspopup="menu" e aria-expanded no gatilho',
            'role="menu" no popup',
            'role="menuitem" / "menuitemcheckbox" / "menuitemradio" nos itens',
            "aria-checked — nos itens de seleção",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
