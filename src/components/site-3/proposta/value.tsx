import { Section, SectionLabel, Rule } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ChladniDark } from "@/components/site-3/proposta/chladni-dark"
import { value } from "@/lib/site-3/proposta"

/**
 * O argumento central, e o único momento dramático da página.
 *
 * Volta ao canvas escuro depois da ilha clara: aqui a página para de ensinar e
 * passa a defender uma tese. Não tem grade, não tem cartão e não tem número.
 * Uma coluna de texto, três afirmações curtas, e ao lado a placa de Chladni —
 * a mesma cena da home, em versão escura.
 *
 * O laranja da dobra são as linhas nodais da placa. Por isso os filetes das
 * três afirmações são todos neutros: dois acentos disputando a mesma tela é
 * ruído, e a tese já tem quem a sublinhe.
 */
export function PropostaValue() {
  return (
    <Section className="isolate">
      {/* A placa ocupa a coluna que a composição já deixava vazia, e é um item
          da grade — não uma camada absoluta atrás do texto.

          `mt-auto` num item de grade esticado empurra a placa para o fim da
          coluna: a base dela encosta na mesma linha que a última linha do
          argumento ao lado. Sem isso, o quadrado terminava no meio do texto e
          o desalinhamento aparecia. Nada de sticky aqui, que brigaria com esse
          empurrão. */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-4">
          <SectionLabel>{value.label}</SectionLabel>
          <div className="mt-14 hidden lg:mt-auto lg:block lg:pt-14">
            <ChladniDark />
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatedHeading className="site-h2 text-balance">
            {value.title}
          </AnimatedHeading>

          <div className="mt-14 flex flex-col gap-8">
            {value.paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal=""
                className={
                  i === 0
                    ? "site-lead site-measure text-pretty"
                    : "site-measure text-pretty text-lg leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Rule className="mt-28" />

      {/* As três afirmações liam como notas soltas no rodapé da seção. A
          etiqueta as apresenta pelo que são — o ganho concreto de contratar —
          e amarra o bloco à tese que acabou de ser defendida acima. */}
      <SectionLabel className="mt-16">{value.claimsLabel}</SectionLabel>

      <dl className="mt-10 grid gap-12 sm:grid-cols-3">
        {value.claims.map((claim) => (
          <div key={claim.title} data-reveal="">
            <span aria-hidden className="block h-px w-10 bg-border" />
            <dt className="site-h3 mt-8 max-w-[18ch] text-balance">{claim.title}</dt>
            <dd className="mt-4 max-w-[30ch] text-pretty text-muted-foreground">
              {claim.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
