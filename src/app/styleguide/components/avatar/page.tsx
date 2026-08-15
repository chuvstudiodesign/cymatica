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
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Retrato de uma pessoa ou organização, com fallback em iniciais quando a imagem falha ou não existe."
      importPath={`import {
  Avatar, AvatarBadge, AvatarFallback,
  AvatarGroup, AvatarGroupCount, AvatarImage,
} from "@/components/ui/avatar"`}
      tags={["Base UI", "Dados"]}
    >
      <DocSection
        title="Básico"
        description="O fallback aparece enquanto a imagem carrega e permanece se ela falhar."
      >
        <Demo
          code={`<Avatar>
  <AvatarImage src="/foto.jpg" alt="Lucas Zerlotini" />
  <AvatarFallback>LZ</AvatarFallback>
</Avatar>`}
        >
          <Avatar>
            <AvatarImage src="/inexistente.jpg" alt="Lucas Zerlotini" />
            <AvatarFallback>LZ</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CY</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </Demo>
      </DocSection>

      <DocSection
        title="Tamanhos"
        description="Use a prop size. Para medidas fora da escala, aplique classes de tamanho."
      >
        <Demo
          code={`<Avatar size="sm" />
<Avatar size="default" />
<Avatar size="lg" />
<Avatar className="size-20" />`}
        >
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar className="size-20">
            <AvatarFallback className="text-lg">XL</AvatarFallback>
          </Avatar>
        </Demo>
      </DocSection>

      <DocSection
        title="Com distintivo"
        description="AvatarBadge marca presença ou status no canto do retrato."
      >
        <Demo
          code={`<Avatar>
  <AvatarFallback>CY</AvatarFallback>
  <AvatarBadge style={{ background: "var(--success)" }} />
</Avatar>`}
        >
          <Avatar>
            <AvatarFallback>CY</AvatarFallback>
            <AvatarBadge
              style={{ background: "var(--success)" }}
              aria-label="Online"
            />
          </Avatar>
          <Avatar>
            <AvatarFallback>MA</AvatarFallback>
            <AvatarBadge
              style={{ background: "var(--warning)" }}
              aria-label="Ausente"
            />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LZ</AvatarFallback>
            <AvatarBadge
              style={{ background: "var(--muted-foreground)" }}
              aria-label="Offline"
            />
          </Avatar>
        </Demo>
      </DocSection>

      <DocSection
        title="Grupo"
        description="AvatarGroup sobrepõe os retratos; AvatarGroupCount mostra quantos ficaram de fora."
      >
        <Demo
          code={`<AvatarGroup>
  <Avatar><AvatarFallback>CY</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>LZ</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>MA</AvatarFallback></Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>`}
        >
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>CY</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>LZ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <AvatarGroupCount aria-label="Mais 4 pessoas">+4</AvatarGroupCount>
          </AvatarGroup>
        </Demo>
      </DocSection>

      <DocSection
        title="Formato quadrado"
        description="Para logotipos de empresa, o círculo distorce a leitura da marca."
      >
        <Demo
          code={`<Avatar className="rounded-lg">
  <AvatarFallback className="rounded-lg">CY</AvatarFallback>
</Avatar>`}
        >
          <Avatar className="rounded-lg">
            <AvatarFallback className="rounded-lg">CY</AvatarFallback>
          </Avatar>
          <Avatar size="lg" className="rounded-lg">
            <AvatarFallback className="rounded-lg">AC</AvatarFallback>
          </Avatar>
        </Demo>
      </DocSection>

      <DocSection title="Light e dark">
        <ThemePreview>
          <Avatar>
            <AvatarFallback>CY</AvatarFallback>
          </Avatar>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>LZ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </ThemePreview>
      </DocSection>

      <DocSection title="Anatomia">
        <Anatomy
          parts={[
            ["Avatar", "Contêiner. Aceita size."],
            ["AvatarImage", "A imagem. Requer alt."],
            ["AvatarFallback", "Iniciais ou ícone, exibidos se a imagem falhar."],
            ["AvatarBadge", "Indicador de status no canto."],
            ["AvatarGroup", "Empilha vários avatares com sobreposição."],
            ["AvatarGroupCount", "Contador de itens não exibidos."],
          ]}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              def: '"default"',
              description:
                "Tamanho do retrato. Para outras medidas, use className com size-*.",
            },
            {
              name: "src",
              type: "string",
              description: "Em AvatarImage: URL da imagem.",
            },
            {
              name: "alt",
              type: "string",
              description:
                "Em AvatarImage: nome da pessoa. Obrigatório quando o avatar não é decorativo.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Classes extras — formato quadrado, tamanhos personalizados.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11y
          notes={[
            "Se o nome já aparece ao lado do avatar, a imagem é decorativa: use alt=\"\" para não repetir.",
            "Se o avatar é a única identificação, o alt precisa trazer o nome completo.",
            "As iniciais do fallback não são lidas como nome — quem depende de leitor de tela ouve “LZ” letra por letra. Sempre haja um nome no alt ou no texto ao lado.",
            "Distintivos de status precisam de aria-label: uma bolinha verde não comunica nada sozinha.",
            "Em grupos, o contador precisa de rótulo com a unidade — “+4” vira “mais 4 pessoas”.",
            "O contraste do fallback usa --muted e --muted-foreground, verificados nos dois temas.",
          ]}
          aria={[
            "alt — nome da pessoa, ou vazio se decorativo",
            "aria-label — no AvatarBadge, descrevendo o status",
            "aria-label — no AvatarGroupCount, com a unidade",
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
