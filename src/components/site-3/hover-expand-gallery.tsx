"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { BASE, type Project } from "@/lib/site-3/content"

/**
 * Galeria em acordeão horizontal: as capas ficam como faixas estreitas e a
 * apontada se abre.
 *
 * Adaptada do Skiper UI (skiper-ui.com/v1/skiper52, HoverExpand_001). A versão
 * gratuita pede atribuição, mantida aqui.
 *
 * Mudanças em relação ao original:
 *
 *  1. `motion/react` no lugar de `framer-motion`. Mesma API, e é o pacote que
 *     o projeto já usa; instalar o outro traria uma duplicata.
 *  2. Os imports de `swiper/css` foram removidos. O original os carregava sem
 *     usar swiper em lugar nenhum, e o pacote nem existe aqui.
 *  3. `next/image` no lugar de `<img>`. Sem isso a faixa aberta receberia a
 *     imagem em tamanho natural, sem variantes responsivas.
 *  4. Foco de teclado abre a faixa, como o ponteiro. Sem isso a galeria só
 *     existiria para quem usa mouse.
 *  5. Largura por `flex-grow` em vez de medida fixa em rem. O original assumia
 *     a largura da tela inteira; aqui a galeria divide espaço com o texto ao
 *     lado, e precisa caber no que sobrar sem estourar em tela média.
 */

/**
 * Proporção entre a faixa aberta e as fechadas.
 *
 * Em 6:1 as fechadas caíam para cerca de 75px e viravam tiras cegas: capas de
 * fundo chapado, como a da Finíssima, não mostravam nada reconhecível. Em 4:1
 * elas ficam com ~90px e voltam a identificar o projeto, sem que a aberta
 * perca o destaque.
 */
const ABERTA = 4
const FECHADA = 1

export function HoverExpandGallery({
  projects,
  /** Projeto que já aparece aberto quando a seção entra na tela. */
  initialSlug,
  className,
}: {
  projects: Project[]
  initialSlug?: string
  className?: string
}) {
  const inicial = Math.max(
    0,
    projects.findIndex((p) => p.slug === initialSlug)
  )
  const [active, setActive] = useState(inicial)
  const reduced = useReducedMotion()

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <div className={cn("flex h-[34rem] w-full gap-2", className)}>
      {projects.map((project, index) => {
        const aberta = active === index

        return (
          <motion.div
            key={project.slug}
            className="relative min-w-0 overflow-hidden rounded-2xl bg-card"
            style={{ flexBasis: 0 }}
            initial={false}
            animate={{ flexGrow: aberta ? ABERTA : FECHADA }}
            transition={transition}
            onHoverStart={() => setActive(index)}
          >
            <Link
              href={`${BASE}/projetos/${project.slug}`}
              onFocus={() => setActive(index)}
              aria-label={`${project.client}: ${project.summary}`}
              className="block size-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Image
                src={project.cover.src}
                alt=""
                fill
                quality={95}
                // Pedimos sempre o tamanho da faixa aberta. Dimensionar pela
                // fechada mostraria um instante de imagem ampliada na troca.
                sizes="480px"
                priority={index < 3}
                className="object-cover"
              />

              <AnimatePresence>
                {aberta && (
                  <motion.div
                    key="legenda"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink-900/85 via-ink-900/20 to-transparent p-6"
                  >
                    <p className="site-label text-ink-300">{project.sector}</p>
                    <h3 className="site-h3 mt-2 flex items-center gap-2 text-ink-50">
                      {project.client}
                      <ArrowUpRight className="size-5 shrink-0" aria-hidden />
                    </h3>
                    <p className="mt-3 max-w-[30ch] text-pretty text-sm text-ink-300">
                      {project.summary}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
