"use client";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetPage() {
  return (
    <DocPage
      title="Sheet"
      description="Painel que desliza a partir de uma borda da tela. Um Dialog ancorado — bom para filtros, navegação mobile e edição rápida."
      importPath={`import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"`}
      tags={["Base UI", "Overlay"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Abrir</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Editar projeto</SheetTitle>
      <SheetDescription>Altere os dados e salve.</SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" />}>Cancelar</SheetClose>
      <Button>Salvar</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Abrir painel
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Editar projeto</SheetTitle>
                <SheetDescription>
                  Altere os dados e salve quando terminar.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sh-nome">Nome</Label>
                  <Input id="sh-nome" defaultValue="Rebranding Cymatica" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sh-cli">Cliente</Label>
                  <Input id="sh-cli" defaultValue="Cymatica" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>
                  Cancelar
                </SheetClose>
                <Button>Salvar</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Demo>
      </DocSection>

      <DocSection
        title="Lados"
        description="side define a borda de origem. right é o padrão; bottom funciona melhor no mobile."
      >
        <Demo
          code={`<SheetContent side="top" />
<SheetContent side="right" />
<SheetContent side="bottom" />
<SheetContent side="left" />`}
        >
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Painel {side}</SheetTitle>
                  <SheetDescription>
                    Este painel entra pela borda {side}.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </Demo>
      </DocSection>

      <DocSection
        title="Largura personalizada"
        description="Ajuste pela className do SheetContent — o padrão é estreito demais para formulários densos."
      >
        <Demo
          code={`<SheetContent className="w-full sm:max-w-lg">…</SheetContent>`}
        >
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Painel largo
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Refine a lista de projetos por escopo e período.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Demo>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Sheet", "Raiz. Controla open e onOpenChange."],
            ["SheetTrigger", "Abre o painel. Use render para virar um Button."],
            ["SheetContent", "Painel. Aceita side e className para largura."],
            ["SheetHeader", "Área do título."],
            ["SheetTitle", "Título — obrigatório para acessibilidade."],
            ["SheetDescription", "Texto de apoio, associado por aria-describedby."],
            ["SheetFooter", "Ações ao final."],
            ["SheetClose", "Fecha o painel. Use render para virar um Button."],
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
              description: "Estado do painel, controlado ou não.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Disparado ao abrir ou fechar.",
            },
            {
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              def: '"right"',
              description: "Borda de onde o painel entra.",
            },
            {
              name: "modal",
              type: "boolean",
              def: "true",
              description:
                "Bloqueia a interação com o resto da página enquanto aberto.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "SheetTitle é obrigatório: sem ele o diálogo não tem nome acessível. Se o título não deve aparecer, esconda com sr-only em vez de omitir.",
            "O foco fica preso dentro do painel enquanto ele está aberto e volta ao gatilho ao fechar.",
            "O conteúdo atrás recebe aria-hidden e inert, então leitores de tela não o alcançam.",
            "No mobile prefira side=\"bottom\": a área alcançável pelo polegar fica na parte de baixo da tela.",
          ]}
          keyboard={[
            ["Enter / Space", "Abre o painel a partir do gatilho."],
            ["Tab", "Circula entre os elementos focáveis, sem sair do painel."],
            ["Escape", "Fecha e devolve o foco ao gatilho."],
          ]}
          aria={[
            'role="dialog" com aria-modal="true"',
            "aria-labelledby — aponta para o SheetTitle",
            "aria-describedby — aponta para o SheetDescription",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
