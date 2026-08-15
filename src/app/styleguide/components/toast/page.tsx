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
import { Toaster, toast } from "@/components/ui/toast";

export default function ToastPage() {
  return (
    <DocPage
      title="Toast"
      description="Sistema de notificações do Base UI, com gerenciador imperativo e markup totalmente componível. Alternativa ao Sonner quando você precisa controlar o desenho do toast."
      importPath={`import { Toaster, toast, useToastManager } from "@/components/ui/toast"`}
      tags={["Base UI", "Feedback"]}
    >
      <DocSection
        title="Montagem"
        description="O Toaster precisa existir uma vez na árvore. Nesta página ele é montado localmente para os exemplos."
      >
        <CodeBlock
          code={`// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

<body>
  {children}
  <Toaster />
</body>`}
        />
        <Toaster />
      </DocSection>

      <DocSection title="Tipos">
        <Demo
          code={`toast.add({ title: "Proposta salva" })
toast.add({ title: "Pagamento confirmado", type: "success" })
toast.add({ title: "Falha no envio", type: "error" })`}
        >
          <Button
            variant="outline"
            onClick={() => toast.add({ title: "Proposta salva" })}
          >
            Padrão
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ title: "Pagamento confirmado", type: "success" })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.add({ title: "Falha no envio", type: "error" })}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.add({ title: "Prazo apertado", type: "warning" })
            }
          >
            Warning
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Com descrição">
        <Demo
          code={`toast.add({
  title: "Proposta enviada",
  description: "voce@exemplo.com · R$ 2.450",
  type: "success",
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Proposta enviada",
                description: "voce@exemplo.com · R$ 2.450",
                type: "success",
              })
            }
          >
            Com descrição
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Atualizar e fechar"
        description="add() devolve o id, que permite atualizar o mesmo toast em vez de empilhar outro."
      >
        <Demo
          code={`const id = toast.add({ title: "Enviando…" })
// mais tarde
toast.update(id, { title: "Enviado", type: "success" })
toast.close(id)`}
        >
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.add({ title: "Enviando…" });
              setTimeout(
                () => toast.update(id, { title: "Enviado", type: "success" }),
                1200,
              );
            }}
          >
            Atualizar em 1,2s
          </Button>
          <Button variant="outline" onClick={() => toast.close()}>
            Fechar todos
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Promessa"
        description="Um toast que acompanha o ciclo de vida de uma requisição."
      >
        <Demo
          code={`toast.promise(enviarProposta(), {
  loading: { title: "Enviando…" },
  success: { title: "Proposta enviada", type: "success" },
  error: { title: "Falha no envio", type: "error" },
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1500)),
                {
                  loading: { title: "Enviando…" },
                  success: { title: "Proposta enviada", type: "success" },
                  error: { title: "Falha no envio", type: "error" },
                },
              )
            }
          >
            Toast de promessa
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Markup personalizado"
        description="Quando o desenho padrão não serve, componha as partes e monte sua própria lista."
      >
        <CodeBlock
          code={`import {
  Toast, ToastAction, ToastClose, ToastContent,
  ToastDescription, ToastPortal, ToastProvider,
  ToastTitle, ToastViewport, useToastManager,
} from "@/components/ui/toast"

function MinhaLista() {
  const { toasts } = useToastManager()
  return toasts.map((item) => (
    <Toast key={item.id} toast={item}>
      <ToastContent>
        <ToastTitle />
        <ToastDescription />
      </ToastContent>
      <ToastAction>Desfazer</ToastAction>
      <ToastClose />
    </Toast>
  ))
}`}
        />
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Toaster", "Atalho pronto: provider, portal, viewport e lista."],
            ["ToastProvider", "Contexto do gerenciador."],
            ["ToastPortal / ToastViewport", "Onde os toasts são renderizados."],
            ["Toast", "Um toast. Recebe o objeto toast."],
            ["ToastContent / ToastTitle / ToastDescription", "Conteúdo."],
            ["ToastAction / ToastClose", "Ação e fechamento."],
            ["toast", "Gerenciador global: add, update, close, promise."],
            ["useToastManager()", "Hook com a lista de toasts ativos."],
            ["createToastManager()", "Cria um gerenciador isolado."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="toast.add(options)"
          rows={[
            {
              name: "title",
              type: "string",
              description: "Linha principal da notificação.",
            },
            {
              name: "description",
              type: "string",
              description: "Detalhe complementar.",
            },
            {
              name: "type",
              type: '"success" | "error" | "warning" | "info"',
              description: "Define o ícone e a cor semântica.",
            },
            {
              name: "timeout",
              type: "number",
              description: "Tempo em ms até fechar sozinho.",
            },
            {
              name: "actionProps",
              type: "object",
              description: "Props repassadas ao botão de ação.",
            },
          ]}
        />
        <PropsTable
          caption="Métodos do gerenciador"
          rows={[
            {
              name: "add(options)",
              type: "(options) => string",
              description: "Cria um toast e devolve o id.",
            },
            {
              name: "update(id, updates)",
              type: "(id, updates) => void",
              description: "Altera um toast existente.",
            },
            {
              name: "close(id?)",
              type: "(id?) => void",
              description: "Fecha um toast, ou todos se o id for omitido.",
            },
            {
              name: "promise(promise, options)",
              type: "(promise, options) => Promise",
              description:
                "Acompanha o ciclo de vida de uma promessa em um único toast.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A viewport é uma região aria-live: os toasts são anunciados sem roubar o foco.",
            "Notificações somem sozinhas — nada essencial ou irrecuperável pode viver apenas aqui.",
            "Toasts com ação precisam de tempo suficiente para serem alcançados por teclado; considere timeout maior ou nenhum.",
            "Use update() em vez de empilhar mensagens repetidas: uma pilha longa é anunciada inteira.",
            "F6 move o foco para a região de notificações, e Escape fecha o toast em foco.",
          ]}
          keyboard={[
            ["F6", "Move o foco para a região de notificações."],
            ["Tab", "Percorre as ações do toast."],
            ["Escape", "Fecha o toast em foco."],
          ]}
          aria={[
            'aria-live="polite" — na viewport',
            'role="status" — toasts informativos',
            'role="alert" — toasts de erro',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
