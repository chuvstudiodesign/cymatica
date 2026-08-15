"use client";

import { Mail, Search } from "lucide-react";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="Campo de texto de uma linha. Aceita todos os tipos nativos e integra com Label, Field e Form."
      importPath={`import { Input } from "@/components/ui/input"`}
      tags={["Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<div className="flex w-full max-w-sm flex-col gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="voce@exemplo.com" />
</div>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="voce@exemplo.com" />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Tipos">
        <Demo
          className="flex-col items-stretch"
          code={`<Input type="text" placeholder="Texto" />
<Input type="password" placeholder="Senha" />
<Input type="number" placeholder="42" />
<Input type="date" />
<Input type="file" />`}
        >
          <Input type="text" placeholder="Texto" />
          <Input type="password" placeholder="Senha" />
          <Input type="number" placeholder="42" />
          <Input type="date" />
          <Input type="file" />
        </Demo>
      </DocSection>

      <DocSection title="Estados">
        <Demo
          className="flex-col items-stretch"
          code={`<Input placeholder="Normal" />
<Input placeholder="Desabilitado" disabled />
<Input defaultValue="Somente leitura" readOnly />
<Input placeholder="Inválido" aria-invalid />`}
        >
          <Input placeholder="Normal" />
          <Input placeholder="Desabilitado" disabled />
          <Input defaultValue="Somente leitura" readOnly />
          <Input placeholder="Inválido" aria-invalid />
        </Demo>
      </DocSection>

      <DocSection
        title="Com adornos"
        description="InputGroup posiciona ícones e sufixos dentro da moldura do campo, preservando o anel de foco."
      >
        <Demo
          className="flex-col items-stretch"
          code={`<InputGroup>
  <InputGroupAddon><Search /></InputGroupAddon>
  <InputGroupInput placeholder="Buscar projetos" />
</InputGroup>

<InputGroup>
  <InputGroupAddon><Mail /></InputGroupAddon>
  <InputGroupInput placeholder="voce@exemplo.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>@cymatica.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}
        >
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar projetos" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput placeholder="voce@exemplo.com" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>@cymatica.com</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
      </DocSection>

      <DocSection title="Formato pílula">
        <Demo
          code={`<Input className="rounded-full px-4" placeholder="R$ 2450" />`}
          description="Reproduz o campo de proposta da referência da marca."
        >
          <Input
            className="max-w-xs rounded-full px-4"
            placeholder="R$ 2450"
          />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Input placeholder="Placeholder" />
          <Input defaultValue="Com valor" />
          <Input placeholder="Inválido" aria-invalid />
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Herda todos os atributos de <input>."
          rows={[
            {
              name: "type",
              type: "string",
              def: '"text"',
              description:
                "Tipo nativo do campo: text, email, password, number, date, file, search…",
            },
            {
              name: "placeholder",
              type: "string",
              description:
                "Texto de exemplo. Nunca substitui o rótulo — some ao digitar.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Desabilita o campo e reduz a opacidade.",
            },
            {
              name: "readOnly",
              type: "boolean",
              def: "false",
              description: "Impede edição mas mantém o campo focável e copiável.",
            },
            {
              name: "aria-invalid",
              type: "boolean",
              description:
                "Ativa o estilo de erro, que usa --destructive na borda e no anel.",
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
            "Todo campo precisa de um rótulo: use Label com htmlFor apontando para o id do input.",
            "Placeholder não é rótulo — ele desaparece ao digitar e costuma ter contraste baixo.",
            "Use aria-invalid junto de aria-describedby apontando para a mensagem de erro.",
            "Prefira autoComplete correto (email, name, tel, one-time-code) para acelerar o preenchimento.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para o campo."],
            ["Escape", "Limpa o campo em inputs do tipo search."],
          ]}
          aria={[
            "aria-invalid — sinaliza erro de validação",
            "aria-describedby — associa dica ou mensagem de erro",
            "aria-required — campo obrigatório",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
