"use client";

import { Check, Clock, Sparkles } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Message, MessageContent } from "@/components/ui/message";

export default function MarkerPage() {
  return (
    <DocPage
      title="Marker"
      description="Divisor de contexto dentro de uma conversa: data, mensagens não lidas, mudança de estado."
      importPath={`import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"`}
      tags={["Chat"]}
    >
      <DocSection title="Variantes">
        <Demo
          className="block"
          code={`<Marker variant="default">
  <MarkerContent>Hoje</MarkerContent>
</Marker>

<Marker variant="separator">
  <MarkerContent>Mensagens não lidas</MarkerContent>
</Marker>

<Marker variant="border">
  <MarkerContent>Ontem</MarkerContent>
</Marker>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-6">
            <Marker variant="default">
              <MarkerContent>Hoje</MarkerContent>
            </Marker>
            <Marker variant="separator">
              <MarkerContent>Mensagens não lidas</MarkerContent>
            </Marker>
            <Marker variant="border">
              <MarkerContent>Ontem</MarkerContent>
            </Marker>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com ícone"
        description="MarkerIcon posiciona um glifo antes do texto."
      >
        <Demo
          className="block"
          code={`<Marker variant="separator">
  <MarkerIcon><Check /></MarkerIcon>
  <MarkerContent>Proposta aprovada</MarkerContent>
</Marker>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-6">
            <Marker variant="separator">
              <MarkerIcon>
                <Check className="size-3.5" />
              </MarkerIcon>
              <MarkerContent>Proposta aprovada</MarkerContent>
            </Marker>
            <Marker variant="separator">
              <MarkerIcon>
                <Clock className="size-3.5" />
              </MarkerIcon>
              <MarkerContent>Aguardando pagamento</MarkerContent>
            </Marker>
            <Marker variant="default">
              <MarkerIcon>
                <Sparkles className="size-3.5" />
              </MarkerIcon>
              <MarkerContent>Produção iniciada</MarkerContent>
            </Marker>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Em uma conversa"
        description="O uso real: separar blocos de mensagens por data e marcar o ponto de leitura."
      >
        <Demo
          className="block"
          code={`<Marker variant="separator"><MarkerContent>Ontem</MarkerContent></Marker>
<Message align="start">…</Message>
<Marker variant="separator"><MarkerContent>Hoje</MarkerContent></Marker>
<Message align="end">…</Message>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-4">
            <Marker variant="separator">
              <MarkerContent>Ontem</MarkerContent>
            </Marker>
            <Message align="start">
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>Enviei o briefing por e-mail.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Marker variant="separator">
              <MarkerContent>Hoje</MarkerContent>
            </Marker>
            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>Recebido, já estou olhando.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full py-2">
            <Marker variant="separator">
              <MarkerContent>Hoje</MarkerContent>
            </Marker>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Marker", "O divisor. Aceita variant e render."],
            ["MarkerIcon", "Glifo antes do texto."],
            ["MarkerContent", "O rótulo."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"default" | "separator" | "border"',
              def: '"default"',
              description:
                "default é uma pílula centralizada; separator traça a linha atravessando; border desenha só a borda.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Troca o elemento renderizado — útil para virar um <li> dentro de uma lista de mensagens.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes extras, mescladas via cn().",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Marcadores de data são conteúdo, não decoração: o texto precisa estar no DOM para que a conversa faça sentido lida em sequência.",
            "Para datas, prefira <time dateTime=\"2026-08-15\"> dentro do MarkerContent — “Hoje” sozinho perde o sentido fora do momento.",
            "O marcador de não lidas deve receber o foco ao abrir a conversa, para que a leitura comece no ponto certo.",
            "Ícones dentro do Marker são decorativos; o significado vem do MarkerContent ao lado.",
            "Se a lista de mensagens é uma <ul>, use render para que o Marker seja um <li> e não quebre a semântica da lista.",
          ]}
          aria={[
            'role="separator" — quando o marcador apenas divide visualmente',
            "<time dateTime> — data legível por máquina",
            'aria-hidden="true" — no MarkerIcon',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
