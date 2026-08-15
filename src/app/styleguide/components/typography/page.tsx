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
import {
  Anchor,
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  OrderedList,
  P,
  Prose,
  Small,
} from "@/components/ui/typography";

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="A escala tipográfica do projeto como componentes. Não é item de registry — o shadcn documenta tipografia como exemplos, então aqui virou código de verdade."
      importPath={`import {
  H1, H2, H3, H4, P, Lead, Large, Small, Muted,
  Blockquote, InlineCode, List, OrderedList, Anchor, Prose,
} from "@/components/ui/typography"`}
      tags={["Composição", "Dados"]}
    >
      <DocSection
        title="Títulos"
        description="Todos usam --font-heading (Figtree) com tracking negativo, o mesmo ajuste ótico das referências da marca."
      >
        <Demo
          className="block"
          code={`<H1>A forma mais simples de desenvolver a sua marca</H1>
<H2>Como funciona</H2>
<H3>Proposta instantânea</H3>
<H4>Prazo de entrega</H4>`}
        >
          <div className="flex w-full flex-col gap-6">
            <H1>A forma mais simples de desenvolver a sua marca</H1>
            <H2>Como funciona</H2>
            <H3>Proposta instantânea</H3>
            <H4>Prazo de entrega</H4>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Texto corrido">
        <Demo
          className="block"
          code={`<Lead>Contratar um estúdio de design sempre foi complicado.</Lead>
<P>Assim como o Nubank simplificou os bancos…</P>
<Large>Destaque em bloco</Large>
<Small>Texto de apoio</Small>
<Muted>Informação secundária</Muted>`}
        >
          <div className="flex w-full max-w-2xl flex-col gap-4">
            <Lead>Contratar um estúdio de design sempre foi complicado.</Lead>
            <P>
              Assim como o Nubank simplificou os bancos, a Uber reinventou os
              táxis e o Airbnb transformou a hospedagem. Nós reinventamos a forma
              de contratar design.
            </P>
            <Large>Destaque em bloco</Large>
            <Small>Texto de apoio em 14px</Small>
            <Muted>Informação secundária, em --muted-foreground.</Muted>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Citação, código e link">
        <Demo
          className="block"
          code={`<Blockquote>A Cymatica nasceu para mudar isso.</Blockquote>
<P>Use <InlineCode>--brand</InlineCode> para o laranja da marca.</P>
<Anchor href="/styleguide">Ver o design system</Anchor>`}
        >
          <div className="flex w-full max-w-2xl flex-col gap-4">
            <Blockquote>
              Contratar um estúdio de design sempre foi complicado. A Cymatica
              nasceu para mudar isso.
            </Blockquote>
            <P>
              Use <InlineCode>--brand</InlineCode> para o laranja de destaque e{" "}
              <InlineCode>--primary</InlineCode> para controles sólidos.
            </P>
            <P>
              <Anchor href="/styleguide">Ver os design tokens</Anchor>
            </P>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Listas">
        <Demo
          className="block"
          code={`<List>
  <li>Identidade visual</li>
  <li>Site institucional</li>
</List>

<OrderedList>
  <li>Informe o valor</li>
  <li>Receba a proposta</li>
</OrderedList>`}
        >
          <div className="flex w-full max-w-2xl gap-12">
            <List>
              <li>Identidade visual</li>
              <li>Site institucional</li>
              <li>Social kit</li>
            </List>
            <OrderedList>
              <li>Informe o valor</li>
              <li>Receba a proposta</li>
              <li>Aprove o escopo</li>
            </OrderedList>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Prose"
        description="Para HTML que você não controla — Markdown renderizado, conteúdo de CMS — aplique a escala inteira de uma vez."
      >
        <Demo
          className="block"
          code={`<Prose dangerouslySetInnerHTML={{ __html: html }} />

// ou com children JSX
<Prose>
  <h2>Título vindo do CMS</h2>
  <p>Parágrafo com <a href="#">link</a>.</p>
</Prose>`}
        >
          <Prose className="w-full">
            <h2>Título vindo do CMS</h2>
            <p>
              Parágrafo renderizado sem componentes, apenas com HTML puro. O{" "}
              <code>Prose</code> aplica a escala por seletor descendente.
            </p>
            <ul>
              <li>Item de lista</li>
              <li>Outro item</li>
            </ul>
            <blockquote>Uma citação dentro do conteúdo.</blockquote>
          </Prose>
        </Demo>
      </DocSection>

      <DocSection title="Escala completa">
        <Demo className="block">
          <div className="w-full overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left">
                  <th className="p-3 font-medium">Componente</th>
                  <th className="p-3 font-medium">Classes</th>
                  <th className="p-3 font-medium">Uso</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["H1", "text-4xl lg:text-5xl font-bold", "Título da página, um por página"],
                  ["H2", "text-3xl font-semibold + borda", "Seção principal"],
                  ["H3", "text-2xl font-semibold", "Subseção"],
                  ["H4", "text-xl font-semibold", "Agrupamento menor"],
                  ["Lead", "text-xl text-muted-foreground", "Subtítulo do H1"],
                  ["P", "leading-7", "Texto corrido"],
                  ["Large", "text-lg font-semibold", "Destaque sem ser título"],
                  ["Small", "text-sm font-medium", "Metadado, legenda"],
                  ["Muted", "text-sm text-muted-foreground", "Informação secundária"],
                  ["InlineCode", "font-mono text-sm bg-muted", "Token, comando, valor"],
                ].map(([name, cls, use]) => (
                  <tr key={name} className="border-b last:border-0 align-top">
                    <td className="p-3">
                      <code className="font-mono text-xs">{name}</code>
                    </td>
                    <td className="p-3">
                      <code className="font-mono text-xs text-muted-foreground">
                        {cls}
                      </code>
                    </td>
                    <td className="p-3 text-muted-foreground">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="flex w-full flex-col gap-3">
            <H3>Título</H3>
            <P>Parágrafo com texto corrido.</P>
            <Muted>Informação secundária.</Muted>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["H1–H4", "Títulos com font-heading e tracking ajustado."],
            ["P", "Parágrafo com leading-7 e margem entre irmãos."],
            ["Lead", "Subtítulo grande em --muted-foreground."],
            ["Large / Small / Muted", "Variações de peso e ênfase."],
            ["Blockquote", "Citação com barra lateral."],
            ["InlineCode", "Trecho de código no meio do texto."],
            ["List / OrderedList", "Listas com marcador e numeradas."],
            ["Anchor", "Link em --primary com sublinhado."],
            ["Prose", "Aplica a escala a HTML não controlado."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Todos herdam os atributos do elemento HTML correspondente."
          rows={[
            {
              name: "className",
              type: "string",
              description: "Classes extras, mescladas via cn().",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Conteúdo textual.",
            },
            {
              name: "dangerouslySetInnerHTML",
              type: "{ __html: string }",
              description:
                "Em Prose: para Markdown já renderizado. Sanitize antes.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Escolha o nível pelo lugar na hierarquia, não pelo tamanho desejado. Para um H2 pequeno, use H2 com className.",
            "Uma página tem um único H1 e não pula níveis — H1, H3 sem H2 quebra a navegação por títulos.",
            "Leitores de tela oferecem navegação por cabeçalhos; uma hierarquia correta é o principal atalho para quem não enxerga.",
            "text-balance nos títulos evita linhas órfãs sem forçar quebras manuais, que quebram em outras larguras.",
            "Não use Blockquote para recuar texto; ele anuncia uma citação de verdade.",
            "Links precisam de texto descritivo: “ver os design tokens”, nunca “clique aqui”.",
          ]}
          keyboard={[
            ["H (leitor de tela)", "Salta entre cabeçalhos da página."],
            ["Tab", "Percorre os links do texto."],
          ]}
          aria={[
            "<h1>–<h4> — hierarquia semântica nativa",
            "<blockquote> / <cite> — citação e sua fonte",
            "aria-label — quando o texto do link não basta fora de contexto",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
