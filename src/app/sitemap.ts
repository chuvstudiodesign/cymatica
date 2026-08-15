import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site-3/seo"
import { allProjects } from "@/lib/site-3/content"
import { services } from "@/lib/site/content"

/**
 * Mapa do site.
 *
 * Inclui as páginas fixas, cada serviço e cada projeto, dos principais e da
 * gaveta. As versões anteriores em /site e /site-2 ficam de fora de propósito:
 * existem só para comparação interna e, indexadas, apareceriam como conteúdo
 * duplicado do site real.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const fixas = [
    { url: "/", priority: 1 },
    { url: "/projetos", priority: 0.9 },
    { url: "/servicos", priority: 0.8 },
    { url: "/diagnostico", priority: 0.8 },
    { url: "/sobre", priority: 0.6 },
    { url: "/orcamento", priority: 0.6 },
    { url: "/contato", priority: 0.5 },
  ]

  return [
    ...fixas.map(({ url, priority }) => ({
      url: `${siteUrl}${url}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...allProjects.map((project) => ({
      url: `${siteUrl}/projetos/${project.slug}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/servicos/${service.slug}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
