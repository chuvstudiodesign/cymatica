"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import {
  A11y,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Proposta = {
  id: string;
  projeto: string;
  status: "Aprovada" | "Em análise" | "Recusada";
  valor: number;
};

const dados: Proposta[] = [
  { id: "#1042", projeto: "Rebranding Cymatica", status: "Aprovada", valor: 12400 },
  { id: "#1041", projeto: "Landing de lançamento", status: "Em análise", valor: 3900 },
  { id: "#1040", projeto: "Social kit trimestral", status: "Aprovada", valor: 2450 },
  { id: "#1039", projeto: "Manual de marca", status: "Recusada", valor: 6800 },
  { id: "#1038", projeto: "Vinheta de abertura", status: "Aprovada", valor: 5200 },
  { id: "#1037", projeto: "Naming de produto", status: "Em análise", valor: 4100 },
  { id: "#1036", projeto: "Embalagem linha verão", status: "Aprovada", valor: 9300 },
];

const brl = (v: number) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const statusVariant: Record<
  Proposta["status"],
  "default" | "secondary" | "destructive"
> = {
  Aprovada: "default",
  "Em análise": "secondary",
  Recusada: "destructive",
};

const colunas: ColumnDef<Proposta>[] = [
  {
    id: "selecionar",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(Boolean(v))}
        aria-label="Selecionar todas as linhas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(Boolean(v))}
        aria-label={`Selecionar ${row.original.projeto}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "Código" },
  { accessorKey: "projeto", header: "Projeto" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => (
      <span className="font-mono">{brl(row.original.valor)}</span>
    ),
  },
  {
    id: "acoes",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Ações de ${row.original.projeto}`}
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copiar código
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function DataTablePage() {
  return (
    <DocPage
      title="Data Table"
      description="Table + TanStack Table: ordenação, filtro, paginação, seleção e visibilidade de colunas. Não é item de registry — a doc oficial descreve como composição, e aqui ela virou um componente genérico."
      importPath={`import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"`}
      tags={["TanStack Table", "Dados"]}
    >
      <DocSection
        title="Completo (interativo)"
        description="Ordene pelos cabeçalhos, filtre pelo campo, selecione linhas e esconda colunas."
      >
        <Demo className="block">
          <DataTable
            columns={colunas}
            data={dados}
            filterColumn="projeto"
            filterPlaceholder="Filtrar por projeto…"
            label="Propostas"
          />
        </Demo>
      </DocSection>

      <DocSection
        title="Definindo as colunas"
        description="ColumnDef controla cabeçalho, célula e quais recursos cada coluna aceita."
      >
        <CodeBlock
          code={`type Proposta = {
  id: string
  projeto: string
  status: "Aprovada" | "Em análise" | "Recusada"
  valor: number
}

const colunas: ColumnDef<Proposta>[] = [
  { accessorKey: "id", header: "Código" },
  { accessorKey: "projeto", header: "Projeto" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => <span className="font-mono">{brl(row.original.valor)}</span>,
  },
]`}
        />
      </DocSection>

      <DocSection
        title="Coluna de seleção"
        description="Uma coluna sem accessorKey, com o checkbox no cabeçalho controlando a página inteira."
      >
        <CodeBlock
          code={`{
  id: "selecionar",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={(v) => table.toggleAllPageRowsSelected(Boolean(v))}
      aria-label="Selecionar todas as linhas"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(v) => row.toggleSelected(Boolean(v))}
      aria-label={\`Selecionar \${row.original.projeto}\`}
    />
  ),
  enableSorting: false,
  enableHiding: false,
}`}
        />
      </DocSection>

      <DocSection
        title="Coluna de ações"
        description="O menu por linha precisa de aria-label único — “Ações” repetido sete vezes não orienta ninguém."
      >
        <CodeBlock
          code={`{
  id: "acoes",
  cell: ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" size="icon-sm"
          aria-label={\`Ações de \${row.original.projeto}\`} />
      }>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">…</DropdownMenuContent>
    </DropdownMenu>
  ),
  enableSorting: false,
  enableHiding: false,
}`}
        />
      </DocSection>

      <DocSection
        title="Sem filtro nem menu de colunas"
        description="Omita filterColumn e desligue showColumnToggle para uma tabela apenas paginada."
      >
        <Demo
          className="block"
          code={`<DataTable
  columns={colunas}
  data={dados}
  showColumnToggle={false}
  pageSize={3}
/>`}
        >
          <DataTable
            columns={colunas.filter(
              (c) => c.id !== "selecionar" && c.id !== "acoes",
            )}
            data={dados}
            showColumnToggle={false}
            pageSize={3}
            label="Propostas resumidas"
          />
        </Demo>
      </DocSection>

      <DocSection
        title="Estado vazio"
        description="Uma tabela sem linhas precisa dizer o que aconteceu, não ficar em branco."
      >
        <Demo
          className="block"
          code={`<DataTable
  columns={colunas}
  data={[]}
  emptyMessage="Nenhuma proposta neste período."
/>`}
        >
          <DataTable
            columns={colunas.filter(
              (c) => c.id !== "selecionar" && c.id !== "acoes",
            )}
            data={[]}
            showColumnToggle={false}
            emptyMessage="Nenhuma proposta neste período."
            label="Propostas vazias"
          />
        </Demo>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "columns",
              type: "ColumnDef<TData, TValue>[]",
              description:
                "Definição das colunas do TanStack Table. Obrigatório.",
            },
            {
              name: "data",
              type: "TData[]",
              description:
                "Linhas. Memoize se vier de cálculo — mudar a referência refaz a tabela.",
            },
            {
              name: "filterColumn",
              type: "string",
              description:
                "id da coluna ligada ao campo de busca. Omita para esconder o campo.",
            },
            {
              name: "filterPlaceholder",
              type: "string",
              def: '"Filtrar…"',
              description: "Texto do campo de busca, também usado como aria-label.",
            },
            {
              name: "showColumnToggle",
              type: "boolean",
              def: "true",
              description: "Exibe o menu de visibilidade de colunas.",
            },
            {
              name: "pageSize",
              type: "number",
              def: "5",
              description: "Linhas por página.",
            },
            {
              name: "label",
              type: "string",
              description: "aria-label da tabela.",
            },
            {
              name: "emptyMessage",
              type: "string",
              def: '"Nenhum resultado."',
              description: "Mensagem exibida quando não há linhas.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Cada cabeçalho ordenável recebe aria-sort com ascending, descending ou none — é assim que o leitor de tela anuncia a ordem atual.",
            "A ordenação é acionada por um Button real dentro do <th>, então funciona por teclado sem configuração.",
            "O contador de linhas fica em uma região role=\"status\" com aria-live: mudanças de filtro e seleção são anunciadas.",
            "Checkboxes de seleção precisam de aria-label identificando a linha; “selecionar” repetido não diz qual.",
            "Menus de ação por linha precisam do nome do item no aria-label.",
            "Esconder colunas remove informação da tabela — mantenha as colunas essenciais com enableHiding: false.",
            "Em telas estreitas, deixe a tabela rolar dentro do contêiner em vez de comprimir as colunas.",
          ]}
          keyboard={[
            ["Tab", "Percorre filtro, cabeçalhos ordenáveis, seleção e paginação."],
            ["Enter / Space", "Alterna a ordenação do cabeçalho em foco."],
            ["Space", "Marca ou desmarca a linha em foco."],
          ]}
          aria={[
            "aria-sort — no <th> ordenável",
            'role="status" com aria-live="polite" — contador de linhas',
            "aria-label — na tabela, nos checkboxes e nos menus de linha",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
