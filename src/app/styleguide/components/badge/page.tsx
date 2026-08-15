"use client";

import { Check, Clock, X } from "lucide-react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Badge } from "@/components/ui/badge";

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="Rótulo compacto para status, categoria ou contagem. Não é um botão — se for clicável, é outro componente."
      importPath={`import { Badge, badgeVariants } from "@/components/ui/badge"`}
      tags={["Feedback"]}
    >
      <DocSection title="Variantes">
        <Demo
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
        >
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </Demo>
      </DocSection>

      <DocSection
        title="Cores semânticas"
        description="Para sucesso, aviso e informação, aplique os tokens direto — o componente não traz essas variantes."
      >
        <Demo
          code={`<Badge style={{
  background: "var(--success)",
  color: "var(--success-foreground)",
}}>
  Aprovado
</Badge>`}
        >
          <Badge
            style={{
              background: "var(--success)",
              color: "var(--success-foreground)",
            }}
          >
            Aprovado
          </Badge>
          <Badge
            style={{
              background: "var(--warning)",
              color: "var(--warning-foreground)",
            }}
          >
            Pendente
          </Badge>
          <Badge
            style={{
              background: "var(--info)",
              color: "var(--info-foreground)",
            }}
          >
            Em análise
          </Badge>
        </Demo>
      </DocSection>

      <DocSection title="Com ícone">
        <Demo
          code={`<Badge><Check /> Entregue</Badge>
<Badge variant="secondary"><Clock /> Em produção</Badge>`}
        >
          <Badge>
            <Check /> Entregue
          </Badge>
          <Badge variant="secondary">
            <Clock /> Em produção
          </Badge>
          <Badge variant="destructive">
            <X /> Cancelado
          </Badge>
        </Demo>
      </DocSection>

      <DocSection
        title="Contagem"
        description="Números precisam de contexto no texto acessível — “3” sozinho não diz nada."
      >
        <Demo
          code={`<Badge aria-label="3 propostas pendentes">3</Badge>`}
        >
          <Badge aria-label="3 propostas pendentes">3</Badge>
          <Badge variant="secondary" aria-label="12 mensagens não lidas">
            12
          </Badge>
          <Badge variant="outline" aria-label="99 ou mais notificações">
            99+
          </Badge>
        </Demo>
      </DocSection>

      <DocSection
        title="Como link"
        description="Quando o rótulo navega, use badgeVariants em um link real — não coloque onClick em um Badge."
      >
        <Demo
          code={`<a href="/projetos?tag=marca" className={badgeVariants({ variant: "outline" })}>
  Marca
</a>`}
        >
          <a href="#" className="inline-flex">
            <Badge variant="outline">Marca</Badge>
          </a>
          <a href="#" className="inline-flex">
            <Badge variant="outline">Site</Badge>
          </a>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "destructive"',
              def: '"default"',
              description: "Aparência do rótulo.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Troca o elemento renderizado, por exemplo por um <a> ou Link.",
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
            "Badge é texto: se o rótulo já é claro (\"Entregue\"), não precisa de nada além.",
            "Contagens isoladas precisam de aria-label com a unidade — \"3\" pode ser qualquer coisa.",
            "Status comunicado apenas por cor é inacessível. O texto dentro do badge é o que carrega o significado.",
            "Se o badge muda em resposta a uma ação, coloque-o dentro de uma região aria-live para ser anunciado.",
            "Badge não recebe foco. Se precisa ser clicável, envolva em link ou botão de verdade.",
          ]}
          aria={[
            "aria-label — dá unidade a contagens numéricas",
            'role="status" — quando o valor muda dinamicamente',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
