"use client"

import { useEffect, useState } from "react"
import { ScrollSmoother } from "gsap/ScrollSmoother"

import { CymaticaLockup } from "@/components/site/cymatica-mark"
import { cn } from "@/lib/utils"

/**
 * A barra da proposta, reduzida a uma lingueta.
 *
 * A navegação normal do site sai daqui de propósito. Projetos, Serviços,
 * Sobre e Contato levariam o cliente para fora de um documento que tem preço,
 * prazo e um botão de envio — a proposta é o lugar onde ele deve ficar. Sem
 * links, sobra a marca, e sem menu não há razão para uma barra de ponta a
 * ponta.
 *
 * Daí a forma: um notch preso ao topo, cantos arredondados só embaixo, largura
 * do próprio conteúdo. É a mesma superfície da barra do site — a mesma borda,
 * o mesmo `bg-popover/80`, o mesmo desfoque e a mesma transição —, só que
 * recortada.
 *
 * Diferente da barra do site, o fundo já vem desde o topo, sem esperar o
 * scroll: uma lingueta invisível sobre o herói seria um logotipo flutuando
 * solto, sem nada que explicasse o formato.
 */
export function PropostaNotch() {
  const [overLight, setOverLight] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Mesma sonda da barra do site: se o ponto logo abaixo do notch cair
      // dentro de uma ilha `.light`, ele acompanha o tema em vez de virar um
      // bloco escuro sobre papel.
      const probe = document.elementFromPoint(window.innerWidth / 2, 30)
      setOverLight(Boolean(probe?.closest(".light")))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /**
   * Sobe ao topo desta página, e não navega para a home.
   *
   * O salto nativo não serve: o ScrollSmoother aplica `transform` em
   * `#smooth-content`, então a posição que o navegador calcula é a
   * transformada. `scrollTop(0)` faz a conta no espaço do smoother e desliza
   * com a mesma inércia do resto da página.
   */
  function subir() {
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(0, true)
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center",
        overLight && "light"
      )}
    >
      <button
        type="button"
        onClick={subir}
        aria-label="Voltar ao topo da proposta"
        className={cn(
          "pointer-events-auto rounded-b-[1.75rem] border border-t-0 border-border",
          "bg-popover/80 px-8 py-3.5 text-foreground backdrop-blur-xl",
          // Nada de deslocar no hover: a lingueta nasce colada na borda de
          // cima, e qualquer translação abre um vão entre ela e o topo da
          // tela. O realce acontece na própria superfície.
          "transition-[background-color,border-color] duration-300",
          "outline-none hover:border-foreground/25 hover:bg-popover",
          "focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset",
          "motion-reduce:transition-none"
        )}
      >
        <CymaticaLockup />
      </button>
    </div>
  )
}
