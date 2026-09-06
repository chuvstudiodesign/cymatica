import { Section, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { treinamento } from "@/lib/site-3/automacao"
import { formatBRL } from "@/lib/site/pricing"

/**
 * O segundo serviço.
 *
 * Vem depois do preço de propósito. É complemento, não alternativa: quem
 * chegou aqui já decidiu se a construção cabe, e agora pergunta quem vai
 * operar aquilo. Colocar treinamento antes do investimento faria a página
 * parecer que vende curso.
 *
 * Duas opções, lado a lado, sem destaque de uma sobre a outra — elas atendem
 * situações diferentes, não faixas de bolso diferentes, e marcar uma como
 * "recomendada" empurraria a escolha errada para metade das empresas.
 */
export function AutomacaoTreinamento() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{treinamento.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {treinamento.title}
          </AnimatedHeading>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <p data-reveal="" className="site-lead text-pretty text-muted-foreground">
            {treinamento.lead}
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        {treinamento.opcoes.map((opcao) => (
          <div
            key={opcao.name}
            data-reveal=""
            className="flex flex-col rounded-2xl border border-border p-8"
          >
            <p className="site-label text-muted-foreground">{opcao.badge}</p>

            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="site-h3">{opcao.name}</h3>
              <p className="site-h3 tabular-nums">{formatBRL(opcao.price)}</p>
            </div>

            <p className="mt-5 max-w-[40ch] text-pretty text-muted-foreground">
              {opcao.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
