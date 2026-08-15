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
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";

const variantes = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

export default function BubblePage() {
  return (
    <DocPage
      title="Bubble"
      description="O balão de uma mensagem. Sete variantes de superfície e alinhamento por lado, para distinguir quem falou."
      importPath={`import {
  Bubble, BubbleContent, BubbleGroup, BubbleReactions,
} from "@/components/ui/bubble"`}
      tags={["Chat"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Bubble>
  <BubbleContent>Oi! Como funciona a proposta instantânea?</BubbleContent>
</Bubble>`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <Bubble align="start" variant="muted">
              <BubbleContent>
                Oi! Como funciona a proposta instantânea?
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>
                Você informa quanto pode investir e recebe o escopo compatível na
                hora.
              </BubbleContent>
            </Bubble>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Variantes"
        description="default usa --primary. Para a fala do outro lado, muted ou outline dão o contraste certo sem competir."
      >
        <Demo
          className="block"
          code={`<Bubble variant="default" />
<Bubble variant="secondary" />
<Bubble variant="muted" />
<Bubble variant="tinted" />
<Bubble variant="outline" />
<Bubble variant="ghost" />
<Bubble variant="destructive" />`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            {variantes.map((v) => (
              <Bubble key={v} variant={v}>
                <BubbleContent>{v}</BubbleContent>
              </Bubble>
            ))}
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Alinhamento"
        description="align end joga o balão para a direita — a convenção para a própria fala."
      >
        <Demo
          className="block"
          code={`<Bubble align="start" variant="muted">…</Bubble>
<Bubble align="end" variant="default">…</Bubble>`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <Bubble align="start" variant="muted">
              <BubbleContent>Alinhado ao início</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Alinhado ao fim</BubbleContent>
            </Bubble>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Grupo"
        description="BubbleGroup encosta balões consecutivos do mesmo autor, ajustando os cantos."
      >
        <Demo
          className="block"
          code={`<BubbleGroup>
  <Bubble align="end"><BubbleContent>Primeira</BubbleContent></Bubble>
  <Bubble align="end"><BubbleContent>Segunda</BubbleContent></Bubble>
  <Bubble align="end"><BubbleContent>Terceira</BubbleContent></Bubble>
</BubbleGroup>`}
        >
          <div className="w-full max-w-md">
            <BubbleGroup>
              <Bubble align="end">
                <BubbleContent>Consegui o orçamento aprovado</BubbleContent>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>Podemos começar semana que vem?</BubbleContent>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>Sem pressa</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Reações"
        description="BubbleReactions ancora emojis na borda do balão, com side e align próprios."
      >
        <Demo
          className="block"
          code={`<Bubble align="end">
  <BubbleContent>Proposta aprovada!</BubbleContent>
  <BubbleReactions side="bottom" align="end">
    <span>🎉</span>
    <span>👏</span>
  </BubbleReactions>
</Bubble>`}
        >
          <div className="flex w-full max-w-md flex-col gap-6 pb-4">
            <Bubble align="end">
              <BubbleContent>Proposta aprovada!</BubbleContent>
              <BubbleReactions side="bottom" align="end">
                <span aria-label="Reação festa">🎉</span>
                <span aria-label="Reação aplausos">👏</span>
              </BubbleReactions>
            </Bubble>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Balão clicável"
        description="BubbleContent aceita render — vire um botão ou link quando a mensagem leva a algum lugar."
      >
        <Demo
          className="block"
          code={`<Bubble variant="outline">
  <BubbleContent render={<a href="/propostas/1042" />}>
    Ver proposta #1042
  </BubbleContent>
</Bubble>`}
        >
          <div className="w-full max-w-md">
            <Bubble variant="outline">
              <BubbleContent render={<a href="#" />}>
                Ver proposta #1042
              </BubbleContent>
            </Bubble>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="flex w-full flex-col gap-2">
            <Bubble align="start" variant="muted">
              <BubbleContent>Recebido</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Enviado</BubbleContent>
            </Bubble>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Bubble", "O balão. Aceita variant e align."],
            ["BubbleContent", "A superfície com o texto. Aceita render."],
            ["BubbleGroup", "Agrupa balões consecutivos do mesmo autor."],
            ["BubbleReactions", "Emojis ancorados na borda. Aceita side e align."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"',
              def: '"default"',
              description: "Superfície do balão.",
            },
            {
              name: "align",
              type: '"start" | "end"',
              def: '"start"',
              description:
                "Lado do balão. end é a convenção para a própria fala.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em BubbleContent: transforma o balão em link ou botão.",
            },
            {
              name: "side",
              type: '"top" | "bottom"',
              def: '"bottom"',
              description: "Em BubbleReactions: borda onde as reações se ancoram.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O alinhamento comunica autoria visualmente, mas não semanticamente. Quem usa leitor de tela precisa do nome no MessageHeader.",
            "Não dependa só da cor do balão para distinguir os interlocutores — a posição e o nome fazem o trabalho pesado.",
            "Reações em emoji precisam de aria-label: um leitor de tela lê o nome Unicode, que raramente é o significado pretendido.",
            "A variante ghost remove o fundo: verifique o contraste do texto contra a superfície da página.",
            "Balões clicáveis devem virar <a> ou <button> de verdade via render, nunca uma div com onClick.",
          ]}
          keyboard={[
            ["Tab", "Alcança balões que forem interativos."],
            ["Enter", "Ativa um balão que é link ou botão."],
          ]}
          aria={[
            "aria-label — nas reações em emoji",
            'role="group" — em BubbleGroup, quando os balões formam uma unidade',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
