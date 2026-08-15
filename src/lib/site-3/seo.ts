/**
 * Base de SEO do site.
 *
 * A URL canônica vem do ambiente, nesta ordem:
 *   1. NEXT_PUBLIC_SITE_URL, quando o domínio próprio estiver configurado
 *   2. o domínio de produção que a Vercel injeta
 *   3. localhost, no desenvolvimento
 *
 * Sem `metadataBase`, o Next resolve as imagens de Open Graph como caminho
 * relativo, e o WhatsApp, o LinkedIn e o próprio Google descartam a
 * pré-visualização por não conseguirem montar a URL absoluta.
 */

function resolverBase() {
  const explicito = process.env.NEXT_PUBLIC_SITE_URL
  if (explicito) return explicito.replace(/\/$/, "")

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`

  return "http://localhost:3000"
}

export const siteUrl = resolverBase()

export const seo = {
  name: "Cymatica",
  title: "Cymatica · Estúdio de design",
  description:
    "Estúdio de design e software. Identidades e experiências para marcas que precisam ser reconhecíveis em qualquer superfície. Comece por um diagnóstico da sua marca, sem custo.",
  locale: "pt_BR",
  keywords: [
    "estúdio de design",
    "identidade visual",
    "design de marca",
    "branding",
    "design de embalagem",
    "web design",
    "interface de aplicativo",
    "motion design",
    "type design",
    "desenvolvimento de software",
    "Cymatica",
  ],
} as const
