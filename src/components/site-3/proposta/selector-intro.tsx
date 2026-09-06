"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

import { intro } from "@/lib/site-3/proposta"

/**
 * A abertura do seletor.
 *
 * Sequência, na ordem em que o cliente precisa entender:
 *
 *  1. um visto se desenha em laranja — a escolha do pacote foi registrada;
 *  2. "Pacote escolhido." é escrito, letra a letra;
 *  3. o nome do pacote que ele acabou de escolher;
 *  4. a pergunta do passo;
 *  5. ao lado, um cursor marca duas pílulas de exemplo e conclui no botão.
 *
 * O item 5 é o que carrega o peso. Dizer "marque as peças e continue" é
 * instrução; ver um cursor fazendo isso é demonstração, e demonstração não
 * precisa ser lida. O gesto vai até o fim de propósito — sem o clique no
 * botão, a demonstração ensinaria a marcar, mas não a terminar.
 *
 * As pílulas são abstratas — um ponto e uma barra, sem texto — para ninguém
 * confundir o diagrama com a lista de verdade que vem depois. Já o botão é
 * igual ao de verdade, inclusive na cor: é justamente ele que o cliente
 * precisa reconhecer quando a grade aparecer.
 *
 * Sobre o cursor: a posição de cada parada é **medida no DOM**, não escrita à
 * mão. Numa versão anterior as coordenadas eram fixas e a marcação disparava
 * enquanto o cursor ainda viajava — ele clicava numa pílula estando
 * visivelmente sobre outra. Medir, e só clicar depois de chegar, elimina a
 * classe inteira desse defeito.
 *
 * A abertura é pulável a qualquer momento com um clique.
 */
