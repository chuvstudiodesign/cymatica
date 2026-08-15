"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  A11y,
  Anatomy,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const mensal = [
  { mes: "Mar", propostas: 18, fechadas: 11 },
  { mes: "Abr", propostas: 24, fechadas: 15 },
  { mes: "Mai", propostas: 21, fechadas: 14 },
  { mes: "Jun", propostas: 31, fechadas: 22 },
  { mes: "Jul", propostas: 28, fechadas: 19 },
  { mes: "Ago", propostas: 35, fechadas: 26 },
];

const config = {
  propostas: { label: "Propostas", color: "var(--chart-1)" },
  fechadas: { label: "Fechadas", color: "var(--chart-2)" },
} satisfies ChartConfig;

const escopos = [
  { escopo: "marca", total: 42, fill: "var(--chart-1)" },
  { escopo: "site", total: 28, fill: "var(--chart-2)" },
  { escopo: "social", total: 19, fill: "var(--chart-3)" },
  { escopo: "motion", total: 11, fill: "var(--chart-4)" },
];

const escoposConfig = {
  total: { label: "Projetos" },
  marca: { label: "Marca", color: "var(--chart-1)" },
  site: { label: "Site", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
  motion: { label: "Motion", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartPage() {
  return (
    <DocPage
      title="Chart"
      description="Camada fina sobre o Recharts que injeta os tokens de cor do projeto e entrega tooltip e legenda já estilizados."
      importPath={`import {
  type ChartConfig, ChartContainer, ChartLegend,
  ChartLegendContent, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"`}
      tags={["Recharts", "Dados"]}
    >
      <DocSection
        title="A config"
        description="ChartConfig liga cada série ao seu rótulo e à sua cor. É o que alimenta tooltip e legenda."
      >
        <CodeBlock
          code={`const config = {
  propostas: { label: "Propostas", color: "var(--chart-1)" },
  fechadas: { label: "Fechadas", color: "var(--chart-2)" },
} satisfies ChartConfig`}
        />
      </DocSection>

      <DocSection
        title="Barras"
        description="As cores vêm de var(--color-<chave>), gerado pelo ChartContainer a partir da config."
      >
        <Demo
          className="block"
          code={`<ChartContainer config={config} className="h-64 w-full">
  <BarChart data={mensal}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="propostas" fill="var(--color-propostas)" radius={4} />
    <Bar dataKey="fechadas" fill="var(--color-fechadas)" radius={4} />
  </BarChart>
</ChartContainer>`}
        >
          <ChartContainer config={config} className="h-64 w-full">
            <BarChart data={mensal}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="propostas" fill="var(--color-propostas)" radius={4} />
              <Bar dataKey="fechadas" fill="var(--color-fechadas)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
      </DocSection>

      <DocSection title="Linhas">
        <Demo
          className="block"
          code={`<LineChart data={mensal}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
  <ChartTooltip content={<ChartTooltipContent />} />
  <Line dataKey="propostas" stroke="var(--color-propostas)" strokeWidth={2} dot={false} />
</LineChart>`}
        >
          <ChartContainer config={config} className="h-64 w-full">
            <LineChart data={mensal}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="propostas"
                stroke="var(--color-propostas)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="fechadas"
                stroke="var(--color-fechadas)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </Demo>
      </DocSection>

      <DocSection title="Área">
        <Demo
          className="block"
          code={`<AreaChart data={mensal}>
  <Area
    dataKey="propostas"
    stroke="var(--color-propostas)"
    fill="var(--color-propostas)"
    fillOpacity={0.2}
  />
</AreaChart>`}
        >
          <ChartContainer config={config} className="h-64 w-full">
            <AreaChart data={mensal}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="propostas"
                stroke="var(--color-propostas)"
                fill="var(--color-propostas)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                dataKey="fechadas"
                stroke="var(--color-fechadas)"
                fill="var(--color-fechadas)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </Demo>
      </DocSection>

      <DocSection
        title="Pizza"
        description="Cada fatia traz seu próprio fill; a config mapeia a chave para o rótulo legível."
      >
        <Demo
          className="block"
          code={`<PieChart>
  <ChartTooltip content={<ChartTooltipContent nameKey="escopo" />} />
  <Pie data={escopos} dataKey="total" nameKey="escopo" innerRadius={50} />
</PieChart>`}
        >
          <ChartContainer
            config={escoposConfig}
            className="mx-auto h-64 w-full max-w-sm"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="escopo" />} />
              <ChartLegend content={<ChartLegendContent nameKey="escopo" />} />
              <Pie
                data={escopos}
                dataKey="total"
                nameKey="escopo"
                innerRadius={50}
              />
            </PieChart>
          </ChartContainer>
        </Demo>
      </DocSection>

      <DocSection
        title="Paleta"
        description="Os cinco tokens de gráfico são matizes bem separados: laranja, azul, verde, violeta e cinza. Âmbar ficou de fora por se aproximar da marca."
      >
        <Demo>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col gap-2">
              <div
                className="h-12 w-24 rounded-md border"
                style={{ background: `var(--chart-${n})` }}
              />
              <code className="font-mono text-xs text-muted-foreground">
                --chart-{n}
              </code>
            </div>
          ))}
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <ChartContainer config={config} className="h-40 w-full">
            <BarChart data={mensal.slice(0, 4)}>
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <Bar dataKey="propostas" fill="var(--color-propostas)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["ChartConfig", "Mapa de série para rótulo e cor. A fonte da verdade."],
            ["ChartContainer", "Envolve o gráfico, injeta as variáveis de cor e trata o redimensionamento."],
            ["ChartTooltip", "Wrapper do tooltip do Recharts."],
            ["ChartTooltipContent", "Conteúdo estilizado. Aceita indicator, nameKey, labelKey."],
            ["ChartLegend / ChartLegendContent", "Legenda ligada à config."],
            ["ChartStyle", "Emite as variáveis --color-<chave> por tema."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "config",
              type: "ChartConfig",
              description:
                "Em ChartContainer: obrigatório. Define rótulo e cor de cada série.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Em ChartContainer: a altura vive aqui — o Recharts precisa de altura definida.",
            },
            {
              name: "indicator",
              type: '"dot" | "line" | "dashed"',
              def: '"dot"',
              description: "Em ChartTooltipContent: formato do marcador.",
            },
            {
              name: "nameKey / labelKey",
              type: "string",
              description:
                "Em ChartTooltipContent: de onde vêm nome e rótulo, útil em pizza.",
            },
            {
              name: "hideLabel / hideIndicator",
              type: "boolean",
              def: "false",
              description: "Simplifica o tooltip.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Um gráfico é uma imagem para quem usa leitor de tela. Ofereça sempre uma tabela equivalente, mesmo que escondida em sr-only.",
            "Não use cor como único diferenciador de série: acrescente forma, espessura ou rótulo direto na linha.",
            "Os cinco tokens de gráfico têm matizes separados, mas ainda assim conferem em escala de cinza antes de publicar.",
            "O tooltip depende de hover — ele não substitui rótulos nos eixos, que precisam ser legíveis sozinhos.",
            "Trunque rótulos longos no eixo, nunca gire o texto na vertical: leitura em ângulo é penosa.",
            "Comece o eixo Y em zero em gráficos de barra; começar em outro valor distorce a comparação.",
          ]}
          aria={[
            'role="img" com aria-label — descrição resumida do gráfico',
            "aria-describedby — aponta para a tabela de dados equivalente",
            'aria-hidden="true" — no SVG, quando há alternativa textual completa',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
