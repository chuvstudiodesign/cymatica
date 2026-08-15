import type { Metadata } from "next"

import { Container, SectionLabel } from "@/components/site-2/primitives"
import { AnimatedHeading } from "@/components/site-2/animated-heading"
import { ProjectCard } from "@/components/site-2/project-card"
import { ClosingCta } from "@/components/site-2/sections/closing-cta"
import { projects } from "@/lib/site-2/content"

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Identidades, produtos digitais e embalagens para marcas que precisavam existir em superfícies difíceis.",
}

const PARALLAX = [0.94, 1.06, 0.98]

export default function ProjetosPage() {
  return (
    <>
      <div className="pt-40 pb-28 md:pt-52 md:pb-40">
        <Container>
          <div className="max-w-3xl">
            <SectionLabel>Projetos</SectionLabel>
            <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
              Trabalho que sobrevive fora da tela.
            </AnimatedHeading>
            <p
              data-reveal=""
              className="site-lead mt-8 max-w-[52ch] text-pretty text-muted-foreground"
            >
              Cada projeto começou por uma restrição concreta — um relevo, uma
              prateleira, um aplicativo numa cidade tombada — e foi desenhado a
              partir dela.
            </p>
          </div>

          <div className="mt-24 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <div key={project.slug} data-reveal="">
                <ProjectCard
                  project={project}
                  priority={i < 3}
                  speed={PARALLAX[i % 3]}
                  className={i % 3 === 1 ? "lg:mt-20" : undefined}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>

      <ClosingCta />
    </>
  )
}
