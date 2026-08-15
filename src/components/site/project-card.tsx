import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { Project } from "@/lib/site/content"

type ProjectCardProps = {
  project: Project
  /** Posição na grade — define o tamanho servido pelo next/image. */
  sizes?: string
  priority?: boolean
  className?: string
}

export function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/site/projetos/${project.slug}`}
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
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
        />
        {/* Véu que só existe no hover, para o texto sobreposto ter contraste. */}
        <div className="absolute inset-0 bg-linear-to-t from-ink-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="site-h3">{project.client}</h3>
        <span className="site-label shrink-0 text-muted-foreground">
          {project.year}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{project.sector}</p>
      <p className="mt-3 max-w-[42ch] text-pretty">{project.summary}</p>
    </Link>
  )
}
