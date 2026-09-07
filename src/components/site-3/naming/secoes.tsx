import {
  Container,
  Section,
  LightSection,
  SectionLabel,
  CtaButton,
  Rule,
} from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ScrollCta } from "@/components/site-3/proposta/scroll-cta"
import { ChladniDark } from "@/components/site-3/proposta/chladni-dark"
import {
  argumento,
  entrega,
  fechamento,
  hero,
  processo,
  registro,
  tecnicas,
  whatsappLink,
} from "@/lib/site-3/naming"

/**
 * As seções da proposta de naming.
 *
 * Reúne o que na proposta de identidade está espalhado em dez arquivos. O
 * motivo é escopo: são blocos curtos, sem estado e sem movimento próprio, e
 * dividi-los em dez arquivos aqui seria cerimônia sem ganho.
 *
 * A gramática visual é a mesma da proposta de identidade — mesmo herói, mesmo
 * ritmo de ilhas, mesma régua de medida. As duas propostas chegam ao mesmo
 * cliente e precisam parecer do mesmo estúdio.
 */

export function NamingHero() {
  return (
    <section className="pt-40 pb-28 md:pt-52 md:pb-40">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="site-label text-muted-foreground">{hero.label}</p>

            <AnimatedHeading as="h1" className="site-h1 mt-8 text-balance" delay={0.1}>
              {hero.title}
            </AnimatedHeading>

            {/* O único ponto de laranja da dobra, e o único lugar da página
                onde o cliente é nomeado. */}
            <p data-reveal="" className="mt-10 flex items-center gap-3">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">
                {hero.personalizacao}
              </span>
            </p>

            <p
              data-reveal=""
              className="site-lead site-measure mt-8 text-pretty text-muted-foreground"
            >
              {hero.body}
            </p>

            <div data-reveal="" className="mt-12 flex flex-wrap items-center gap-3">
              <ScrollCta target={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ScrollCta>
              <CtaButton
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                render={
                  <a
                    href={whatsappLink(hero.secondaryCta.message)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                {hero.secondaryCta.label}
              </CtaButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ChladniDark className="mx-auto w-full max-w-[380px]" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function NamingArgumento() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{argumento.label}</SectionLabel>
        </div>
        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {argumento.title}
          </AnimatedHeading>
          <div className="mt-14 flex flex-col gap-8">
            {argumento.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 24)}
                data-reveal=""
                className={
                  i === 0
                    ? "site-lead site-measure text-pretty"
                    : "site-measure text-pretty text-lg leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Rule className="mt-28" />

      <SectionLabel className="mt-16">{argumento.claimsLabel}</SectionLabel>
      <dl className="mt-10 grid gap-12 sm:grid-cols-3">
        {argumento.claims.map((c) => (
          <div key={c.title} data-reveal="">
            <span aria-hidden className="block h-px w-10 bg-border" />
            <dt className="site-h3 mt-8 max-w-[18ch] text-balance">{c.title}</dt>
            <dd className="mt-4 max-w-[32ch] text-pretty text-muted-foreground">
              {c.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function NamingProcesso() {
  return (
    <LightSection id="processo" className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{processo.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {processo.title}
          </AnimatedHeading>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {processo.lead}
          </p>
        </div>
      </div>

      <ol className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2">
        {processo.etapas.map((e) => (
          <li key={e.numero} data-reveal="" className="border-t border-border pt-8">
            {/* O acento marca a progressão, um por etapa. */}
            <span className="site-label text-primary">{e.numero}</span>
            <h3 className="site-h3 mt-5 max-w-[18ch] text-balance">{e.title}</h3>
            <p className="mt-4 max-w-[44ch] text-pretty text-muted-foreground">
              {e.body}
            </p>
          </li>
        ))}
      </ol>
    </LightSection>
  )
}

export function NamingTecnicas() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{tecnicas.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {tecnicas.title}
          </AnimatedHeading>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {tecnicas.lead}
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {tecnicas.itens.map((t) => (
          <div key={t.title} data-reveal="">
            <h3 className="site-h3 max-w-[20ch] text-balance">{t.title}</h3>
            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              {t.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function NamingRegistro() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{registro.label}</SectionLabel>
        </div>
        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {registro.title}
          </AnimatedHeading>

          {/* A ressalva é o bloco mais importante do documento e por isso não
              está escondida num rodapé: um cliente que entende isso agora não
              vira um cliente decepcionado depois. */}
          <div className="mt-14 flex flex-col gap-8">
            {registro.paragraphs.map((p, i) => (
              <p
                key={p.slice(0, 24)}
                data-reveal=""
                className={
                  i === 1
                    ? "site-measure rounded-2xl border border-border p-6 text-pretty"
                    : "site-measure text-pretty text-muted-foreground"
                }
              >
                {p.replace(/\*\*/g, "")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </LightSection>
  )
}

export function NamingEntrega() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{entrega.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {entrega.title}
          </AnimatedHeading>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {entrega.lead}
          </p>
        </div>
      </div>

      <dl className="mt-20 grid gap-x-16 gap-y-10 md:grid-cols-2">
        {entrega.itens.map((i) => (
          <div key={i.name} data-reveal="" className="border-t border-border pt-6">
            <dt className="site-h3">{i.name}</dt>
            <dd className="mt-3 max-w-[44ch] text-pretty text-muted-foreground">
              {i.body}
            </dd>
          </div>
        ))}
      </dl>

      <div
        data-reveal=""
        className="mt-16 rounded-2xl border border-border p-8 md:p-10"
      >
        <h3 className="site-h3 max-w-[22ch] text-balance">
          {entrega.apresentacao.title}
        </h3>
        <p className="mt-5 max-w-[56ch] text-pretty text-muted-foreground">
          {entrega.apresentacao.body}
        </p>
      </div>
    </Section>
  )
}

export function NamingFechamento() {
  return (
    <LightSection>
      <div className="flex flex-col items-center text-center">
        <SectionLabel>{fechamento.label}</SectionLabel>
        <AnimatedHeading className="site-h2 mx-auto mt-8 max-w-[18ch] text-balance">
          {fechamento.title}
        </AnimatedHeading>
        <p
          data-reveal=""
          className="site-lead mx-auto mt-10 max-w-[44ch] text-pretty text-muted-foreground"
        >
          {fechamento.body}
        </p>
        <div data-reveal="" className="mt-12">
          <CtaButton
            render={
              <a
                href={whatsappLink(fechamento.message)}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            {fechamento.ctaLabel}
          </CtaButton>
        </div>
      </div>
    </LightSection>
  )
}
