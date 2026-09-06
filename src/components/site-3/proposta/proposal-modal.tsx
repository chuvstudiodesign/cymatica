"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react"

import { CtaButton } from "@/components/site-3/primitives"
import { PiecePicker } from "@/components/site-3/proposta/piece-picker"
import { SelectorIntro } from "@/components/site-3/proposta/selector-intro"
import {
  deadlines,
  priceOfPieces,
  proposalWhatsappLink,
  selector,
  steps,
  type DeadlineId,
  type ProposalPackage,
} from "@/lib/site-3/proposta"
import { formatBRL } from "@/lib/site/pricing"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/**
 * Se o ScrollSmoother está no ar.
 *
 * O provider só o cria quando não há pedido de movimento reduzido, então a
 * media query é o indicador fiel — e, ao contrário de `ScrollSmoother.get()`,
 * é legível durante a renderização. Ler a instância num efeito não serviria:
 * no React o efeito do filho roda antes do efeito do pai, e o smoother ainda
 * não existe quando este componente monta.
 *
 * O instantâneo do servidor é `false`, o que renderiza `modal={true}`. Como o
 * modal nasce fechado e `Dialog.Root` não emite DOM, não há divergência de
 * hidratação.
 */
function useSmootherPresent() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION)
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )
}

type ProposalModalProps = {
  pkg: ProposalPackage | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Para onde o foco volta ao fechar: o botão que abriu. */
  triggerRef: React.RefObject<HTMLElement | null>
}

/**
 * O seletor de peças Plus.
 *
 * Monta sobre a primitiva `@base-ui/react/dialog`, não sobre `ui/dialog.tsx`.
 * Dois motivos concretos, ambos verificados no código:
 *
 *  1. O `DialogContent` do design system carrega `sm:max-w-sm` no className.
 *     Passar uma largura pelo `cn` derruba só o valor sem prefixo; a variante
 *     `sm:` sobrevive e trava o modal em 384px. Aqui a moldura é `inset`, não
 *     largura máxima.
 *  2. Ele também traz `p-4`, `rounded-xl` e um botão de fechar em `size-icon-sm`,
 *     todos dimensionados para diálogo pequeno.
 *
 * O que herdamos do Base UI e não reimplementamos: foco preso dentro do popup,
 * Esc fechando, clique fora fechando e foco devolvido ao gatilho por
 * `finalFocus`. A trava de scroll é a única peça que assumimos, pelo motivo
 * documentado no efeito abaixo.
 *
 * O respiro de 40px vem de `inset-10` no desktop. No celular ele cai para
 * `inset-4`: 40px de cada lado numa tela de 360px deixaria 280px de conteúdo,
 * e a grade de peças não caberia.
 */
