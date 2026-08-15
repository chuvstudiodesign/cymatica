"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  A11y,
  CodeBlock,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
} from "@/app/styleguide/_components/doc";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const escopos = [
  { label: "Escolha um escopo", value: null },
  { label: "Identidade visual", value: "identidade" },
  { label: "Site institucional", value: "site" },
  { label: "Social kit", value: "social" },
];

type Errors = Partial<Record<"email" | "valor" | "escopo" | "brief", string>>;

function validate(data: {
  email: string;
  valor: string;
  escopo: string | null;
  brief: string;
}): Errors {
  const errors: Errors = {};
  if (!data.email) errors.email = "Informe um e-mail.";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
    errors.email = "E-mail inválido.";

  const valor = Number(data.valor);
  if (!data.valor) errors.valor = "Informe um valor.";
  else if (Number.isNaN(valor)) errors.valor = "Use apenas números.";
  else if (valor < 500) errors.valor = "O valor mínimo é R$ 500.";

  if (!data.escopo) errors.escopo = "Escolha um escopo.";
  if (data.brief.length > 0 && data.brief.length < 20)
    errors.brief = "Descreva com pelo menos 20 caracteres.";

  return errors;
}

function ProposalForm() {
  const [errors, setErrors] = React.useState<Errors>({});
  const [escopo, setEscopo] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: String(form.get("email") ?? ""),
      valor: String(form.get("valor") ?? ""),
      escopo,
      brief: String(form.get("brief") ?? ""),
    };

    const next = validate(data);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Move o foco para o primeiro campo com erro.
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setPending(true);
    await new Promise((r) => setTimeout(r, 800));
    setPending(false);
    toast.success("Proposta enviada", {
      description: `${data.email} · R$ ${data.valor}`,
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <FieldGroup>
        <Field data-invalid={errors.email ? true : undefined}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <FieldError id="email-error">{errors.email}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.valor ? true : undefined}>
          <FieldLabel htmlFor="valor">Quanto você pode pagar?</FieldLabel>
          <Input
            id="valor"
            name="valor"
            inputMode="numeric"
            placeholder="2450"
            aria-invalid={errors.valor ? true : undefined}
            aria-describedby={errors.valor ? "valor-error" : "valor-desc"}
          />
          {errors.valor ? (
            <FieldError id="valor-error">{errors.valor}</FieldError>
          ) : (
            <FieldDescription id="valor-desc">
              Valor mínimo de R$ 500.
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={errors.escopo ? true : undefined}>
          <FieldLabel htmlFor="escopo">Escopo</FieldLabel>
          <Select items={escopos} value={escopo} onValueChange={setEscopo}>
            <SelectTrigger
              id="escopo"
              aria-invalid={errors.escopo ? true : undefined}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {escopos.map((i) => (
                <SelectItem key={String(i.value)} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.escopo ? (
            <FieldError id="escopo-error">{errors.escopo}</FieldError>
          ) : null}
        </Field>

        <Field data-invalid={errors.brief ? true : undefined}>
          <FieldLabel htmlFor="brief">Briefing (opcional)</FieldLabel>
          <Textarea
            id="brief"
            name="brief"
            placeholder="Conte o contexto da sua marca."
            aria-invalid={errors.brief ? true : undefined}
            aria-describedby={errors.brief ? "brief-error" : undefined}
          />
          {errors.brief ? (
            <FieldError id="brief-error">{errors.brief}</FieldError>
          ) : null}
        </Field>

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? <Spinner /> : null}
          {pending ? "Enviando…" : "Receber proposta"}
        </Button>
      </FieldGroup>
    </form>
  );
}

export default function FormPage() {
  return (
    <DocPage
      title="Form"
      description="Formulários neste projeto são compostos com Field sobre um <form> nativo. O item form do registry é um stub — Field o substituiu."
      importPath={`import {
  Field, FieldDescription, FieldError, FieldGroup, FieldLabel,
} from "@/components/ui/field"`}
      tags={["Formulários"]}
    >
      <DocSection title="Por que não há um componente Form">
        <Alert>
          <AlertTitle>Field substituiu Form</AlertTitle>
          <AlertDescription>
            O item <code className="font-mono">@shadcn/form</code> existe no
            registry mas não entrega arquivo algum: no estilo base-nova o papel
            dele passou para <code className="font-mono">Field</code>, que já faz
            as associações de rótulo, descrição e erro. Não há dependência de
            react-hook-form nem de zod — o formulário abaixo usa FormData e
            estado do React, então funciona igualmente com Server Actions.
          </AlertDescription>
        </Alert>
      </DocSection>

      <DocSection
        title="Formulário validado (interativo)"
        description="Envie vazio para ver os erros: cada mensagem é associada ao seu campo e o foco vai para o primeiro problema."
      >
        <Demo>
          <ProposalForm />
        </Demo>
      </DocSection>

      <DocSection
        title="A validação"
        description="Uma função pura recebe os valores e devolve um mapa de erros por campo."
      >
        <CodeBlock
          code={`type Errors = Partial<Record<"email" | "valor" | "escopo" | "brief", string>>

function validate(data): Errors {
  const errors: Errors = {}
  if (!data.email) errors.email = "Informe um e-mail."
  else if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(data.email))
    errors.email = "E-mail inválido."

  const valor = Number(data.valor)
  if (!data.valor) errors.valor = "Informe um valor."
  else if (valor < 500) errors.valor = "O valor mínimo é R$ 500."

  if (!data.escopo) errors.escopo = "Escolha um escopo."
  return errors
}`}
        />
      </DocSection>

      <DocSection
        title="O envio"
        description="noValidate desliga os balões do navegador para que as mensagens do design system sejam as únicas exibidas."
      >
        <CodeBlock
          code={`async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const form = new FormData(event.currentTarget)
  const data = { email: String(form.get("email") ?? ""), /* … */ }

  const next = validate(data)
  setErrors(next)
  if (Object.keys(next).length > 0) {
    // Foco no primeiro campo com erro — exigência de acessibilidade.
    document.getElementById(Object.keys(next)[0])?.focus()
    return
  }

  setPending(true)
  await enviarProposta(data)
  setPending(false)
  toast.success("Proposta enviada")
}

<form onSubmit={onSubmit} noValidate>…</form>`}
        />
      </DocSection>

      <DocSection
        title="Ligando campo, dica e erro"
        description="O padrão que se repete em todos os campos do formulário acima."
      >
        <CodeBlock
          code={`<Field data-invalid={errors.valor ? true : undefined}>
  <FieldLabel htmlFor="valor">Quanto você pode pagar?</FieldLabel>
  <Input
    id="valor"
    name="valor"
    aria-invalid={errors.valor ? true : undefined}
    aria-describedby={errors.valor ? "valor-error" : "valor-desc"}
  />
  {errors.valor
    ? <FieldError id="valor-error">{errors.valor}</FieldError>
    : <FieldDescription id="valor-desc">Valor mínimo de R$ 500.</FieldDescription>}
</Field>`}
        />
      </DocSection>

      <DocSection
        title="Com Server Actions"
        description="A mesma estrutura funciona sem JavaScript no cliente: troque onSubmit por action."
      >
        <CodeBlock
          code={`"use server"
export async function criarProposta(prevState, formData: FormData) {
  const data = Object.fromEntries(formData)
  const errors = validate(data)
  if (Object.keys(errors).length) return { errors }
  await db.propostas.create(data)
  return { ok: true }
}

// no cliente
const [state, action, pending] = React.useActionState(criarProposta, {})
<form action={action}>…</form>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="<form> nativo — os atributos que importam aqui"
          rows={[
            {
              name: "onSubmit",
              type: "(event: React.FormEvent<HTMLFormElement>) => void",
              description:
                "Handler no cliente. Chame preventDefault antes de validar.",
            },
            {
              name: "action",
              type: "string | ((formData: FormData) => void)",
              description:
                "Server Action. Funciona mesmo com JavaScript desabilitado.",
            },
            {
              name: "noValidate",
              type: "boolean",
              def: "false",
              description:
                "Desliga a validação nativa do navegador para não duplicar mensagens.",
            },
            {
              name: "name (no controle)",
              type: "string",
              description:
                "Obrigatório para que o valor apareça no FormData enviado.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Após um envio inválido, mova o foco para o primeiro campo com erro — sem isso quem usa teclado fica sem saber o que aconteceu.",
            "Valide no envio, não a cada tecla: mensagens que aparecem enquanto se digita são anunciadas repetidamente e atrapalham.",
            "Cada erro precisa de id e do aria-describedby correspondente no controle. Um resumo no topo do formulário complementa, mas não substitui.",
            "Use noValidate para que as mensagens do design system não concorram com os balões nativos do navegador.",
            "Botões de envio devem ficar desabilitados durante a requisição e comunicar o progresso por texto, não só por spinner.",
          ]}
          keyboard={[
            ["Tab", "Percorre os campos na ordem do DOM."],
            ["Enter", "Envia o formulário a partir de um campo de texto."],
            ["Escape", "Fecha popups de Select ou Combobox sem enviar."],
          ]}
          aria={[
            "aria-invalid — no controle com erro",
            "aria-describedby — aponta para a mensagem de erro ou dica",
            'role="alert" — para um resumo de erros que surge após o envio',
            "aria-busy — no formulário durante o envio",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
