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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

function ControlledDemo() {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex flex-col gap-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <span className="font-mono text-xs text-muted-foreground">
        {value || "—"} ({value.length}/6)
      </span>
    </div>
  );
}

export default function InputOTPPage() {
  return (
    <DocPage
      title="Input OTP"
      description="Campo de código de verificação com um dígito por caixa. Suporta colar, autofill de SMS e navegação por teclado."
      importPath={`import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/components/ui/input-otp"`}
      tags={["Formulários"]}
    >
      <DocSection title="Básico">
        <Demo
          code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
      </DocSection>

      <DocSection
        title="Com separador"
        description="Dois grupos de três dígitos deixam o código mais fácil de ler e de ditar em voz alta."
      >
        <Demo
          code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
      </DocSection>

      <DocSection title="Quatro dígitos">
        <Demo
          code={`<InputOTP maxLength={4}>
  <InputOTPGroup>
    {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} />)}
  </InputOTPGroup>
</InputOTP>`}
        >
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
      </DocSection>

      <DocSection
        title="Somente dígitos"
        description="pattern restringe a entrada; inputMode numeric abre o teclado numérico no celular."
      >
        <Demo
          code={`<InputOTP maxLength={6} pattern="^\\d+$" inputMode="numeric">…</InputOTP>`}
        >
          <InputOTP maxLength={6} pattern="^\d+$" inputMode="numeric">
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
      </DocSection>

      <DocSection title="Controlado (interativo)">
        <Demo
          code={`const [value, setValue] = React.useState("")

<InputOTP maxLength={6} value={value} onChange={setValue}>…</InputOTP>`}
        >
          <ControlledDemo />
        </Demo>
      </DocSection>

      <DocSection title="Desabilitado">
        <Demo code={`<InputOTP maxLength={6} disabled>…</InputOTP>`}>
          <InputOTP maxLength={6} disabled>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
      </DocSection>

      <DocSection title="Com rótulo">
        <Demo
          code={`<Label htmlFor="otp">Código de verificação</Label>
<InputOTP id="otp" maxLength={6} autoComplete="one-time-code">…</InputOTP>`}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="otp">Código de verificação</Label>
            <InputOTP id="otp" maxLength={6} autoComplete="one-time-code">
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["InputOTP", "Raiz. Define maxLength, pattern e o valor."],
            ["InputOTPGroup", "Agrupa caixas contíguas com bordas unidas."],
            ["InputOTPSlot", "Uma caixa. Requer index, começando em 0."],
            ["InputOTPSeparator", "Divisória visual entre grupos."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "maxLength",
              type: "number",
              description:
                "Quantidade de dígitos. Precisa bater com o número de slots.",
            },
            {
              name: "value / onChange",
              type: "string / (value: string) => void",
              description: "Modo controlado. O valor é uma string única.",
            },
            {
              name: "pattern",
              type: "string",
              description:
                "Regex que filtra os caracteres aceitos, ex.: ^\\d+$ para dígitos.",
            },
            {
              name: "onComplete",
              type: "(value: string) => void",
              description:
                "Disparado quando todas as caixas são preenchidas — útil para enviar automaticamente.",
            },
            {
              name: "disabled",
              type: "boolean",
              def: "false",
              description: "Impede interação.",
            },
            {
              name: "index",
              type: "number",
              description: "Em InputOTPSlot: posição do dígito, iniciando em 0.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Por baixo existe um único input, não seis — por isso colar o código funciona e leitores de tela anunciam um campo só.",
            "Use autoComplete=\"one-time-code\" para que iOS e Android ofereçam o código recebido por SMS.",
            "Não envie automaticamente no onComplete sem indicar visualmente o que está acontecendo.",
            "Ofereça sempre um caminho alternativo (reenviar código), já que OTP é uma barreira comum.",
          ]}
          keyboard={[
            ["0–9 / A–Z", "Preenche a caixa atual e avança."],
            ["Backspace", "Apaga e volta para a caixa anterior."],
            ["← →", "Move entre as caixas."],
            ["Cmd/Ctrl + V", "Cola o código inteiro, distribuindo pelas caixas."],
          ]}
          aria={[
            "autoComplete=\"one-time-code\" — autofill de SMS",
            "aria-label — quando não houver rótulo visível",
            "inputMode=\"numeric\" — teclado numérico no mobile",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
