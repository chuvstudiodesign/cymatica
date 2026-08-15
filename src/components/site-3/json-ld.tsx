import { seo, siteUrl } from "@/lib/site-3/seo"
import { instagram, whatsapp } from "@/lib/site-3/content"
import { services } from "@/lib/site/content"

/**
 * Dados estruturados da organização, em JSON-LD.
 *
 * É o que permite ao buscador entender que a página descreve um estúdio de
 * design, com quais serviços e por quais canais falar com ele, em vez de
 * inferir tudo do texto corrido. Alimenta o painel de conhecimento e melhora
 * como o resultado aparece na busca.
 */
export function OrganizationJsonLd() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organizacao`,
    name: seo.name,
    url: siteUrl,
    description: seo.description,
    image: `${siteUrl}/opengraph-image.png`,
    logo: `${siteUrl}/brand/cymatica-symbol.svg`,
    telephone: `+${whatsapp.number}`,
    sameAs: [instagram.url],
    knowsLanguage: ["pt-BR", "en"],
    areaServed: "BR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.benefit,
          url: `${siteUrl}/servicos/${service.slug}`,
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      // O conteúdo é montado aqui, a partir de constantes do próprio projeto.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  )
}
