import { LightSection, SectionLabel } from "@/components/site-3/primitives"
import { AnimatedHeading } from "@/components/site-3/animated-heading"
import { ganhos } from "@/lib/site-3/automacao"

/**
 * O gancho: benefício antes da explicação.
 *
 * O leitor acabou de se reconhecer no problema e ainda não sabe como
 * funciona. Dar o resultado agora é o que faz valer a pena aguentar os três
 * passos que vêm depois. Os benefícios voltam mais adiante, em detalhe — a
 * repetição é deliberada: aqui é o motivo para continuar, lá é o argumento
 * para decidir.
 *
 * Primeira ilha clara da página, e é ela que quebra o bloco escuro do herói
 * e do problema.
 */
export function AutomacaoGanhos() {
  return (
    <LightSection>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{ganhos.label}</SectionLabel>
          <AnimatedHeading className="site-h2 mt-8 text-balance">
            {ganhos.title}
          </AnimatedHeading>
        </div>
      </div>

      <ol className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-3">
        {ganhos.itens.map((item) => (
          <li key={item.numero} data-reveal="">
            <span className="site-label text-muted-foreground">{item.numero}</span>
            <h3 className="site-h3 mt-6 max-w-[20ch] text-balance">{item.title}</h3>
            <p className="mt-5 max-w-[34ch] text-pretty text-muted-foreground">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </LightSection>
  )
}
