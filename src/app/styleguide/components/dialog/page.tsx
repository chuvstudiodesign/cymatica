"use client";

import * as React from "react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir por código
      </Button>
      <span className="font-mono text-xs text-muted-foreground">
        open: {String(open)}
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Diálogo controlado</DialogTitle>
            <DialogDescription>
              O estado vive no componente pai, então você pode abrir a partir de
              qualquer lugar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Entendi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function DialogPage() {
  return (
    <DocPage
      title="Dialog"
      description="Janela modal que interrompe o fluxo para uma tarefa focada. Bloqueia a página atrás até ser resolvida."
      importPath={`import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Editar</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar projeto</DialogTitle>
      <DialogDescription>Altere os dados e salve.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancelar</DialogClose>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Editar projeto
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar projeto</DialogTitle>
                <DialogDescription>
                  Altere os dados e salve quando terminar.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="d-nome">Nome</FieldLabel>
                  <Input id="d-nome" defaultValue="Rebranding Cymatica" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="d-cli">Cliente</FieldLabel>
                  <Input id="d-cli" defaultValue="Cymatica" />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancelar
                </DialogClose>
                <Button>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [open, setOpen] = React.useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>…</DialogContent>
</Dialog>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Conteúdo longo"
        description="Deixe o corpo rolar e mantenha cabeçalho e rodapé fixos."
      >
        <Demo
          code={`<DialogContent className="max-h-[80vh] overflow-y-auto">…</DialogContent>`}
        >
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Termos de uso
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Termos de uso</DialogTitle>
                <DialogDescription>
                  Última atualização em agosto de 2026.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                {Array.from({ length: 8 }).map((_, i) => (
                  <p key={i}>
                    A produção começa em até 48h após a confirmação do
                    pagamento. Cada etapa inclui duas rodadas de ajuste sem custo
                    adicional, e os arquivos editáveis são entregues ao final.
                  </p>
                ))}
              </div>
              <DialogFooter>
                <DialogClose render={<Button />}>Fechar</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
      </DocSection>

      <DocSection
        title="Título escondido"
        description="Quando o desenho não comporta um título visível, esconda com sr-only — nunca omita."
      >
        <Demo
          code={`<DialogHeader>
  <DialogTitle className="sr-only">Buscar projetos</DialogTitle>
</DialogHeader>`}
        >
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Sem título visível
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="sr-only">Buscar projetos</DialogTitle>
                <DialogDescription className="sr-only">
                  Digite para filtrar a lista de projetos.
                </DialogDescription>
              </DialogHeader>
              <Input placeholder="Buscar projetos…" />
            </DialogContent>
          </Dialog>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Dialog", "Raiz. Controla open e onOpenChange."],
            ["DialogTrigger", "Abre o diálogo. Use render."],
            ["DialogContent", "Janela. Inclui overlay e botão de fechar."],
            ["DialogHeader", "Área de título."],
            ["DialogTitle", "Título — obrigatório para acessibilidade."],
            ["DialogDescription", "Texto de apoio, ligado por aria-describedby."],
            ["DialogFooter", "Ações, alinhadas à direita."],
            ["DialogClose", "Fecha o diálogo. Use render."],
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
              description: "Estado do diálogo, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "modal",
              type: "boolean",
              def: "true",
              description:
                "Bloqueia a interação com o restante da página enquanto aberto.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Em DialogContent: largura máxima e rolagem do conteúdo longo.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "DialogTitle é obrigatório — sem ele o diálogo não tem nome acessível. Esconda com sr-only se necessário, mas nunca remova.",
            "O foco é preso dentro do diálogo enquanto aberto e volta ao gatilho ao fechar.",
            "Para confirmar uma ação destrutiva use AlertDialog: ele não fecha ao clicar fora, evitando descarte acidental.",
            "Evite aninhar diálogos. Se um segundo passo é necessário, troque o conteúdo do mesmo diálogo.",
            "Formulários dentro de diálogos precisam mostrar os erros dentro do próprio diálogo, não abaixo dele.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre a partir do gatilho."],
            ["Tab", "Circula entre os focáveis, sem sair do diálogo."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'role="dialog" com aria-modal="true"',
            "aria-labelledby — aponta para o DialogTitle",
            "aria-describedby — aponta para o DialogDescription",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
