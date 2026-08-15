"use client";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <DocPage
      title="Skeleton"
      description="Placeholder animado que ocupa o espaço do conteúdo enquanto ele carrega, evitando o salto de layout."
      importPath={`import { Skeleton } from "@/components/ui/skeleton"`}
      tags={["Feedback", "Layout"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Skeleton className="h-4 w-48" />
<Skeleton className="size-12 rounded-full" />`}
        >
          <Skeleton className="h-4 w-48" />
          <Skeleton className="size-12 rounded-full" />
        </Demo>
      </DocSection>

      <DocSection
        title="Bloco de texto"
        description="Varie a largura da última linha para imitar o ritmo de um parágrafo real."
      >
        <Demo
          className="block"
          code={`<div className="flex flex-col gap-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Card em carregamento"
        description="O esqueleto deve espelhar a estrutura final — mesmas alturas, mesmo espaçamento."
      >
        <Demo
          className="block"
          code={`<Card>
  <CardHeader className="flex flex-row items-center gap-4">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
  </CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </Demo>
      </DocSection>

      <DocSection title="Lista">
        <Demo
          className="block"
          code={`{Array.from({ length: 3 }).map((_, i) => (
  <div key={i} className="flex items-center gap-4">
    <Skeleton className="size-9 rounded-md" />
    <Skeleton className="h-4 flex-1" />
    <Skeleton className="h-4 w-16" />
  </div>
))}`}
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="size-9 rounded-md" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Região anunciada"
        description="Envolva o esqueleto em uma região aria-busy para que a espera seja comunicada."
      >
        <Demo
          className="block"
          code={`<div role="status" aria-busy="true" aria-live="polite">
  <span className="sr-only">Carregando propostas…</span>
  <Skeleton className="h-4 w-full" />
</div>`}
        >
          <div
            role="status"
            aria-busy="true"
            aria-live="polite"
            className="flex w-full max-w-md flex-col gap-2"
          >
            <span className="sr-only">Carregando propostas…</span>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "className",
              type: "string",
              description:
                "Define a forma: largura, altura e raio. É o único ajuste necessário na prática.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Um esqueleto sozinho é invisível para leitores de tela: envolva em role=\"status\" com um texto em sr-only descrevendo o que carrega.",
            "Use aria-busy=\"true\" enquanto carrega e remova ao terminar, para que a mudança seja percebida.",
            "A animação de pulso respeita prefers-reduced-motion através das utilidades do Tailwind.",
            "Se o carregamento passa de alguns segundos, prefira uma mensagem explícita a um esqueleto que pulsa indefinidamente.",
          ]}
          aria={[
            'role="status" — região de carregamento',
            'aria-busy="true" — enquanto o conteúdo não chegou',
            'aria-live="polite" — anuncia sem interromper',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
