"use client";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function FieldPage() {
  return (
    <DocPage
      title="Field"
      description="A camada de layout e semântica de formulários do shadcn. Amarra rótulo, controle, descrição e erro com as associações ARIA corretas."
      importPath={`import {
  Field, FieldContent, FieldDescription, FieldError,
  FieldGroup, FieldLabel, FieldLegend, FieldSeparator,
  FieldSet, FieldTitle,
} from "@/components/ui/field"`}
      tags={["Formulários", "Layout"]}
    >
      <DocSection
        title="Básico"
        description="Field envolve um controle e cuida do espaçamento vertical e das associações."
      >
        <Demo
          code={`<Field>
  <FieldLabel htmlFor="nome">Nome da marca</FieldLabel>
  <Input id="nome" placeholder="Cymatica" />
  <FieldDescription>Como aparecerá na proposta.</FieldDescription>
</Field>`}
        >
          <div className="w-full max-w-md">
            <Field>
              <FieldLabel htmlFor="nome">Nome da marca</FieldLabel>
              <Input id="nome" placeholder="Cymatica" />
              <FieldDescription>Como aparecerá na proposta.</FieldDescription>
            </Field>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Estado de erro"
        description="FieldError só aparece quando há mensagem, e é ligado ao controle por aria-describedby."
      >
        <Demo
          code={`<Field data-invalid>
  <FieldLabel htmlFor="valor">Valor</FieldLabel>
  <Input id="valor" defaultValue="0" aria-invalid />
  <FieldError>Informe um valor a partir de R$ 500.</FieldError>
</Field>`}
        >
          <div className="w-full max-w-md">
            <Field data-invalid>
              <FieldLabel htmlFor="valor">Valor</FieldLabel>
              <Input id="valor" defaultValue="0" aria-invalid />
              <FieldError>Informe um valor a partir de R$ 500.</FieldError>
            </Field>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Grupo de campos"
        description="FieldGroup empilha vários Field com espaçamento consistente."
      >
        <Demo
          code={`<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">E-mail</FieldLabel>
    <Input id="email" type="email" />
  </Field>
  <Field>
    <FieldLabel htmlFor="brief">Briefing</FieldLabel>
    <Textarea id="brief" />
  </Field>
</FieldGroup>`}
        >
          <div className="w-full max-w-md">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="f-email">E-mail</FieldLabel>
                <Input id="f-email" type="email" placeholder="voce@exemplo.com" />
              </Field>
              <Field>
                <FieldLabel htmlFor="f-brief">Briefing</FieldLabel>
                <Textarea id="f-brief" placeholder="O que você precisa?" />
              </Field>
            </FieldGroup>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Fieldset com legenda"
        description="FieldSet + FieldLegend agrupam campos relacionados com semântica nativa de formulário."
      >
        <Demo
          code={`<FieldSet>
  <FieldLegend>Contato</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="tel">Telefone</FieldLabel>
      <Input id="tel" type="tel" />
    </Field>
  </FieldGroup>
</FieldSet>`}
        >
          <div className="w-full max-w-md">
            <FieldSet>
              <FieldLegend>Contato</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="tel">Telefone</FieldLabel>
                  <Input id="tel" type="tel" placeholder="(11) 90000-0000" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cid">Cidade</FieldLabel>
                  <Input id="cid" placeholder="São Paulo" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Orientação horizontal"
        description="FieldContent alinha rótulo e descrição ao lado do controle — o padrão de tela de ajustes."
      >
        <Demo
          code={`<Field orientation="horizontal">
  <FieldContent>
    <FieldTitle>Entrega prioritária</FieldTitle>
    <FieldDescription>Reduz o prazo pela metade.</FieldDescription>
  </FieldContent>
  <Switch />
</Field>`}
        >
          <div className="w-full max-w-md">
            <FieldGroup>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Entrega prioritária</FieldTitle>
                  <FieldDescription>Reduz o prazo pela metade.</FieldDescription>
                </FieldContent>
                <Switch defaultChecked />
              </Field>
              <FieldSeparator />
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Receber novidades</FieldTitle>
                  <FieldDescription>No máximo um e-mail por mês.</FieldDescription>
                </FieldContent>
                <Checkbox />
              </Field>
            </FieldGroup>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Field>
              <FieldLabel htmlFor="tp-f">Campo</FieldLabel>
              <Input id="tp-f" placeholder="Digite algo" />
              <FieldDescription>Texto de apoio.</FieldDescription>
            </Field>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Field", "Envolve um controle. Aceita orientation e data-invalid."],
            ["FieldLabel", "Rótulo do campo. Use htmlFor apontando para o controle."],
            ["FieldTitle", "Título quando o campo é uma linha de configuração, sem <label>."],
            ["FieldDescription", "Texto de apoio, associado por aria-describedby."],
            ["FieldError", "Mensagem de erro. Renderiza apenas quando há conteúdo."],
            ["FieldContent", "Agrupa título e descrição no layout horizontal."],
            ["FieldGroup", "Empilha vários Field com espaçamento uniforme."],
            ["FieldSet", "Elemento <fieldset> para campos relacionados."],
            ["FieldLegend", "Elemento <legend> do fieldset."],
            ["FieldSeparator", "Divisória entre campos de um grupo."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Field"
          rows={[
            {
              name: "orientation",
              type: '"vertical" | "horizontal" | "responsive"',
              def: '"vertical"',
              description:
                "Vertical empilha rótulo e controle; horizontal coloca o controle à direita.",
            },
            {
              name: "data-invalid",
              type: "boolean",
              description:
                "Marca o campo como inválido, propagando o estilo de erro aos filhos.",
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
            "Field é a razão de existir da acessibilidade do formulário: ele conecta rótulo, descrição e erro sem que você escreva os aria-* na mão.",
            "Use FieldLabel com htmlFor quando houver um controle; use FieldTitle quando o rótulo não pertence a um único input.",
            "FieldError deve aparecer junto do campo, não só no topo do formulário — e após a tentativa de envio, não a cada tecla.",
            "FieldSet + FieldLegend dão nome a um grupo de rádios ou checkboxes, o que aria-label sozinho não resolve bem.",
          ]}
          keyboard={[
            ["Tab", "Percorre os campos na ordem do DOM."],
            ["Shift + Tab", "Volta ao campo anterior."],
          ]}
          aria={[
            "aria-describedby — liga descrição e erro ao controle",
            "aria-invalid — estado de erro do controle",
            "<fieldset> / <legend> — agrupamento nativo",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
