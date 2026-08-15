import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { Container, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ContactForm } from "@/components/site/contact-form"
import { contact, studio, BASE } from "@/lib/site-3/content"

export const metadata: Metadata = {
  title: "Contato",
  description: contact.body,
}

export default function ContatoPage() {
  return (
    <div className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>{contact.label}</SectionLabel>
            <AnimatedHeading as="h1" className="site-h2 mt-8 text-balance">
              {contact.title}
            </AnimatedHeading>
            <p
              data-reveal=""
              className="site-lead mt-10 max-w-[44ch] text-pretty text-muted-foreground"
            >
              {contact.body}
            </p>

            <Link
              href={`${BASE}/orcamento`}
              className="group/quote mt-12 inline-flex items-center gap-2 text-primary underline-offset-4 transition-colors outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Ir direto para o orçamento
              <ArrowUpRight
                className="size-4 transition-transform group-hover/quote:translate-x-0.5 group-hover/quote:-translate-y-0.5"
                aria-hidden
              />
            </Link>

            <dl className="mt-20 flex flex-col gap-8">
              <div>
                <dt className="site-label text-muted-foreground">Email</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${studio.email}`}
                    className="underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {studio.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="site-label text-muted-foreground">Estúdios</dt>
                <dd className="mt-3 text-muted-foreground">{studio.location}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  )
}
