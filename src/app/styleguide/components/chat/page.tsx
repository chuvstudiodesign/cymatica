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
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Chat, type ChatMessage } from "@/components/ui/chat";

const inicial: ChatMessage[] = [
  {
    id: "1",
    author: "Cymatica",
    content: "Oi! Vi que você pediu uma proposta de identidade visual.",
    timestamp: "14:30",
    marker: "Hoje",
  },
  {
    id: "2",
    author: "Você",
    self: true,
    content: "Isso mesmo. Consigo investir até R$ 12.000.",
    timestamp: "14:31",
    status: "Lida",
  },
  {
    id: "3",
    author: "Cymatica",
    content:
      "Dá para fazer identidade completa com manual de marca e kit de aplicação.",
    timestamp: "14:32",
    attachments: [
      { id: "a1", name: "proposta-1042.pdf" },
      { id: "a2", name: "referencias.zip" },
    ],
  },
  {
    id: "4",
    author: "Você",
    self: true,
    content: "Perfeito, vou revisar e te falo hoje ainda.",
    timestamp: "14:35",
  },
];

function ChatDemo() {
  const [messages, setMessages] = React.useState(inicial);

  return (
    <Chat
      messages={messages}
      label="Conversa com a Cymatica"
      onSend={(text) => {
        const agora = new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        setMessages((m) => [
          ...m,
          {
            id: String(Date.now()),
            author: "Você",
            self: true,
            content: text,
            timestamp: agora,
          },
        ]);
        // Resposta simulada, para exercitar a rolagem automática.
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            {
              id: String(Date.now() + 1),
              author: "Cymatica",
              content: "Recebido! Já estou olhando.",
              timestamp: agora,
            },
          ]);
        }, 900);
      }}
    />
  );
}

