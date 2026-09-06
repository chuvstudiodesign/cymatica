import { LightSection, SectionLabel, Rule } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { kit } from "@/lib/site-3/proposta"

/**
 * O que é um pacote de identidade visual.
 *
 * Primeira ilha clara. O corte de preto para branco acompanha a virada de
 * assunto: o herói vende, esta seção ensina. Quem lê não é designer, então
 * cada peça tem duas camadas: `role` responde "e daí?" numa linha, `body`
 * explica sem jargão.
 *
 * Seção deliberadamente sem laranja. É a mais densa de texto da página, e
 * acento nenhum aqui é o que faz o acento das outras funcionar.
 */
export function PropostaKit() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{kit.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {kit.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {kit.intro}
          </p>
        </div>
      </div>

      <Rule className="mt-24 md:mt-32" />

      <ol className="mt-16 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {kit.pieces.map((piece, i) => (
          <li key={piece.name} data-reveal="" className="border-t border-border pt-8">
            <p className="site-label text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="site-h3 mt-6">{piece.name}</h3>
            <p className="mt-4 max-w-[34ch] text-pretty font-medium">{piece.role}</p>
            <p className="mt-3 max-w-[38ch] text-pretty text-sm leading-relaxed text-muted-foreground">
              {piece.body}
            </p>
          </li>
        ))}
      </ol>

      <div
        data-reveal=""
        className="mt-24 grid gap-8 border-t border-border pt-10 md:grid-cols-12"
      >
        <p className="site-label text-muted-foreground md:col-span-3">Arquivos</p>
        <p className="site-measure text-pretty md:col-span-8">{kit.closing}</p>
      </div>
    </LightSection>
  )
}
