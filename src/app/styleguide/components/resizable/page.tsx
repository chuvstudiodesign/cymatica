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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Pane({ label }: { label: string }) {
  return (
    <div className="flex size-full items-center justify-center p-6">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ResizablePage() {
  return (
    <DocPage
      title="Resizable"
      description="Painéis com divisórias arrastáveis. Base de layouts tipo editor, com tamanhos persistíveis."
      importPath={`import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable"`}
      tags={["Layout"]}
    >
      <DocSection title="Horizontal">
        <Demo
          className="block"
          code={`<ResizablePanelGroup orientation="horizontal" className="rounded-lg border">
  <ResizablePanel defaultSize={30}>Sidebar</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={70}>Conteúdo</ResizablePanel>
</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-48 w-full max-w-2xl rounded-lg border"
          >
            <ResizablePanel defaultSize={30}>
              <Pane label="30%" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <Pane label="70%" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </DocSection>

      <DocSection title="Vertical">
        <Demo
          className="block"
          code={`<ResizablePanelGroup orientation="vertical">…</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup
            orientation="vertical"
            className="h-64 w-full max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={40}>
              <Pane label="Topo" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <Pane label="Base" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Com alça visível"
        description="withHandle desenha o punho, deixando claro que a divisória é arrastável."
      >
        <Demo
          className="block"
          code={`<ResizableHandle withHandle />`}
        >
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-48 w-full max-w-2xl rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <Pane label="Esquerda" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Pane label="Direita" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Painéis aninhados"
        description="Um grupo dentro de outro produz layouts de editor completos."
      >
        <Demo
          className="block"
          code={`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={25}>Navegador</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={75}>
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel defaultSize={70}>Editor</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>Terminal</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-64 w-full max-w-2xl rounded-lg border"
          >
            <ResizablePanel defaultSize={25}>
              <Pane label="Navegador" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize={70}>
                  <Pane label="Editor" />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={30}>
                  <Pane label="Terminal" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Limites de tamanho"
        description="minSize e maxSize impedem que um painel fique inutilizável."
      >
        <Demo
          className="block"
          code={`<ResizablePanel defaultSize={30} minSize={20} maxSize={50} />`}
        >
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-40 w-full max-w-2xl rounded-lg border"
          >
            <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
              <Pane label="min 20% · max 50%" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <Pane label="livre" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-32 w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <Pane label="A" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Pane label="B" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["ResizablePanelGroup", "Contêiner. Define orientation e pode persistir o layout."],
            ["ResizablePanel", "Um painel. Aceita defaultSize, minSize, maxSize e collapsible."],
            ["ResizableHandle", "Divisória arrastável. withHandle desenha o punho."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description:
                "Em ResizablePanelGroup: eixo do redimensionamento. Esta versão usa orientation, não direction.",
            },
            {
              name: "defaultLayout",
              type: "{ [panelId: string]: number }",
              description:
                "Em ResizablePanelGroup: layout inicial. Combine com onLayoutChanged para persistir entre visitas.",
            },
            {
              name: "onLayoutChange / onLayoutChanged",
              type: "(layout: { [panelId: string]: number }) => void",
              description:
                "Disparado durante e ao final do arraste. Use o segundo para salvar.",
            },
            {
              name: "defaultSize",
              type: "number | string",
              description: "Tamanho inicial do painel, em porcentagem.",
            },
            {
              name: "minSize / maxSize",
              type: "number | string",
              description: "Limites em porcentagem.",
            },
            {
              name: "collapsible",
              type: "boolean",
              def: "false",
              description: "Permite recolher o painel até collapsedSize.",
            },
            {
              name: "withHandle",
              type: "boolean",
              def: "false",
              description: "Em ResizableHandle: exibe o punho visual.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A divisória é focável e ajustável por teclado — arrastar com o mouse nunca pode ser o único caminho.",
            "Use withHandle quando a divisória não for óbvia: uma linha de 1px é um alvo pequeno demais para muita gente.",
            "Defina minSize para que nenhum painel possa ser reduzido a ponto de esconder seu conteúdo por completo.",
            "Persistindo o layout com defaultLayout e onLayoutChanged, a escolha sobrevive a recarga, o que ajuda quem precisou ampliar um painel.",
          ]}
          keyboard={[
            ["Tab", "Move o foco para a divisória."],
            ["← →", "Redimensiona no eixo horizontal."],
            ["↑ ↓", "Redimensiona no eixo vertical."],
            ["Home / End", "Leva o painel ao tamanho mínimo ou máximo."],
            ["Enter", "Recolhe ou expande um painel collapsible."],
          ]}
          aria={[
            'role="separator" na divisória',
            "aria-valuenow / aria-valuemin / aria-valuemax — tamanho atual do painel",
            "aria-controls — painel redimensionado",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
