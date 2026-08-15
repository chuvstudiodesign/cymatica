"use client"

import TextPressure from "@/components/reactbits/text-pressure"
import CurvedLoop from "@/components/reactbits/curved-loop"
import FuzzyText from "@/components/reactbits/fuzzy-text"
import DecryptedText from "@/components/reactbits/decrypted-text"
import ScrollFloat from "@/components/reactbits/scroll-float"
import ScrollVelocity from "@/components/reactbits/scroll-velocity"
import ScrambledText from "@/components/reactbits/scrambled-text"
import ShinyText from "@/components/reactbits/shiny-text"

/**
 * Aba React Bits do design system.
 *
 * Coleção separada de propósito: estes componentes vêm de fora
 * (reactbits.dev, MIT + Commons Clause), vivem em `src/components/reactbits/`
 * e não fazem parte da biblioteca shadcn em `src/components/ui/`.
 *
 * Todos foram adaptados ao projeto: `"use client"` adicionado, cores trocadas
 * por tokens da Cymatica e tratamento de `prefers-reduced-motion` onde faltava.
 */

type DemoProps = {
  name: string
  command: string
  description: string
  notes?: string
  height?: string
  children: React.ReactNode
}

function Demo({ name, command, description, notes, height = "h-56", children }: DemoProps) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        <p className="mt-1 max-w-[68ch] text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div
        className={`${height} grid place-items-center overflow-hidden rounded-xl border bg-card px-6`}
      >
        {children}
      </div>

      <code className="rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
        {command}
      </code>

      {notes && (
        <p className="border-l-2 border-primary/40 pl-3 text-xs text-muted-foreground">
          {notes}
        </p>
      )}
    </section>
  )
}

export default function ReactBitsPage() {
  return (
    <div className="flex max-w-4xl flex-col gap-16 py-4">
      <header>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Coleção externa
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">React Bits</h1>
        <p className="mt-4 max-w-[68ch] text-muted-foreground">
          Componentes animados de{" "}
          <a
            href="https://reactbits.dev"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            reactbits.dev
          </a>
          , instalados na variante TypeScript + Tailwind e adaptados aos tokens
          da Cymatica. Ficam em{" "}
          <code className="font-mono text-xs">src/components/reactbits/</code>,
          separados da biblioteca shadcn.
        </p>
      </header>

      <Demo
        name="TextPressure"
        command="npx shadcn@latest add @react-bits/TextPressure-TS-TW"
        description="Cada caractere responde à proximidade do cursor deformando o peso da fonte. Usado no wordmark do herói."
        notes="Adaptado: usa a Figtree do projeto (variável em `wght`), sem @import externo. Os eixos `wdth` e `ital` ficam desligados porque a Figtree não os expõe. Ganhou a prop `as` para não emitir um segundo <h1> na página."
        height="h-40"
      >
        <div className="h-24 w-full">
          <TextPressure as="div" text="CYMATICA" minFontSize={36} />
        </div>
      </Demo>

      <Demo
        name="CurvedLoop"
        command="npx shadcn@latest add @react-bits/CurvedLoop-TS-TW"
        description="Marquee sobre um caminho curvo em SVG. Fecha a home, acima do último CTA."
      >
        <div className="w-full text-muted-foreground">
          <CurvedLoop
            marqueeText="Vibração ✦ vira ✦ forma ✦"
            speed={1.2}
            curveAmount={160}
            interactive={false}
            className="fill-current"
          />
        </div>
      </Demo>

      <Demo
        name="FuzzyText"
        command="npx shadcn@latest add @react-bits/FuzzyText-TS-TW"
        description="Texto desenhado em canvas com deslocamento por varredura. É o 404 do site."
        notes="Adaptado: a cor padrão virou `currentColor`, resolvida via getComputedStyle — canvas não interpreta a palavra-chave sozinho."
      >
        <FuzzyText fontSize="clamp(2rem, 8vw, 5rem)" baseIntensity={0.14}>
          404
        </FuzzyText>
      </Demo>

      <Demo
        name="DecryptedText"
        command="npx shadcn@latest add @react-bits/DecryptedText-TS-TW"
        description="O texto se resolve a partir de caracteres embaralhados. Abre a seção sobre IA no processo."
        height="h-32"
      >
        <p className="text-2xl font-medium">
          <DecryptedText
            text="IA integrada ao processo."
            animateOn="view"
            sequential
            speed={30}
            useOriginalCharsOnly
            encryptedClassName="text-muted-foreground"
          />
        </p>
      </Demo>

      <Demo
        name="ScrambledText"
        command="npx shadcn@latest add @react-bits/ScrambledText-TS-TW"
        description="Embaralha os caracteres sob o cursor e os recompõe. Bom para blocos curtos de destaque."
        height="h-32"
      >
        <ScrambledText className="text-center text-lg" radius={90} duration={1}>
          Passe o cursor sobre este texto
        </ScrambledText>
      </Demo>

      <Demo
        name="ShinyText"
        command="npx shadcn@latest add @react-bits/ShinyText-TS-TW"
        description="Varredura de brilho sobre o texto, em gradiente."
        notes="Adaptado: as cores padrão apontam para os tokens `--color-ink-400` e `--color-foreground`."
        height="h-32"
      >
        <ShinyText text="Design é vibração que vira forma" className="text-xl" />
      </Demo>

      <Demo
        name="ScrollFloat"
        command="npx shadcn@latest add @react-bits/ScrollFloat-TS-TW"
        description="Revelação caractere a caractere amarrada ao scroll, via GSAP ScrollTrigger."
        height="h-40"
      >
        <ScrollFloat containerClassName="text-2xl">Role para revelar</ScrollFloat>
      </Demo>

      <Demo
        name="ScrollVelocity"
        command="npx shadcn@latest add @react-bits/ScrollVelocity-TS-TW"
        description="Faixa horizontal cuja velocidade responde à do scroll."
        height="h-40"
      >
        <div className="w-full text-muted-foreground">
          <ScrollVelocity texts={["Cymatica", "Estúdio de design"]} velocity={40} />
        </div>
      </Demo>
    </div>
  )
}
