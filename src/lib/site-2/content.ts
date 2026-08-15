/**
 * Conteúdo do /site-2.
 *
 * O texto é o mesmo do /site — só os endereços mudam de raiz. Em vez de
 * duplicar quinhentas linhas de copy (que passariam a divergir na primeira
 * edição), reexportamos tudo e reescrevemos apenas o que carrega href.
 */

export {
  studio,
  manifesto,
  positioning,
  services,
  projects,
  method,
  ai,
  testimonials,
  about,
  contact,
  type Service,
  type Project,
  type Testimonial,
} from "@/lib/site/content"

import {
  hero as baseHero,
  closingCta as baseClosingCta,
  nav as baseNav,
  footer as baseFooter,
} from "@/lib/site/content"

/** Raiz desta versão do site. */
export const BASE = "/site-2"

/** `/site` → `/site-2`, preservando o resto do caminho. */
function rebase(href: string) {
  return href.replace(/^\/site(?=\/|$)/, BASE)
}

export const hero = {
  ...baseHero,
  primaryCta: { ...baseHero.primaryCta, href: rebase(baseHero.primaryCta.href) },
  secondaryCta: { ...baseHero.secondaryCta, href: rebase(baseHero.secondaryCta.href) },
}

export const closingCta = {
  ...baseClosingCta,
  cta: { ...baseClosingCta.cta, href: rebase(baseClosingCta.cta.href) },
}

export const nav = baseNav.map((item) => ({ ...item, href: rebase(item.href) }))

export const footer = {
  ...baseFooter,
  columns: baseFooter.columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({ ...link, href: rebase(link.href) })),
  })),
}
