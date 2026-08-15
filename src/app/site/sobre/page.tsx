import type { Metadata } from "next"

import { Container, SectionLabel, Reveal, Rule } from "@/components/site/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { Method } from "@/components/site/sections/method"
import { Testimonials } from "@/components/site/sections/testimonials"
import { ClosingCta } from "@/components/site/sections/closing-cta"
import { about, manifesto, studio } from "@/lib/site/content"

export const metadata: Metadata = {
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
            <h1 className="site-h2 mt-8 text-balance">{about.title}</h1>
            <p className="site-lead mt-10 max-w-[54ch] text-pretty">
              {about.lead}
            </p>
          </div>

          <div className="mt-24 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <CymaticaMark className="size-20 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-8">
              {about.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="site-lead max-w-[58ch] text-pretty text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Rule className="mt-28" />

          {/* O conceito, para quem chegou por aqui e não pela home. */}
          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>O nome</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-3">
                {manifesto.lines.map((line) => (
                  <p key={line} className="site-h3 text-balance text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
              <p className="site-h2 mt-14 text-balance">{manifesto.statement}</p>
            </div>
          </div>

          <Rule className="mt-28" />

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>No que acreditamos</SectionLabel>
            </div>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-8">
              {about.values.map((value, i) => (
                <Reveal key={value.title} delay={(i % 2) * 0.06}>
                  <h2 className="site-h3">{value.title}</h2>
                  <p className="mt-4 max-w-[42ch] text-pretty text-muted-foreground">
                    {value.description}
                  </p>
                </Reveal>
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
        </Container>
      </div>

      <div id="metodo" className="scroll-mt-32">
        <Method />
      </div>

      <Testimonials />
      <ClosingCta />
    </>
  )
}
