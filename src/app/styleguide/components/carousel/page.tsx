"use client";

import * as React from "react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

function Slide({ n }: { n: number }) {
  return (
    <Card className="flex aspect-square items-center justify-center p-6">
      <span className="font-mono text-3xl text-muted-foreground">{n}</span>
    </Card>
  );
}

function ApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onStoreChange);
      api.on("reInit", onStoreChange);
      return () => {
        api.off("select", onStoreChange);
        api.off("reInit", onStoreChange);
      };
    },
    [api],
  );

  const current = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 0),
    () => 0,
  );
  const count = React.useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0,
  );

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem key={i}>
              <Slide n={i + 1} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <span className="text-center font-mono text-xs text-muted-foreground">
        {current} de {count}
      </span>
    </div>
  );
}

export default function CarouselPage() {
  return (
    <DocPage
      title="Carousel"
      description="Slides navegáveis sobre o Embla. Suporta arrasto, teclado, múltiplos itens por vista e orientação vertical."
      importPath={`import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"`}
      tags={["Embla", "Layout"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i}>
        <Card>{item}</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        >
          <div className="flex w-full justify-center px-12">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <Slide n={i + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Vários por vista"
        description="A largura vem das classes do CarouselItem, não de uma prop."
      >
        <Demo
          className="block"
          code={`<CarouselItem className="basis-1/2 md:basis-1/3">…</CarouselItem>`}
        >
          <div className="flex w-full justify-center px-12">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, i) => (
                  <CarouselItem key={i} className="basis-1/2 md:basis-1/3">
                    <Slide n={i + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Loop infinito"
        description="opts repassa qualquer configuração do Embla."
      >
        <Demo
          className="block"
          code={`<Carousel opts={{ loop: true, align: "start" }}>…</Carousel>`}
        >
          <div className="flex w-full justify-center px-12">
            <Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <Slide n={i + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Vertical">
        <Demo
          className="block"
          code={`<Carousel orientation="vertical" className="w-full max-w-xs">
  <CarouselContent className="-mt-1 h-64">
    <CarouselItem className="pt-1 basis-1/2">…</CarouselItem>
  </CarouselContent>
</Carousel>`}
        >
          <div className="flex w-full justify-center py-12">
            <Carousel
              orientation="vertical"
              className="w-full max-w-[180px]"
            >
              <CarouselContent className="-mt-1 h-64">
                {Array.from({ length: 5 }).map((_, i) => (
                  <CarouselItem key={i} className="basis-1/2 pt-1">
                    <Slide n={i + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com a API (interativo)"
        description="setApi entrega a instância do Embla. Leia a posição com useSyncExternalStore, não espelhando em estado."
      >
        <Demo
          className="block"
          code={`const [api, setApi] = React.useState<CarouselApi>()

// Lê direto do Embla — evita setState dentro de efeito.
const subscribe = React.useCallback((onStoreChange: () => void) => {
  if (!api) return () => {}
  api.on("select", onStoreChange)
  api.on("reInit", onStoreChange)
  return () => {
    api.off("select", onStoreChange)
    api.off("reInit", onStoreChange)
  }
}, [api])

const current = React.useSyncExternalStore(
  subscribe,
  () => (api ? api.selectedScrollSnap() + 1 : 0),
  () => 0,
)

<Carousel setApi={setApi}>…</Carousel>`}
        >
          <div className="flex w-full justify-center px-12">
            <ApiDemo />
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full px-10">
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <Slide n={i + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Carousel", "Raiz. Recebe opts, orientation e setApi."],
            ["CarouselContent", "Trilho que desliza. Aceite altura aqui no modo vertical."],
            ["CarouselItem", "Um slide. A largura vem de basis-* nas classes."],
            ["CarouselPrevious / CarouselNext", "Botões de navegação, desabilitados nas pontas."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "opts",
              type: "EmblaOptionsType",
              description:
                "Configuração do Embla: loop, align, dragFree, slidesToScroll…",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description: "Eixo de rolagem e teclas de navegação.",
            },
            {
              name: "setApi",
              type: "(api: CarouselApi) => void",
              description:
                "Recebe a instância do Embla para controle externo e leitura de estado.",
            },
            {
              name: "plugins",
              type: "EmblaPluginType[]",
              description: "Plugins do Embla, como autoplay.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A raiz recebe role=\"region\" com aria-roledescription=\"carousel\" e responde às setas do teclado.",
            "Cada slide é anunciado como \"slide X de Y\" — não repita essa informação no conteúdo.",
            "Nunca use autoplay sem um controle de pausa: movimento automático prejudica leitura e atenção.",
            "Não coloque conteúdo essencial apenas em slides posteriores; muita gente não navega além do primeiro.",
            "Os botões de navegação já ficam disabled nas extremidades quando loop está desligado.",
          ]}
          keyboard={[
            ["← →", "Slide anterior ou seguinte (orientação horizontal)."],
            ["↑ ↓", "Slide anterior ou seguinte (orientação vertical)."],
            ["Tab", "Move para os botões e para os elementos focáveis dos slides."],
          ]}
          aria={[
            'role="region" com aria-roledescription="carousel"',
            'role="group" e aria-roledescription="slide" em cada item',
            "aria-label — nome do carrossel, ex.: \"Projetos recentes\"",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
