import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** Envelope de conteúdo. O respiro lateral é parte da identidade. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-20", className)}
      {...props}
    />
  )
}

export function Section({
  className,
  bleed = false,
  ...props
}: React.ComponentProps<"section"> & { bleed?: boolean }) {
  return (
    <section className={cn("py-28 md:py-40 lg:py-52", className)} {...props}>
      {bleed ? props.children : <Container>{props.children}</Container>}
    </section>
  )
}

/**
 * Ilha clara dentro da página escura.
 *
 * `globals.css` declara `.light` espelhando `:root` justamente para isto — os
 * tokens inteiros são reapontados dentro do bloco, então tudo que estiver aqui
 * dentro (borda, texto secundário, marca) se ajusta sozinho. Não há cor nova
 * envolvida, só o mesmo sistema lido no outro tema.
 */
export function LightSection({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("light bg-background py-28 text-foreground md:py-40 lg:py-52", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function SectionLabel({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("site-label text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

export function Reveal({
  delay,
  className,
  ...props
}: React.ComponentProps<"div"> & { delay?: number }) {
  return (
    <div data-reveal="" data-reveal-delay={delay} className={className} {...props} />
  )
}

/**
 * CTA em escala editorial. Compõe o Button do design system.
 *
 * Quando recebe `render` (um `<Link>`, por exemplo), o elemento final é uma
 * âncora e não um `<button>`, e ele precisa ser anunciado como link.
 *
 * `nativeButton={false}` sozinho fazia o oposto do que este comentário
 * prometia. Verificado em `internals/use-button/useButton.js:183`: o Base UI
 * decide entre `type="button"` e `role="button"` por esse sinalizador — com
 * `false`, ele conclui que o elemento não é botão nativo e **acrescenta**
 * `role="button"` para preservar a semântica. Era exatamente o que se queria
 * evitar: leitor de tela anunciava "botão" numa âncora, e o usuário perdia o
 * que se espera de um link (abrir em nova aba, copiar o endereço).
 *
 * `role="link"` desfaz isso: o `role` do consumidor entra depois na mesclagem
 * e sobrescreve o do primitivo. É explícito onde a âncora já teria o papel
 * implícito, e é isso que o torna à prova do primitivo. O sinalizador continua
 * em `false` porque ele também governa `type`, e `type="button"` numa âncora é
 * inválido.
 *
 * Vale porque todo `render` deste projeto é navegação — `<Link>` ou `<a>`. Um
 * `render` que não navegue precisaria passar o próprio `role`.
 */
export function CtaButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      nativeButton={props.render ? false : undefined}
      role={props.render ? "link" : undefined}
      className={cn(
        "h-13 rounded-full px-7 text-[0.9375rem] font-medium",
        // O `ring-ring/50` do design system mede 2,24:1 no escuro e 1,88:1 na
        // ilha clara, contra os 3:1 da WCAG 1.4.11 — e some por completo sobre
        // o próprio botão laranja. Em opacidade cheia vai a 5,78:1 e 3,24:1.
        // Sobrescrito aqui porque `ui/button.tsx` é do design system.
        "focus-visible:ring-ring",
        "transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
      {...props}
    />
  )
}

export function Rule({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("site-rule w-full", className)} {...props} />
}
