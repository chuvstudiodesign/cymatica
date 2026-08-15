"use client";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const propostas = [
  ["#1042", "Rebranding Cymatica", "Aprovada", "R$ 12.400"],
  ["#1041", "Landing de lançamento", "Em análise", "R$ 3.900"],
  ["#1040", "Social kit trimestral", "Aprovada", "R$ 2.450"],
  ["#1039", "Manual de marca", "Recusada", "R$ 6.800"],
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Aprovada: "default",
  "Em análise": "secondary",
  Recusada: "destructive",
};

export default function TablePage() {
  return (
    <DocPage
      title="Table"
      description="Tabela estática com a semântica nativa preservada. Para ordenação, filtro e paginação, use Data Table."
      importPath={`import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"`}
      tags={["Dados"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Table>
  <TableCaption>Propostas dos últimos 30 dias.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Código</TableHead>
      <TableHead>Projeto</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>#1042</TableCell>
      <TableCell>Rebranding Cymatica</TableCell>
      <TableCell className="text-right">R$ 12.400</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <div className="w-full">
            <Table>
              <TableCaption>Propostas dos últimos 30 dias.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propostas.map(([id, projeto, status, valor]) => (
                  <TableRow key={id}>
                    <TableCell className="font-mono text-xs">{id}</TableCell>
                    <TableCell className="font-medium">{projeto}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[status]}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {valor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com rodapé"
        description="TableFooter é o lugar de totais e somatórios."
      >
        <Demo
          className="block"
          code={`<TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">R$ 25.550</TableCell>
  </TableRow>
</TableFooter>`}
        >
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propostas.map(([id, projeto, , valor]) => (
                  <TableRow key={id}>
                    <TableCell className="font-mono text-xs">{id}</TableCell>
                    <TableCell>{projeto}</TableCell>
                    <TableCell className="text-right font-mono">
                      {valor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right font-mono">
                    R$ 25.550
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Cabeçalho de linha"
        description="Quando a primeira coluna identifica a linha, ela deve ser um TableHead com scope de linha."
      >
        <Demo
          className="block"
          code={`<TableRow>
  <TableHead scope="row">Rebranding</TableHead>
  <TableCell>R$ 12.400</TableCell>
</TableRow>`}
        >
          <div className="w-full max-w-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Projeto</TableHead>
                  <TableHead scope="col" className="text-right">
                    Valor
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propostas.slice(0, 3).map(([, projeto, , valor]) => (
                  <TableRow key={projeto}>
                    <TableHead scope="row" className="font-medium">
                      {projeto}
                    </TableHead>
                    <TableCell className="text-right font-mono">
                      {valor}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Rolagem horizontal"
        description="Tabelas largas precisam rolar dentro do próprio contêiner, nunca empurrar a página."
      >
        <Demo
          className="block"
          code={`<div className="overflow-x-auto rounded-lg border">
  <Table className="min-w-[48rem]">…</Table>
</div>`}
        >
          <div className="w-full overflow-x-auto rounded-lg border">
            <Table className="min-w-[48rem]">
              <TableHeader>
                <TableRow>
                  {["Código", "Projeto", "Cliente", "Escopo", "Status", "Valor"].map(
                    (h) => (
                      <TableHead key={h}>{h}</TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {propostas.map(([id, projeto, status, valor]) => (
                  <TableRow key={id}>
                    <TableCell className="font-mono text-xs">{id}</TableCell>
                    <TableCell>{projeto}</TableCell>
                    <TableCell>Cymatica</TableCell>
                    <TableCell>Identidade visual</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell className="font-mono">{valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Rebranding</TableCell>
                  <TableCell className="text-right font-mono">
                    R$ 12.400
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Table", "Elemento <table>."],
            ["TableCaption", "Legenda <caption> — o nome acessível da tabela."],
            ["TableHeader", "<thead>."],
            ["TableBody", "<tbody>."],
            ["TableFooter", "<tfoot>, para totais."],
            ["TableRow", "<tr>."],
            ["TableHead", "<th>. Use scope col ou row."],
            ["TableCell", "<td>."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Cada parte herda os atributos do elemento HTML correspondente."
          rows={[
            {
              name: "scope",
              type: '"col" | "row"',
              description:
                "Em TableHead: define se o cabeçalho descreve a coluna ou a linha.",
            },
            {
              name: "colSpan / rowSpan",
              type: "number",
              description: "Mesclagem de células, como no HTML nativo.",
            },
            {
              name: "data-state",
              type: '"selected"',
              description: "Em TableRow: aplica o estilo de linha selecionada.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Classes extras — alinhamento à direita em números, larguras mínimas.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "TableCaption é o nome acessível da tabela. Se o desenho não comporta legenda visível, use sr-only — não omita.",
            "scope=\"col\" e scope=\"row\" são o que permite ao leitor de tela anunciar “Valor: R$ 12.400” ao navegar célula a célula.",
            "Nunca use tabela para layout. Estes componentes produzem HTML de tabela real, com toda a semântica junto.",
            "Alinhe números à direita e use fonte monoespaçada: as casas decimais ficam comparáveis na vertical.",
            "Rolagem horizontal precisa ficar dentro de um contêiner focável para funcionar por teclado.",
            "Status comunicado por cor precisa de texto junto — é o que o Badge faz nos exemplos acima.",
          ]}
          keyboard={[
            ["Tab", "Percorre os controles interativos dentro das células."],
            ["Setas (leitor de tela)", "Navegam célula a célula no modo tabela."],
          ]}
          aria={[
            "<caption> — nome acessível da tabela",
            'scope="col" / scope="row" — associação cabeçalho-célula',
            "aria-sort — quando as colunas são ordenáveis (ver Data Table)",
            "aria-label — alternativa quando não há caption",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
