import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Container, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { BudgetRequestForm } from "@/components/site-3/budget-request-form"
import { BASE } from "@/lib/site-3/content"

export const metadata: Metadata = {
  alternates: { canonical: "/orcamento" },
  title: "Orçamento",
  description:
    "Diga quanto você pode investir e o que precisa. Voltamos com escopo, entregáveis e prazo.",
}

export default function OrcamentoPage() {
  return (
    <div className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Orçamento</SectionLabel>
            <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
              Comece pelo número que você tem.
            </AnimatedHeading>
            <p
              data-reveal=""
              className="site-lead mt-10 max-w-[44ch] text-pretty text-muted-foreground"
            >
              Diga quanto pode investir e o que precisa. Montamos a proposta com
              escopo, entregáveis e prazo, e voltamos com ela pronta.
            </p>

            <p data-reveal="" className="mt-10 max-w-[44ch] text-muted-foreground">
              Se ainda não tem um número em mente, comece pelo diagnóstico. Ele é
              sem custo e serve justamente para chegar nele.
            </p>

            <Link
              href={`${BASE}/diagnostico`}
              className="group/diag mt-6 inline-flex items-center gap-2 text-primary underline-offset-4 transition-colors outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Solicitar diagnóstico
              <ArrowUpRight
                className="size-4 transition-transform group-hover/diag:translate-x-0.5 group-hover/diag:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <BudgetRequestForm />
          </div>
        </div>
      </Container>
    </div>
  )
}
