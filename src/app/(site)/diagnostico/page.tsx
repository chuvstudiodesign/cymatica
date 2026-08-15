import type { Metadata } from "next"

import { Container, SectionLabel, Rule } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { DiagnosticForm } from "@/components/site-3/diagnostic-form"
import { diagnostic } from "@/lib/site-3/content"

export const metadata: Metadata = {
  title: "Diagnóstico",
  description:
    "Um diagnóstico da sua marca sem custo: onde ela está hoje, o que já funciona e o que o design resolve primeiro.",
}

export default function DiagnosticoPage() {
  return (
    <div className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>{diagnostic.label}</SectionLabel>
          <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
            {diagnostic.title}
          </AnimatedHeading>
          <p
            data-reveal=""
            className="site-lead mt-10 max-w-[52ch] text-pretty text-muted-foreground"
          >
            {diagnostic.body}
          </p>
        </div>

        {/* As etapas repetidas aqui, para quem chegou direto por link. */}
        <ol className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {diagnostic.steps.map((step) => (
            <li key={step.number} data-reveal="">
              <p className="site-label text-primary">{step.number}</p>
              <h2 className="mt-4 text-lg font-medium">{step.name}</h2>
              <p className="mt-3 text-pretty text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <Rule className="mt-20" />

        <div className="mt-24">
          <DiagnosticForm />
        </div>

        <p className="mt-16 max-w-[56ch] text-sm text-muted-foreground">
          {diagnostic.note}
        </p>
      </Container>
    </div>
  )
}
