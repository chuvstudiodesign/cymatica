"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CtaButton } from "@/components/site/primitives"
import { submitLead } from "@/lib/site/actions"
import { contact } from "@/lib/site/content"

/** Contato direto, para quem ainda não tem um número em mente. */
export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function update(field: keyof typeof values) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await submitLead({
        ...values,
        budget: 0,
        services: [],
        size: "",
        timeline: "",
        estimateLow: 0,
        estimateHigh: 0,
        weeks: 0,
      })
      if (result.ok) setStatus("sent")
      else setError(result.error)
    })
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-success/40 bg-success/10 p-10">
        <p className="site-h3">{contact.form.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-nome" className="text-sm text-muted-foreground">
            Nome
          </label>
          <Input
            id="contato-nome"
            required
            value={values.name}
            onChange={update("name")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-empresa" className="text-sm text-muted-foreground">
            Empresa
          </label>
          <Input
            id="contato-empresa"
            value={values.company}
            onChange={update("company")}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-email" className="text-sm text-muted-foreground">
            Email
          </label>
          <Input
            id="contato-email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-telefone" className="text-sm text-muted-foreground">
            Telefone
          </label>
          <Input
            id="contato-telefone"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-mensagem" className="text-sm text-muted-foreground">
          Sobre o projeto
        </label>
        <Textarea
          id="contato-mensagem"
          rows={5}
          value={values.message}
          onChange={update("message")}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <CtaButton type="submit" disabled={pending} className="mt-4 self-start">
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {pending ? "Enviando" : contact.form.submit}
      </CtaButton>
    </form>
  )
}
