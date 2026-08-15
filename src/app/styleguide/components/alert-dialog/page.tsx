"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function ConfirmDemo() {
  const [pending, setPending] = React.useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Excluir projeto
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir este projeto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Todos os arquivos e o histórico de
            propostas serão removidos permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={async () => {
              setPending(true);
              await new Promise((r) => setTimeout(r, 600));
              setPending(false);
              toast.success("Projeto excluído");
            }}
          >
            {pending ? "Excluindo…" : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AlertDialogPage() {
  return (
    <DocPage
      title="Alert Dialog"
      description="Confirmação que interrompe o fluxo. Diferente do Dialog, não fecha ao clicar fora — a escolha precisa ser explícita."
      importPath={`import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection
        title="Confirmação destrutiva (interativo)"
        description="O padrão canônico: título que faz a pergunta, descrição que explica a consequência, duas saídas claras."
      >
        <Demo
          code={`<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Excluir projeto
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir este projeto?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={excluir}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <ConfirmDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Confirmação neutra"
        description="Nem toda confirmação é destrutiva — sair sem salvar também merece uma pausa."
      >
        <Demo
          code={`<AlertDialogTitle>Descartar alterações?</AlertDialogTitle>
<AlertDialogAction>Descartar</AlertDialogAction>`}
        >
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              Sair sem salvar
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Descartar alterações?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você tem alterações não salvas nesta proposta. Sair agora
                  descarta o que foi editado.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continuar editando</AlertDialogCancel>
                <AlertDialogAction>Descartar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["AlertDialog", "Raiz. Controla open e onOpenChange."],
            ["AlertDialogTrigger", "Abre a confirmação. Use render."],
            ["AlertDialogContent", "Janela. Não fecha ao clicar no overlay."],
            ["AlertDialogHeader", "Área de título."],
            ["AlertDialogTitle", "A pergunta. Obrigatório."],
            ["AlertDialogDescription", "A consequência da ação."],
            ["AlertDialogMedia", "Ícone ou ilustração opcional acima do título."],
            ["AlertDialogFooter", "As duas saídas."],
            ["AlertDialogCancel", "Descarta. Recebe o foco inicial."],
            ["AlertDialogAction", "Confirma e executa."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "open / defaultOpen",
              type: "boolean",
              def: "false",
              description: "Estado da confirmação, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "onClick",
              type: "(event: React.MouseEvent) => void",
              description:
                "Em AlertDialogAction: executa a ação confirmada.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description:
                "Em AlertDialogAction: desabilite durante a execução assíncrona.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Use AlertDialog apenas quando a ação for irreversível ou custosa. Para tudo mais, prefira desfazer a confirmar.",
            "O título deve ser a pergunta e o botão deve nomear a ação: \"Excluir\", não \"OK\". Ninguém lê \"Tem certeza?\" com atenção.",
            "O foco inicial vai para Cancelar, para que Enter apressado não confirme uma destruição.",
            "Ao contrário do Dialog, clicar fora não fecha — é intencional e não deve ser sobrescrito.",
            "Escape continua fechando, o que equivale a cancelar.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre a partir do gatilho."],
            ["Tab", "Alterna entre Cancelar e Confirmar."],
            ["Escape", "Cancela e fecha."],
          ]}
          aria={[
            'role="alertdialog" com aria-modal="true"',
            "aria-labelledby — aponta para o AlertDialogTitle",
            "aria-describedby — aponta para o AlertDialogDescription",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
