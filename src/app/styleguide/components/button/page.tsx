"use client";

import Link from "next/link";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Aciona uma ação. Seis variantes e cinco tamanhos, todos construídos sobre os tokens do projeto."
      importPath={`import { Button, buttonVariants } from "@/components/ui/button"`}
      tags={["Base UI", "Formulários"]}
    >
      <DocSection
        title="Variantes"
        description="default usa --primary; destructive usa --destructive como cor de texto sobre um fundo com 10% de tinta."
      >
        <Demo
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </Demo>
      </DocSection>

      <DocSection title="Tamanhos">
        <Demo
          code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`}
        >
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Adicionar">
            <Plus />
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Com ícone">
        <Demo
          code={`<Button><Download /> Baixar</Button>
<Button variant="outline">Continuar <ArrowRight /></Button>
<Button variant="destructive"><Trash2 /> Excluir</Button>`}
        >
          <Button>
            <Download /> Baixar
          </Button>
          <Button variant="outline">
            Continuar <ArrowRight />
          </Button>
          <Button variant="destructive">
            <Trash2 /> Excluir
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Estados"
        description="disabled remove eventos de ponteiro e aplica opacidade 50%. Para carregamento, componha com Spinner e desabilite o botão."
      >
        <Demo
          code={`<Button disabled>Disabled</Button>
<Button disabled><Spinner /> Salvando…</Button>
<Button variant="outline" disabled>Disabled outline</Button>`}
        >
          <Button disabled>Disabled</Button>
          <Button disabled>
            <Spinner /> Salvando…
          </Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </Demo>
      </DocSection>

      <DocSection
        title="Como link"
        description="O estilo base-nova é construído sobre Base UI, que não tem asChild. Use render para trocar o elemento renderizado."
      >
        <Demo
          code={`<Button render={<Link href="/styleguide" />}>Ir ao styleguide</Button>

// Alternativa sem componente, aplicando só as classes:
<Link href="/styleguide" className={buttonVariants({ variant: "outline" })}>
  Styleguide
</Link>`}
        >
          <Button render={<Link href="/styleguide" />}>Ir ao styleguide</Button>
        </Demo>
      </DocSection>

      <DocSection title="Formato pílula">
        <Demo
          code={`<Button className="rounded-full">Começar Agora</Button>`}
          description="A referência da marca usa CTAs em pílula. rounded-full sobrescreve o radius base sem tocar no token."
        >
          <Button className="rounded-full">Começar Agora</Button>
          <Button variant="outline" className="rounded-full">
            Saiba mais
          </Button>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "link" | "destructive"',
              def: '"default"',
              description: "Aparência visual do botão.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
              def: '"default"',
              description:
                "Altura e espaçamento. As variantes icon produzem um botão quadrado.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o botão e remove eventos de ponteiro.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Substitui o elemento renderizado mantendo estilo e comportamento. Equivalente Base UI do antigo asChild.",
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
            "Renderiza um <button> nativo, então recebe foco e responde a clique e teclado sem configuração.",
            "Botões apenas com ícone precisam de aria-label — sem texto visível não há nome acessível.",
            "O anel de foco usa --ring e só aparece em foco por teclado (focus-visible).",
            "Não use variant=\"link\" para navegação real: prefira render={<Link />} para que seja um <a> de verdade.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o botão."],
            ["Space / Enter", "Aciona o botão."],
          ]}
          aria={[
            'aria-label — nome acessível para botões só de ícone',
            'aria-disabled — quando o botão precisa continuar focável mesmo inativo',
            'aria-busy — enquanto uma ação assíncrona está em andamento',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
