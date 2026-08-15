"use client";

import { toast } from "sonner";

import {
  A11y,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";

export default function SonnerPage() {
  return (
    <DocPage
      title="Sonner"
      description="Notificações empilhadas em um canto da tela. O Toaster já está montado no layout raiz — basta chamar toast() de qualquer lugar."
      importPath={`import { toast } from "sonner"`}
      tags={["Sonner", "Feedback"]}
    >
      <DocSection
        title="Instalação no layout"
        description="Já feito neste projeto; a referência fica aqui para quem for reaproveitar."
      >
        <CodeBlock
          code={`// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

<body>
  {children}
  <Toaster />
</body>`}
        />
      </DocSection>

      <DocSection title="Tipos">
        <Demo
          code={`toast("Proposta salva")
toast.success("Pagamento confirmado")
toast.error("Não foi possível processar")
toast.warning("Prazo apertado")
toast.info("Produção começa em 48h")`}
        >
          <Button variant="outline" onClick={() => toast("Proposta salva")}>
            Padrão
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Pagamento confirmado")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Não foi possível processar")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Prazo apertado")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Produção começa em 48h")}
          >
            Info
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Com descrição">
        <Demo
          code={`toast.success("Proposta enviada", {
  description: "voce@exemplo.com · R$ 2.450",
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Proposta enviada", {
                description: "voce@exemplo.com · R$ 2.450",
              })
            }
          >
            Com descrição
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Com ação"
        description="Um botão de desfazer costuma ser melhor que um diálogo de confirmação."
      >
        <Demo
          code={`toast("Projeto arquivado", {
  action: {
    label: "Desfazer",
    onClick: () => restaurar(),
  },
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast("Projeto arquivado", {
                action: {
                  label: "Desfazer",
                  onClick: () => toast.success("Projeto restaurado"),
                },
              })
            }
          >
            Com desfazer
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Promessa"
        description="Um único toast atravessa carregando, sucesso e erro."
      >
        <Demo
          code={`toast.promise(enviarProposta(), {
  loading: "Enviando…",
  success: "Proposta enviada",
  error: "Falha no envio",
})`}
        >
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1500)),
                {
                  loading: "Enviando…",
                  success: "Proposta enviada",
                  error: "Falha no envio",
                },
              )
            }
          >
            Toast de promessa
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Duração e persistência">
        <Demo
          code={`toast("Some em 10 segundos", { duration: 10000 })
toast("Fica até ser fechado", { duration: Infinity })`}
        >
          <Button
            variant="outline"
            onClick={() => toast("Some em 10 segundos", { duration: 10000 })}
          >
            10 segundos
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Fica até ser fechado", {
                duration: Infinity,
                action: { label: "Fechar", onClick: () => {} },
              })
            }
          >
            Persistente
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Opções de toast()"
          rows={[
            {
              name: "description",
              type: "React.ReactNode",
              description: "Segunda linha, com o detalhe.",
            },
            {
              name: "action",
              type: "{ label: string; onClick: () => void }",
              description: "Botão dentro do toast, tipicamente “Desfazer”.",
            },
            {
              name: "duration",
              type: "number",
              def: "4000",
              description:
                "Tempo em ms. Use Infinity para exigir fechamento manual.",
            },
            {
              name: "id",
              type: "string | number",
              description:
                "Atualiza um toast existente em vez de empilhar outro.",
            },
            {
              name: "onDismiss / onAutoClose",
              type: "(toast) => void",
              description: "Callbacks de fechamento manual e automático.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Sonner ou Toast">
        <CodeBlock
          code={`// Sonner — API imperativa, chame de qualquer lugar
toast.success("Salvo")

// Toast (Base UI) — composição declarativa, controle total do markup
const manager = useToastManager()
manager.add({ title: "Salvo" })`}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Toasts são anunciados por uma região aria-live, mas somem sozinhos: nada crítico pode viver só neles.",
            "Erros que exigem ação pertencem a um Alert na página, não a uma notificação passageira.",
            "A duração padrão de 4s é curta para textos longos. Se a mensagem tem descrição, aumente-a ou torne-a persistente.",
            "Toasts com ação precisam ser alcançáveis por teclado — Sonner move o foco com F6.",
            "Não empilhe muitos ao mesmo tempo: prefira atualizar um toast existente pelo id.",
          ]}
          keyboard={[
            ["F6", "Move o foco para a região de notificações."],
            ["Tab", "Percorre as ações do toast em foco."],
            ["Escape", "Fecha o toast em foco."],
          ]}
          aria={[
            'aria-live="polite" — na região de notificações',
            'role="status" — mensagens informativas',
            'role="alert" — erros que precisam interromper',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
