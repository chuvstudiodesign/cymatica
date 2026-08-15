import type { Metadata } from "next"

import {
  Container,
  LightSection,
  SectionLabel,
  Rule,
} from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { Method } from "@/components/site-3/sections/method"
import { Testimonials } from "@/components/site-3/sections/testimonials"
import { ClosingCta } from "@/components/site-3/sections/closing-cta"
import { about, manifesto, studio } from "@/lib/site-3/content"

export const metadata: Metadata = {
  alternates: { canonical: "/sobre" },
  title: "Sobre",
  description: about.lead,
}

export default function SobrePage() {
  return (
    <>
      <div className="pt-40 pb-28 md:pt-52 md:pb-40">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>{about.label}</SectionLabel>
            <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
              {about.title}
            </AnimatedHeading>
            <p data-reveal="" className="site-lead mt-10 max-w-[54ch] text-pretty">
              {about.lead}
            </p>
          </div>

          <div className="mt-24 grid gap-16 lg:grid-cols-12">
            <div data-reveal="" className="lg:col-span-4">
              <CymaticaMark className="size-20 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-8">
              {about.body.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal=""
                  className="site-lead max-w-[58ch] text-pretty text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Rule className="mt-28" />

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>O nome</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-3">
                {manifesto.lines.map((line, i) => (
                  <AnimatedHeading
                    key={line}
                    as="p"
                    className="site-h3 text-balance text-muted-foreground"
                    delay={i * 0.12}
                  >
                    {line}
                  </AnimatedHeading>
                ))}
              </div>
              <AnimatedHeading className="site-h2 mt-14 text-balance" delay={0.2}>
                {manifesto.statement}
              </AnimatedHeading>
            </div>
          </div>
        </Container>
      </div>

      {/* Valores em ilha clara: quebra o bloco escuro no meio da página. */}
      <LightSection>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>No que acreditamos</SectionLabel>
          </div>
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-8">
            {about.values.map((value) => (
              <div key={value.title} data-reveal="">
                <h2 className="site-h3">{value.title}</h2>
                <p className="mt-4 max-w-[42ch] text-pretty text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Rule className="mt-28" />

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Onde estamos</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <p className="site-h3">{studio.location}</p>
            <p className="mt-6 text-muted-foreground">
              Trabalhamos remotamente com clientes em qualquer fuso.
            </p>
          </div>
        </div>
      </LightSection>

      <div id="metodo" className="scroll-mt-32">
        <Method />
      </div>

      <Testimonials />
      <ClosingCta />
    </>
  )
}
