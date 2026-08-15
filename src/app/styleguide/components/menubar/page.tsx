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
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

function FullDemo() {
  const [reguas, setReguas] = React.useState(true);
  const [perfil, setPerfil] = React.useState("cymatica");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Novo projeto <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Abrir… <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Exportar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF</MenubarItem>
              <MenubarItem>SVG</MenubarItem>
              <MenubarItem>PNG</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Salvar <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Colar estilo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Ver</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={reguas}
            onCheckedChange={(v) => setReguas(Boolean(v))}
          >
            Réguas
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Perfil de cor</MenubarLabel>
          <MenubarRadioGroup
            value={perfil}
            onValueChange={(v) => setPerfil(String(v))}
          >
            <MenubarRadioItem value="cymatica">Cymatica</MenubarRadioItem>
            <MenubarRadioItem value="srgb">sRGB</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default function MenubarPage() {
  return (
    <DocPage
      title="Menubar"
      description="Barra de menus persistente, no modelo de aplicativo desktop. Depois do primeiro menu aberto, os demais respondem ao passar o mouse."
      importPath={`import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem,
  MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
  MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent,
  MenubarSubTrigger, MenubarTrigger,
} from "@/components/ui/menubar"`}
      tags={["Base UI", "Navegação"]}
    >
      <DocSection
        title="Completo (interativo)"
        description="Abra Arquivo e passe o mouse por Editar e Ver — a barra troca de menu sem novo clique."
      >
        <Demo
          className="block"
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo projeto <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Exportar</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>PDF</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Editar</MenubarTrigger>
    <MenubarContent>…</MenubarContent>
  </MenubarMenu>
</Menubar>`}
        >
          <FullDemo />
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Menubar", "Barra que contém todos os menus."],
            ["MenubarMenu", "Um menu da barra."],
            ["MenubarTrigger", "Rótulo clicável do menu."],
            ["MenubarContent", "Popup do menu."],
            ["MenubarItem", "Ação."],
            ["MenubarCheckboxItem / RadioGroup / RadioItem", "Itens de seleção."],
            ["MenubarSub / SubTrigger / SubContent", "Submenu aninhado."],
            ["MenubarLabel / Separator / Shortcut", "Título, divisória e atalho."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "string",
              description:
                "Em Menubar: qual menu está aberto. Controle apenas se precisar abrir por código.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Disparado ao trocar o menu aberto.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Em MenubarItem ou MenubarTrigger: torna inativo.",
            },
            {
              name: "checked / onCheckedChange",
              type: "boolean / (checked: boolean) => void",
              description: "Em MenubarCheckboxItem.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Menubar pertence a aplicativos com muitos comandos. Para uma ou duas ações, um Dropdown Menu comunica melhor.",
            "A barra é uma única parada de Tab; as setas laterais movem entre os menus.",
            "MenubarShortcut é decorativo: registre os atalhos reais no seu código e mantenha os dois em sincronia.",
            "Não funciona bem no mobile — em telas pequenas, troque por Sheet ou Drawer com a mesma lista de comandos.",
          ]}
          keyboard={[
            ["Tab", "Entra na barra."],
            ["← →", "Move entre os menus da barra."],
            ["↓ / Enter", "Abre o menu em foco."],
            ["↑ ↓", "Move entre os itens do menu aberto."],
            ["→ ←", "Abre e fecha submenus."],
            ["Escape", "Fecha o menu e volta o foco à barra."],
          ]}
          aria={[
            'role="menubar" na barra',
            'role="menu" em cada popup',
            "aria-expanded — no gatilho do menu aberto",
            'role="menuitemcheckbox" / "menuitemradio" — nos itens de seleção',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
