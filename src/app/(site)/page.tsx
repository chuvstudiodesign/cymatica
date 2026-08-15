import { Hero } from "@/components/site-3/sections/hero"
import { Manifesto } from "@/components/site-3/sections/manifesto"
import { Positioning } from "@/components/site-3/sections/positioning"
import { Diagnostic } from "@/components/site-3/sections/diagnostic"
import { Services } from "@/components/site-3/sections/services"
import { Projects } from "@/components/site-3/sections/projects"
import { Method } from "@/components/site-3/sections/method"
import { AiInProcess } from "@/components/site-3/sections/ai-in-process"
import { Testimonials } from "@/components/site-3/sections/testimonials"
import { ClosingCta } from "@/components/site-3/sections/closing-cta"

/**
 * Ritmo claro/escuro da página.
 *
 * Quatro ilhas claras quebram o bloco preto contínuo. Projetos e método
 * permanecem escuros por pedido do estúdio.
 *
 * O antigo teaser de orçamento deu lugar ao diagnóstico, que passou a ser a
 * porta de entrada enquanto a tabela de preços é revista.
 *
 *   herói ─ manifesto ─ POSICIONAMENTO ─ DIAGNÓSTICO ─ serviços
 *   projetos ─ método ─ IA ─ DEPOIMENTOS ─ encerramento
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Positioning />
      <Diagnostic />
      <Services />
      <Projects />
      <Method />
      <AiInProcess />
      <Testimonials />
      <ClosingCta />
    </>
  )
}
