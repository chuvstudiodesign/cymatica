"use client";

import * as React from "react";
import {
  Calendar,
  FolderKanban,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  A11y,
  Anatomy,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const itens = [
  ["Início", Home],
  ["Caixa de entrada", Inbox],
  ["Projetos", FolderKanban],
  ["Agenda", Calendar],
  ["Buscar", Search],
] as const;

function SidebarDemo({
  collapsible = "icon",
  variant = "sidebar",
}: {
  collapsible?: "offcanvas" | "icon" | "none";
  variant?: "sidebar" | "floating" | "inset";
}) {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-full">
        <Sidebar collapsible={collapsible} variant={variant} className="absolute">
          <SidebarHeader className="px-4 py-3 text-sm font-semibold">
            Cymatica
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Trabalho</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itens.map(([label, Icon], i) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={i === 0}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      {i === 1 ? <SidebarMenuBadge>3</SidebarMenuBadge> : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Clientes</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FolderKanban />
                      <span>Ativos</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Cymatica</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Outros</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Ajustes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="min-h-full">
          <header className="flex items-center gap-3 border-b p-3">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">
              collapsible={collapsible} · variant={variant}
            </span>
          </header>
          <div className="p-6 text-sm text-muted-foreground">
            Conteúdo da página. Use o gatilho para recolher a barra.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default function SidebarPage() {
  return (
    <DocPage
      title="Sidebar"
      description="Navegação lateral completa: recolhível, com grupos, submenus, distintivos e persistência do estado em cookie."
      importPath={`import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
  SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar"`}
      tags={["Base UI", "Layout"]}
    >
      <DocSection
        title="Estrutura"
        description="SidebarProvider precisa envolver a barra e o conteúdo. Normalmente ele fica no layout raiz da aplicação."
      >
        <CodeBlock
          code={`// app/layout.tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header><SidebarTrigger /></header>
    {children}
  </SidebarInset>
</SidebarProvider>`}
        />
      </DocSection>

      <DocSection
        title="Recolhível por ícone (interativo)"
        description="collapsible=\{'icon'\} mantém os ícones visíveis quando a barra encolhe."
      >
        <Demo className="block">
          <SidebarDemo collapsible="icon" />
        </Demo>
      </DocSection>

      <DocSection
        title="Off-canvas"
        description="A barra sai inteira da tela. É o padrão, e o comportamento usado no mobile."
      >
        <Demo className="block">
          <SidebarDemo collapsible="offcanvas" />
        </Demo>
      </DocSection>

      <DocSection
        title="Variante flutuante"
        description="variant floating destaca a barra como um cartão; inset recua o conteúdo."
      >
        <Demo className="block">
          <SidebarDemo variant="floating" collapsible="icon" />
        </Demo>
      </DocSection>

      <DocSection
        title="Estado de carregamento"
        description="SidebarMenuSkeleton preserva o ritmo da lista enquanto os itens chegam."
      >
        <Demo className="block">
          <div className="w-64 rounded-lg border p-2">
            <SidebarProvider className="min-h-0">
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarProvider>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="useSidebar"
        description="O hook expõe o estado e os controles para componentes internos."
      >
        <CodeBlock
          code={`const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } =
  useSidebar()

// state: "expanded" | "collapsed"
// toggleSidebar() alterna a barra correta conforme isMobile`}
        />
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["SidebarProvider", "Contexto obrigatório. Guarda o estado e o atalho de teclado."],
            ["Sidebar", "A barra. Aceita side, variant e collapsible."],
            ["SidebarHeader / SidebarFooter", "Topo e base fixos."],
            ["SidebarContent", "Área rolável entre header e footer."],
            ["SidebarGroup", "Bloco de navegação."],
            ["SidebarGroupLabel", "Título do bloco, escondido no modo ícone."],
            ["SidebarMenu / SidebarMenuItem", "Lista e item de navegação."],
            ["SidebarMenuButton", "Alvo clicável. isActive marca a rota atual."],
            ["SidebarMenuBadge", "Contador à direita do item."],
            ["SidebarMenuSub / SubItem / SubButton", "Navegação aninhada."],
            ["SidebarMenuSkeleton", "Placeholder de carregamento."],
            ["SidebarTrigger / SidebarRail", "Alternam a barra."],
            ["SidebarInset", "Área de conteúdo ao lado da barra."],
            ["useSidebar()", "Hook com state, open, isMobile e toggleSidebar."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "collapsible",
              type: '"offcanvas" | "icon" | "none"',
              def: '"offcanvas"',
              description:
                "Como a barra encolhe: sai da tela, vira uma faixa de ícones, ou não recolhe.",
            },
            {
              name: "variant",
              type: '"sidebar" | "floating" | "inset"',
              def: '"sidebar"',
              description: "Tratamento visual da barra e da área de conteúdo.",
            },
            {
              name: "side",
              type: '"left" | "right"',
              def: '"left"',
              description: "Lado da tela onde a barra fica ancorada.",
            },
            {
              name: "open / onOpenChange",
              type: "boolean / (open: boolean) => void",
              description:
                "Em SidebarProvider: controle externo. Por padrão o estado persiste em cookie.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              def: "true",
              description:
                "Em SidebarProvider: estado inicial. Leia o cookie no servidor para evitar salto na hidratação.",
            },
            {
              name: "isActive",
              type: "boolean",
              def: "false",
              description: "Em SidebarMenuButton: marca o item da rota atual.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "SidebarTrigger precisa existir e ficar visível: sem ele, uma barra recolhida vira conteúdo inalcançável.",
            "Marque o item da rota atual com isActive e também com aria-current=\"page\" no link interno.",
            "No modo ícone os rótulos somem visualmente mas continuam no DOM — não troque por title, que não é lido de forma confiável.",
            "No mobile a barra vira um Sheet modal, com foco preso e Escape para fechar.",
            "O atalho ⌘B alterna a barra; ofereça também o botão, já que atalhos não são descobríveis.",
          ]}
          keyboard={[
            ["⌘B / Ctrl+B", "Alterna a barra lateral."],
            ["Tab", "Percorre os itens de navegação."],
            ["Enter", "Ativa o item em foco."],
            ["Escape", "Fecha a barra em modo mobile."],
          ]}
          aria={[
            "<nav> com aria-label — região de navegação",
            'aria-current="page" — item da rota atual',
            "aria-expanded — no gatilho",
            "aria-controls — id da barra",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
