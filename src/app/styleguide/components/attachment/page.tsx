"use client";

import { Download, FileText, ImageIcon, X } from "lucide-react";

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
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";

const estados = ["idle", "uploading", "processing", "error", "done"] as const;

export default function AttachmentPage() {
  return (
    <DocPage
      title="Attachment"
      description="Cartão de arquivo anexado, com estado de upload, ações e miniatura. Usado em chat, formulários e listas de entrega."
      importPath={`import {
  Attachment, AttachmentAction, AttachmentActions, AttachmentContent,
  AttachmentDescription, AttachmentGroup, AttachmentMedia,
  AttachmentTitle, AttachmentTrigger,
} from "@/components/ui/attachment"`}
      tags={["Chat"]}
    >
      <DocSection title="Básico">
        <Demo
          className="block"
          code={`<Attachment>
  <AttachmentMedia><FileText /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>manual-de-marca.pdf</AttachmentTitle>
    <AttachmentDescription>2,4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Baixar"><Download /></AttachmentAction>
  </AttachmentActions>
</Attachment>`}
        >
          <div className="w-full max-w-sm">
            <Attachment>
              <AttachmentMedia>
                <FileText />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>manual-de-marca.pdf</AttachmentTitle>
                <AttachmentDescription>2,4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Baixar manual-de-marca.pdf">
                  <Download />
                </AttachmentAction>
                <AttachmentAction aria-label="Remover manual-de-marca.pdf">
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Estados"
        description="state percorre o ciclo de vida do upload. O cartão muda de aparência sozinho."
      >
        <Demo
          className="block"
          code={`<Attachment state="idle" />
<Attachment state="uploading" />
<Attachment state="processing" />
<Attachment state="error" />
<Attachment state="done" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            {estados.map((state) => (
              <Attachment key={state} state={state}>
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>proposta.pdf</AttachmentTitle>
                  <AttachmentDescription>{state}</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Tamanhos">
        <Demo
          className="block"
          code={`<Attachment size="xs" />
<Attachment size="sm" />
<Attachment size="default" />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-3">
            {(["xs", "sm", "default"] as const).map((size) => (
              <Attachment key={size} size={size}>
                <AttachmentMedia>
                  <FileText />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>arquivo.pdf</AttachmentTitle>
                  <AttachmentDescription>{size}</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Orientação vertical"
        description="Empilha mídia e texto — o formato de grade para galerias de imagem."
      >
        <Demo
          className="block"
          code={`<Attachment orientation="vertical">
  <AttachmentMedia variant="image">
    <ImageIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>capa.jpg</AttachmentTitle>
  </AttachmentContent>
</Attachment>`}
        >
          <div className="grid w-full max-w-md grid-cols-3 gap-3">
            {["capa.jpg", "logo.svg", "mockup.png"].map((nome) => (
              <Attachment key={nome} orientation="vertical">
                <AttachmentMedia variant="image">
                  <ImageIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{nome}</AttachmentTitle>
                </AttachmentContent>
              </Attachment>
            ))}
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Grupo"
        description="AttachmentGroup organiza vários anexos com espaçamento consistente."
      >
        <Demo
          className="block"
          code={`<AttachmentGroup>
  <Attachment>…</Attachment>
  <Attachment>…</Attachment>
</AttachmentGroup>`}
        >
          <div className="w-full max-w-sm">
            <AttachmentGroup>
              {["briefing.pdf", "referencias.zip", "contrato.pdf"].map((nome) => (
                <Attachment key={nome} size="sm">
                  <AttachmentMedia>
                    <FileText />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{nome}</AttachmentTitle>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label={`Remover ${nome}`}>
                      <X />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              ))}
            </AttachmentGroup>
          </div>
        </Demo>
      </DocSection>

      <DocSection
        title="Gatilho de upload"
        description="AttachmentTrigger vira o alvo clicável que abre o seletor de arquivos."
      >
        <Demo
          className="block"
          code={`<AttachmentTrigger onClick={() => inputRef.current?.click()}>
  Anexar arquivo
</AttachmentTrigger>
<input ref={inputRef} type="file" className="sr-only" />`}
        >
          <div className="w-full max-w-sm">
            <AttachmentTrigger>Anexar arquivo</AttachmentTrigger>
          </div>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <div className="w-full">
            <Attachment>
              <AttachmentMedia>
                <FileText />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>arquivo.pdf</AttachmentTitle>
                <AttachmentDescription>2,4 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Attachment", "O cartão. Aceita state, size e orientation."],
            ["AttachmentMedia", "Ícone ou miniatura. variant icon ou image."],
            ["AttachmentContent", "Coluna com nome e metadados."],
            ["AttachmentTitle", "Nome do arquivo."],
            ["AttachmentDescription", "Tamanho, tipo ou progresso."],
            ["AttachmentActions", "Contêiner das ações."],
            ["AttachmentAction", "Botão de ação. Herda a API do Button."],
            ["AttachmentTrigger", "Alvo que dispara o seletor de arquivos."],
            ["AttachmentGroup", "Lista de anexos."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "state",
              type: '"idle" | "uploading" | "processing" | "error" | "done"',
              def: '"done"',
              description: "Etapa do ciclo de vida do arquivo.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "default"',
              def: '"default"',
              description: "Densidade do cartão.",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              description:
                "Horizontal para listas; vertical para grades de miniatura.",
            },
            {
              name: "variant",
              type: '"icon" | "image"',
              def: '"icon"',
              description:
                "Em AttachmentMedia: caixa de ícone ou área de miniatura.",
            },
            {
              name: "render",
              type: "React.ReactElement",
              description:
                "Em AttachmentTrigger: troca o elemento renderizado.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Cada ação precisa nomear o arquivo: “Remover” repetido cinco vezes não diz qual dos cinco.",
            "O estado do upload não pode ser só visual — anuncie a mudança em uma região aria-live, principalmente o erro.",
            "Nomes longos são truncados visualmente mas continuam completos no DOM; garanta que o título acessível traga o nome inteiro.",
            "Uploads por arrastar e soltar precisam de um botão equivalente: arrastar não funciona por teclado.",
            "Miniaturas de imagem precisam de alt significativo, ou alt vazio se o nome do arquivo ao lado já identifica.",
            "Em erro, diga o motivo e o que fazer — “Falhou” sozinho não orienta.",
          ]}
          keyboard={[
            ["Tab", "Percorre o gatilho e as ações de cada anexo."],
            ["Enter / Space", "Aciona a ação em foco."],
          ]}
          aria={[
            "aria-label — nas ações, incluindo o nome do arquivo",
            'aria-live="polite" — mudanças de estado do upload',
            'role="alert" — falha de upload',
            "aria-busy — enquanto o envio está em curso",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
