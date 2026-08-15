"use client";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelPage() {
  return (
    <DocPage
      title="Label"
      description="Rótulo acessível para um controle de formulário. Clicar no rótulo foca ou alterna o controle associado."
      importPath={`import { Label } from "@/components/ui/label"`}
      tags={["Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Label htmlFor="nome">Nome</Label>
<Input id="nome" placeholder="Sua marca" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Sua marca" />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com controle alternável"
        description="O htmlFor faz o clique no texto alternar o checkbox — área de toque bem maior."
      >
        <Demo
          code={`<div className="flex items-center gap-3">
  <Checkbox id="lembrar" />
  <Label htmlFor="lembrar">Lembrar de mim</Label>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Checkbox id="lembrar" />
            <Label htmlFor="lembrar">Lembrar de mim</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Obrigatório e opcional">
        <Demo
          className="flex-col items-start"
          code={`<Label htmlFor="a">
  Valor <span className="text-destructive">*</span>
</Label>

<Label htmlFor="b" className="flex items-center gap-2">
  Telefone
  <span className="text-xs font-normal text-muted-foreground">opcional</span>
</Label>`}
        >
          <Label htmlFor="a">
            Valor <span className="text-destructive">*</span>
          </Label>
          <Label htmlFor="b" className="flex items-center gap-2">
            Telefone
            <span className="text-xs font-normal text-muted-foreground">
              opcional
            </span>
          </Label>
        </Demo>
      </DocSection>

      <DocSection
        title="Estado desabilitado"
        description="O rótulo acompanha o estado do controle irmão desabilitado através de seletores de grupo."
      >
        <Demo
          code={`<div className="flex items-center gap-3">
  <Checkbox id="off" disabled />
  <Label htmlFor="off">Indisponível</Label>
</div>`}
        >
          <div className="flex items-center gap-3">
            <Checkbox id="off" disabled />
            <Label htmlFor="off">Indisponível</Label>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tp">Rótulo</Label>
            <Input id="tp" placeholder="Campo" />
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Herda todos os atributos de <label>."
          rows={[
            {
              name: "htmlFor",
              type: "string",
              description:
                "id do controle rotulado. É o que cria a associação acessível.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes extras, mescladas via cn().",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Conteúdo do rótulo.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "htmlFor precisa bater exatamente com o id do controle — sem isso não existe associação e leitores de tela anunciam o campo sem nome.",
            "Um rótulo visível é preferível a aria-label: beneficia todo mundo, não só quem usa leitor de tela.",
            "Não use o rótulo para instruções longas; coloque-as em FieldDescription com aria-describedby.",
            "Marcadores de obrigatório (*) devem vir acompanhados de required ou aria-required no controle.",
          ]}
          keyboard={[
            ["Click / Tap", "Move o foco para o controle associado, ou o alterna."],
          ]}
          aria={[
            "for / htmlFor — associação nativa, sempre a primeira opção",
            "aria-labelledby — quando o nome vem de vários elementos",
            "aria-label — só quando não há rótulo visível possível",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
