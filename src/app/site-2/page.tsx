import { Hero } from "@/components/site-2/sections/hero"
import { Manifesto } from "@/components/site-2/sections/manifesto"
import { Positioning } from "@/components/site-2/sections/positioning"
import { BudgetTeaser } from "@/components/site-2/sections/budget-teaser"
import { Services } from "@/components/site-2/sections/services"
import { Projects } from "@/components/site-2/sections/projects"
import { Method } from "@/components/site-2/sections/method"
import { AiInProcess } from "@/components/site-2/sections/ai-in-process"
import { Testimonials } from "@/components/site-2/sections/testimonials"
import { ClosingCta } from "@/components/site-2/sections/closing-cta"

/**
 * Ritmo claro/escuro da página.
 *
 * Três ilhas claras quebram o bloco preto contínuo. Projetos e método
 * permanecem escuros por pedido do estúdio — as peças do portfólio pedem fundo
 * neutro, e o trilho ancorado das etapas fica mais legível sobre preto.
 *
 *   herói ─── manifesto ─── POSICIONAMENTO ─── orçamento ─── serviços
 *   projetos ─── método ─── IA ─── DEPOIMENTOS ─── encerramento
 *                            ▲        ▲
 *                          claras   claras
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Positioning />
      <BudgetTeaser />
      <Services />
      <Projects />
      <Method />
      <AiInProcess />
      <Testimonials />
      <ClosingCta />
    </>
  )
}
