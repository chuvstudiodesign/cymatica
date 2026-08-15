import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Typography
 *
 * O shadcn documenta tipografia como uma página de exemplos, sem item de
 * registry. Aqui ela vira componentes reais, presos aos tokens do projeto:
 * a família vem de --font-heading e --font-sans, e o tracking negativo dos
 * títulos reproduz o ajuste ótico das referências da marca.
 */

type El<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;

export function H1({ className, ...props }: El<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-balance font-heading text-4xl font-bold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: El<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 font-heading text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: El<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-heading text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: El<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-heading text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function P({ className, ...props }: El<"p">) {
  return (
    <p
      className={cn("leading-7 not-first:mt-6", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: El<"p">) {
  return (
    <p
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  );
}

export function Large({ className, ...props }: El<"div">) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}

export function Small({ className, ...props }: El<"small">) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: El<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function Blockquote({ className, ...props }: El<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
}

export function InlineCode({ className, ...props }: El<"code">) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function List({ className, ...props }: El<"ul">) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export function OrderedList({ className, ...props }: El<"ol">) {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  );
}

export function Anchor({ className, ...props }: El<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:no-underline",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Prose — aplica a escala inteira a HTML não controlado (CMS, Markdown),
 * onde não dá para usar os componentes acima elemento por elemento.
 */
export function Prose({ className, ...props }: El<"div">) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        "[&_h1]:mt-10 [&_h1]:scroll-m-20 [&_h1]:font-heading [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:scroll-m-20 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight",
        "[&_p]:leading-7 [&_p:not(:first-child)]:mt-6",
        "[&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:my-6 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mt-2",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_hr]:my-8 [&_hr]:border-border",
        className,
      )}
      {...props}
    />
  );
}
