"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { BASE, type Project } from "@/lib/site-3/content"

/**
 * A mesma galeria em acordeão do desktop, empilhada na vertical.
 *
 * No toque não existe hover, então a interação vira em dois tempos: tocar numa
 * faixa fechada expande; tocar de novo na aberta navega. Sem isso, o primeiro
 * toque abriria e navegaria ao mesmo tempo, e o usuário nunca conseguiria
 * apenas olhar.
 *
 * Por isso cada faixa é um `<button>`, e não um link: o primeiro toque não é
 * navegação. A faixa aberta ganha um link de verdade dentro dela, o que mantém
 * o comportamento esperado de "abrir em nova aba" e a leitura por leitor de
 * tela. O estado aberto/fechado vai em `aria-expanded`.
 */
const ABERTA = "22rem"
const FECHADA = "5.5rem"

export function ExpandStackGallery({
  projects,
  initialSlug,
  className,
}: {
  projects: Project[]
  initialSlug?: string
  className?: string
}) {
  const router = useRouter()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(
    Math.max(0, projects.findIndex((p) => p.slug === initialSlug))
  )

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {projects.map((project, index) => {
        const aberta = active === index
        const href = `${BASE}/projetos/${project.slug}`

        return (
          <motion.button
            key={project.slug}
            type="button"
            aria-expanded={aberta}
            aria-label={
              aberta
                ? `Abrir o projeto ${project.client}`
                : `Ver ${project.client}: ${project.summary}`
            }
            onClick={() => (aberta ? router.push(href) : setActive(index))}
            className="relative w-full overflow-hidden rounded-2xl bg-card text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            initial={false}
            animate={{ height: aberta ? ABERTA : FECHADA }}
            transition={transition}
          >
            <Image
              src={project.cover.src}
              alt=""
              fill
              quality={95}
              sizes="100vw"
              priority={index < 2}
              className="object-cover"
            />

            {/* Fechada: só o nome, para a pilha continuar legível de relance. */}
            <AnimatePresence>
              {!aberta && (
                <motion.span
                  key="fechada"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="absolute inset-0 flex items-center bg-linear-to-r from-ink-900/85 via-ink-900/40 to-transparent px-6"
                >
                  <span className="site-h3 text-ink-50">{project.client}</span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Aberta: a ficha completa, e o convite explícito para entrar. */}
            <AnimatePresence>
              {aberta && (
                <motion.span
                  key="aberta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                  className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink-900/90 via-ink-900/25 to-transparent p-6"
                >
                  <span className="site-label text-ink-300">{project.sector}</span>
                  <span className="site-h3 mt-2 block text-ink-50">
                    {project.client}
                  </span>
                  <span className="mt-2 block max-w-[34ch] text-pretty text-sm text-ink-300">
                    {project.summary}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-50">
                    Ver projeto
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
