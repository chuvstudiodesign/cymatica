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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const servicos = [
  ["Identidade visual", "Marca, manual e kit de aplicação."],
  ["Site institucional", "Do conteúdo ao deploy."],
  ["Social kit", "Templates prontos para publicar."],
  ["Motion", "Animação de marca e vinhetas."],
];

function ListItem({
  title,
  children,
  href = "#",
}: {
  title: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className="flex flex-col gap-1 rounded-md p-3 transition-colors hover:bg-muted"
      >
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{children}</span>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuPage() {
  return (
    <DocPage
      title="Navigation Menu"
      description="Navegação principal com painéis suspensos. Feita para o cabeçalho de um site, não para ações."
      importPath={`import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"`}
      tags={["Base UI", "Navegação"]}
    >
      <DocSection
        title="Básico"
        description="Cada item pode ter um painel com links agrupados."
      >
        <Demo
          className="block"
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-96 gap-2 p-2 md:grid-cols-2">
          <ListItem title="Identidade visual">
            Marca, manual e kit de aplicação.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[28rem] gap-2 p-2 md:grid-cols-2">
                    {servicos.map(([title, desc]) => (
                      <ListItem key={title} title={title}>
                        {desc}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Estúdio</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-2 p-2">
                    <ListItem title="Sobre">
                      Como a Cymatica nasceu e por quê.
                    </ListItem>
                    <ListItem title="Processo">
                      Do briefing à entrega em quatro etapas.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Preços
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Link simples"
        description="Itens sem painel usam navigationMenuTriggerStyle() para manter a mesma aparência."
      >
        <Demo
          className="block"
          code={`<NavigationMenuItem>
  <NavigationMenuLink href="/precos" className={cn(navigationMenuTriggerStyle())}>
    Preços
  </NavigationMenuLink>
</NavigationMenuItem>`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Preços
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Contato
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </DocSection>

      <DocSection
        title="Alinhamento"
        description="align posiciona os painéis em relação à barra."
      >
        <Demo
          className="block"
          code={`<NavigationMenu align="end">…</NavigationMenu>`}
        >
          <div className="flex w-full justify-end">
            <NavigationMenu align="end">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-72 gap-2 p-2">
                      <ListItem title="Blog">Notas do estúdio.</ListItem>
                      <ListItem title="Changelog">O que mudou.</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["NavigationMenu", "Raiz. Aceita align e controla o painel aberto."],
            ["NavigationMenuList", "Barra horizontal de itens."],
            ["NavigationMenuItem", "Um item da barra."],
            ["NavigationMenuTrigger", "Item que abre um painel."],
            ["NavigationMenuContent", "Painel suspenso."],
            ["NavigationMenuLink", "Link. Use render={<Link />} para o Next."],
            ["NavigationMenuPositioner", "Controle fino de posicionamento do painel."],
            ["navigationMenuTriggerStyle()", "Classes do gatilho, para itens sem painel."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "align",
              type: '"start" | "center" | "end"',
              def: '"start"',
              description: "Em NavigationMenu: alinhamento dos painéis.",
            },
            {
              name: "value / onValueChange",
              type: "string / (value: string) => void",
              description: "Painel aberto, quando você precisa controlá-lo.",
            },
            {
              name: "href",
              type: "string",
              description: "Em NavigationMenuLink: destino.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em NavigationMenuLink: use render={<Link />} para navegação client-side.",
            },
            {
              name: "side / sideOffset",
              type: "string / number",
              def: '"bottom" / 8',
              description: "Em NavigationMenuPositioner: posição do painel.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Este componente é para navegação: os itens levam a páginas. Para executar ações use Dropdown Menu.",
            "Os painéis abrem ao passar o mouse, mas também no Enter — hover nunca pode ser o único caminho.",
            "Não aninhe muitos níveis: um painel com dois ou três grupos já é o limite prático.",
            "No mobile o padrão não funciona bem; troque por Sheet com a mesma árvore de links.",
            "Marque a página atual com aria-current=\"page\" no link correspondente.",
          ]}
          keyboard={[
            ["Tab", "Move entre os itens da barra."],
            ["Enter / Space", "Abre o painel do item em foco."],
            ["↓", "Entra no painel aberto."],
            ["← →", "Move entre os itens da barra."],
            ["Escape", "Fecha o painel e volta o foco ao gatilho."],
          ]}
          aria={[
            "<nav> como elemento raiz",
            "aria-expanded — no gatilho com painel aberto",
            "aria-controls — id do painel",
            'aria-current="page" — no link da página atual',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
