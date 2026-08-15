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
import { Button } from "@/components/ui/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";

function AnimatedDemo() {
  const [value, setValue] = React.useState(13);
  React.useEffect(() => {
    const t = setInterval(
      () => setValue((v) => (v >= 100 ? 0 : v + 7)),
      700,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Progress value={value}>
        <ProgressLabel>Enviando arquivos</ProgressLabel>
        <ProgressValue className="ml-auto" />
      </Progress>
    </div>
  );
}

function StepDemo() {
  const [step, setStep] = React.useState(1);
  const total = 4;
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress value={(step / total) * 100}>
        <ProgressLabel>
          Etapa {step} de {total}
        </ProgressLabel>
      </Progress>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          Voltar
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(total, s + 1))}
        >
          Avançar
        </Button>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <DocPage
      title="Progress"
      description="Barra de progresso determinada. A raiz já renderiza trilho e indicador; rótulo e valor são opcionais."
      importPath={`import {
  Progress, ProgressIndicator, ProgressLabel,
  ProgressTrack, ProgressValue,
} from "@/components/ui/progress"`}
      tags={["Base UI", "Feedback"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Progress value={60} />`}
        >
          <div className="w-full max-w-md">
            <Progress value={60} aria-label="Progresso do envio" />
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Com rótulo e valor"
        description="Os filhos aparecem acima da barra; a trilha é renderizada automaticamente depois deles."
      >
        <Demo
          className="block"
          code={`<Progress value={72}>
  <ProgressLabel>Enviando arquivos</ProgressLabel>
  <ProgressValue className="ml-auto" />
</Progress>`}
        >
          <div className="w-full max-w-md">
            <Progress value={72}>
              <ProgressLabel>Enviando arquivos</ProgressLabel>
              <ProgressValue className="ml-auto" />
            </Progress>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Animado (interativo)">
        <Demo
          className="block"
          code={`const [value, setValue] = React.useState(13)

React.useEffect(() => {
  const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 7)), 700)
  return () => clearInterval(t)
}, [])

<Progress value={value}>…</Progress>`}
        >
          <AnimatedDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Etapas (interativo)"
        description="Converta a etapa atual em porcentagem e deixe o rótulo dizer o número real."
      >
        <Demo
          className="block"
          code={`<Progress value={(step / total) * 100}>
  <ProgressLabel>Etapa {step} de {total}</ProgressLabel>
</Progress>`}
        >
          <StepDemo />
        </Demo>
      </DocSection>

      <DocSection
        title="Progresso indeterminado"
        description="Sem previsão de conclusão, use Spinner — uma barra que não avança comunica travamento."
      >
        <Demo
          code={`<div role="status" className="flex items-center gap-2">
  <Spinner />
  <span className="text-sm text-muted-foreground">Processando…</span>
</div>`}
        >
          <div role="status" className="flex items-center gap-2">
            <Spinner />
            <span className="text-sm text-muted-foreground">Processando…</span>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Progress value={45} aria-label="Progresso" />
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Progress", "Raiz. Recebe value e renderiza trilho e indicador."],
            ["ProgressLabel", "Rótulo textual, associado automaticamente."],
            ["ProgressValue", "Percentual formatado."],
            ["ProgressTrack", "Trilho de fundo. Renderizado por padrão."],
            ["ProgressIndicator", "Preenchimento. Renderizado por padrão."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "value",
              type: "number | null",
              description:
                "Progresso de 0 a 100. Use null para estado indeterminado.",
            },
            {
              name: "min / max",
              type: "number",
              def: "0 / 100",
              description: "Limites da escala.",
            },
            {
              name: "getAriaValueText",
              type: "(value: number) => string",
              description:
                "Texto alternativo para leitores de tela quando o número cru não basta.",
            },
            {
              name: "aria-label",
              type: "string",
              description:
                "Obrigatório quando não há ProgressLabel visível.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Toda barra precisa de nome: ProgressLabel visível ou aria-label. Sem isso o leitor anuncia só a porcentagem.",
            "Progresso indeterminado por muito tempo é indistinguível de travamento — prefira Spinner com texto.",
            "Para uploads longos, anuncie marcos (25%, 50%) em uma região aria-live em vez de cada incremento.",
            "Não use Progress como medidor de valor estático, como espaço em disco; para isso existe role=\"meter\".",
            "A barra sozinha não é acessível a quem não enxerga cor: mantenha o valor em texto ao lado.",
          ]}
          aria={[
            'role="progressbar"',
            "aria-valuenow / aria-valuemin / aria-valuemax",
            "aria-valuetext — descrição textual do progresso",
            "aria-label ou aria-labelledby — nome da barra",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
