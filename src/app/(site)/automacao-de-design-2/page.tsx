import type { Metadata } from "next"

import { Automacao2Hero } from "@/components/site-3/automacao-2/hero"
import { Automacao2Problema } from "@/components/site-3/automacao-2/problema"
import { Automacao2Ganhos } from "@/components/site-3/automacao-2/ganhos"
import { Automacao2ComoFunciona } from "@/components/site-3/automacao-2/como-funciona"
import { Automacao2Demo } from "@/components/site-3/automacao-2/demo"
import { Automacao2Materiais } from "@/components/site-3/automacao-2/materiais"
import { Automacao2Beneficios } from "@/components/site-3/automacao-2/beneficios"
import { Automacao2Pacotes } from "@/components/site-3/automacao-2/pacotes"
import { Automacao2Treinamento } from "@/components/site-3/automacao-2/treinamento"
import { Automacao2Fechamento } from "@/components/site-3/automacao-2/fechamento"
import { meta } from "@/lib/site-3/automacao-2"

/**
 * Página de serviço, pública e indexável — ao contrário da proposta do
 * Juliano, que é documento privado. Por isso ela entra no `sitemap.ts`.
 */
export const metadata: Metadata = {
  // Versão de teste: fora do índice e do sitemap enquanto convive com a v1.
  robots: { index: false, follow: false },
  title: meta.title,
  description: meta.description,
}

/**
 * Ritmo da página, e o motivo de cada posição.
 *
 *   herói ─ problema ─ GANHOS ─ como funciona ─ DEMONSTRAÇÃO
 *   materiais ─ BENEFÍCIOS ─ investimento ─ treinamento ─ FECHAMENTO
 *
 * O benefício aparece duas vezes de propósito. Em `ganhos`, logo depois do
 * problema, ele é o motivo para aguentar a explicação. Em `beneficios`, depois
 * de o leitor entender o mecanismo, ele é o argumento para decidir. Vender
 * primeiro e explicar depois é o que funciona quando o produto é novo e o
 * leitor não tem categoria mental para ele.
 *
 * A demonstração fica no meio, e não no fim: é a prova de que a coisa existe,
 * e ela precisa chegar antes de qualquer preço.
 */
export default function Automacao2Page() {
  return (
    <>
      <Automacao2Hero />
      <Automacao2Problema />
      <Automacao2Ganhos />
      <Automacao2ComoFunciona />
      <Automacao2Demo />
      <Automacao2Materiais />
      <Automacao2Beneficios />
      <Automacao2Pacotes />
      <Automacao2Treinamento />
      <Automacao2Fechamento />
    </>
  )
}
