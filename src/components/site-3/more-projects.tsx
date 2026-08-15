"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { CtaButton } from "@/components/site-3/primitives"
import { ProjectCard } from "@/components/site-3/project-card"
import type { Project } from "@/lib/site-3/content"

/**
 * A segunda leva de projetos, revelada por botão.
 *
 * A página abre com a seleção principal; quem quiser ver mais pede. Isso
 * mantém a primeira tela editorial em vez de despejar o portfólio inteiro de
 * uma vez, e adia o carregamento das capas extras até que sejam pedidas.
 *
 * Sem projetos na gaveta, nada é renderizado: um botão que não leva a lugar
 * nenhum é pior que a ausência dele.
 */
export function MoreProjects({ projects }: { projects: Project[] }) {
  const [aberto, setAberto] = useState(false)

  if (projects.length === 0) return null

  if (!aberto) {
    return (
      <div className="mt-24 flex justify-center">
        <CtaButton variant="outline" onClick={() => setAberto(true)}>
          <Plus className="size-4" aria-hidden />
          Ver mais projetos
        </CtaButton>
      </div>
    )
  }

  return (
    <div className="mt-24">
      <p className="site-label text-muted-foreground">Também fizemos</p>

      {/* Grade de dois, com as capas em paisagem. As lâminas de apresentação
          já nascem largas, então o horizontal aproveita a composição inteira
          em vez de recortar uma faixa central. */}
      <div className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            orientation="landscape"
            sizes="(min-width: 768px) 46vw, 92vw"
            priority={i < 2}
          />
        ))}
      </div>
    </div>
  )
}
