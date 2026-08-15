"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

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
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";

function DialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir paleta
      </Button>
      <p className="text-xs text-muted-foreground">
        Ou pressione <Kbd>⌘</Kbd> <Kbd>K</Kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou busque…" />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem onSelect={() => setOpen(false)}>
              <Calendar /> Agenda
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Smile /> Emojis
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Calculator /> Calculadora
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Configurações">
            <CommandItem onSelect={() => setOpen(false)}>
              <User /> Perfil
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <CreditCard /> Cobrança
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Settings /> Ajustes
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default function CommandPage() {
  return (
    <DocPage
      title="Command"
      description="Menu de comandos com busca por digitação. Base da paleta ⌘K e de qualquer seletor filtrável."
      importPath={`import {
  Command, CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}
      tags={["cmdk", "Navegação"]}
    >
      <DocSection
        title="Inline"
        description="Command sozinho renderiza a lista direto na página, sem diálogo."
      >
        <Demo
          className="block"
          code={`<Command className="rounded-lg border">
  <CommandInput placeholder="Buscar…" />
  <CommandList>
    <CommandEmpty>Nenhum resultado.</CommandEmpty>
    <CommandGroup heading="Sugestões">
      <CommandItem><Calendar /> Agenda</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <Command className="w-full max-w-md rounded-lg border">
            <CommandInput placeholder="Buscar comando…" />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              <CommandGroup heading="Sugestões">
                <CommandItem>
                  <Calendar /> Agenda
                </CommandItem>
                <CommandItem>
                  <Smile /> Emojis
                </CommandItem>
                <CommandItem>
                  <Calculator /> Calculadora
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Configurações">
                <CommandItem>
                  <User /> Perfil
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings /> Ajustes
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Demo>
      </DocSection>

      <DocSection
        title="Paleta de comandos (interativo)"
        description="CommandDialog embrulha o Command em um Dialog. O atalho global fica por sua conta."
      >
        <Demo
          className="block"
          code={`const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKeyDown)
  return () => document.removeEventListener("keydown", onKeyDown)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Digite um comando…" />
  <CommandList>…</CommandList>
</CommandDialog>`}
        >
          <DialogDemo />
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Command", "Raiz. Contém a lógica de filtro."],
            ["CommandDialog", "Envolve o Command em um Dialog modal."],
            ["CommandInput", "Campo de busca. Filtra a lista ao digitar."],
            ["CommandList", "Contêiner rolável dos resultados."],
            ["CommandEmpty", "Exibido quando o filtro não retorna nada."],
            ["CommandGroup", "Agrupa itens sob um heading."],
            ["CommandItem", "Um comando. onSelect dispara a ação."],
            ["CommandSeparator", "Divisória entre grupos."],
            ["CommandShortcut", "Atalho alinhado à direita, decorativo."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "open / onOpenChange",
              type: "boolean / (open: boolean) => void",
              description: "Em CommandDialog: estado do diálogo.",
            },
            {
              name: "onSelect",
              type: "(value: string) => void",
              description:
                "Em CommandItem: ação executada. Feche o diálogo dentro dela.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Em CommandItem: valor usado no filtro. Por padrão vem do texto do item.",
            },
            {
              name: "heading",
              type: "React.ReactNode",
              description: "Em CommandGroup: título do grupo.",
            },
            {
              name: "shouldFilter",
              type: "boolean",
              def: "true",
              description:
                "Em Command: desligue quando a filtragem vier do servidor.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "CommandEmpty é obrigatório: sem ele uma busca sem resultado deixa a lista silenciosamente vazia.",
            "Uma paleta ⌘K precisa ter um caminho alternativo visível — nem todo mundo descobre atalhos.",
            "O foco permanece no campo de busca; a navegação usa aria-activedescendant, então não mova o foco manualmente.",
            "Registre o atalho global com preventDefault para não conflitar com a busca nativa do navegador.",
            "Em resultados assíncronos, anuncie o carregamento em uma região aria-live.",
          ]}
          keyboard={[
            ["⌘K / Ctrl+K", "Abre a paleta (atalho definido pela aplicação)."],
            ["↑ ↓", "Move entre os resultados."],
            ["Enter", "Executa o comando em destaque."],
            ["Escape", "Fecha a paleta."],
          ]}
          aria={[
            'role="combobox" no campo de busca',
            'role="listbox" na lista e role="option" nos itens',
            "aria-activedescendant — item em destaque",
            'aria-selected — no item destacado',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
