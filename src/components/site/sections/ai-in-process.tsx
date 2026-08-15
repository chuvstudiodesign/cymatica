import DecryptedText from "@/components/reactbits/decrypted-text"
import { Section, SectionLabel, Reveal } from "@/components/site/primitives"
import { ai } from "@/lib/site/content"

/**
 * A IA no processo, colocada no lugar certo: ferramenta, não posicionamento.
 *
 * O título usa DecryptedText — o texto se resolve a partir de ruído, que é
 * literalmente o assunto da seção e o conceito da marca.
 */
export function AiInProcess() {
  return (
    <Section className="border-t border-border">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{ai.label}</SectionLabel>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="site-h2">
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
          </Reveal>

          <Reveal delay={0.1}>
            <p className="site-lead site-measure mt-10 text-pretty text-muted-foreground">
              {ai.body}
            </p>
          </Reveal>

          <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {ai.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <h3 className="text-lg font-medium">{point.title}</h3>
                <p className="mt-3 max-w-[44ch] text-pretty text-muted-foreground">
                  {point.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