export function ProposalModal({
  pkg,
  open,
  onOpenChange,
  triggerRef,
}: ProposalModalProps) {
  const [deadlineId, setDeadlineId] = useState<DeadlineId>("padrao")
  const [pieces, setPieces] = useState<string[]>([])
  const [step, setStep] = useState(1)
  /**
   * A abertura roda a cada vez que um pacote é escolhido.
   *
   * Ela confirma a escolha — "Pacote escolhido", com o nome do pacote —, e
   * essa confirmação vale para toda escolha, não só a primeira. Quem já
   * entendeu pula com um clique.
   */
  const [intro, setIntro] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const smootherPresent = useSmootherPresent()

  const deadline = deadlines.find((d) => d.id === deadlineId) ?? deadlines[0]
  const precoPecas = priceOfPieces(pieces)
  const total = pkg ? pkg.price + deadline.fee + precoPecas : 0
  const passo = steps.find((s) => s.n === step) ?? steps[0]

  /**
   * Toda abertura recomeça no passo 1.
   *
   * Sem isto, quem fecha no passo 2 e reabre por outro cartão cai direto na
   * pergunta de prazo, sem ver as peças — e o popup abre no meio de um fluxo
   * que ele não começou. As escolhas de peça e prazo continuam guardadas de
   * propósito: trocar de pacote não deve custar o trabalho já feito.
   *
   * Ajuste durante a renderização, e não num efeito: em efeito, o React
   * pintaria o passo 2 uma vez antes de voltar ao 1, e o cliente veria o
   * popup piscar na tela errada. Aqui a correção acontece antes da pintura.
   * Reagimos só à subida de `open` — no fechamento o conteúdo precisa ficar
   * como está até a transição de saída terminar.
   */
  const [abertoAntes, setAbertoAntes] = useState(open)
  if (open !== abertoAntes) {
    setAbertoAntes(open)
    if (open) {
      setStep(1)
      // Sem movimento a abertura não faz sentido: ela é feita de escrita e
      // de um cursor andando. Quem pede movimento reduzido vai direto à grade.
      const podeAnimar =
        typeof window !== "undefined" &&
        !window.matchMedia(REDUCED_MOTION).matches
      setIntro(podeAnimar)
    }
  }

  /**
   * Ao trocar de passo, o corpo volta ao topo e o foco vai para o título.
   *
   * Sem mover o foco, ele ficava no botão que acabou de sumir e o navegador o
   * empurrava para o seguinte na ordem — que é "Enviar seleção". Dois Enter
   * seguidos disparavam o WhatsApp sem o cliente ter visto a pergunta de
   * prazo. Mandar o foco ao título também é o que anuncia a troca de passo
   * para quem usa leitor de tela, sem precisar de região viva.
   */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    if (open) titleRef.current?.focus()
    // `open` de fora: focar o título ao abrir já é trabalho do `initialFocus`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  /**
   * A trava de scroll do Base UI e o ScrollSmoother não convivem.
   *
   * Verificado no fonte: `@base-ui/utils/useScrollLock.js`, no caminho para
   * navegador sem `scrollbar-gutter: stable`, escreve
   * `body.style.height = "100dvh"`. E o ScrollSmoother sustenta o curso do
   * scroll escrevendo exatamente essa propriedade — a altura do `<body>` é o
   * quanto a página rola. Substituída por `100dvh`, o curso colapsa, o
   * navegador prende o scroll perto do topo e o conteúdo desliza para trás do
   * modal. Ao fechar, o cliente perdeu onde estava lendo. Como o Mac por
   * padrão usa barra sobreposta e cai no caminho seguro, o defeito é fácil de
   * não ver em desenvolvimento e aparecer só no Windows.
   *
   * A saída tem duas metades. `modal="trap-focus"` mantém o foco preso e o
   * `aria-hidden` no resto do documento (o Base UI passa `modal !== false` ao
   * gerenciador de foco, então nada de acessibilidade se perde) e apenas
   * abre mão da trava nativa. E `paused(true)` no smoother, que é quem manda
   * no scroll: ele alinha a posição nativa à posição renderizada antes de
   * travar, por isso não há salto, e mantém o scroll aninhado liberado para o
   * corpo do modal.
   *
   * Sem smoother (movimento reduzido), a trava nativa volta a ser usada e é
   * segura, porque aí ninguém está escrevendo altura no `<body>`. E se o
   * smoother não existir por qualquer outro motivo, o `else` abaixo tranca o
   * documento à mão.
   *
   * Nada de `ScrollTrigger.refresh()` no fechamento: a altura da página não
   * mudou, e remedir tudo produziria um quadro de salto justamente quando o
   * cliente volta à leitura.
   */
  useEffect(() => {
    // Sem smoother o `modal` volta a ser `true` e o Base UI tranca sozinho.
    if (!open || !smootherPresent) return

    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.paused(true)
      return () => {
        // Relê a instância: numa navegação o provider mata e recria o
        // smoother, e destravar o antigo não teria efeito nenhum.
        ScrollSmoother.get()?.paused(false)
      }
    }

    const root = document.documentElement
    const anterior = root.style.overflow
    root.style.overflow = "hidden"
    return () => {
      root.style.overflow = anterior
    }
  }, [open, smootherPresent])

  function enviar() {
    if (!pkg) return
    window.open(
      proposalWhatsappLink({ pkg, deadline, pieces }),
      "_blank",
      "noopener"
    )
    onOpenChange(false)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={smootherPresent ? "trap-focus" : true}
    >
      <Dialog.Portal>
        {/* `data-starting-style` e `data-ending-style` são os ganchos de
            transição do Base UI (ver `internals/stateAttributesMapping.js`).
            `data-open`/`data-closed` descrevem o estado, não o intervalo, e
            usá-los para transição deixa a saída sem animação.

            Sem `backdrop-filter`: animar opacidade sobre um elemento desfocado
            manda o navegador recalcular o desfoque da viewport inteira a cada
            quadro, e seria de longe a coisa mais cara desta página. O fundo
            entrevisto sai do alfa, e superfície plana é o que a marca pede. */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink-900/72 opacity-100 transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-ending-style:duration-200 data-ending-style:ease-in data-starting-style:opacity-0 motion-reduce:transition-none" />

        {/* Um popup deste tamanho não entra em escala: `zoom-in-95` numa
            superfície quase de tela cheia move cada borda uns 30px e reamostra
            o texto no percurso. Popup grande desloca, não escala. Sobe 12px e
            revela, que é o gesto mínimo que ainda comunica camada.

            Fechar é mais rápido que abrir, porque o conteúdo já foi lido. E
            `ease-in` na saída é legítimo: a regra contra ele vale para
            entradas, onde faz o elemento parecer que trava antes de sair. */}
        <Dialog.Popup
          initialFocus={titleRef}
          finalFocus={triggerRef}
          className="fixed inset-4 z-50 flex translate-y-0 flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground opacity-100 transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none md:inset-10 data-ending-style:translate-y-2 data-ending-style:opacity-0 data-ending-style:duration-200 data-ending-style:ease-[cubic-bezier(0.4,0,1,1)] data-starting-style:translate-y-3 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-starting-style:translate-y-0"
        >
          {pkg && (
            <>
              {/* Cabeçalho: só onde ele está. A pergunta desceu para o
                  corpo, ao lado da grade — no cabeçalho ela empurrava as peças
                  para fora da primeira tela. */}
              <header className="flex items-center justify-between gap-6 border-b border-border px-6 py-5 md:px-10 md:py-6">
                <p className="site-label min-w-0 truncate text-muted-foreground">
                  {pkg.name} · {formatBRL(pkg.price)}
                  <span className="mx-2 text-muted-foreground/40" aria-hidden>
                    ·
                  </span>
                  {selector.stepCounter(passo.n, steps.length)}
                </p>

                <Dialog.Close
                  aria-label={selector.closeLabel}
                  className="-mr-2 grid size-10 shrink-0 place-content-center rounded-full text-muted-foreground transition-colors duration-150 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </header>

              {/* Barra de progresso. Serve para o cliente ver o quanto falta
                  antes de decidir se começa — é o que transforma "parede de
                  formulário" em "duas perguntas". */}
              <div
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-valuenow={passo.n}
                aria-label={selector.stepCounter(passo.n, steps.length)}
                className="h-0.5 w-full shrink-0 bg-border"
              >
                <div
                  className="h-full bg-foreground transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                  style={{ width: `${(passo.n / steps.length) * 100}%` }}
                />
              </div>

              {/* Corpo rolável. O modal inteiro nunca rola: só esta faixa.

                  Duas colunas: a pergunta fica parada à esquerda enquanto a
                  grade rola à direita. O cliente nunca perde de vista o que
                  está sendo perguntado, e a decisão ocupa a maior parte da
                  tela em vez de vir depois de quatro parágrafos. */}
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-10 md:px-10 md:py-14"
              >
                {intro ? (
                  <SelectorIntro
                    title={passo.title}
                    packageName={pkg.name}
                    onDone={() => setIntro(false)}
                  />
                ) : (
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4 lg:sticky lg:top-0 lg:self-start">
                    {/* O título é o nome acessível do diálogo. Só a pergunta do
                        passo não bastava: quem usa leitor de tela abria sem
                        saber se montava o Pro de R$ 4.900 ou o Insane de
                        R$ 18.900. O trecho oculto resolve.

                        Sem `aria-live`: o efeito de troca de passo manda o foco
                        para cá, e nome de diálogo mudando dentro de região viva
                        faz NVDA e VoiceOver anunciarem duas vezes. */}
                    <Dialog.Title
                      ref={titleRef}
                      tabIndex={-1}
                      className="site-h3 text-balance outline-none"
                    >
                      {passo.title}
                      <span className="sr-only">
                        {" "}
                        — {pkg.name}, {formatBRL(pkg.price)}
                      </span>
                    </Dialog.Title>
                    <Dialog.Description className="mt-6 max-w-[38ch] text-pretty text-muted-foreground">
                      {passo.instruction}
                      {passo.aside && (
                        <span className="mt-3 block text-sm text-muted-foreground/70">
                          ({passo.aside})
                        </span>
                      )}
                    </Dialog.Description>
                  </div>

                  <div className="lg:col-span-8">
                    {passo.n === 1 ? (
                      <PiecePicker value={pieces} onValueChange={setPieces} />
                    ) : (
                      <>
                        {/* `legend` não rotula um `role="radiogroup"`, que é o
                            que o Base UI renderiza. O rótulo vem do
                            `aria-label`. */}
                        <RadioGroup
                          value={deadlineId}
                          onValueChange={(value) =>
                            setDeadlineId(value as DeadlineId)
                          }
                          aria-label={selector.deadlineLegend}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {deadlines.map((option) => (
                            <Radio.Root
                              key={option.id}
                              value={option.id}
                              className="flex items-center gap-3 rounded-2xl border border-border px-5 py-4 text-left text-sm text-muted-foreground transition-colors duration-150 outline-none hover:border-foreground/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring data-checked:border-foreground data-checked:bg-foreground/8 data-checked:text-foreground motion-reduce:transition-none"
                            >
                              <span
                                aria-hidden
                                className="grid size-4 shrink-0 place-content-center rounded-full border border-current"
                              >
                                <Radio.Indicator className="size-2 rounded-full bg-current" />
                              </span>
                              {option.option}
                            </Radio.Root>
                          ))}
                        </RadioGroup>

                        {/* Resumo antes do envio: confere sem precisar voltar. */}
                        <div className="mt-14 border-t border-border pt-8">
                          <p className="site-label text-muted-foreground">
                            {selector.summaryLegend}
                          </p>
                          <dl className="mt-6 flex flex-col gap-4 text-sm">
                            <div className="flex flex-wrap justify-between gap-4">
                              <dt className="text-muted-foreground">{pkg.name}</dt>
                              <dd className="tabular-nums">
                                {formatBRL(pkg.price)}
                              </dd>
                            </div>
                            <div className="flex flex-wrap justify-between gap-4">
                              <dt className="text-muted-foreground">
                                {deadline.option}
                              </dt>
                              <dd className="tabular-nums">
                                {deadline.fee > 0 ? formatBRL(deadline.fee) : "—"}
                              </dd>
                            </div>
                            <div className="flex flex-wrap justify-between gap-4">
                              <dt className="max-w-[42ch] text-pretty text-muted-foreground">
                                {pieces.length === 0
                                  ? selector.emptyLabel
                                  : `${selector.counter(pieces.length)}: ${pieces.join(", ")}`}
                              </dt>
                              <dd className="tabular-nums">
                                {precoPecas > 0 ? formatBRL(precoPecas) : "—"}
                              </dd>
                            </div>
                            <div className="mt-2 flex flex-wrap justify-between gap-4 border-t border-border pt-4">
                              <dt>{selector.summaryTotal}</dt>
                              <dd className="tabular-nums">{formatBRL(total)}</dd>
                            </div>
                          </dl>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                )}
              </div>

              {/* Rodapé fixo: o estado da seleção e a saída. */}
              <footer className="flex flex-col gap-4 border-t border-border px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10 md:py-6">
                {/* A região viva carrega só a contagem. O `aria-pressed` de
                    cada peça já anuncia a própria mudança de estado, então uma
                    região que repetisse contagem e total a cada clique falaria
                    duas vezes a mesma coisa. */}
                <p className="text-sm tabular-nums text-muted-foreground">
                  <span aria-live="polite">
                    {pieces.length === 0
                      ? selector.emptyLabel
                      : selector.counter(pieces.length)}
                  </span>
                  <span className="mx-2 text-muted-foreground/40" aria-hidden>
                    ·
                  </span>
                  <span className="text-foreground">{formatBRL(total)}</span>
                </p>

                <div className="flex items-center gap-3">
                  {intro ? (
                    /* Durante a abertura o botão adianta a animação, e não o
                       passo. Antes ele chamava `setStep(2)`: quem clicasse
                       ali pulava direto para a pergunta de prazo sem nunca ter
                       visto a grade de peças. E o botão precisa existir — a
                       abertura é longa, e sem uma saída visível o único jeito
                       de sair era descobrir que clicar em qualquer lugar
                       funciona. */
                    <CtaButton onClick={() => setIntro(false)}>
                      {selector.skipLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </CtaButton>
                  ) : passo.n === 1 ? (
                    <>
                      {/* Saída para quem não quer peça nenhuma. Sem ela, a
                          única forma de seguir seria entender que "Continuar"
                          também aceita lista vazia — e o texto do passo teria
                          de explicar isso. O botão explica sozinho. */}
                      <CtaButton
                        variant="ghost"
                        onClick={() => {
                          setPieces([])
                          setStep(2)
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {selector.noPiecesLabel}
                      </CtaButton>
                      <CtaButton onClick={() => setStep(2)}>
                        {selector.nextLabel}
                        <ArrowRight className="size-4" aria-hidden />
                      </CtaButton>
                    </>
                  ) : (
                    <>
                      <CtaButton
                        variant="ghost"
                        onClick={() => setStep(1)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ArrowLeft className="size-4" aria-hidden />
                        {selector.backLabel}
                      </CtaButton>
                      <CtaButton onClick={enviar}>
                        {selector.submitLabel}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </CtaButton>
                    </>
                  )}
                </div>
              </footer>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
