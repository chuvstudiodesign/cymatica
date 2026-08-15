import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Container, SectionLabel, Rule } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { ClosingCta } from "@/components/site-2/sections/closing-cta"
import { projects, BASE } from "@/lib/site-2/content"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(props: PageProps<"/site-2/projetos/[slug]">) {
  const { slug } = await props.params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.client,
    description: project.summary,
    openGraph: { images: [{ url: project.cover }] },
  }
}

export default async function ProjetoPage(props: PageProps<"/site-2/projetos/[slug]">) {
  const { slug } = await props.params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  const facts = [
    { label: "Cliente", value: project.client },
    { label: "Setor", value: project.sector },
    { label: "Ano", value: project.year },
    { label: "Serviços", value: project.services.join(", ") },
  ]

  return (
    <>
      <article className="pt-40 pb-28 md:pt-52 md:pb-40">
        <Container>
          <Link
            href={`${BASE}/projetos`}
            className="group/back inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover/back:-translate-x-0.5"
              aria-hidden
            />
            Todos os projetos
          </Link>

          <div className="mt-16 max-w-4xl">
            <SectionLabel>{project.sector}</SectionLabel>
            <AnimatedHeading as="h1" className="site-display mt-8">
              {project.client}
            </AnimatedHeading>
            <p
              data-reveal=""
              className="site-lead mt-10 max-w-[52ch] text-pretty text-muted-foreground"
            >
              {project.summary}
            </p>
          </div>

          <div
            data-speed="0.95"
            className="relative mt-24 aspect-9/16 max-h-[80vh] overflow-hidden rounded-2xl bg-card sm:aspect-16/10"
          >
            <Image
              src={project.cover}
              alt={`${project.client} — ${project.summary}`}
              fill
              priority
              sizes="(min-width: 1600px) 1560px, 100vw"
              className="object-cover"
            />
          </div>

          <dl className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} data-reveal="">
                <dt className="site-label text-muted-foreground">{fact.label}</dt>
                <dd className="mt-4">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <Rule className="mt-20" />

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>O caso</SectionLabel>
            </div>
            <div className="flex flex-col gap-14 lg:col-span-8">
              {[
                { title: "O desafio", body: project.challenge },
                { title: "A abordagem", body: project.approach },
                { title: "O resultado", body: project.outcome },
              ].map((block) => (
                <div key={block.title} data-reveal="">
                  <h2 className="site-h3">{block.title}</h2>
                  <p className="site-lead mt-6 max-w-[56ch] text-pretty text-muted-foreground">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="mt-28 grid gap-6 sm:grid-cols-2">
              {project.images.slice(1).map((src) => (
                <div key={src} data-reveal="">
                  <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-card">
                    <Image
                      src={src}
                      alt={`${project.client} — peça do projeto`}
                      fill
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <Rule className="mt-28" />

          <Link
            href={`${BASE}/projetos/${next.slug}`}
            className="group/next mt-16 flex items-center justify-between gap-8 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div>
              <p className="site-label text-muted-foreground">Próximo projeto</p>
              <p className="site-h2 mt-4 transition-colors group-hover/next:text-primary">
                {next.client}
              </p>
            </div>
            <ArrowRight
              className="size-8 shrink-0 text-muted-foreground transition-transform group-hover/next:translate-x-1"
              aria-hidden
            />
          </Link>
        </Container>
      </article>

      <ClosingCta />
    </>
  )
}
