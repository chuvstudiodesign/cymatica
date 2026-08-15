import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { ProjectCard } from "@/components/site-2/project-card"
import { projects, BASE } from "@/lib/site-2/content"

/**
 * Seleção de trabalhos recentes — mantida escura por pedido do estúdio: as
 * peças do portfólio pedem fundo neutro e o preto não disputa com elas.
 *
 * O parallax por coluna (`data-speed`) faz as três colunas subirem em
 * velocidades levemente diferentes, o que dissolve a leitura em faixas.
 */
const PARALLAX = [0.94, 1.06, 0.98]

export function Projects() {
  const featured = projects.slice(0, 6)

  return (
    <Section className="border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <SectionLabel>Trabalho recente</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            Marcas que precisavam existir em superfícies difíceis.
          </AnimatedHeading>
        </div>

        <Link
          href={`${BASE}/projetos`}
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
          <div key={project.slug} data-reveal="">
            <ProjectCard
              project={project}
              priority={i === 0}
              speed={PARALLAX[i % 3]}
              className={i % 3 === 1 ? "lg:mt-20" : undefined}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
