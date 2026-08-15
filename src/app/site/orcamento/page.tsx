import { Suspense } from "react"
import type { Metadata } from "next"

import { Container, SectionLabel } from "@/components/site/primitives"
import { QuoteFlow } from "@/components/site/quote/quote-flow"

export const metadata: Metadata = {
  title: "Orçamento",
  description:
    "Diga quanto você pode investir e receba na hora escopo, entregáveis, prazo e faixa de investimento.",
}

export default function OrcamentoPage() {
  return (
    <div className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>Orçamento</SectionLabel>
          <h1 className="site-h2 mt-8 text-balance">
            Comece pelo preço, como deveria ter sido sempre.
          </h1>
          <p className="site-lead mt-8 max-w-[52ch] text-pretty text-muted-foreground">
            Responda quatro perguntas. A proposta se atualiza a cada resposta —
            você não precisa chegar ao fim para ver o número.
          </p>
        </div>

        <div className="mt-24">
          {/* useSearchParams exige limite de Suspense para não forçar a rota
              inteira a renderizar sob demanda. */}
          <Suspense fallback={<QuoteFallback />}>
            <QuoteFlow />
          </Suspense>
        </div>
      </Container>
    </div>
  )
}

function QuoteFallback() {
  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-7">
        <div className="h-14 w-64 animate-pulse rounded-full bg-muted" />
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="lg:col-span-5">
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    </div>
  )
}
