import type { Metadata } from "next"

import {
  NamingArgumento,
  NamingEntrega,
  NamingFechamento,
  NamingHero,
  NamingProcesso,
  NamingRegistro,
  NamingTecnicas,
} from "@/components/site-3/naming/secoes"
import { NamingInvestimento } from "@/components/site-3/naming/investimento"
import { meta } from "@/lib/site-3/naming"

/**
 * Documento privado, enviado por link direto. Fora do índice e do sitemap,
 * como a proposta de identidade: é uma proposta com preço dirigida a uma
 * pessoa, não conteúdo do site.
 */
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: false },
}

/**
 * O ritmo, e o motivo da ordem.
 *
 *   herói ─ argumento ─ PROCESSO ─ método ─ REGISTRO ─ entrega ─ investimento ─ FECHAMENTO
 *
 * O registro vem antes da entrega e do preço de propósito. É a única ressalva
 * do documento, e ressalva escondida depois do preço lê como letra miúda.
 */
export default function PropostaNamingPage() {
  return (
    <>
      <NamingHero />
      <NamingArgumento />
      <NamingProcesso />
      <NamingTecnicas />
      <NamingRegistro />
      <NamingEntrega />
      <NamingInvestimento />
      <NamingFechamento />
    </>
  )
}
