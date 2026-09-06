"use client"

import { useRef, useState } from "react"

import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { PackageCard } from "@/components/site-3/proposta/package-card"
import { ProposalModal } from "@/components/site-3/proposta/proposal-modal"
import { usePackageWave } from "@/components/site-3/proposta/use-package-wave"
import { packages, packagesSection, type ProposalPackage } from "@/lib/site-3/proposta"

/**
 * Os três pacotes e o seletor.
 *
 * Esta é a única ilha de estado da página: o pacote escolhido e a abertura do
 * modal. Todo o resto continua Server Component.
 *
 * `chosen` não volta a `null` ao fechar. Se voltasse, o conteúdo do modal
 * sumiria no meio da transição de saída e o painel piscaria vazio antes de
 * desmontar. A referência do gatilho é guardada junto, para o Base UI devolver
 * o foco ao botão certo mesmo que o cliente troque de pacote entre aberturas.
 */
/** Índice do cartão em destaque: é dele que a onda sai. */
const CREST = Math.max(
  0,
  packages.findIndex((pkg) => pkg.featured)
)

export function PropostaPackages() {
  const [chosen, setChosen] = useState<ProposalPackage | null>(null)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  usePackageWave(gridRef)

  return (
    <LightSection id="pacotes" className="scroll-mt-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{packagesSection.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {packagesSection.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {packagesSection.lead}
          </p>
        </div>
      </div>

      <div ref={gridRef} className="mt-20 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            wave={Math.abs(i - CREST)}
            onChoose={(element) => {
              // O gatilho é capturado no clique, não por ref de montagem: o
              // Base UI devolve o foco a `finalFocus` no fechamento, e o botão
              // certo só se sabe no momento em que ele é acionado.
              triggerRef.current = element
              setChosen(pkg)
              setOpen(true)
            }}
          />
        ))}
      </div>

      <ProposalModal
        pkg={chosen}
        open={open}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
      />
    </LightSection>
  )
}
