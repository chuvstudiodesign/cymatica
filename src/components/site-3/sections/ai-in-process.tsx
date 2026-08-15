import DecryptedText from "@/components/reactbits/decrypted-text"
import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { ChladniLight } from "@/components/site-3/chladni-light"
import { ai } from "@/lib/site-3/content"

/**
 * A IA no processo — e a nova casa da placa de Chladni.
 *
 * Aqui o padrão faz mais sentido do que fazia no herói: a seção fala sobre
 * ordem emergindo de volume bruto, que é literalmente o que a placa mostra.
 * Sobre branco, o grão lê como grafite sobre papel e as linhas nodais acendem
 * num laranja bem mais vivo do que rendiam sobre preto.
 */
export function AiInProcess() {
  return (
    <LightSection>
      <div className="grid gap-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionLabel>{ai.label}</SectionLabel>

          <h2 className="site-h2 mt-8">
            <DecryptedText
              text={ai.title}
              animateOn="view"
              sequential
              speed={28}
              revealDirection="start"
              useOriginalCharsOnly
              encryptedClassName="text-muted-foreground"
            />
          </h2>

          <p
            data-reveal=""
            className="site-lead mt-10 max-w-[46ch] text-pretty text-muted-foreground"
          >
            {ai.body}
          </p>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {ai.points.map((point) => (
              <div key={point.title} data-reveal="">
                <h3 className="text-lg font-medium">{point.title}</h3>
                <p className="mt-3 max-w-[36ch] text-pretty text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-32">
            <ChladniLight />
            {/* A legenda nomeia a marca, não o fenômeno: quem vê o padrão
                associa a figura à Cymatica, e não a uma nota técnica. */}
            <p className="site-label mt-6 text-center text-muted-foreground">
              Cymatica
            </p>
          </div>
        </div>
      </div>
    </LightSection>
  )
}
