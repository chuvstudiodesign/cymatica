import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { CaseSlot } from "@/components/site-3/proposta/case-slot"
import { social, whatsappLink } from "@/lib/site-3/proposta"

/**
 * Cuidado de mídia social.
 *
 * Vem depois dos três pacotes de propósito: é oferta separada, não um quarto
 * nível. Por isso volta ao canvas escuro, sai da grade de preços e não mostra
 * valor nenhum. O que ele pede é uma conversa, não uma decisão.
 *
 * O CTA é o único ponto de laranja da dobra.
 */
export function PropostaSocial() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {/* Única etiqueta da página em laranja: é o pacote que não está
              na tabela e precisa ser notado no meio do documento. */}
          <SectionLabel className="text-primary">{social.label}</SectionLabel>

          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {social.title}
          </AnimatedHeading>

          <p
            data-reveal=""
            className="site-lead mt-10 max-w-[42ch] text-pretty text-muted-foreground"
          >
            {social.body}
          </p>

          <dl className="mt-16 border-t border-border">
            {social.items.map((item) => (
              <div key={item.title} data-reveal="" className="border-b border-border py-6">
                <dt className="font-medium">{item.title}</dt>
                <dd className="mt-2 max-w-[40ch] text-pretty text-sm text-muted-foreground">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal="" className="mt-12">
            <CtaButton
              render={
                <a
                  href={whatsappLink(social.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {social.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </CtaButton>
            <p className="mt-5 max-w-[44ch] text-sm text-muted-foreground">
              {social.ctaNote}
            </p>
          </div>
        </div>

        <div data-reveal="" className="lg:col-span-6 lg:col-start-7">
          <div className="lg:sticky lg:top-32">
            <CaseSlot />
          </div>
        </div>
      </div>
    </Section>
  )
}
