import type { Metadata } from "next"

import { Container, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { HoverExpandGallery } from "@/components/site-3/hover-expand-gallery"
import { ExpandStackGallery } from "@/components/site-3/expand-stack-gallery"
import { MoreProjects } from "@/components/site-3/more-projects"
import { ClosingCta } from "@/components/site-3/sections/closing-cta"
import { projects, drawerProjects } from "@/lib/site-3/content"

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Identidades para alimentação, moda e varejo, cada uma construída a partir de uma restrição concreta.",
}

/**
 * Página de projetos.
 *
 * Mesma galeria em acordeão da home, mas empilhada: título, texto e a galeria
 * em largura total abaixo. Na home ela divide espaço com o texto ao lado; aqui
 * repetir aquele arranjo faria as duas páginas parecerem a mesma coisa, e a
 * galeria em largura total dá muito mais respiro a cada capa.
 */
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
              className="site-lead mt-8 max-w-[54ch] text-pretty text-muted-foreground"
            >
              Cada projeto começou por uma restrição concreta: uma marca que
              precisava encolher, uma vitrine vista do outro lado da rua, uma
              embalagem que tinha de ser bordada e impressa. A forma saiu do
              limite, não do gosto.
            </p>
          </div>

          <div data-reveal="" className="mt-20 hidden lg:block">
            <HoverExpandGallery projects={projects} initialSlug="makakitus" />
          </div>

          <div data-reveal="" className="mt-14 lg:hidden">
            <ExpandStackGallery projects={projects} initialSlug="makakitus" />
          </div>

          <MoreProjects projects={drawerProjects} />
        </Container>
      </div>

      <ClosingCta />
    </>
  )
}
