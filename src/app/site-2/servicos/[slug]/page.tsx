import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"

import { Container, SectionLabel, Rule } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { ProjectCard } from "@/components/site-2/project-card"
import { ClosingCta } from "@/components/site-2/sections/closing-cta"
import { services, projects, BASE } from "@/lib/site-2/content"
import { formatBRL, pricedServices } from "@/lib/site/pricing"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata(props: PageProps<"/site-2/servicos/[slug]">) {
  const { slug } = await props.params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: service.name, description: service.benefit }
}

export default async function ServicoPage(props: PageProps<"/site-2/servicos/[slug]">) {
  const { slug } = await props.params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const pricing = pricedServices.find((s) => s.slug === slug)
  const related = projects.filter((p) => p.services.includes(service.name)).slice(0, 3)

  return (
    <>
      <div className="pt-40 pb-28 md:pt-52 md:pb-40">
        <Container>
          <Link
            href={`${BASE}/servicos`}
            className="group/back inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover/back:-translate-x-0.5"
              aria-hidden
            />
            Todos os serviços
          </Link>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel>Serviço</SectionLabel>
              <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
                {service.name}
              </AnimatedHeading>
              <p data-reveal="" className="site-lead mt-10 max-w-[52ch] text-pretty">
                {service.benefit}
              </p>
              <p
                data-reveal=""
                className="site-lead mt-8 max-w-[56ch] text-pretty text-muted-foreground"
              >
                {service.description}
              </p>
            </div>

            {pricing && (
              <div data-reveal="" className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <p className="site-label text-muted-foreground">Investimento</p>
                  <p className="site-h3 mt-6 tabular-nums">
                    a partir de {formatBRL(pricing.base * 0.65)}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {pricing.weeks} semanas · valor varia com o porte da empresa
                    e o prazo
                  </p>
                  <Link
                    href={`${BASE}/orcamento?servico=${service.slug}`}
                    className="mt-8 inline-flex text-sm text-primary underline-offset-4 transition-colors outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    Calcular meu orçamento
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Rule className="mt-24" />

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>O que você recebe</SectionLabel>
            </div>
            <ul className="flex flex-col gap-5 lg:col-span-8">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  data-reveal=""
                  className="flex items-start gap-4 border-b border-border pb-5"
                >
                  <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
                  <span className="site-h3">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <div className="mt-32">
              <SectionLabel>Onde aplicamos</SectionLabel>
              <div className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((project) => (
                  <div key={project.slug} data-reveal="">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>

      <ClosingCta />
    </>
  )
}
