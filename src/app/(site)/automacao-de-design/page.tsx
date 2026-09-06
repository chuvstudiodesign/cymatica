import type { Metadata } from "next"

import { AutomacaoHero } from "@/components/site-3/automacao/hero"
import { AutomacaoProblema } from "@/components/site-3/automacao/problema"
import { AutomacaoGanhos } from "@/components/site-3/automacao/ganhos"
import { AutomacaoComoFunciona } from "@/components/site-3/automacao/como-funciona"
import { AutomacaoDemo } from "@/components/site-3/automacao/demo"
import { AutomacaoMateriais } from "@/components/site-3/automacao/materiais"
import { AutomacaoBeneficios } from "@/components/site-3/automacao/beneficios"
import { AutomacaoPacotes } from "@/components/site-3/automacao/pacotes"
import { AutomacaoTreinamento } from "@/components/site-3/automacao/treinamento"
import { AutomacaoFechamento } from "@/components/site-3/automacao/fechamento"
import { meta } from "@/lib/site-3/automacao"

/**
 * Página de serviço, pública e indexável — ao contrário da proposta do
 * Juliano, que é documento privado. Por isso ela entra no `sitemap.ts`.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/automacao-de-design" },
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
export default function AutomacaoPage() {
  return (
    <>
      <AutomacaoHero />
      <AutomacaoProblema />
      <AutomacaoGanhos />
      <AutomacaoComoFunciona />
      <AutomacaoDemo />
      <AutomacaoMateriais />
      <AutomacaoBeneficios />
      <AutomacaoPacotes />
      <AutomacaoTreinamento />
      <AutomacaoFechamento />
    </>
  )
}
