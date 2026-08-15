import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel, Reveal } from "@/components/site/primitives"
import { ProjectCard } from "@/components/site/project-card"
import { projects } from "@/lib/site/content"

/** Seleção de trabalhos recentes. A página completa vive em /site/projetos. */
export function Projects() {
  const featured = projects.slice(0, 6)

  return (
    <Section className="border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <SectionLabel>Trabalho recente</SectionLabel>
          <Reveal>
            <h2 className="site-h2 mt-8 text-balance">
              Marcas que precisavam existir em superfícies difíceis.
            </h2>
          </Reveal>
        </div>

        <Link
          href="/site/projetos"
          className="group/all flex items-center gap-2 pb-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Ver todos os projetos
          <ArrowUpRight
            className="size-4 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 3) * 0.08}
            // Escalonamento diagonal: a coluna do meio desce um pouco, o que
            // quebra a leitura em faixas e dá ritmo à grade.
            className={i % 3 === 1 ? "lg:mt-20" : undefined}
          >
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
