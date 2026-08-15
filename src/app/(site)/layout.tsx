import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-3/site-header"
import { SiteFooter } from "@/components/site-3/site-footer"
import { SmoothScrollProvider } from "@/components/site-3/smooth-scroll-provider"
import { OrganizationJsonLd } from "@/components/site-3/json-ld"
import { seo, siteUrl } from "@/lib/site-3/seo"
import "./site.css"

export const metadata: Metadata = {
  // Sem base, as imagens de Open Graph saem como caminho relativo e nenhuma
  // rede social consegue montar a pré-visualização.
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: "%s · Cymatica",
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: seo.name,
  authors: [{ name: seo.name, url: siteUrl }],
  creator: seo.name,
  publisher: seo.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: "/",
    siteName: seo.name,
    title: seo.title,
    description: seo.description,
    // Explícito de propósito: ao declarar `openGraph` sem `images`, o Next não
    // mescla o arquivo de imagem detectado por convenção, e a pré-visualização
    // sai sem figura em toda rede social.
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cymatica, estúdio de design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
}

/**
 * O layout raiz já entrega tema escuro, Figtree, Geist Mono e os providers do
 * design system. Este acrescenta a moldura do site e os metadados.
 *
 * O cabeçalho fica fora do SmoothScrollProvider de propósito: o ScrollSmoother
 * aplica transform no wrapper, e `position: fixed` dentro dele para de grudar.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <OrganizationJsonLd />
      <SiteHeader />
      <SmoothScrollProvider>
        <main id="conteudo">{children}</main>
        <SiteFooter />
      </SmoothScrollProvider>
    </>
  )
}
