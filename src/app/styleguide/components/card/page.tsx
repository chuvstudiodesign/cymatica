"use client";

import { MoreHorizontal } from "lucide-react";

import {
  A11y,
  Anatomy,
  Demo,
  DocPage,
  DocSection,
  PropsTable,
  ThemePreview,
} from "@/app/styleguide/_components/doc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Contêiner de conteúdo relacionado. A superfície base de quase toda composição do projeto."
      importPath={`import {
  Card, CardAction, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"`}
      tags={["Layout"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<Card>
  <CardHeader>
    <CardTitle>Sua proposta</CardTitle>
    <CardDescription>Calculada a partir do valor informado.</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo principal.</CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Sua proposta</CardTitle>
              <CardDescription>
                Calculada a partir do valor informado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identidade visual completa, com manual de marca e kit de
                aplicação.
              </p>
            </CardContent>
          </Card>
        </Demo>
      </DocSection>

      <DocSection
        title="Com ação no cabeçalho"
        description="CardAction ancora um controle à direita do título sem quebrar o alinhamento."
      >
        <Demo
          code={`<CardHeader>
  <CardTitle>Projeto</CardTitle>
  <CardDescription>Atualizado há 2 dias</CardDescription>
  <CardAction>
    <Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>
  </CardAction>
</CardHeader>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Rebranding Cymatica</CardTitle>
              <CardDescription>Atualizado há 2 dias</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                  <MoreHorizontal />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="outline">Marca</Badge>
              <Badge variant="outline">Site</Badge>
            </CardContent>
          </Card>
        </Demo>
      </DocSection>

      <DocSection title="Com rodapé">
        <Demo
          code={`<Card>
  <CardHeader>…</CardHeader>
  <CardContent>…</CardContent>
  <CardFooter className="gap-3">
    <Button variant="outline" className="flex-1">Detalhes</Button>
    <Button className="flex-1">Contratar</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Plano Completo</CardTitle>
              <CardDescription>Marca + site + social</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="font-mono text-2xl">R$ 12.400</span>
            </CardContent>
            <CardFooter className="gap-3">
              <Button variant="outline" className="flex-1">
                Detalhes
              </Button>
              <Button className="flex-1">Contratar</Button>
            </CardFooter>
          </Card>
        </Demo>
      </DocSection>

      <DocSection title="Com formulário">
        <Demo
          code={`<Card>
  <CardHeader>
    <CardTitle>Receber proposta</CardTitle>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <Label htmlFor="v">Valor</Label>
    <Input id="v" placeholder="R$ 2450" />
  </CardContent>
  <CardFooter>
    <Button className="w-full rounded-full">Começar Agora</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Receber proposta</CardTitle>
              <CardDescription>Resposta na hora, sem reunião.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Label htmlFor="card-v">Valor</Label>
              <Input id="card-v" placeholder="R$ 2450" />
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full">Começar Agora</Button>
            </CardFooter>
          </Card>
        </Demo>
      </DocSection>

      <DocSection
        title="Elevação"
        description="As superfícies do projeto se separam por valor, não por profundidade — use sombra com parcimônia."
      >
        <Demo
          code={`<Card />
<Card className="shadow-md" />
<Card className="shadow-lg" />`}
        >
          <Card className="w-40 p-6 text-sm text-muted-foreground">sem sombra</Card>
          <Card className="w-40 p-6 text-sm text-muted-foreground shadow-md">
            shadow-md
          </Card>
          <Card className="w-40 p-6 text-sm text-muted-foreground shadow-lg">
            shadow-lg
          </Card>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Título</CardTitle>
              <CardDescription>Descrição de apoio.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Conteúdo.
            </CardContent>
          </Card>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Card", "Contêiner. Usa --card e --card-foreground."],
            ["CardHeader", "Área de título. Vira grid quando há CardAction."],
            ["CardTitle", "Título do card."],
            ["CardDescription", "Subtítulo em --muted-foreground."],
            ["CardAction", "Controle alinhado à direita do cabeçalho."],
            ["CardContent", "Corpo principal."],
            ["CardFooter", "Ações ou metadados ao final."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          caption="Todas as partes aceitam os atributos de <div>."
          rows={[
            {
              name: "className",
              type: "string",
              description:
                "Classes extras. Use para largura, sombra e espaçamento específicos.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Conteúdo da parte.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Card é um contêiner sem semântica própria: se ele representa um item de lista, envolva em <li>; se é uma região navegável, use <section> com aria-labelledby apontando para o CardTitle.",
            "Evite tornar o card inteiro clicável envolvendo tudo em <a> — prefira um link no título e estenda a área clicável com ::after.",
            "Não aninhe cards dentro de cards: a hierarquia visual se perde e a leitura por região fica confusa.",
            "O contraste de CardDescription já usa --muted-foreground, verificado em 5.28:1 no claro e 9.21:1 no escuro.",
          ]}
          keyboard={[
            ["Tab", "Percorre apenas os controles interativos internos."],
          ]}
          aria={[
            "aria-labelledby — associa a região ao CardTitle",
            'role="article" ou <section> — quando o card é conteúdo autônomo',
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
