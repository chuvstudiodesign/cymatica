import { LightSection, SectionLabel, CtaButton } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { fechamento, whatsappLink } from "@/lib/site-3/automacao"

/**
 * O encerramento.
 *
 * Ilha clara para fechar, como a home faz: a página termina no papel, não no
 * preto, e a última coisa que se vê é o convite.
 *
 * A pergunta do CTA é sobre a operação dele — o que produz, quanto custa, o
 * que trava — e não sobre o nosso serviço. Quem responde essa pergunta já está
 * na conversa.
 */
export function AutomacaoFechamento() {
  return (
    <LightSection>
      <div className="flex flex-col items-center text-center">
        <SectionLabel>{fechamento.label}</SectionLabel>

        <AnimatedHeading className="site-h2 mx-auto mt-8 max-w-[18ch] text-balance">
          {fechamento.title}
        </AnimatedHeading>

        <p
          data-reveal=""
          className="site-lead mx-auto mt-10 max-w-[46ch] text-pretty text-muted-foreground"
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
