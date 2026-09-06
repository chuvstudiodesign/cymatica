import type { Metadata } from "next"

import { PropostaHero } from "@/components/site-3/proposta/hero"
import { PropostaKit } from "@/components/site-3/proposta/kit"
import { PropostaValue } from "@/components/site-3/proposta/value"
import { PropostaPackages } from "@/components/site-3/proposta/packages"
import { PropostaDeadlines } from "@/components/site-3/proposta/deadlines"
import { PropostaSocial } from "@/components/site-3/proposta/social"
import { PropostaStudio } from "@/components/site-3/proposta/studio"
import { meta } from "@/lib/site-3/proposta"

/**
 * Documento privado, enviado por link direto.
 *
 * Fora do índice de propósito, e por isso também fora do `sitemap.ts`: é uma
 * proposta com preço fechado dirigida a uma pessoa, não conteúdo do site. O
 * `alternates.canonical` fica de fora pelo mesmo motivo, para não anunciar a
 * URL em lugar nenhum.
 */
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: false },
}

/**
 * Ritmo claro/escuro, na mesma gramática da home.
 *
 *   herói ─ O PACOTE ─ argumento ─ PACOTES ─ PRAZOS ─ mídia social ─ estúdio
 *
 * As ilhas claras são onde a página ensina e onde ela cobra: as duas coisas
 * que precisam ser lidas com atenção. Pacotes e prazos formam um bloco claro
 * só, porque `.light + .light` no site.css zera o padding de topo da segunda,
 * e prazo é parte da decisão de preço, não assunto à parte.
 */
export default function PropostaJulianoPage() {
  return (
    <>
      <PropostaHero />
      <PropostaKit />
      <PropostaValue />
      <PropostaPackages />
      <PropostaDeadlines />
      <PropostaSocial />
      <PropostaStudio />
    </>
  )
}
