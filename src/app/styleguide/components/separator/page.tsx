"use client";

import {
  A11y,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Separator } from "@/components/ui/separator";

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="Divisória entre grupos de conteúdo. Semântica ou decorativa, conforme o papel que cumpre."
      importPath={`import { Separator } from "@/components/ui/separator"`}
      tags={["Base UI", "Layout"]}
    >
      <DocSection title="Horizontal">
        <Demo
          className="block"
          code={`<div>
  <h4>Cymatica</h4>
  <p>Estúdio de design</p>
</div>
<Separator className="my-4" />
<div>Conteúdo seguinte</div>`}
        >
          <div className="w-full max-w-md">
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Cymatica</h4>
              <p className="text-sm text-muted-foreground">
                Estúdio de design de marca.
              </p>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              A forma mais simples de desenvolver a sua marca.
            </p>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Vertical"
        description="Precisa de uma altura definida no contêiner para aparecer."
      >
        <Demo
          code={`<div className="flex h-6 items-center gap-4">
  <span>Marca</span>
  <Separator orientation="vertical" />
  <span>Site</span>
  <Separator orientation="vertical" />
  <span>Social</span>
</div>`}
        >
          <div className="flex h-6 items-center gap-4 text-sm">
            <span>Marca</span>
            <Separator orientation="vertical" />
            <span>Site</span>
            <Separator orientation="vertical" />
            <span>Social</span>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Em uma lista"
        description="Use divisórias entre itens apenas quando o espaçamento sozinho não separa o suficiente."
      >
        <Demo
          className="block"
          code={`{items.map((item, i) => (
  <React.Fragment key={item}>
    {i > 0 ? <Separator /> : null}
    <div className="py-3">{item}</div>
  </React.Fragment>
))}`}
        >
          <div className="w-full max-w-md">
            {["Identidade visual", "Site institucional", "Social kit"].map(
              (item, i) => (
                <div key={item}>
                  {i > 0 ? <Separator /> : null}
                  <div className="py-3 text-sm">{item}</div>
                </div>
              ),
            )}
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <p className="pb-3 text-sm">Acima</p>
            <Separator />
            <p className="pt-3 text-sm">Abaixo</p>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description:
                "Direção da linha. A vertical exige altura no contêiner pai.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Classes extras — margens, cor ou espessura personalizadas.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Uma divisória puramente visual deve ser escondida dos leitores de tela com aria-hidden, senão vira ruído repetido.",
            "Quando a linha realmente separa seções de significado diferente, mantenha role=\"separator\" para que seja anunciada.",
            "Não use Separator para criar espaçamento: para isso existe gap e margin.",
            "A cor vem de --border, com contraste suficiente nos dois temas sem precisar de ajuste.",
          ]}
          aria={[
            'role="separator" — divisória com significado',
            'aria-orientation="vertical" — quando não é horizontal',
            'aria-hidden="true" — divisória decorativa',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
