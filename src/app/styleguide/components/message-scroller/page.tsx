"use client";

import * as React from "react";

import {
  A11y,
  Anatomy,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

const inicial = [
  ["Cymatica", "Oi! Vi que você pediu uma proposta."],
  ["Você", "Isso, para identidade visual."],
  ["Cymatica", "Perfeito. Qual valor você tem disponível?"],
  ["Você", "Consigo até R$ 12.000."],
  ["Cymatica", "Dá para fazer identidade completa com manual de marca."],
  ["Você", "Inclui aplicação em redes sociais?"],
  ["Cymatica", "Inclui: kit com 12 templates editáveis."],
  ["Você", "Fechado, quero seguir."],
];

function ScrollerDemo() {
  const [mensagens, setMensagens] = React.useState(inicial);

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <MessageScrollerProvider>
        <MessageScroller className="h-72 rounded-lg border">
        <MessageScrollerViewport className="p-4">
          <MessageScrollerContent className="flex flex-col gap-3">
            {mensagens.map(([autor, texto], i) => (
              <MessageScrollerItem
                key={i}
                messageId={String(i)}
                scrollAnchor={i === mensagens.length - 1}
              >
                <Message align={autor === "Você" ? "end" : "start"}>
                  <MessageContent>
                    <MessageHeader>{autor}</MessageHeader>
                    <Bubble
                      align={autor === "Você" ? "end" : "start"}
                      variant={autor === "Você" ? "default" : "muted"}
                    >
                      <BubbleContent>{texto}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() =>
          setMensagens((m) => [
            ...m,
            ["Cymatica", `Mensagem nova ${m.length - inicial.length + 1}`],
          ])
        }
      >
        Adicionar mensagem
      </Button>
    </div>
  );
}

export default function MessageScrollerPage() {
  return (
    <DocPage
      title="Message Scroller"
      description="Contêiner rolável que gruda no fim quando chegam mensagens novas — e para de grudar quando a pessoa rola para cima para ler o histórico."
      importPath={`import {
  MessageScroller, MessageScrollerButton, MessageScrollerContent,
  MessageScrollerItem, MessageScrollerViewport,
} from "@/components/ui/message-scroller"`}
      tags={["Chat"]}
    >
      <DocSection
        title="O problema que ele resolve"
        description="Rolar sempre para o fim atrapalha quem está lendo mensagens antigas. Manter a posição esconde as novas. Este componente resolve os dois casos."
      >
        <CodeBlock
          code={`// scrollAnchor no último item marca onde a rolagem deve grudar.
// Se a pessoa rolou para cima, o scroller respeita a posição
// e o MessageScrollerButton aparece para voltar ao fim.

<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem
          messageId={m.id}
          scrollAnchor={i === mensagens.length - 1}
        >
          <Message>…</Message>
        </MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton direction="end" />
  </MessageScroller>
</MessageScrollerProvider>`}
        />
      </DocSection>

      <DocSection
        title="Conversa (interativo)"
        description="Adicione mensagens com a barra no fim — depois role para cima e adicione de novo para ver o botão de retorno."
      >
        <Demo className="block">
          <ScrollerDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Botão de retorno"
        description="direction end volta para a mensagem mais recente; start sobe para o início do histórico."
      >
        <Demo
          className="block"
          code={`<MessageScrollerButton direction="end" />
<MessageScrollerButton direction="start" />

// Personalizando
<MessageScrollerButton direction="end" variant="outline" size="sm">
  Novas mensagens
</MessageScrollerButton>`}
        >
          <MessageScrollerProvider>
          <MessageScroller className="h-52 w-full max-w-lg rounded-lg border">
            <MessageScrollerViewport className="p-4">
              <MessageScrollerContent className="flex flex-col gap-3">
                {inicial.map(([autor, texto], i) => (
                  <MessageScrollerItem
                    key={i}
                    messageId={String(i)}
                    scrollAnchor={i === inicial.length - 1}
                  >
                    <Message align={autor === "Você" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble
                          align={autor === "Você" ? "end" : "start"}
                          variant={autor === "Você" ? "default" : "muted"}
                        >
                          <BubbleContent>{texto}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          </MessageScrollerProvider>
        </Demo>
      </DocSection>

      <DocSection
        title="Hooks"
        description="Para lógica própria — badge de não lidas, carregar histórico ao chegar no topo."
      >
        <CodeBlock
          code={`import {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/components/ui/message-scroller"

// Estado geral do scroller
const scroller = useMessageScroller()

// Se ainda há conteúdo para rolar em cada direção
const scrollable = useMessageScrollerScrollable()

// Se um item específico está visível na viewport
const visible = useMessageScrollerVisibility()`}
        />
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["MessageScrollerProvider", "Contexto obrigatório. Precisa envolver o MessageScroller."],
            ["MessageScroller", "Raiz. A altura vive aqui."],
            ["MessageScrollerViewport", "Área rolável."],
            ["MessageScrollerContent", "Lista de mensagens."],
            ["MessageScrollerItem", "Uma mensagem. scrollAnchor marca a âncora."],
            ["MessageScrollerButton", "Volta ao início ou ao fim. Aceita direction, variant e size."],
            ["useMessageScroller()", "Estado do scroller."],
            ["useMessageScrollerScrollable()", "Se há conteúdo além da viewport."],
            ["useMessageScrollerVisibility()", "Visibilidade de um item."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "messageId",
              type: "string",
              description:
                "Em MessageScrollerItem: identificador da mensagem, usado para rastrear visibilidade.",
            },
            {
              name: "scrollAnchor",
              type: "boolean",
              def: "false",
              description:
                "Em MessageScrollerItem: marca o item em que a rolagem gruda. Use no último.",
            },
            {
              name: "direction",
              type: '"start" | "end"',
              def: '"end"',
              description:
                "Em MessageScrollerButton: para onde o botão leva.",
            },
            {
              name: "variant / size",
              type: "ButtonVariants",
              def: '"secondary" / "icon-sm"',
              description: "Aparência do botão de retorno.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Em MessageScroller: a altura da área de conversa vive aqui.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Rolar automaticamente para o fim enquanto alguém lê o histórico é uma armadilha de acessibilidade — este componente evita isso por padrão.",
            "A lista de mensagens deve ser uma região aria-live=\"polite\": novidades são anunciadas sem interromper a leitura em curso.",
            "O botão de retorno precisa de nome acessível; sendo só ícone, use aria-label como “Ir para a mensagem mais recente”.",
            "A viewport tem que ser focável para rolar por teclado quando não há elementos interativos dentro.",
            "Anuncie a contagem de mensagens novas junto do botão, para que a pessoa saiba o que perdeu.",
            "Se o histórico carrega ao chegar no topo, preserve a posição de rolagem após inserir — senão o conteúdo salta.",
          ]}
          keyboard={[
            ["↑ ↓", "Rola a conversa quando a viewport tem foco."],
            ["Page Up / Page Down", "Rola uma tela por vez."],
            ["Home / End", "Início do histórico ou mensagem mais recente."],
            ["Tab", "Alcança o botão de retorno e os elementos das mensagens."],
          ]}
          aria={[
            'role="log" com aria-live="polite" — na lista de mensagens',
            "aria-label — no botão de retorno",
            "aria-atomic=\"false\" — anuncia só o que chegou, não a lista toda",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
