"use client"

import { ScrollSmoother } from "gsap/ScrollSmoother"

import { CtaButton } from "@/components/site-3/primitives"

/**
 * CTA que rola até uma âncora da própria página.
 *
 * O salto nativo por `href="#id"` não serve aqui. O ScrollSmoother aplica um
 * `transform` em `#smooth-content`, então a posição que o navegador calcula
 * para o alvo é a posição transformada, não a real: o salto cai deslocado, e
 * na sequência o smoother interpola de volta a partir do lugar errado.
 *
 * `smoother.scrollTo(alvo, true, "top 120px")` faz a conta no espaço do
 * smoother e desliza com a mesma inércia do resto da página.
 *
 * O `href` continua no HTML de propósito: sem JavaScript, ou antes da
 * hidratação, o link funciona pelo caminho do navegador. O `preventDefault` só
 * acontece quando há um smoother para assumir o lugar dele.
 */
export function ScrollCta({
  target,
  children,
  ...props
}: React.ComponentProps<typeof CtaButton> & { target: string }) {
  return (
    <CtaButton
      {...props}
      render={
        <a
          href={target}
          onClick={(event) => {
            const smoother = ScrollSmoother.get()
            if (!smoother) return
            event.preventDefault()
            smoother.scrollTo(target, true, "top 120px")
          }}
        />
      }
    >
      {children}
    </CtaButton>
  )
}
