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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";

export default function MessagePage() {
  return (
    <DocPage
      title="Message"
      description="A linha completa de uma mensagem: avatar, autor, balões e metadados. É o esqueleto em que o Bubble vive."
      importPath={`import {
  Message, MessageAvatar, MessageContent,
  MessageFooter, MessageGroup, MessageHeader,
} from "@/components/ui/message"`}
      tags={["Chat"]}
    >
      <DocSection
        title="Básico"
        description="align define o lado; os filhos herdam esse alinhamento pelo data-align do grupo."
      >
        <Demo
          className="block"
          code={`<Message align="start">
  <MessageAvatar>
    <Avatar size="sm"><AvatarFallback>CY</AvatarFallback></Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Cymatica</MessageHeader>
    <Bubble variant="muted">
      <BubbleContent>Sua proposta está pronta.</BubbleContent>
    </Bubble>
    <MessageFooter>14:32</MessageFooter>
  </MessageContent>
</Message>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-4">
            <Message align="start">
              <MessageAvatar>
                <Avatar size="sm">
                  <AvatarFallback>CY</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Cymatica</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Sua proposta está pronta. Quer revisar o escopo antes de
                    confirmar?
                  </BubbleContent>
                </Bubble>
                <MessageFooter>14:32</MessageFooter>
              </MessageContent>
            </Message>

            <Message align="end">
              <MessageContent>
                <MessageHeader>Você</MessageHeader>
                <Bubble align="end">
                  <BubbleContent>Pode mandar, quero ver.</BubbleContent>
                </Bubble>
                <MessageFooter>14:33 · Lida</MessageFooter>
              </MessageContent>
              <MessageAvatar>
                <Avatar size="sm">
                  <AvatarFallback>LZ</AvatarFallback>
                </Avatar>
              </MessageAvatar>
            </Message>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Sequência do mesmo autor"
        description="MessageGroup encadeia mensagens; repita o cabeçalho apenas quando o autor muda."
      >
        <Demo
          className="block"
          code={`<MessageGroup>
  <Message align="start">
    <MessageAvatar>…</MessageAvatar>
    <MessageContent>
      <MessageHeader>Cymatica</MessageHeader>
      <Bubble variant="muted"><BubbleContent>Primeira</BubbleContent></Bubble>
    </MessageContent>
  </Message>
  <Message align="start">
    <MessageContent>
      <Bubble variant="muted"><BubbleContent>Segunda</BubbleContent></Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`}
        >
          <div className="w-full max-w-lg">
            <MessageGroup>
              <Message align="start">
                <MessageAvatar>
                  <Avatar size="sm">
                    <AvatarFallback>CY</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>Cymatica</MessageHeader>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Identidade visual completa, com manual de marca.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message align="start">
                <MessageContent>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Duas rodadas de ajuste inclusas.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter>14:35</MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Sem avatar"
        description="Em conversas de duas pessoas, o avatar repetido vira ruído — o alinhamento já basta."
      >
        <Demo
          className="block"
          code={`<Message align="end">
  <MessageContent>
    <Bubble align="end"><BubbleContent>Fechado!</BubbleContent></Bubble>
  </MessageContent>
</Message>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Message align="start">
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>Confirma o valor de R$ 12.400?</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>Fechado!</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Message align="start">
              <MessageAvatar>
                <Avatar size="sm">
                  <AvatarFallback>CY</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Cymatica</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>Mensagem de exemplo.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["MessageGroup", "Sequência de mensagens, com espaçamento coerente."],
            ["Message", "Uma linha. Aceita align e propaga para os filhos."],
            ["MessageAvatar", "Espaço do retrato. Coloque antes ou depois conforme o lado."],
            ["MessageContent", "Coluna com cabeçalho, balões e rodapé."],
            ["MessageHeader", "Nome do autor."],
            ["MessageFooter", "Horário, status de entrega, ações."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "align",
              type: '"start" | "end"',
              def: '"start"',
              description:
                "Lado da mensagem. Propaga para os balões pelo data-align.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes extras, mescladas via cn().",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Avatar e conteúdo. A ordem no JSX define o que vem primeiro.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O nome do autor precisa estar no DOM, no MessageHeader. Alinhamento e cor não são lidos por leitores de tela.",
            "Em sequências, omitir o cabeçalho é bom visualmente mas apaga a autoria: mantenha um nome acessível em sr-only nas mensagens subsequentes.",
            "Horários relativos (“há 2 min”) precisam do valor absoluto em um <time dateTime>, senão a informação se perde.",
            "A lista de mensagens deve ser uma região aria-live=\"polite\" para que novidades sejam anunciadas sem interromper.",
            "Status de entrega comunicado por ícone precisa de texto alternativo — “Lida” em vez de dois tiques.",
          ]}
          keyboard={[
            ["Tab", "Percorre os elementos interativos das mensagens."],
          ]}
          aria={[
            'role="log" ou aria-live="polite" — na lista de mensagens',
            "<time dateTime> — horário legível por máquina",
            "aria-label — autoria em mensagens agrupadas sem cabeçalho visível",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
