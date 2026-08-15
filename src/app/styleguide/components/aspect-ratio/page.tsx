"use client";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex size-full items-center justify-center rounded-lg bg-muted font-mono text-xs text-muted-foreground">
      {label}
    </div>
  );
}

export default function AspectRatioPage() {
  return (
    <DocPage
      title="Aspect Ratio"
      description="Mantém uma proporção fixa enquanto a largura varia. Evita o salto de layout ao carregar imagens e vídeos."
      importPath={`import { AspectRatio } from "@/components/ui/aspect-ratio"`}
      tags={["Layout"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<AspectRatio ratio={16 / 9}>
  <img src="/capa.jpg" alt="" className="size-full rounded-lg object-cover" />
</AspectRatio>`}
        >
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <Placeholder label="16 / 9" />
            </AspectRatio>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Proporções comuns"
        description="ratio recebe o resultado da divisão, não uma string."
      >
        <Demo
          className="block"
          code={`<AspectRatio ratio={1} />        {/* quadrado */}
<AspectRatio ratio={4 / 3} />
<AspectRatio ratio={16 / 9} />
<AspectRatio ratio={21 / 9} />   {/* cinemascope */}
<AspectRatio ratio={3 / 4} />    {/* retrato */}`}
        >
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            <AspectRatio ratio={1}>
              <Placeholder label="1 / 1" />
            </AspectRatio>
            <AspectRatio ratio={4 / 3}>
              <Placeholder label="4 / 3" />
            </AspectRatio>
            <AspectRatio ratio={16 / 9}>
              <Placeholder label="16 / 9" />
            </AspectRatio>
            <AspectRatio ratio={21 / 9}>
              <Placeholder label="21 / 9" />
            </AspectRatio>
            <AspectRatio ratio={3 / 4}>
              <Placeholder label="3 / 4" />
            </AspectRatio>
            <AspectRatio ratio={2 / 3}>
              <Placeholder label="2 / 3" />
            </AspectRatio>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com next/image"
        description="Com fill, a imagem preenche o contêiner e o AspectRatio garante o espaço reservado."
      >
        <Demo
          className="block"
          code={`<AspectRatio ratio={16 / 9}>
  <Image
    src="/projetos/capa.jpg"
    alt="Identidade visual da Cymatica"
    fill
    sizes="(max-width: 768px) 100vw, 640px"
    className="rounded-lg object-cover"
  />
</AspectRatio>`}
        >
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <Placeholder label="next/image fill" />
            </AspectRatio>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Placeholder label="16 / 9" />
            </AspectRatio>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "ratio",
              type: "number",
              def: "1",
              description:
                "Proporção largura/altura já calculada, ex.: 16 / 9 para widescreen.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes extras aplicadas ao contêiner.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description:
                "Conteúdo esticado ao contêiner. Use object-cover em mídias.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "O componente é puramente visual e não adiciona semântica: o alt da imagem interna continua sendo obrigatório.",
            "Reservar o espaço evita Cumulative Layout Shift, que prejudica principalmente quem usa ampliação de tela.",
            "Vídeos dentro de AspectRatio ainda precisam de legendas e de controles acessíveis.",
            "Imagens decorativas devem usar alt=\"\" para serem ignoradas por leitores de tela.",
          ]}
          aria={[
            "alt — sempre no elemento de mídia interno",
            'aria-hidden="true" — se toda a mídia for decorativa',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
