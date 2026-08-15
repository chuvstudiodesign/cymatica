"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CtaButton } from "@/components/site-3/primitives"
import { whatsappLink } from "@/lib/site-3/content"

/**
 * Candidatura ao diagnóstico.
 *
 * As respostas viram uma mensagem formatada e abrem a conversa no WhatsApp do
 * estúdio. Sem servidor, sem banco e sem serviço de e-mail: enquanto o volume
 * for baixo, esse é o caminho mais curto entre o interessado e uma resposta
 * humana. Quando fizer sentido, o mesmo objeto de respostas passa a alimentar
 * um envio por e-mail ou CRM sem mexer no formulário.
 */

const FATURAMENTO = [
  { value: "ate-20k", label: "Até R$ 20 mil por mês" },
  { value: "20-100k", label: "De R$ 20 mil a R$ 100 mil" },
  { value: "100-500k", label: "De R$ 100 mil a R$ 500 mil" },
  { value: "500k+", label: "Acima de R$ 500 mil" },
  { value: "prefiro-nao", label: "Prefiro não informar" },
]

const EQUIPE = [
  { value: "1", label: "Só eu" },
  { value: "2-10", label: "De 2 a 10 pessoas" },
  { value: "11-50", label: "De 11 a 50 pessoas" },
  { value: "50+", label: "Mais de 50 pessoas" },
]

const MOMENTO = [
  { value: "vou-lancar", label: "Ainda vou lançar" },
  { value: "ate-2-anos", label: "No mercado há menos de 2 anos" },
  { value: "2-10-anos", label: "Entre 2 e 10 anos" },
  { value: "mais-10", label: "Mais de 10 anos" },
]

const JA_EXISTE = [
  "Logotipo",
  "Manual de marca",
  "Site",
  "Aplicativo",
  "Embalagem",
  "Redes sociais ativas",
  "Nada ainda",
]

type Values = {
  nome: string
  empresa: string
  email: string
  telefone: string
  site: string
  segmento: string
  faturamento: string
  equipe: string
  momento: string
  jaExiste: string[]
  desafio: string
  material: string
}

const inicial: Values = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  site: "",
  segmento: "",
  faturamento: "",
  equipe: "",
  momento: "",
  jaExiste: [],
  desafio: "",
  material: "",
}

function rotulo(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? "não informado"
}

function montarMensagem(v: Values) {
  return [
    "*Solicitação de diagnóstico — Cymatica*",
    "",
    `*Nome:* ${v.nome}`,
    `*Empresa:* ${v.empresa || "não informado"}`,
    `*Email:* ${v.email}`,
    v.telefone && `*Telefone:* ${v.telefone}`,
    v.site && `*Site ou Instagram:* ${v.site}`,
    v.segmento && `*Segmento:* ${v.segmento}`,
    "",
    `*Faturamento:* ${rotulo(FATURAMENTO, v.faturamento)}`,
    `*Equipe:* ${rotulo(EQUIPE, v.equipe)}`,
    `*Tempo de mercado:* ${rotulo(MOMENTO, v.momento)}`,
    `*Já existe:* ${v.jaExiste.length ? v.jaExiste.join(", ") : "nada informado"}`,
    "",
    "*Principal desafio hoje:*",
    v.desafio || "não informado",
    v.material && `\n*Material para consulta:* ${v.material}`,
  ]
    .filter(Boolean)
    .join("\n")
}

