"use client";

import { Slash } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BreadcrumbDocPage() {
  return (
    <DocPage
      title="Breadcrumb"
      description="Mostra onde a página está na hierarquia do site e permite subir níveis."
      importPath={`import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
      tags={["Navegação"]}
    >
      <DocSection
        title="Básico"
        description="O último item é BreadcrumbPage, não um link — é a página atual."
      >
        <Demo
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/projetos">Projetos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Rebranding</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projetos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Rebranding</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </DocSection>

      <DocSection
        title="Separador personalizado"
        description="BreadcrumbSeparator aceita children para trocar a barra padrão."
      >
        <Demo
          code={`<BreadcrumbSeparator>
  <Slash />
</BreadcrumbSeparator>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Projetos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </DocSection>

      <DocSection
        title="Com reticências"
        description="Caminhos longos colapsam no meio, preservando o primeiro e os últimos níveis."
      >
        <Demo
          code={`<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Marca</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manual</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </DocSection>

      <DocSection
        title="Reticências com menu"
        description="Melhor que esconder: as reticências abrem os níveis omitidos."
      >
        <Demo
          code={`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1">
      <BreadcrumbEllipsis />
      <span className="sr-only">Mostrar mais</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>Projetos</DropdownMenuItem>
      <DropdownMenuItem>Clientes</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Mostrar mais níveis</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Projetos</DropdownMenuItem>
                    <DropdownMenuItem>Clientes</DropdownMenuItem>
                    <DropdownMenuItem>Marca</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manual</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Atual</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Breadcrumb", "Elemento <nav> com aria-label."],
            ["BreadcrumbList", "Lista ordenada dos níveis."],
            ["BreadcrumbItem", "Um nível do caminho."],
            ["BreadcrumbLink", "Nível navegável."],
            ["BreadcrumbPage", "Página atual — sem link, com aria-current."],
            ["BreadcrumbSeparator", "Divisória decorativa entre níveis."],
            ["BreadcrumbEllipsis", "Indicador de níveis omitidos."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "href",
              type: "string",
              description: "Em BreadcrumbLink: destino do nível.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em BreadcrumbLink: use render={<Link href=\"…\" />} para navegação client-side do Next.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Em BreadcrumbSeparator: substitui o ícone padrão de barra.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A raiz é um <nav aria-label=\"breadcrumb\">, então leitores de tela listam a trilha entre as regiões de navegação.",
            "A página atual usa aria-current=\"page\" e não é um link — transformá-la em link confunde.",
            "Os separadores são aria-hidden: eles não devem ser lidos como conteúdo.",
            "As reticências precisam de um texto em sr-only explicando o que foi omitido; melhor ainda é torná-las um menu real.",
            "Breadcrumb complementa a navegação principal, nunca a substitui.",
          ]}
          keyboard={[
            ["Tab", "Percorre os níveis navegáveis."],
            ["Enter", "Segue o link em foco."],
          ]}
          aria={[
            'aria-label="breadcrumb" — no <nav>',
            'aria-current="page" — no nível atual',
            'aria-hidden="true" — nos separadores',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
