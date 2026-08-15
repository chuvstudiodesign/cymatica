"use client";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 30 }, (_, i) => `Projeto ${i + 1}`);

export default function ScrollAreaPage() {
  return (
    <DocPage
      title="Scroll Area"
      description="Região rolável com barra estilizada e consistente entre navegadores, sem perder a rolagem nativa."
      importPath={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`}
      tags={["Base UI", "Layout"]}
    >
      <DocSection
        title="Vertical"
        description="Defina uma altura no ScrollArea; o conteúdo que exceder passa a rolar."
      >
        <Demo
          className="block"
          code={`<ScrollArea className="h-64 w-full rounded-lg border">
  <div className="p-4">
    {tags.map((tag) => (
      <div key={tag}>
        <div className="py-2 text-sm">{tag}</div>
        <Separator />
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="h-64 w-full max-w-sm rounded-lg border">
            <div className="p-4">
              {tags.map((tag) => (
                <div key={tag}>
                  <div className="py-2 text-sm">{tag}</div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        </Demo>
      </DocSection>

      <DocSection
        title="Horizontal"
        description="Adicione um ScrollBar com orientation horizontal para exibir a barra no eixo X."
      >
        <Demo
          className="block"
          code={`<ScrollArea className="w-full whitespace-nowrap rounded-lg border">
  <div className="flex w-max gap-4 p-4">
    {items.map((i) => <Card key={i} />)}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        >
          <ScrollArea className="w-full max-w-md whitespace-nowrap rounded-lg border">
            <div className="flex w-max gap-4 p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex size-28 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-xs text-muted-foreground"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Demo>
      </DocSection>

      <DocSection
        title="Altura máxima"
        description="Com max-h a área só rola quando o conteúdo realmente ultrapassa o limite."
      >
        <Demo
          className="block"
          code={`<ScrollArea className="max-h-40 rounded-lg border">…</ScrollArea>`}
        >
          <ScrollArea className="max-h-40 w-full max-w-sm rounded-lg border">
            <div className="flex flex-col gap-2 p-4 text-sm text-muted-foreground">
              <p>Identidade visual completa.</p>
              <p>Manual de marca em PDF.</p>
              <p>Kit de aplicação para redes sociais.</p>
              <p>Arquivos editáveis em .ai e .svg.</p>
              <p>Duas rodadas de ajuste incluídas.</p>
              <p>Suporte por 30 dias após a entrega.</p>
            </div>
          </ScrollArea>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <ScrollArea className="h-32 w-full rounded-lg border">
            <div className="flex flex-col gap-2 p-3 text-sm">
              {tags.slice(0, 8).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </ScrollArea>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["ScrollArea", "Contêiner rolável. A altura precisa ser definida aqui."],
            [
              "ScrollBar",
              "Barra estilizada. A vertical é implícita; a horizontal precisa ser adicionada.",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "className",
              type: "string",
              description:
                "Onde a altura ou max-height é definida — sem isso não há rolagem.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              def: '"vertical"',
              description: "Em ScrollBar: eixo da barra.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Conteúdo rolável.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A região rolável precisa ser alcançável por teclado: quem navega por Tab tem que conseguir rolar sem mouse.",
            "Quando o conteúdo é longo e não tem elementos focáveis, dê tabIndex={0} e um rótulo à região para torná-la navegável.",
            "Não esconda a barra completamente: alguma indicação de que há mais conteúdo precisa existir.",
            "Rolagem horizontal sem indicação visual costuma passar despercebida — considere um gradiente nas bordas.",
          ]}
          keyboard={[
            ["↑ ↓", "Rola verticalmente quando a região tem foco."],
            ["Page Up / Page Down", "Rola uma tela por vez."],
            ["Home / End", "Início ou fim do conteúdo."],
            ["Shift + roda", "Rola horizontalmente."],
          ]}
          aria={[
            'role="region" com aria-label — quando a área é conteúdo autônomo',
            "tabIndex={0} — torna a região focável para rolagem por teclado",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
