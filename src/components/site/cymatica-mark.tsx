import { cn } from "@/lib/utils"
import { markPaths, type MarkVariant } from "./mark-paths"

type CymaticaMarkProps = React.ComponentProps<"svg"> & {
  variant?: MarkVariant
  /** Sem título o símbolo é decorativo e sai da árvore de acessibilidade. */
  title?: string
}

/**
 * O símbolo da Cymatica. Herda a cor do contexto via `currentColor`, então
 * funciona sobre qualquer fundo sem variante de arquivo.
 */
export function CymaticaMark({
  variant = "plate",
  title,
  className,
  ...props
}: CymaticaMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={cn("size-6", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {markPaths[variant].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

type CymaticaLockupProps = React.ComponentProps<"div"> & {
  variant?: MarkVariant
  markClassName?: string
}

/**
 * Símbolo + wordmark, como nas referências de navegação. A palavra é composta
 * em Figtree, que carrega o mesmo caráter geométrico do logotipo original.
 */
export function CymaticaLockup({
  variant = "plate",
  className,
  markClassName,
  ...props
}: CymaticaLockupProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} {...props}>
      <CymaticaMark variant={variant} className={cn("size-7", markClassName)} />
      <span className="text-[1.0625rem] leading-none font-medium tracking-[-0.02em]">
        Cymatica
      </span>
    </div>
  )
}
