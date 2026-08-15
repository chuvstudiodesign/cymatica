import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Container, SectionLabel, Reveal } from "@/components/site/primitives"
import { Method } from "@/components/site/sections/method"
import { ClosingCta } from "@/components/site/sections/closing-cta"
import { services } from "@/lib/site/content"

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Design de marca, experiência digital, interface de apps, motion, identidade verbal e sonora, type design e desenvolvimento de software.",
}

export default function ServicosPage() {
  return (
    <>
      <div className="pt-40 pb-28 md:pt-52 md:pb-40">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>Serviços</SectionLabel>
            <h1 className="site-h2 mt-8 text-balance">
              Marca, produto e o código que sustenta os dois.
            </h1>
            <p className="site-lead mt-8 max-w-[52ch] text-pretty text-muted-foreground">
              Oito frentes que funcionam isoladas e funcionam melhor juntas. Você
              escolhe quais entram no escopo — e vê o preço de cada uma antes de
              decidir.
            </p>
          </div>

          <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-border p-8 md:p-10">
                  <span className="site-label text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h2 className="site-h3 mt-8">{service.name}</h2>
                  <p className="mt-4 text-pretty">{service.benefit}</p>
                  <p className="mt-5 text-pretty text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/site/servicos/${service.slug}`}
                    className="group/link mt-10 inline-flex items-center gap-2 text-sm transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    Ver detalhes
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      <Method />
      <ClosingCta />
    </>
  )
}
