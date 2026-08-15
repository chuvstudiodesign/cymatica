import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Primitivas de composição do site.
 *
 * Nenhuma delas duplica um componente do design system — `CtaButton` compõe o
 * `Button` existente, só ampliando a escala para uso editorial.
 */

/** Envelope de conteúdo. O respiro lateral é parte da identidade. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-20", className)}
      {...props}
    />
  )
}

/** Seção com o espaçamento vertical generoso do sistema. */
export function Section({
  className,
  bleed = false,
  ...props
}: React.ComponentProps<"section"> & { bleed?: boolean }) {
  return (
    <section className={cn("py-28 md:py-40 lg:py-56", className)} {...props}>
      {bleed ? props.children : <Container>{props.children}</Container>}
    </section>
  )
}

/** Etiqueta de seção — mono, caixa alta, cinza. Nomeia, não explica. */
export function SectionLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("site-label text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

/**
 * Marca um elemento para a revelação por scroll. O estado inicial vive no CSS
 * e o GSAP anima a partir dele, então não há flash de conteúdo posicionado.
 */
export function Reveal({
  delay,
  className,
  ...props
}: React.ComponentProps<"div"> & { delay?: number }) {
  return (
    <div
      data-reveal=""
      data-reveal-delay={delay}
      className={className}
      {...props}
    />
  )
}

/**
 * CTA em escala editorial. Compõe o Button do design system.
 *
 * Quando recebe `render` (um `<Link>`, por exemplo), o elemento final é uma
 * âncora e não um `<button>` — `nativeButton={false}` evita que a semântica de
 * botão fique sobre um `<a>`.
 */
export function CtaButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
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

/** Divisor com a textura de onda estacionária da marca. */
export function Rule({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("site-rule w-full", className)} {...props} />
}