export function SelectorIntro({
  title,
  packageName,
  onDone,
}: {
  title: string
  packageName: string
  onDone: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  /**
   * O callback fica num `ref` para a linha do tempo não reiniciar.
   *
   * O pai passa uma arrow inline, então a identidade de `onDone` muda a cada
   * renderização. Se ele entrasse nas dependências do efeito, a animação
   * recomeçaria do zero no meio. A escrita acontece num efeito, não durante a
   * renderização.
   */
  const doneRef = useRef(onDone)
  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const escrever = (seletor: string, texto: string, ritmo: number) => {
        const alvo = root.querySelector<HTMLElement>(seletor)
        if (!alvo) return gsap.timeline()
        const estado = { n: 0 }
        return gsap.timeline().to(estado, {
          n: texto.length,
          duration: texto.length * ritmo,
          ease: "none",
          onUpdate: () => {
            alvo.textContent = texto.slice(0, Math.round(estado.n))
          },
        })
      }

      /**
       * Onde a ponta do cursor precisa estar para apontar um alvo.
       *
       * Medido na hora, contra o palco: o cursor é `absolute` na origem dele.
       * O desenho tem a ponta no canto superior esquerdo, então a ponta é o
       * próprio ponto (x, y) — não há recuo a compensar.
       */
      const até = (seletor: string) => {
        const palco = root.querySelector<HTMLElement>("[data-palco]")
        const alvo = root.querySelector<HTMLElement>(seletor)
        if (!alvo || !palco) return { x: 0, y: 0 }
        const a = alvo.getBoundingClientRect()
        const p = palco.getBoundingClientRect()
        return {
          x: a.left - p.left + a.width * 0.38,
          y: a.top - p.top + a.height * 0.5,
        }
      }

      /** Levar o cursor até um alvo, e só então clicar. */
      const clicar = (seletor: string, marcar: boolean) => {
        const t = gsap.timeline()
        t.to("[data-cursor]", {
          // Função, e não objeto: assim a medição acontece no instante em que
          // o trecho roda, e não quando a linha do tempo é montada.
          x: () => até(seletor).x,
          y: () => até(seletor).y,
          duration: 0.36,
          ease: "power2.inOut",
        })
          .to("[data-cursor]", { scale: 0.86, duration: 0.09, ease: "power2.in" })
          .to(seletor, { scale: 0.96, duration: 0.09 }, "<")
        if (marcar) t.set(seletor, { attr: { "data-marcada": "true" } })
        t.to("[data-cursor]", { scale: 1, duration: 0.14, ease: "back.out(3)" })
          .to(seletor, { scale: 1, duration: 0.18, ease: "back.out(3)" }, "<")
        return t
      }

      const tl = gsap.timeline({ onComplete: () => doneRef.current() })

      tl.set(root, { opacity: 1 })
        // O visto se desenha em vez de aparecer: traço que corre lê como
        // "concluindo agora", e aparecer pronto lê como ícone estático.
        .fromTo(
          "[data-visto]",
          { strokeDashoffset: 34 },
          { strokeDashoffset: 0, duration: 0.38, ease: "power2.out" }
        )
        .fromTo(
          "[data-anel]",
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          "<"
        )
        .add(escrever("[data-linha1]", intro.done, 0.022), "-=0.1")
        .add(escrever("[data-linha2]", packageName, 0.04), "+=0.08")
        .add(escrever("[data-linha3]", title, 0.012), "+=0.1")
        // O cursor entra só depois do texto: as duas coisas competindo pela
        // atenção ao mesmo tempo fariam o cliente perder uma das duas. Entra
        // de fora do palco, à direita e abaixo.
        .set("[data-cursor]", {
          x: () => até("[data-botao]").x + 90,
          y: () => até("[data-botao]").y + 40,
        })
        .to("[data-cursor]", { opacity: 1, duration: 0.18 }, "+=0.16")
        .add(clicar("[data-pilula='0']", true))
        .add(clicar("[data-pilula='2']", true), "+=0.2")
        .add(clicar("[data-botao]", false), "+=0.3")
        // Tempo de leitura depois que o gesto termina.
        //
        // Longo de propósito: o cliente lê no ritmo dele, e ninguém deveria
        // perder a explicação por ter piscado. O custo disso — a abertura
        // repete a cada escolha de pacote — é pago pelo botão "Pular" no
        // rodapé e pelo clique em qualquer lugar da tela, que saltam para o
        // fim. Sem essas duas saídas, esta duração seria abusiva.
        .to({}, { duration: 10.7 })
        .to(root, { opacity: 0, duration: 0.35, ease: "power2.in" })

      // Clicar em qualquer lugar salta para o fim: ninguém deve ficar preso
      // esperando uma animação que já entendeu.
      const pular = () => tl.progress(1)
      root.addEventListener("click", pular)
      return () => root.removeEventListener("click", pular)
    }, rootRef)

    return () => ctx.revert()
  }, [title, packageName])

  return (
    <div
      ref={rootRef}
      className="flex min-h-[24rem] cursor-pointer flex-col items-center justify-center gap-14 opacity-0 lg:flex-row lg:gap-28"
    >
      <div className="max-w-[36ch] text-center lg:text-left">
        <svg
          viewBox="0 0 40 40"
          className="mx-auto size-14 lg:mx-0"
          aria-hidden
          fill="none"
        >
          <circle
            data-anel=""
            cx="20"
            cy="20"
            r="18"
            className="stroke-primary"
            strokeWidth="1.5"
            style={{ transformOrigin: "center" }}
          />
          <path
            data-visto=""
            d="M12 20.5 17.5 26 28 15"
            className="stroke-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="34"
          />
        </svg>

        {/* Os textos nascem vazios: quem escreve é o GSAP. `aria-hidden` evita
            que o leitor de tela anuncie as frases letra a letra — o título de
            verdade, já no DOM do modal, é quem carrega a semântica. */}
        <p
          data-linha1=""
          aria-hidden
          className="site-label mt-9 min-h-[1em] text-muted-foreground"
        />
        <p data-linha2="" aria-hidden className="site-h3 mt-3 min-h-[1.2em]" />
        <p
          data-linha3=""
          aria-hidden
          className="site-lead mt-6 min-h-[1.4em] text-pretty text-muted-foreground"
        />
      </div>

      {/* Diagrama, não interface: pílulas sem texto, para ninguém tentar
          clicar nelas achando que já é a lista. */}
      <div
        data-palco=""
        className="relative w-[15rem] shrink-0"
        role="img"
        aria-label={intro.demoAlt}
      >
        <div className="flex flex-col gap-3.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-pilula={i}
              data-marcada="false"
              className="group flex items-center gap-3 rounded-full border border-border px-5 py-3 transition-colors duration-150 data-[marcada=true]:border-foreground data-[marcada=true]:bg-foreground"
              style={{ transformOrigin: "center" }}
            >
              <span className="size-2 shrink-0 rounded-full border border-muted-foreground group-data-[marcada=true]:border-background group-data-[marcada=true]:bg-background" />
              <span className="h-1.5 flex-1 rounded-full bg-muted-foreground/30 group-data-[marcada=true]:bg-background/45" />
            </div>
          ))}
        </div>

        {/* O botão do diagrama é igual ao de verdade, inclusive na cor: é ele
            que o cliente precisa reconhecer quando a grade aparecer. */}
        <div
          data-botao=""
          className="mt-7 ml-auto w-fit rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          style={{ transformOrigin: "center" }}
        >
          {intro.demoCta}
        </div>

        <svg
          data-cursor=""
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-0 left-0 size-6 opacity-0 drop-shadow"
          aria-hidden
          style={{ transformOrigin: "top left" }}
        >
          <path
            d="M1 1l5.5 13 2-5.5L14 6.5z"
            className="fill-background stroke-foreground"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
