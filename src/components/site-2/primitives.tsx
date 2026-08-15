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
 * âncora e não um `<button>`. O Base UI precisa saber disso: sem
 * `nativeButton={false}` ele mantém a semântica de botão sobre um `<a>`, o que
 * confunde leitor de tela e quebra o comportamento esperado de navegação.
 */
export function CtaButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      nativeButton={props.render ? false : undefined}
      className={cn(
        "h-13 rounded-full px-7 text-[0.9375rem] font-medium",
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
