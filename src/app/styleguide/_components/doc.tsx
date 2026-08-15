"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  DocPage                                   */
/* -------------------------------------------------------------------------- */

export function DocPage({
  title,
  description,
  importPath,
  tags,
  children,
}: {
  title: string;
  description: string;
  /** The exact import line consumers should copy. */
  importPath: string;
  tags?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 p-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Component</Badge>
          {tags?.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
        <CodeBlock code={importPath} />
      </header>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Section                                   */
/* -------------------------------------------------------------------------- */

export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      <Separator className="mt-3" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Demo                                    */
/* -------------------------------------------------------------------------- */

export function Demo({
  title,
  description,
  code,
  className,
  children,
}: {
  title?: string;
  description?: string;
  /** Source for the preview rendered directly above it. */
  code?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-h-24 flex-wrap items-center gap-4 rounded-xl border bg-card p-6",
          className,
        )}
      >
        {children}
      </div>
      {code ? <CodeBlock code={code} /> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 CodeBlock                                  */
/* -------------------------------------------------------------------------- */

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4">
      <code className="font-mono text-xs leading-relaxed text-foreground">
        {code.trim()}
      </code>
    </pre>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 PropsTable                                 */
/* -------------------------------------------------------------------------- */

export interface PropRow {
  name: string;
  type: string;
  def?: string;
  description: string;
}

export function PropsTable({
  rows,
  caption,
}: {
  rows: PropRow[];
  caption?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {caption ? (
        <p className="font-mono text-xs text-muted-foreground">{caption}</p>
      ) : null}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="p-3 font-medium">Prop</th>
              <th className="p-3 font-medium">Tipo</th>
              <th className="p-3 font-medium">Padrão</th>
              <th className="p-3 font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b last:border-0 align-top">
                <td className="p-3">
                  <code className="font-mono text-xs">{r.name}</code>
                </td>
                <td className="p-3">
                  <code className="font-mono text-xs text-muted-foreground">
                    {r.type}
                  </code>
                </td>
                <td className="p-3">
                  <code className="font-mono text-xs text-muted-foreground">
                    {r.def ?? "—"}
                  </code>
                </td>
                <td className="p-3 text-muted-foreground">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Anatomy list                                */
/* -------------------------------------------------------------------------- */

export function Anatomy({ parts }: { parts: [string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {parts.map(([name, desc]) => (
            <tr key={name} className="border-b last:border-0 align-top">
              <td className="w-72 p-3">
                <code className="font-mono text-xs">{name}</code>
              </td>
              <td className="p-3 text-muted-foreground">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Accessibility box                             */
/* -------------------------------------------------------------------------- */

export function A11y({
  notes,
  keyboard,
  aria,
}: {
  notes?: string[];
  keyboard?: [string, string][];
  aria?: string[];
}) {
  return (
    <div className="flex flex-col gap-5">
      {notes?.length ? (
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}

      {keyboard?.length ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Teclado
          </h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {keyboard.map(([key, action]) => (
                  <tr key={key} className="border-b last:border-0 align-top">
                    <td className="w-56 p-3">
                      <kbd className="rounded-md border bg-muted px-2 py-1 font-mono text-xs">
                        {key}
                      </kbd>
                    </td>
                    <td className="p-3 text-muted-foreground">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {aria?.length ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ARIA
          </h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
            {aria.map((a) => (
              <li key={a}>
                <code className="font-mono text-xs">{a}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Light / dark side-by-side                         */
/* -------------------------------------------------------------------------- */

/**
 * Renders the same children twice, forcing one copy into light and one into dark
 * by scoping the theme class, so both themes are verifiable on a single screen.
 */
export function ThemePreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="light flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Light
        </span>
        <div className="flex min-h-24 flex-wrap items-center gap-4 rounded-xl border bg-background p-6 text-foreground">
          {children}
        </div>
      </div>
      <div className="dark flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Dark
        </span>
        <div className="flex min-h-24 flex-wrap items-center gap-4 rounded-xl border bg-background p-6 text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