export function DiagnosticForm() {
  const [v, setV] = useState<Values>(inicial)

  const set = <K extends keyof Values>(key: K) => (value: Values[K]) =>
    setV((current) => ({ ...current, [key]: value }))

  const completo =
    v.nome.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) &&
    v.faturamento !== "" &&
    v.desafio.trim().length > 10

  function enviar(event: React.FormEvent) {
    event.preventDefault()
    if (!completo) return
    window.open(whatsappLink(montarMensagem(v)), "_blank", "noopener")
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-20">
      <Bloco numero="01" titulo="Quem é você">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo id="nome" label="Nome" obrigatorio>
            <Input
              id="nome"
              required
              value={v.nome}
              onChange={(e) => set("nome")(e.target.value)}
            />
          </Campo>
          <Campo id="empresa" label="Empresa">
            <Input
              id="empresa"
              value={v.empresa}
              onChange={(e) => set("empresa")(e.target.value)}
            />
          </Campo>
          <Campo id="email" label="Email" obrigatorio>
            <Input
              id="email"
              type="email"
              required
              value={v.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </Campo>
          <Campo id="telefone" label="Telefone ou WhatsApp">
            <Input
              id="telefone"
              type="tel"
              value={v.telefone}
              onChange={(e) => set("telefone")(e.target.value)}
            />
          </Campo>
          <Campo id="site" label="Site ou Instagram">
            <Input
              id="site"
              value={v.site}
              onChange={(e) => set("site")(e.target.value)}
            />
          </Campo>
          <Campo id="segmento" label="Segmento">
            <Input
              id="segmento"
              placeholder="Alimentação, moda, serviços…"
              value={v.segmento}
              onChange={(e) => set("segmento")(e.target.value)}
            />
          </Campo>
        </div>
      </Bloco>

      <Bloco
        numero="02"
        titulo="Onde a empresa está"
        ajuda="Serve para calibrarmos o diagnóstico ao seu momento. Nenhuma resposta desqualifica ninguém."
      >
        <Escolha
          legenda="Faturamento mensal aproximado"
          options={FATURAMENTO}
          value={v.faturamento}
          onChange={set("faturamento")}
        />
        <Escolha
          legenda="Tamanho da equipe"
          options={EQUIPE}
          value={v.equipe}
          onChange={set("equipe")}
          className="mt-10"
        />
        <Escolha
          legenda="Tempo de mercado"
          options={MOMENTO}
          value={v.momento}
          onChange={set("momento")}
          className="mt-10"
        />
      </Bloco>

      <Bloco numero="03" titulo="O que já existe">
        <fieldset>
          <legend className="text-sm text-muted-foreground">
            Marque tudo que a marca já tem hoje
          </legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {JA_EXISTE.map((item) => {
              const checked = v.jaExiste.includes(item)
              return (
                <label
                  key={item}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-colors",
                    checked
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:bg-accent/40"
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) =>
                      set("jaExiste")(
                        value === true
                          ? [...v.jaExiste, item]
                          : v.jaExiste.filter((i) => i !== item)
                      )
                    }
                  />
                  {item}
                </label>
              )
            })}
          </div>
        </fieldset>

        <Campo
          id="material"
          label="Link para material que possamos ver"
          ajuda="Drive, Dropbox, WeTransfer ou o próprio site. Opcional."
          className="mt-10"
        >
          <Input
            id="material"
            value={v.material}
            onChange={(e) => set("material")(e.target.value)}
          />
        </Campo>
      </Bloco>

      <Bloco numero="04" titulo="O que está travando">
        <Campo
          id="desafio"
          label="Qual o principal desafio da marca hoje"
          ajuda="Escreva do seu jeito. Quanto mais concreto, mais útil o diagnóstico."
          obrigatorio
        >
          <Textarea
            id="desafio"
            rows={6}
            required
            value={v.desafio}
            onChange={(e) => set("desafio")(e.target.value)}
          />
        </Campo>
      </Bloco>

      <div className="border-t border-border pt-10">
        <CtaButton type="submit" disabled={!completo}>
          Enviar pelo WhatsApp
          <ArrowRight className="size-4" aria-hidden />
        </CtaButton>
        <p className="mt-5 max-w-[52ch] text-sm text-muted-foreground">
          As respostas abrem uma conversa já preenchida no nosso WhatsApp. Você
          confere antes de enviar, e nada sai sem a sua confirmação.
        </p>
      </div>
    </form>
  )
}

/* ───────────────────────────── auxiliares ───────────────────────────── */

function Bloco({
  numero,
  titulo,
  ajuda,
  children,
}: {
  numero: string
  titulo: string
  ajuda?: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="site-label text-muted-foreground">{numero}</p>
        <h2 className="site-h3 mt-4">{titulo}</h2>
        {ajuda && (
          <p className="mt-4 max-w-[34ch] text-sm text-muted-foreground">{ajuda}</p>
        )}
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  )
}

function Campo({
  id,
  label,
  ajuda,
  obrigatorio,
  className,
  children,
}: {
  id: string
  label: string
  ajuda?: string
  obrigatorio?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
        {obrigatorio && <span className="text-primary"> *</span>}
      </label>
      {children}
      {ajuda && <p className="text-xs text-muted-foreground">{ajuda}</p>}
    </div>
  )
}

function Escolha({
  legenda,
  options,
  value,
  onChange,
  className,
}: {
  legenda: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <fieldset className={className}>
      <legend className="text-sm text-muted-foreground">{legenda}</legend>
      <RadioGroup value={value} onValueChange={onChange} className="mt-5 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors",
              value === option.value
                ? "border-primary/50 bg-primary/5"
                : "border-border hover:bg-accent/40"
            )}
          >
            <RadioGroupItem value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
