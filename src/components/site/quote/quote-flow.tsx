"use client"

import { useMemo, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CtaButton } from "@/components/site/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { submitLead } from "@/lib/site/actions"
import {
  buildQuote,
  companySizes,
  formatBRL,
  parseBRL,
  pricedServices,
  timelines,
  type CompanySize,
  type Timeline,
} from "@/lib/site/pricing"

/**
 * O orçamento instantâneo.
 *
 * Tudo numa tela só, com a proposta recalculada a cada alteração — em vez de um
 * assistente de vários passos que esconde o resultado até o fim. A promessa da
 * marca é ver o preço agora, então o preço fica visível o tempo todo.
 */
export function QuoteFlow() {
  const params = useSearchParams()
  const initialBudget = Number(params.get("budget")) || 0

  const [budget, setBudget] = useState(
    initialBudget > 0 ? formatBRL(initialBudget, false) : ""
  )
  const [services, setServices] = useState<string[]>(["design-de-marca"])
  const [size, setSize] = useState<CompanySize>("pequena")
  const [timeline, setTimeline] = useState<Timeline>("normal")

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const amount = parseBRL(budget)

  const quote = useMemo(
    () => buildQuote({ budget: amount, services, size, timeline }),
    [amount, services, size, timeline]
  )

  function toggleService(slug: string, checked: boolean) {
    setServices((current) =>
      checked ? [...current, slug] : current.filter((s) => s !== slug)
    )
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await submitLead({
        ...lead,
        budget: amount,
        services,
        size,
        timeline,
        estimateLow: quote.low,
        estimateHigh: quote.high,
        weeks: quote.weeks,
      })
      if (result.ok) setStatus("sent")
      else setError(result.error)
    })
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      {/* ─── Perguntas ─── */}
      <div className="lg:col-span-7">
        <fieldset>
          <legend className="site-label text-muted-foreground">
            01 · Quanto você pode investir
          </legend>
          <div className="relative mt-6 max-w-xs">
            <label htmlFor="budget" className="sr-only">
              Valor disponível, em reais
            </label>
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted-foreground"
            >
              R$
            </span>
            <input
              id="budget"
              inputMode="numeric"
              autoComplete="off"
              placeholder="15.000"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              onBlur={() => amount > 0 && setBudget(formatBRL(amount, false))}
              className="h-14 w-full rounded-full border border-input bg-transparent pr-6 pl-12 text-xl tabular-nums outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Deixe em branco para ver o preço cheio do escopo escolhido.
          </p>
        </fieldset>

        <fieldset className="mt-20">
          <legend className="site-label text-muted-foreground">
            02 · O que você precisa
          </legend>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {pricedServices.map((service) => {
              const checked = services.includes(service.slug)
              return (
                <label
                  key={service.slug}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                    checked
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:bg-accent/40"
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(value) =>
                      toggleService(service.slug, value === true)
                    }
                    className="mt-1"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{service.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground tabular-nums">
                      a partir de {formatBRL(service.base * 0.65)}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="mt-20">
          <legend className="site-label text-muted-foreground">
            03 · Porte da empresa
          </legend>
          <RadioGroup
            value={size}
            onValueChange={(value) => setSize(value as CompanySize)}
            className="mt-6 gap-2"
          >
            {companySizes.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors",
                  size === option.value
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

        <fieldset className="mt-20">
          <legend className="site-label text-muted-foreground">04 · Prazo</legend>
          <RadioGroup
            value={timeline}
            onValueChange={(value) => setTimeline(value as Timeline)}
            className="mt-6 gap-2"
          >
            {timelines.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors",
                  timeline === option.value
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
      </div>

      {/* ─── Proposta ao vivo ─── */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="site-label text-muted-foreground">Sua proposta</p>
              <CymaticaMark
                variant="arcs"
                className="size-5 text-muted-foreground"
              />
            </div>

            <p
              aria-live="polite"
              className="site-h2 mt-8 tabular-nums"
            >
              {formatBRL(quote.low)}
              <span className="text-muted-foreground"> – </span>
              {formatBRL(quote.high)}
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              {quote.weeks} semanas de execução · {quote.included.length}{" "}
              {quote.included.length === 1 ? "frente" : "frentes"} de trabalho
            </p>

            {quote.deferred.length > 0 && (
              <div className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-4">
                <p className="text-sm">
                  Com {formatBRL(amount)} cabe o escopo acima. Para incluir{" "}
                  {quote.deferred.map((s) => s.name).join(", ")}, o investimento
                  vai a {formatBRL(quote.fullPrice)}.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-border pt-8">
              <p className="site-label text-muted-foreground">Entregáveis</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {quote.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ─── Lead ─── */}
          {status === "sent" ? (
            <div className="mt-6 rounded-2xl border border-success/40 bg-success/10 p-8">
              <p className="text-lg">Proposta registrada.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Enviamos o detalhamento para {lead.email} e respondemos em até um
                dia útil.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
              <p className="site-label mb-2 text-muted-foreground">
                05 · Para onde enviamos
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-name" className="sr-only">
                    Nome
                  </label>
                  <Input
                    id="lead-name"
                    placeholder="Nome"
                    required
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-company" className="sr-only">
                    Empresa
                  </label>
                  <Input
                    id="lead-company"
                    placeholder="Empresa"
                    value={lead.company}
                    onChange={(e) => setLead({ ...lead, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-email" className="sr-only">
                    Email
                  </label>
                  <Input
                    id="lead-email"
                    type="email"
                    placeholder="Email"
                    required
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="sr-only">
                    Telefone
                  </label>
                  <Input
                    id="lead-phone"
                    type="tel"
                    placeholder="Telefone"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  />
                </div>
              </div>

              <label htmlFor="lead-message" className="sr-only">
                Contexto do projeto
              </label>
              <Textarea
                id="lead-message"
                rows={3}
                placeholder="Conte rapidamente o contexto (opcional)"
                value={lead.message}
                onChange={(e) => setLead({ ...lead, message: e.target.value })}
              />

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <CtaButton type="submit" disabled={pending} className="mt-2 w-full">
                {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
                {pending ? "Enviando" : "Receber proposta detalhada"}
              </CtaButton>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
