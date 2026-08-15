import { AlertCircle, CheckCircle2, Info, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

/* ---------------------------------- shell --------------------------------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      <Separator className="mt-4" />
    </section>
  );
}

/* --------------------------------- swatches -------------------------------- */

function Swatch({
  token,
  label,
  className,
}: {
  token: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-lg border ${className ?? ""}`}
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col">
        {label ? <span className="text-sm font-medium">{label}</span> : null}
        <code className="font-mono text-xs text-muted-foreground">{token}</code>
      </div>
    </div>
  );
}

function ScaleRow({ prefix }: { prefix: string }) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return (
    <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
      {steps.map((step) => (
        <div key={step} className="flex flex-col gap-2">
          <div
            className="h-16 w-full rounded-md border"
            style={{ background: `var(--${prefix}-${step})` }}
          />
          <code className="font-mono text-xs text-muted-foreground">{step}</code>
        </div>
      ))}
    </div>
  );
}

function PairSwatch({
  bg,
  fg,
  label,
  ratio,
}: {
  bg: string;
  fg: string;
  label: string;
  ratio: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-20 items-center justify-center rounded-lg border text-sm font-medium"
        style={{ background: `var(${bg})`, color: `var(${fg})` }}
      >
        {label}
      </div>
      <div className="flex flex-col">
        <code className="font-mono text-xs text-muted-foreground">{bg}</code>
        <span className="text-xs text-muted-foreground">Contraste {ratio}</span>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function StyleguidePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 p-10">
      <header className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Foundation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Design Tokens</h1>
        <p className="max-w-2xl text-muted-foreground">
          Neutros e superfícies extraídos por amostragem de pixels das
          referências visuais; o laranja <code className="font-mono">#ff5100</code>{" "}
          é a cor oficial da marca. Todos os pares de texto foram verificados em
          4.5:1 ou mais (WCAG AA). Use o alternador na barra lateral para
          conferir os dois temas.
        </p>
      </header>

      {/* ------------------------------ core colors ----------------------------- */}
      <Section
        title="Cores base"
        description="Superfícies, texto e bordas que sustentam toda a interface."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Swatch token="--background" label="Background" />
          <Swatch token="--foreground" label="Foreground" />
          <Swatch token="--card" label="Card" />
          <Swatch token="--popover" label="Popover" />
          <Swatch token="--secondary" label="Secondary" />
          <Swatch token="--muted" label="Muted" />
          <Swatch token="--accent" label="Accent" />
          <Swatch token="--border" label="Border" />
        </div>
      </Section>

      {/* ------------------------------ brand scale ----------------------------- */}
      <Section
        title="Escala da marca"
        description="Ancorada no laranja da marca, #ff5100, no degrau 500. Matiz 37.9° mantida constante em toda a escala."
      >
        <ScaleRow prefix="brand" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PairSwatch
            bg="--brand"
            fg="--brand-foreground"
            label="Brand"
            ratio="5.78:1"
          />
          <PairSwatch
            bg="--primary"
            fg="--primary-foreground"
            label="Primary"
            ratio="4.63 claro · 5.78 escuro"
          />
          <PairSwatch
            bg="--destructive"
            fg="--destructive-foreground"
            label="Destructive"
            ratio="7.44 claro · 7.10 escuro"
          />
          <Swatch token="--bone" label="Bone (hero surface)" />
        </div>
      </Section>

      {/* ----------------------------- neutral scale ---------------------------- */}
      <Section
        title="Escala neutra"
        description="Cinza puro. Cada degrau é uma cor real das referências — 900 é o canvas #111111, 800 é a navbar #282828."
      >
        <ScaleRow prefix="ink" />
      </Section>

      {/* --------------------------- semantic colors ---------------------------- */}
      <Section
        title="Cores semânticas"
        description="Verde amostrado do selo da CTA flutuante. O vermelho de erro fica na matiz 25° e o âmbar na 85°, ambos afastados do laranja da marca."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PairSwatch
            bg="--success"
            fg="--success-foreground"
            label="Success"
            ratio="7.01 claro · 9.43 escuro"
          />
          <PairSwatch
            bg="--warning"
            fg="--warning-foreground"
            label="Warning"
            ratio="9.32 claro · 11.62 escuro"
          />
          <PairSwatch
            bg="--info"
            fg="--info-foreground"
            label="Info"
            ratio="4.84 claro · 7.80 escuro"
          />
          <PairSwatch
            bg="--destructive"
            fg="--destructive-foreground"
            label="Error"
            ratio="7.44 claro · 7.10 escuro"
          />
        </div>
      </Section>

      {/* ------------------------------- charts --------------------------------- */}
      <Section
        title="Cores de gráfico"
        description="Laranja, azul, verde, violeta e cinza — cinco matizes bem separados. Âmbar ficou de fora por se aproximar demais da marca."
      >
        <div className="grid grid-cols-5 gap-4">
          <Swatch token="--chart-1" label="Chart 1" />
          <Swatch token="--chart-2" label="Chart 2" />
          <Swatch token="--chart-3" label="Chart 3" />
          <Swatch token="--chart-4" label="Chart 4" />
          <Swatch token="--chart-5" label="Chart 5" />
        </div>
      </Section>

      {/* ------------------------------ typography ------------------------------ */}
      <Section
        title="Tipografia"
        description="Figtree — geométrica de baixo contraste, o parente mais próximo do logotipo disponível no Google Fonts. Geist Mono para código e dados."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">
              text-5xl / font-bold / tracking-tight
            </code>
            <p className="text-5xl font-bold tracking-tight">
              A forma mais simples,{" "}
              <span style={{ color: "var(--brand)" }}>sincera</span> e confiável
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">
              text-3xl / font-semibold
            </code>
            <p className="text-3xl font-semibold tracking-tight">
              Contratar um estúdio de design sempre foi complicado.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">
              text-xl / font-medium
            </code>
            <p className="text-xl font-medium">A Cymatica nasceu para mudar isso.</p>
          </div>
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">
              text-base / text-muted-foreground
            </code>
            <p className="max-w-2xl text-base text-muted-foreground">
              Assim como o Nubank simplificou os bancos, a Uber reinventou os
              táxis e o Airbnb transformou a hospedagem. Nós reinventamos a forma
              de contratar design.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <code className="font-mono text-xs text-muted-foreground">
              text-sm · text-xs · font-mono
            </code>
            <p className="text-sm">Texto de apoio em 14px.</p>
            <p className="text-xs text-muted-foreground">Legenda em 12px.</p>
            <p className="font-mono text-sm">R$ 2.450,00 — Geist Mono</p>
          </div>
        </div>
      </Section>

      {/* --------------------------------- radius -------------------------------- */}
      <Section
        title="Border radius"
        description="Base de 16px (--radius: 1rem). A referência usa navbar em pílula e cartões de ~24px."
      >
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {[
            ["rounded-sm", "9.6px"],
            ["rounded-md", "12.8px"],
            ["rounded-lg", "16px"],
            ["rounded-xl", "22.4px"],
            ["rounded-2xl", "28.8px"],
            ["rounded-full", "pílula"],
          ].map(([cls, size]) => (
            <div key={cls} className="flex flex-col gap-2">
              <div className={`h-20 w-full border bg-muted ${cls}`} />
              <code className="font-mono text-xs text-muted-foreground">
                {cls}
              </code>
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------------------- shadows -------------------------------- */}
      <Section
        title="Sombras"
        description="Elevação discreta — as superfícies se separam por valor, não por profundidade."
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"].map((cls) => (
            <div key={cls} className="flex flex-col gap-2">
              <div className={`h-20 w-full rounded-lg border bg-card ${cls}`} />
              <code className="font-mono text-xs text-muted-foreground">
                {cls}
              </code>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------- components ------------------------------ */}
      <Section
        title="Componentes"
        description="shadcn/ui consumindo os tokens acima."
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Button
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Começar Agora</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button className="rounded-full">Pílula</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Badge
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge
                style={{
                  background: "var(--success)",
                  color: "var(--success-foreground)",
                }}
              >
                Success
              </Badge>
              <Badge
                style={{
                  background: "var(--warning)",
                  color: "var(--warning-foreground)",
                }}
              >
                Warning
              </Badge>
              <Badge
                style={{
                  background: "var(--info)",
                  color: "var(--info-foreground)",
                }}
              >
                Info
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Alert
            </h3>
            <div className="flex flex-col gap-3">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Proposta gerada</AlertTitle>
                <AlertDescription>
                  Sua proposta foi calculada e enviada para o seu e-mail.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Não foi possível processar</AlertTitle>
                <AlertDescription>
                  Verifique o valor informado e tente novamente.
                </AlertDescription>
              </Alert>
              <Alert style={{ borderColor: "var(--success)" }}>
                <CheckCircle2
                  className="h-4 w-4"
                  style={{ color: "var(--success)" }}
                />
                <AlertTitle>Pagamento confirmado</AlertTitle>
                <AlertDescription>
                  O projeto entra na fila de produção hoje.
                </AlertDescription>
              </Alert>
              <Alert style={{ borderColor: "var(--info)" }}>
                <Info className="h-4 w-4" style={{ color: "var(--info)" }} />
                <AlertTitle>Sobre o prazo</AlertTitle>
                <AlertDescription>
                  Entregas começam em até 48h após a confirmação.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Radio Group
            </h3>
            <RadioGroup defaultValue="essencial" className="flex flex-col gap-3">
              {[
                ["essencial", "Essencial", "Identidade visual básica"],
                ["completo", "Completo", "Marca + site + social"],
                ["sob-medida", "Sob medida", "Escopo definido com o time"],
              ].map(([value, title, desc]) => (
                <div key={value} className="flex items-start gap-3">
                  <RadioGroupItem value={value} id={value} className="mt-0.5" />
                  <div className="flex flex-col">
                    <Label htmlFor={value}>{title}</Label>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Card
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>Sua proposta</CardTitle>
                    <Badge variant="secondary">Instantânea</Badge>
                  </div>
                  <CardDescription>
                    Digite o quanto você pode pagar e receba a sua proposta na
                    hora.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="valor">Valor</Label>
                    <Input id="valor" placeholder="R$ 2450" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="urgente">Entrega prioritária</Label>
                    <Switch id="urgente" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">Começar Agora</Button>
                </CardFooter>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Elevação</CardTitle>
                  <CardDescription>
                    Card com <code className="font-mono">shadow-lg</code>,
                    equivalente à CTA flutuante da referência.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="outline">Marca</Badge>
                  <Badge variant="outline">Site</Badge>
                  <Badge variant="outline">Social</Badge>
                  <Badge variant="outline">Motion</Badge>
                </CardContent>
                <CardFooter className="gap-3">
                  <Button variant="outline" className="flex-1">
                    Detalhes
                  </Button>
                  <Button className="flex-1">Contratar</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
