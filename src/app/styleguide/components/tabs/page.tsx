"use client";

import * as React from "react";
import { BarChart3, Settings, User } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ControlledDemo() {
  const [tab, setTab] = React.useState<string>("conta");
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTrigger value="conta">Conta</TabsTrigger>
          <TabsTrigger value="senha">Senha</TabsTrigger>
        </TabsList>
        <TabsContent value="conta" className="pt-4 text-sm text-muted-foreground">
          Dados da conta.
        </TabsContent>
        <TabsContent value="senha" className="pt-4 text-sm text-muted-foreground">
          Alteração de senha.
        </TabsContent>
      </Tabs>
      <span className="font-mono text-xs text-muted-foreground">
        value: {tab}
      </span>
    </div>
  );
}

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="Alterna entre painéis de conteúdo no mesmo espaço. Use quando as seções são alternativas, não complementares."
      importPath={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`}
      tags={["Base UI", "Navegação"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Tabs defaultValue="conta">
  <TabsList>
    <TabsTrigger value="conta">Conta</TabsTrigger>
    <TabsTrigger value="senha">Senha</TabsTrigger>
  </TabsList>
  <TabsContent value="conta">Dados da conta.</TabsContent>
  <TabsContent value="senha">Alteração de senha.</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="conta" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="conta">Conta</TabsTrigger>
              <TabsTrigger value="senha">Senha</TabsTrigger>
            </TabsList>
            <TabsContent value="conta" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conta</CardTitle>
                  <CardDescription>
                    Altere seus dados e salve quando terminar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Label htmlFor="t-nome">Nome</Label>
                  <Input id="t-nome" defaultValue="Cymatica" />
                </CardContent>
                <CardFooter>
                  <Button>Salvar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="senha" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Senha</CardTitle>
                  <CardDescription>
                    Use ao menos 12 caracteres.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Label htmlFor="t-senha">Nova senha</Label>
                  <Input id="t-senha" type="password" />
                </CardContent>
                <CardFooter>
                  <Button>Alterar senha</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </Demo>
      </DocSection>

      <DocSection
        title="Variantes da lista"
        description="tabsListVariants oferece um fundo sólido ou uma lista sublinhada."
      >
        <Demo
          className="block"
          code={`<TabsList variant="default">…</TabsList>
<TabsList variant="line">…</TabsList>`}
        >
          <div className="flex w-full max-w-md flex-col gap-6">
            <Tabs defaultValue="a">
              <TabsList variant="default">
                <TabsTrigger value="a">Default</TabsTrigger>
                <TabsTrigger value="b">Segunda</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="a">
              <TabsList variant="line">
                <TabsTrigger value="a">Line</TabsTrigger>
                <TabsTrigger value="b">Segunda</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Com ícones">
        <Demo
          className="block"
          code={`<TabsTrigger value="perfil"><User /> Perfil</TabsTrigger>`}
        >
          <Tabs defaultValue="perfil" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="perfil">
                <User /> Perfil
              </TabsTrigger>
              <TabsTrigger value="metricas">
                <BarChart3 /> Métricas
              </TabsTrigger>
              <TabsTrigger value="ajustes">
                <Settings /> Ajustes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="perfil" className="pt-4 text-sm text-muted-foreground">
              Informações do perfil.
            </TabsContent>
            <TabsContent value="metricas" className="pt-4 text-sm text-muted-foreground">
              Desempenho dos últimos 30 dias.
            </TabsContent>
            <TabsContent value="ajustes" className="pt-4 text-sm text-muted-foreground">
              Preferências da conta.
            </TabsContent>
          </Tabs>
        </Demo>
      </DocSection>

      <DocSection title="Vertical">
        <Demo
          className="block"
          code={`<Tabs orientation="vertical" defaultValue="a" className="flex gap-6">…</Tabs>`}
        >
          <Tabs
            orientation="vertical"
            defaultValue="a"
            className="flex w-full max-w-md gap-6"
          >
            <TabsList className="flex-col">
              <TabsTrigger value="a">Geral</TabsTrigger>
              <TabsTrigger value="b">Cobrança</TabsTrigger>
              <TabsTrigger value="c">Equipe</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="a" className="text-sm text-muted-foreground">
                Configurações gerais.
              </TabsContent>
              <TabsContent value="b" className="text-sm text-muted-foreground">
                Método de pagamento e faturas.
              </TabsContent>
              <TabsContent value="c" className="text-sm text-muted-foreground">
                Membros e permissões.
              </TabsContent>
            </div>
          </Tabs>
        </Demo>
      </DocSection>

      <DocSection title="Aba desabilitada">
        <Demo
          className="block"
          code={`<TabsTrigger value="c" disabled>Indisponível</TabsTrigger>`}
        >
          <Tabs defaultValue="a" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="a">Disponível</TabsTrigger>
              <TabsTrigger value="b" disabled>
                Indisponível
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          className="block"
          code={`const [tab, setTab] = React.useState("conta")

<Tabs value={tab} onValueChange={(v) => setTab(String(v))}>…</Tabs>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Tabs defaultValue="a" className="w-full">
            <TabsList>
              <TabsTrigger value="a">Primeira</TabsTrigger>
              <TabsTrigger value="b">Segunda</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="pt-3 text-sm text-muted-foreground">
              Conteúdo.
            </TabsContent>
          </Tabs>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Tabs", "Raiz. Controla a aba ativa e a orientação."],
            ["TabsList", "Barra de gatilhos. Aceita variant."],
            ["TabsTrigger", "Uma aba. Requer value."],
            ["TabsContent", "Painel correspondente. O value precisa bater com o gatilho."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value / defaultValue",
              type: "string",
              description: "Aba ativa, controlada ou não.",
            },
            {
              name: "onValueChange",
              type: "(value: unknown) => void",
              description: "Disparado ao trocar de aba.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description: "Direção da lista e das setas de navegação.",
            },
            {
              name: "variant",
              type: '"default" | "line"',
              def: '"default"',
              description: "Em TabsList: aparência da barra.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Em TabsTrigger: impede a seleção daquela aba.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "A lista inteira é uma única parada de Tab; as setas movem entre as abas e a seleção acompanha o foco.",
            "Não use Tabs para navegação entre páginas — para isso use links. Tabs troca conteúdo dentro da mesma página.",
            "O value do TabsContent precisa bater exatamente com o do TabsTrigger, senão o painel nunca aparece.",
            "Evite mais de cinco ou seis abas: além disso a barra quebra e a comparação fica difícil.",
            "Conteúdo de abas inativas não é encontrado pela busca do navegador — não esconda informação essencial nelas.",
          ]}
          keyboard={[
            ["Tab", "Entra na lista, focando a aba ativa."],
            ["← →", "Move entre abas (orientação horizontal)."],
            ["↑ ↓", "Move entre abas (orientação vertical)."],
            ["Home / End", "Primeira ou última aba."],
          ]}
          aria={[
            'role="tablist" na lista',
            'role="tab" com aria-selected e aria-controls em cada gatilho',
            'role="tabpanel" com aria-labelledby em cada painel',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
