import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-3/site-header"
import { SiteFooter } from "@/components/site-3/site-footer"
import { SmoothScrollProvider } from "@/components/site-3/smooth-scroll-provider"
import "./site-3.css"

export const metadata: Metadata = {
  title: {
    default: "Cymatica · Estúdio de design",
    template: "%s · Cymatica",
  },
  description:
    "Design de alta qualidade deixou de ser privilégio. Diga quanto você pode investir e receba na hora um escopo real, com entregáveis e prazo.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Cymatica" },
  icons: { icon: "/brand/cymatica-symbol.svg" },
}

/**
 * O layout raiz já entrega tema escuro, Figtree, Geist Mono e os providers do
 * design system — este só acrescenta a moldura do site.
 *
 * O cabeçalho fica fora do SmoothScrollProvider de propósito: o ScrollSmoother
 * aplica transform no wrapper, e `position: fixed` dentro dele para de grudar.
 */
export default function SiteLayout({ children }: LayoutProps<"/site-3">) {
  return (
    <>
      <SiteHeader />
      <SmoothScrollProvider>
        <main id="conteudo">{children}</main>
        <SiteFooter />
      </SmoothScrollProvider>
    </>
  )
}
