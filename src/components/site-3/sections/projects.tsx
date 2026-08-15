import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { HoverExpandGallery } from "@/components/site-3/hover-expand-gallery"
import { ProjectCard } from "@/components/site-3/project-card"
import { projects, BASE } from "@/lib/site-3/content"

/**
 * Os sete projetos da home.
 *
 * No desktop o texto fica à esquerda, alinhado, e a galeria em acordeão ocupa
 * a direita. As faixas se dimensionam por proporção, então a galeria preenche
 * o que sobrar da coluna em qualquer largura.
 *
 * Abaixo de `lg` o acordeão não cabe, e entra a grade de cartões: a mesma
 * informação num arranjo que funciona no toque.
 */
export function Projects() {
  return (
    <Section className="border-t border-border">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel>Trabalho recente</SectionLabel>

          <AnimatedHeading className="site-h2 mt-8 text-left text-balance">
            Cada projeto começou por uma restrição.
          </AnimatedHeading>

          <p
            data-reveal=""
            className="mt-8 max-w-[38ch] text-pretty text-muted-foreground"
          >
            Um relevo de doze milímetros, uma vitrine vista do outro lado da
            rua, uma marca que precisava ser bordada e impressa. A forma saiu do
            limite, não do gosto.
          </p>

          <Link
            href={`${BASE}/projetos`}
            className="group/all mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Ver todos os projetos
            <ArrowUpRight
              className="size-4 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <div data-reveal="" className="hidden lg:col-span-8 lg:block">
          <HoverExpandGallery projects={projects} initialSlug="makakitus" />
        </div>
      </div>

      <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:hidden">
        {projects.map((project, i) => (
          <div key={project.slug} data-reveal="">
            <ProjectCard project={project} priority={i === 0} />
          </div>
        ))}
      </div>
    </Section>
  )
}
