import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel, Reveal } from "@/components/site/primitives"
import { services } from "@/lib/site/content"

/**
 * Serviços como índice tipográfico, não como grade de cartões.
 *
 * Cada linha é um link para a página do serviço. O benefício aparece no hover
 * em telas grandes e fica sempre visível no mobile, onde hover não existe.
 */
export function Services() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>Serviços</SectionLabel>
          <Reveal>
            <h2 className="site-h2 mt-8 text-balance">
              Marca, produto e o código que sustenta os dois.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-8 lg:pt-4">
          <ul className="border-t border-border">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={Math.min(i * 0.04, 0.24)}>
                  <Link
                    href={`/site/servicos/${service.slug}`}
                    className="group/service block border-b border-border py-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="site-label w-8 shrink-0 text-muted-foreground transition-colors group-hover/service:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="site-h3 flex items-center gap-3">
                          {service.name}
                          <ArrowUpRight
                            className="size-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/service:opacity-100 group-focus-visible/service:opacity-100"
                            aria-hidden
                          />
                        </h3>
                        <p className="mt-3 max-w-[52ch] text-pretty text-muted-foreground md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover/service:mt-3 md:group-hover/service:max-h-24 md:group-hover/service:opacity-100 md:group-focus-visible/service:mt-3 md:group-focus-visible/service:max-h-24 md:group-focus-visible/service:opacity-100">
                          {service.benefit}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
