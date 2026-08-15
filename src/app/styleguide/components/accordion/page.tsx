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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const perguntas = [
  [
    "Como funciona a proposta instantânea?",
    "Você informa quanto pode investir e recebemos o escopo compatível na hora, sem reunião prévia.",
  ],
  [
    "Qual é o prazo de entrega?",
    "A produção começa em até 48h após a confirmação. Identidades levam de 2 a 4 semanas.",
  ],
  [
    "Posso pedir alterações?",
    "Sim. Cada etapa inclui duas rodadas de ajuste sem custo adicional.",
  ],
];

export default function AccordionPage() {
  return (
    <DocPage
      title="Accordion"
      description="Lista de seções expansíveis. Ideal para FAQ e para reduzir densidade em páginas longas."
      importPath={`import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"`}
      tags={["Base UI", "Layout"]}
    >
      <DocSection
        title="Básico"
        description="Por padrão apenas uma seção fica aberta por vez — abrir outra fecha a anterior."
      >
        <Demo
          className="block"
          code={`<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Como funciona a proposta instantânea?</AccordionTrigger>
    <AccordionContent>
      Você informa quanto pode investir e recebe o escopo compatível na hora.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion className="w-full">
            {perguntas.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      </DocSection>

      <DocSection
        title="Várias abertas"
        description="multiple permite manter mais de uma seção expandida ao mesmo tempo."
      >
        <Demo
          className="block"
          code={`<Accordion multiple defaultValue={["item-0"]}>…</Accordion>`}
        >
          <Accordion multiple defaultValue={["item-0"]} className="w-full">
            {perguntas.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      </DocSection>

      <DocSection
        title="Aberto por padrão"
        description="defaultValue recebe os values dos itens que já começam abertos."
      >
        <Demo
          className="block"
          code={`<Accordion multiple defaultValue={["item-0", "item-2"]}>…</Accordion>`}
        >
          <Accordion multiple defaultValue={["item-0", "item-2"]} className="w-full">
            {perguntas.map(([q, a], i) => (
              <AccordionItem key={q} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      </DocSection>

      <DocSection title="Item desabilitado">
        <Demo
          className="block"
          code={`<AccordionItem value="item-2" disabled>…</AccordionItem>`}
        >
          <Accordion className="w-full">
            <AccordionItem value="a">
              <AccordionTrigger>Disponível</AccordionTrigger>
              <AccordionContent>Conteúdo acessível normalmente.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b" disabled>
              <AccordionTrigger>Indisponível</AccordionTrigger>
              <AccordionContent>Este conteúdo não abre.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Accordion defaultValue={["x"]} className="w-full">
            <AccordionItem value="x">
              <AccordionTrigger>Pergunta</AccordionTrigger>
              <AccordionContent>Resposta.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Accordion", "Raiz. Controla quais itens estão abertos."],
            ["AccordionItem", "Uma seção. Requer value único."],
            ["AccordionTrigger", "Cabeçalho clicável, com a seta de estado."],
            ["AccordionContent", "Painel revelado, animado em altura."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "unknown[]",
              description: "Itens abertos, identificados pelos seus value.",
            },
            {
              name: "onValueChange",
              type: "(value: unknown[]) => void",
              description: "Disparado ao abrir ou fechar uma seção.",
            },
            {
              name: "multiple",
              type: "boolean",
              def: "false",
              description:
                "Permite manter várias seções abertas. Sem ele, abrir uma fecha a anterior.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description:
                "Na raiz desabilita tudo; em AccordionItem, apenas aquela seção.",
            },
            {
              name: "value (item)",
              type: "string",
              description: "Em AccordionItem: identificador único. Obrigatório.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Cada gatilho é um <button> dentro de um cabeçalho, então a navegação por títulos do leitor de tela funciona.",
            "O conteúdo fechado sai da ordem de foco — links escondidos não são alcançáveis por Tab.",
            "Não coloque informação crítica só dentro de um accordion fechado: ela não aparece no Ctrl+F de alguns navegadores.",
            "A seta é decorativa; o estado real é comunicado por aria-expanded.",
          ]}
          keyboard={[
            ["Tab", "Move entre os gatilhos."],
            ["Enter / Space", "Abre ou fecha a seção em foco."],
            ["↑ ↓", "Move entre os gatilhos do accordion."],
            ["Home / End", "Primeiro ou último gatilho."],
          ]}
          aria={[
            "aria-expanded — no gatilho",
            "aria-controls — aponta para o painel",
            'role="region" e aria-labelledby — no painel',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
