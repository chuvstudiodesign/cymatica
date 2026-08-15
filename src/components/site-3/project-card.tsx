import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BASE, type Project } from "@/lib/site-3/content"

type ProjectCardProps = {
  project: Project
  sizes?: string
  priority?: boolean
  /**
   * Retrato para os principais, que vão numa grade de três; paisagem para a
   * gaveta, numa grade de dois. A capa é gerada já no formato certo, então
   * aqui o recorte é mínimo.
   */
  orientation?: "portrait" | "landscape"
  /** Deslocamento em parallax, lido pelo ScrollSmoother via `data-speed`. */
  speed?: number
  className?: string
}

/**
 * Cartão de projeto, no retrato 9:16 do site.
 *
 * As capas vêm de lâminas largas (2,05:1 e 2,36:1), então o retrato recorta
 * bastante das laterais. Funciona porque as capas escolhidas têm a peça
 * centralizada sobre fundo chapado — é exatamente a faixa central que o
 * recorte preserva.
 *
 * A proporção real de cada página é mantida onde importa: na página do
 * projeto, onde as lâminas aparecem inteiras e em largura total.
 */
export function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
  orientation = "portrait",
  speed,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`${BASE}/projetos/${project.slug}`}
      data-speed={speed}
      className={cn(
        "group/card block outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-card",
          orientation === "landscape" ? "aspect-16/9" : "aspect-9/16"
        )}
      >
        <Image
          src={project.cover.src}
          alt={`${project.client}: ${project.summary}`}
          fill
          sizes={sizes}
          priority={priority}
          quality={95}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

        <span className="site-label absolute bottom-5 left-5 translate-y-2 text-ink-50 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          {project.pages.length} páginas
        </span>
      </div>

      <h3 className="site-h3 mt-6 transition-colors group-hover/card:text-primary">
        {project.client}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.sector}</p>
      <p className="mt-3 max-w-[46ch] text-pretty">{project.summary}</p>
    </Link>
  )
}