export default function ChatPage() {
  return (
    <DocPage
      title="Chat"
      description="A superfície completa de conversa, montada a partir de Message Scroller, Message, Bubble, Marker, Attachment e Avatar. Não é item de registry — o shadcn publica as peças, não a montagem."
      importPath={`import { Chat, type ChatMessage } from "@/components/ui/chat"`}
      tags={["Composição", "Chat"]}
    >
      <DocSection
        title="Completo (interativo)"
        description="Escreva e envie com Enter. A conversa gruda no fim ao chegar mensagem nova — role para cima e envie de novo para ver o botão de retorno."
      >
        <Demo className="block">
          <div className="w-full max-w-xl">
            <ChatDemo />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="O formato das mensagens"
        description="Um array simples. self alinha à direita; marker insere um divisor acima da mensagem."
      >
        <CodeBlock
          code={`const mensagens: ChatMessage[] = [
  {
    id: "1",
    author: "Cymatica",
    content: "Oi! Vi que você pediu uma proposta.",
    timestamp: "14:30",
    marker: "Hoje",
  },
  {
    id: "2",
    author: "Você",
    self: true,
    content: "Isso mesmo. Consigo investir até R$ 12.000.",
    timestamp: "14:31",
    status: "Lida",
  },
  {
    id: "3",
    author: "Cymatica",
    content: "Dá para fazer identidade completa.",
    attachments: [{ id: "a1", name: "proposta-1042.pdf" }],
  },
]`}
        />
      </DocSection>

      <DocSection
        title="Envio"
        description="onSend recebe o texto já aparado; o campo se limpa sozinho. Quem chama decide o que fazer com a mensagem."
      >
        <CodeBlock
          code={`<Chat
  messages={messages}
  label="Conversa com a Cymatica"
  onSend={async (text) => {
    setMessages((m) => [...m, { id: crypto.randomUUID(), author: "Você", self: true, content: text }])
    const resposta = await enviarParaOServidor(text)
    setMessages((m) => [...m, resposta])
  }}
/>`}
        />
      </DocSection>

      <DocSection
        title="Estado vazio e desabilitado"
        description="Uma conversa sem mensagens precisa dizer o que aconteceu; disabled trava o envio durante o carregamento."
      >
        <Demo className="block">
          <div className="w-full max-w-xl">
            <Chat
              messages={[]}
              emptyMessage="Nenhuma mensagem ainda. Diga oi!"
              label="Conversa vazia"
              disabled
              className="h-64"
            />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Chat
              messages={inicial.slice(0, 2)}
              label="Prévia"
              className="h-56"
            />
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection
        title="Composição manual"
        description="Se o Chat pronto não servir, as peças continuam disponíveis — foi assim que ele foi montado."
      >
        <CodeBlock
          code={`<MessageScroller className="h-96">
  <MessageScrollerViewport role="log" aria-live="polite" tabIndex={0}>
    <MessageScrollerContent>
      {mensagens.map((m, i) => (
        <MessageScrollerItem key={m.id} scrollAnchor={i === mensagens.length - 1}>
          <Message align={m.self ? "end" : "start"}>
            <MessageAvatar>…</MessageAvatar>
            <MessageContent>
              <MessageHeader>{m.author}</MessageHeader>
              <Bubble variant={m.self ? "default" : "muted"}>
                <BubbleContent>{m.content}</BubbleContent>
              </Bubble>
              <MessageFooter>{m.timestamp}</MessageFooter>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  </MessageScrollerViewport>
  <MessageScrollerButton direction="end" />
</MessageScroller>`}
        />
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Chat", "A superfície completa: histórico rolável e campo de envio."],
            ["ChatMessage", "Tipo de uma mensagem: autor, conteúdo, horário, anexos, marcador."],
            ["MessageScroller", "Rolagem que gruda no fim (ver a página do componente)."],
            ["Message / Bubble", "Linha e balão de cada mensagem."],
            ["Marker", "Divisor de data ou de não lidas."],
            ["Attachment", "Anexos abaixo do balão."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Chat"
          rows={[
            {
              name: "messages",
              type: "ChatMessage[]",
              description: "A conversa, em ordem cronológica. Obrigatório.",
            },
            {
              name: "onSend",
              type: "(text: string) => void",
              description:
                "Chamado com o texto aparado. Sem ele, o campo fica inerte.",
            },
            {
              name: "label",
              type: "string",
              def: '"Conversa"',
              description: "aria-label da região de log das mensagens.",
            },
            {
              name: "placeholder",
              type: "string",
              def: '"Escreva uma mensagem…"',
              description:
                "Texto do campo, usado também como rótulo em sr-only.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Trava o campo e o botão de envio.",
            },
            {
              name: "emptyMessage",
              type: "string",
              def: '"Nenhuma mensagem ainda."',
              description: "Exibido quando não há mensagens.",
            },
          ]}
        />
        <PropsTable
          caption="ChatMessage"
          rows={[
            { name: "id", type: "string", description: "Chave única." },
            { name: "author", type: "string", description: "Nome exibido e base das iniciais do avatar." },
            {
              name: "self",
              type: "boolean",
              def: "false",
              description:
                "Alinha à direita com a cor da marca e esconde o avatar.",
            },
            { name: "content", type: "string", description: "Texto da mensagem." },
            { name: "timestamp", type: "string", description: "Horário exibido no rodapé." },
            { name: "status", type: "string", description: "Status de entrega, ex.: “Lida”." },
            {
              name: "attachments",
              type: "{ id: string; name: string }[]",
              description: "Arquivos exibidos abaixo do balão.",
            },
            {
              name: "marker",
              type: "string",
              description: "Divisor renderizado acima da mensagem.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A lista é um role=\"log\" com aria-live=\"polite\": mensagens novas são anunciadas sem cortar o que está sendo lido.",
            "A viewport tem tabIndex 0 para que a conversa possa ser rolada por teclado mesmo sem elementos focáveis.",
            "Enter envia e Shift+Enter quebra linha — o atalho está documentado em um texto sr-only ligado por aria-describedby, porque atalhos invisíveis não se descobrem sozinhos.",
            "O campo tem rótulo em sr-only: placeholder desaparece ao digitar e não serve como nome acessível.",
            "O botão de envio é só ícone, então carrega aria-label; ele fica desabilitado com o campo vazio.",
            "O autor vai no MessageHeader, no DOM: alinhamento e cor não são percebidos por leitores de tela.",
            "O botão de retorno ao fim tem nome explícito, para não virar “botão” sem contexto.",
          ]}
          keyboard={[
            ["Enter", "Envia a mensagem."],
            ["Shift + Enter", "Quebra linha sem enviar."],
            ["Tab", "Percorre campo, botão de envio e controles das mensagens."],
            ["↑ ↓", "Rola a conversa quando a viewport tem foco."],
            ["Home / End", "Início do histórico ou mensagem mais recente."],
          ]}
          aria={[
            'role="log" com aria-live="polite" — histórico de mensagens',
            "aria-label — na região de conversa e no botão de envio",
            "aria-describedby — dica do atalho de envio",
            "<time dateTime> — recomendado para horários reais",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
