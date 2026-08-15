import { Hero } from "@/components/site/sections/hero"
import { Manifesto } from "@/components/site/sections/manifesto"
import { Positioning } from "@/components/site/sections/positioning"
import { BudgetTeaser } from "@/components/site/sections/budget-teaser"
import { Services } from "@/components/site/sections/services"
import { Projects } from "@/components/site/sections/projects"
import { Method } from "@/components/site/sections/method"
import { AiInProcess } from "@/components/site/sections/ai-in-process"
import { Testimonials } from "@/components/site/sections/testimonials"
import { ClosingCta } from "@/components/site/sections/closing-cta"

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
