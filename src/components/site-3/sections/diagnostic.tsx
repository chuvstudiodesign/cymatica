import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { LightSection, SectionLabel, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import ShinyText from "@/components/reactbits/shiny-text"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { diagnostic } from "@/lib/site-3/content"

/**
 * O diagnóstico gratuito, que passou a ser a porta de entrada do estúdio.
 *
 * Ilha clara, com as quatro etapas numeradas ligadas por uma linha contínua.
 * A linha é a mesma ideia dos arcos do símbolo: um percurso que se propaga de
 * um ponto ao seguinte, em vez de quatro cartões soltos.
 *
 * O aviso sobre vagas limitadas fica no fim e explica a razão operacional
 * (cada diagnóstico é feito à mão). É informação, não triagem de status.
 */
export function Diagnostic() {
  return (
    <LightSection>
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{diagnostic.label}</SectionLabel>

          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {diagnostic.title}
          </AnimatedHeading>

          <p
            data-reveal=""
            className="site-lead mt-10 max-w-[44ch] text-pretty text-muted-foreground"
          >
            {diagnostic.body}
          </p>

          <div data-reveal="" className="mt-12">
            <CtaButton render={<Link href={diagnostic.cta.href} />}>
              {diagnostic.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </CtaButton>
          </div>

          <p data-reveal="" className="mt-8 max-w-[42ch] text-sm text-muted-foreground">
            {diagnostic.note}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="relative flex flex-col gap-12">
            {/* Trilho contínuo ligando as etapas. */}
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-border"
            />

            {diagnostic.steps.map((step) => (
              <li key={step.number} data-reveal="" className="relative flex gap-6">
                <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background">
                  <CymaticaMark variant="nodes" className="size-3.5 text-primary" />
                </span>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="site-label text-muted-foreground">{step.number}</p>
                  <h3 className="site-h3 mt-3">{step.name}</h3>
                  <p className="mt-3 max-w-[46ch] text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p data-reveal="" className="mt-14 pl-14">
            <ShinyText
              text="Sem custo e sem compromisso de seguir."
              className="text-lg"
            />
          </p>
        </div>
      </div>
    </LightSection>
  )
}
