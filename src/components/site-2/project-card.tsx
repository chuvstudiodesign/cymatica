import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BASE, type Project } from "@/lib/site-2/content"

type ProjectCardProps = {
  project: Project
  sizes?: string
  priority?: boolean
  /**
   * Deslocamento em parallax, lido pelo ScrollSmoother via `data-speed`.
   * Valores próximos de 1 movem junto com a página; abaixo, ficam para trás.
   */
  speed?: number
  className?: string
}

export function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
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
      <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-card">
        <Image
          src={project.cover}
          alt={`${project.client} — ${project.summary}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

        {/* Ano sobreposto, revelado no hover — informação em vez de só cor. */}
        <span className="site-label absolute bottom-5 left-5 translate-y-2 text-ink-50 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          {project.year}
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="site-h3 transition-colors group-hover/card:text-primary">
          {project.client}
        </h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{project.sector}</p>
      <p className="mt-3 max-w-[42ch] text-pretty">{project.summary}</p>
    </Link>
  )
}
