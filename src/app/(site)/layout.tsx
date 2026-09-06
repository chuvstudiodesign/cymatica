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
      {/* Sem JavaScript, a página inteira ficava em branco.
          `[data-reveal]` nasce em `opacity: 0` esperando o GSAP, e todo
          `AnimatedHeading` nasce em `opacity-0` esperando o SplitText — 68 nós
          de texto ao todo, incluindo o `h1`. A saída por classe `no-js` que os
          dois previam nunca funcionou: nada em lugar nenhum põe essa classe no
          `<html>`.

          O `noscript` é o produtor que faltava, e não depende de script para
          existir. Quem tem JavaScript nunca vê esta regra; quem não tem lê a
          página inteira, sem animação. Numa proposta enviada por link, tela
          branca não é uma falha aceitável. */}
      <noscript>
        <style>{`
          [data-reveal], .opacity-0 { opacity: 1 !important; transform: none !important; }

/* Limitacao conhecida, sem conserto por CSS: a segunda camada
             dos "ver mais" nao abre sem JavaScript.

             O painel do Base UI leva o atributo hidden, e o React o serializa
             como booleano -- hidden="" e nao hidden="until-found". A folha do
             proprio navegador esconde isso com display:none !important, e
             !important de agente de usuario vence !important de autor: nenhuma
             regra daqui alcanca. Medido: com a regra aplicada, height virou
             auto e display continuou none.

             Vive-se bem com isso. A opcao hiddenUntilFound garante que o texto
             esta no documento, entao indexador le e o Ctrl+F do navegador abre
             o painel quando ha JavaScript. Sem JavaScript perde-se so a camada
             de aprofundamento; a pagina inteira continua legivel. */
        `}</style>
      </noscript>
      <OrganizationJsonLd />
      <SiteHeader />
      <SmoothScrollProvider>
        <main id="conteudo">{children}</main>
        <SiteFooter />
      </SmoothScrollProvider>
    </>
  )
}
