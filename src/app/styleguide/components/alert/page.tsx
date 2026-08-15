"use client";

import { AlertCircle, CheckCircle2, Info, Terminal } from "lucide-react";

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
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertPage() {
  return (
    <DocPage
      title="Alert"
      description="Mensagem persistente dentro do fluxo da página. Ao contrário do Toast, não desaparece sozinha."
      importPath={`import {
  Alert, AlertAction, AlertDescription, AlertTitle,
} from "@/components/ui/alert"`}
      tags={["Feedback"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Alert>
  <Terminal />
  <AlertTitle>Proposta gerada</AlertTitle>
  <AlertDescription>
    Sua proposta foi calculada e enviada para o seu e-mail.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="w-full max-w-lg">
            <Terminal />
            <AlertTitle>Proposta gerada</AlertTitle>
            <AlertDescription>
              Sua proposta foi calculada e enviada para o seu e-mail.
            </AlertDescription>
          </Alert>
        </Demo>
      </DocSection>

      <DocSection
        title="Variante destrutiva"
        description="No estilo base-nova o token --destructive vira cor de texto sobre um fundo com tinta leve."
      >
        <Demo
          className="block"
          code={`<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Não foi possível processar</AlertTitle>
  <AlertDescription>Verifique o valor e tente novamente.</AlertDescription>
</Alert>`}
        >
          <Alert variant="destructive" className="w-full max-w-lg">
            <AlertCircle />
            <AlertTitle>Não foi possível processar</AlertTitle>
            <AlertDescription>
              Verifique o valor informado e tente novamente.
            </AlertDescription>
          </Alert>
        </Demo>
      </DocSection>

      <DocSection
        title="Cores semânticas"
        description="Para sucesso e informação, componha com os tokens --success e --info na borda e no ícone."
      >
        <Demo
          className="block"
          code={`<Alert style={{ borderColor: "var(--success)" }}>
  <CheckCircle2 style={{ color: "var(--success)" }} />
  <AlertTitle>Pagamento confirmado</AlertTitle>
</Alert>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert style={{ borderColor: "var(--success)" }}>
              <CheckCircle2 style={{ color: "var(--success)" }} />
              <AlertTitle>Pagamento confirmado</AlertTitle>
              <AlertDescription>
                O projeto entra na fila de produção hoje.
              </AlertDescription>
            </Alert>
            <Alert style={{ borderColor: "var(--info)" }}>
              <Info style={{ color: "var(--info)" }} />
              <AlertTitle>Sobre o prazo</AlertTitle>
              <AlertDescription>
                Entregas começam em até 48h após a confirmação.
              </AlertDescription>
            </Alert>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com ação"
        description="AlertAction ancora um controle à direita, sem quebrar o alinhamento do texto."
      >
        <Demo
          className="block"
          code={`<Alert>
  <Info />
  <AlertTitle>Complete seu perfil</AlertTitle>
  <AlertDescription>Faltam dados de cobrança.</AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">Completar</Button>
  </AlertAction>
</Alert>`}
        >
          <Alert className="w-full max-w-lg">
            <Info />
            <AlertTitle>Complete seu perfil</AlertTitle>
            <AlertDescription>
              Faltam os dados de cobrança para emitir a nota.
            </AlertDescription>
            <AlertAction>
              <Button size="sm" variant="outline">
                Completar
              </Button>
            </AlertAction>
          </Alert>
        </Demo>
      </DocSection>

      <DocSection
        title="Somente título"
        description="A descrição é opcional quando a mensagem cabe em uma linha."
      >
        <Demo
          className="block"
          code={`<Alert>
  <CheckCircle2 />
  <AlertTitle>Alterações salvas.</AlertTitle>
</Alert>`}
        >
          <Alert className="w-full max-w-lg">
            <CheckCircle2 />
            <AlertTitle>Alterações salvas.</AlertTitle>
          </Alert>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="flex w-full flex-col gap-3">
            <Alert>
              <Terminal />
              <AlertTitle>Padrão</AlertTitle>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Destrutivo</AlertTitle>
            </Alert>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Alert", "Contêiner. Aceita variant."],
            ["AlertTitle", "Resumo em uma linha."],
            ["AlertDescription", "Detalhe e próximos passos."],
            ["AlertAction", "Controle alinhado à direita."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"default" | "destructive"',
              def: '"default"',
              description: "Aparência da mensagem.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Ícone opcional, título, descrição e ação — nessa ordem.",
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
            "Um Alert presente desde o carregamento da página é lido na ordem normal e não precisa de role especial.",
            "Se a mensagem aparece em resposta a uma ação, adicione role=\"alert\" para que seja anunciada na hora.",
            "Erros de formulário pertencem ao campo, não a um Alert genérico no topo. Use FieldError; o Alert serve para o resumo.",
            "Nunca comunique o tipo apenas pela cor: o ícone e o texto do título precisam dizer o que aconteceu.",
            "O ícone é decorativo e deve permanecer aria-hidden — o significado vem do texto.",
          ]}
          aria={[
            'role="alert" — mensagens que surgem depois do carregamento',
            'role="status" — atualizações menos urgentes',
            'aria-live="assertive" | "polite" — urgência do anúncio',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
