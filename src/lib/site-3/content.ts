/**
 * Conteúdo do site institucional.
 *
 * O que muda em relação ao site anterior vive em `copy.ts` (texto reescrito),
 * `projects.ts` (portfólio real, extraído dos PDFs) e `testimonials.ts`. O
 * resto é reexportado, para não duplicar centenas de linhas que passariam a
 * divergir na primeira edição.
 */

export { studio, services, about, contact, type Service } from "@/lib/site/content"

export {
  hero,
  manifesto,
  positioning,
  method,
  ai,
  diagnostic,
  closingCta,
  whatsapp,
  whatsappLink,
  instagram,
} from "./copy"

export { projects, drawerProjects, allProjects, type Project } from "./projects"
export { testimonials, type Testimonial } from "./testimonials"

import { nav as baseNav, footer as baseFooter } from "@/lib/site/content"

/**
 * Prefixo das rotas do site.
 *
 * O site vive na raiz do domínio, dentro do route group `(site)` — os
 * parênteses fazem a pasta não aparecer na URL. Por isso o prefixo é vazio, e
 * os links são montados como `${BASE}/projetos`, que resolve para `/projetos`.
 */
export const BASE = ""

/** `/site/algo` → `/algo`, e `/site` → `/`. */
function rebase(href: string) {
  return href.replace(/^\/site(?=\/|$)/, BASE) || "/"
}

export const nav = baseNav.map((item) => ({ ...item, href: rebase(item.href) }))

export const footer = {
  ...baseFooter,
  columns: baseFooter.columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({
      ...link,
      // O orçamento saiu do menu enquanto a tabela de preços é revista; o
      // diagnóstico ocupa o lugar dele como porta de entrada.
      href:
        link.href === "/site/orcamento"
          ? `${BASE}/diagnostico`
          : rebase(link.href),
      label: link.href === "/site/orcamento" ? "Diagnóstico" : link.label,
    })),
  })),
}
