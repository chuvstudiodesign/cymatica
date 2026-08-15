"use client";

import * as React from "react";

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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function InteractiveDemo() {
  const total = 10;
  const [page, setPage] = React.useState(1);

  const pages = React.useMemo(() => {
    const out: (number | "…")[] = [];
    for (let p = 1; p <= total; p++) {
      if (p === 1 || p === total || Math.abs(p - page) <= 1) out.push(p);
      else if (out[out.length - 1] !== "…") out.push("…");
    }
    return out;
  }, [page]);

  return (
    <div className="flex flex-col gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {pages.map((p, i) =>
            p === "…" ? (
              <PaginationItem key={`e-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page === total}
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(total, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className="text-center font-mono text-xs text-muted-foreground">
        página {page} de {total}
      </span>
    </div>
  );
}

export default function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      description="Navegação entre páginas de uma lista longa. Construída sobre links reais, então funciona com URLs compartilháveis."
      importPath={`import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"`}
      tags={["Navegação"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?page=1" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=3">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="?page=2" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Demo>
      </DocSection>

      <DocSection
        title="Com reticências"
        description="Para muitas páginas, mantenha a primeira, a última e a janela ao redor da atual."
      >
        <Demo
          className="block"
          code={`<PaginationItem>
  <PaginationEllipsis />
</PaginationItem>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  7
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">24</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Demo>
      </DocSection>

      <DocSection
        title="Interativo"
        description="A janela de páginas se recalcula conforme a atual muda."
      >
        <Demo className="block">
          <InteractiveDemo />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Pagination", "Elemento <nav> com aria-label."],
            ["PaginationContent", "Lista dos itens."],
            ["PaginationItem", "Um item da lista."],
            ["PaginationLink", "Link de página. isActive marca a atual."],
            ["PaginationPrevious / PaginationNext", "Atalhos para página anterior e seguinte."],
            ["PaginationEllipsis", "Indica páginas omitidas."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "href",
              type: "string",
              description:
                "Destino da página. Manter URLs reais preserva histórico e compartilhamento.",
            },
            {
              name: "isActive",
              type: "boolean",
              def: "false",
              description:
                "Marca a página atual, aplicando o estilo e aria-current.",
            },
            {
              name: "size",
              type: '"default" | "icon"',
              def: '"icon"',
              description: "Em PaginationLink: tamanho do alvo clicável.",
            },
            {
              name: "aria-disabled",
              type: "boolean",
              description:
                "Em PaginationPrevious/Next: sinaliza que não há para onde ir.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A raiz é um <nav aria-label=\"pagination\"> — a região aparece na lista de navegação do leitor de tela.",
            "A página atual recebe aria-current=\"page\"; não dependa apenas da cor de fundo para indicá-la.",
            "Anterior e Seguinte precisam de texto acessível além da seta; o componente já inclui rótulo visível.",
            "Nas extremidades, use aria-disabled em vez de remover o controle: a posição dos botões não deve mudar.",
            "Após trocar de página, mova o foco para o topo da lista e anuncie a mudança em uma região aria-live.",
          ]}
          keyboard={[
            ["Tab", "Percorre os controles de paginação."],
            ["Enter", "Navega para a página em foco."],
          ]}
          aria={[
            'aria-label="pagination" — no <nav>',
            'aria-current="page" — no link da página atual',
            "aria-disabled — nos atalhos sem destino",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
