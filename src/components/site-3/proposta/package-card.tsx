"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { CtaButton } from "@/components/site-3/primitives"
import {
  AUTOMACAO_HREF,
  automation,
  whatsappLink,
  type ProposalPackage,
} from "@/lib/site-3/proposta"
import { formatBRL } from "@/lib/site/pricing"

/**
 * Um pacote.
 *
 * O destaque do Insane é feito por superfície, não por cor: o painel sobe para
 * `muted` e a borda clareia. É `muted` e não `ink-800` porque o cartão vive
 * dentro de uma `LightSection`, onde os tokens estão reapontados para o tema
 * claro; um `ink-800` cravado abriria um buraco escuro no papel.
 *
 * Assim o laranja sobra inteiro para o CTA, que é o único ponto de acento da
 * dobra. Os outros dois cartões pedem a mesma ação em `outline`, o que informa
 * qual é a recomendação do estúdio sem precisar dizer.
 */
export function PackageCard({
  pkg,
  wave,
  onChoose,
}: {
  pkg: ProposalPackage
  /** Distância à crista da onda. Ver `use-package-wave.tsx`. */
  wave: number
  /** Recebe o próprio botão, para o modal saber a quem devolver o foco. */
  onChoose: (trigger: HTMLElement) => void
}) {
  const featured = Boolean(pkg.featured)

  return (
    <div
      data-wave={wave}
      className={cn(
        "flex flex-col rounded-2xl border p-8 lg:p-10",
        featured ? "border-foreground/25 bg-muted" : "border-border"
      )}
    >
      <div className="flex min-h-7 items-center justify-between gap-4">
        {/* Título de verdade: quem navega por cabeçalho precisa alcançar os
            três pacotes, que é a informação que a página existe para dar. */}
        <h3 className="text-2xl font-medium tracking-[-0.02em]">{pkg.name}</h3>
        {pkg.badge && (
          <span className="site-label rounded-full border border-border px-3 py-1.5 text-muted-foreground">
            {pkg.badge}
          </span>
        )}
      </div>

      <p className="site-h3 mt-5 tabular-nums">{formatBRL(pkg.price)}</p>

      <p className="mt-5 max-w-[30ch] text-pretty text-sm text-muted-foreground">
        {pkg.positioning}
      </p>

      <ul className="mt-10 flex flex-col gap-5 border-t border-border pt-8">
        {pkg.items.map((item) => (
          <li key={item.name}>
            <p className="flex items-baseline gap-3 text-[0.9375rem]">
              <span
                aria-hidden
                className="size-1 shrink-0 translate-y-[-0.15rem] rounded-full bg-muted-foreground"
              />
              {item.name}
            </p>
            {item.note && (
              <p className="mt-2 pl-4 text-pretty text-sm text-muted-foreground">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Gancho da página de automação, no cartão que a vende.
          `AUTOMACAO_HREF` ainda é `null`, então isto abre a conversa em vez de
          apontar para uma rota que não existe. Quando a página nascer, basta
          preencher a constante em `lib/site-3/proposta.ts`. */}
      {featured && (
        <div className="mt-10 rounded-xl border border-border p-5">
          {AUTOMACAO_HREF ? (
            <CtaButton
              variant="outline"
              className="h-11 w-full border-border px-5 text-sm"
              render={<Link href={AUTOMACAO_HREF} />}
            >
              {automation.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </CtaButton>
          ) : (
            <CtaButton
              variant="outline"
              className="h-11 w-full border-border px-5 text-sm"
              render={
                <a
                  href={whatsappLink(automation.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {automation.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </CtaButton>
          )}
          <p className="mt-4 text-pretty text-sm text-muted-foreground">
            {automation.body}
          </p>
        </div>
      )}

      <div className="mt-10 pt-2 lg:mt-auto lg:pt-12">
        <CtaButton
          onClick={(event) => onChoose(event.currentTarget)}
          variant={featured ? "default" : "outline"}
          className={cn("w-full", !featured && "border-border")}
        >
          {pkg.ctaLabel}
        </CtaButton>
      </div>
    </div>
  )
}
