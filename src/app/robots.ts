import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site-3/seo"

/**
 * Regras para robôs.
 *
 * `/site` e `/site-2` são as versões anteriores, mantidas para comparação
 * interna. Indexadas, apareceriam como cópias quase idênticas do site real e
 * competiriam com ele na busca. O `/styleguide` é documentação de componente,
 * sem valor para quem procura o estúdio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/site", "/site-2", "/styleguide"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
