# Site institucional Cymatica — log de execução

**Status:** primeira versão completa e navegável
**Rota:** `/site` (o `/` continua sendo a página do outro agente)
**Data:** 2026-08-14

---

## 1. Contrato de isolamento

Um segundo agente construiu o design system (`src/components/ui/`, `src/app/styleguide/`)
em paralelo. **Nenhum arquivo dele foi editado.**

Arquivos criados por este trabalho:

```
src/app/site/**                    rotas e CSS do site
src/app/styleguide/reactbits/      aba React Bits (pasta nova, nada existente tocado)
src/components/site/**             componentes do site
src/components/reactbits/**        componentes React Bits adaptados
src/lib/site/**                    conteúdo, precificação, Server Actions
public/brand/**                    logotipo vetorial e fallback da cena
public/projects/**                 imagens do portfólio
```

Arquivos compartilhados, tocados **uma vez só**:

| Arquivo | Mudança |
|---|---|
| `package.json` / `package-lock.json` | `gsap`, `motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `ogl`, `@types/three` |
| `components.json` | duas chaves em `registries` (`@react-bits`, `@cult-ui`) |

`globals.css`, `layout.tsx`, `page.tsx`, `styleguide/navigation.ts` e `components/ui/**`
aparecem como modificados no `git status` — são alterações do **outro agente**, feitas antes
e durante este trabalho. Verificado por busca: nenhum rastro deste site existe neles.

---

## 2. Decisões de arquitetura

- **D1 — CSS próprio em `src/app/site/site.css`.** Importado só pelo layout do site, para não
  disputar `globals.css`. Guarda a escala de display fluida, a medida de leitura e o estado
  inicial da revelação por scroll.

- **D2 — Herança do layout raiz.** O `layout.tsx` da raiz já entrega tema escuro, Figtree,
  Geist Mono, `TooltipProvider` e `Toaster`. O layout do site só acrescenta cabeçalho, rodapé
  e o provider de scroll, e exporta `metadata` própria.

- **D3 — GSAP ScrollSmoother em vez de Lenis.** O pacote público do GSAP 3.15 já traz
  `ScrollSmoother`, `ScrollTrigger` e `SplitText` (gratuitos desde 2025). Sincroniza
  nativamente com os triggers, o que elimina o descompasso clássico entre scroll suave e
  animação. O cabeçalho e o CTA flutuante ficam **fora** do `#smooth-wrapper` — dentro dele
  `position: fixed` para de grudar.

- **D4 — Revelação declarativa.** Qualquer elemento com `[data-reveal]` é animado pelo
  provider. O estado inicial mora no CSS, então não há flash de conteúdo já posicionado, e
  `prefers-reduced-motion` simplesmente mostra tudo.

- **D5 — Conteúdo em um arquivo.** Todo texto vem de `src/lib/site/content.ts`. Nenhum
  componente carrega literal. Trocar copy não exige abrir interface.

- **D6 — Preço em um arquivo.** `src/lib/site/pricing.ts` guarda tabela base, multiplicadores
  de porte e prazo, e a lógica de encaixe no orçamento. É o arquivo que o dono edita para
  mudar preço.

- **D7 — Composição, nunca edição.** `CtaButton` compõe o `Button` do design system em escala
  editorial em vez de duplicar ou alterar `ui/button.tsx`.

---

## 3. A cena de Chladni

A peça de assinatura implementa a física real, não uma aproximação decorativa.

Numa placa quadrada vibrando, a amplitude é

```
f(x,y) = a·sin(πmx)·sin(πny) + b·sin(πnx)·sin(πmy)
```

e a areia se acumula onde `f = 0`. Cada partícula parte de uma posição fixa e caminha até a
linha nodal por passos de Newton sobre a curva de nível — `p ← p − f·∇f / |∇f|²` — oito
iterações no vertex shader.

Como a posição convergida é função contínua de `(m, n)`, interpolar os modos ao longo do
scroll faz o padrão inteiro se reorganizar sem salto.

**Descoberta que validou o conceito:** no modo `m=3, n=2`, o padrão gerado é a própria forma
do logotipo da Cymatica — quadrado lobado, arcos nos cantos, nó central. A marca é
literalmente uma figura de Chladni.

**Cor.** O acento não podia vir do resíduo `|f|`, que é zero em toda parte após Newton e
deixaria o campo inteiro laranja. Vem da **planaridade** `1/(1+|∇f|)` elevada à sexta: onde a
placa é mais rasa junto ao nó, mais areia empilha. Fisicamente correto e, de quebra, mantém
o laranja restrito a um único ponto por dobra, como manda a marca.

**Degradação em três níveis:** sem WebGL ou com `prefers-reduced-motion`, entra
`public/brand/chladni-static.webp` — gerado pelo mesmo algoritmo, então é o padrão de verdade.
Contagem de grãos cai de 18.000 para 6.000 em tela estreita ou CPU de até 4 núcleos.

---

## 4. Logotipo

Extraído de `Cymatica - Logotipo (Icon + Nomes).ai`, que é um PDF de 6 páginas —
`pdftocairo -svg` recuperou os vetores originais, sem traçado automático.

O arquivo traz **quatro variantes oficiais do símbolo**, que são a mesma figura em modos de
vibração diferentes: `plate` (completa), `star` (fundamental), `arcs` (linhas nodais) e
`nodes` (nós isolados). Normalizadas para `viewBox="0 0 100 100"`, com precisão reduzida
(pela metade em bytes) e `fill="currentColor"`.

Os paths de cada variante são mantidos **separados**: são contornos preenchidos por winding
`nonzero`, e uni-los num único `d` apaga os furos — a figura vira um quadrado sólido.

`src/components/site/mark-paths.ts` traz a geometria inline, o que permite animar o símbolo
(traçado, morfologia entre variantes) sem requisição extra.

---

## 5. Bibliotecas em uso

| Fonte | Onde aparece |
|---|---|
| React Bits | `TextPressure` (wordmark do herói), `CurvedLoop` (encerramento), `FuzzyText` (404), `DecryptedText` (seção de IA) + 4 na vitrine |
| GSAP | ScrollSmoother, ScrollTrigger (revelações, método ancorado, progresso da cena) |
| Motion | dependência dos componentes React Bits |
| Three.js + R3F | placa de Chladni |
| shadcn/Base UI | `Button`, `Input`, `Textarea`, `Checkbox`, `RadioGroup` |

Adaptações feitas nos componentes React Bits, todas comentadas no código:
- `"use client"` acrescentado nos 8 (nenhum vinha com a diretiva)
- cores trocadas por tokens; no `FuzzyText`, `currentColor` resolvido via `getComputedStyle`
  porque canvas não interpreta a palavra-chave
- `TextPressure`: usa a Figtree do projeto, sem `@import` externo; ganhou a prop `as` para não
  emitir um segundo `<h1>`; ganhou tratamento de `prefers-reduced-motion`
- `CurvedLoop`: cursor derivado de estado, não de ref lido durante o render
- `DecryptedText`: reinicialização por ajuste de estado durante o render, não por efeito

---

## 6. Verificação

| Checagem | Resultado |
|---|---|
| `tsc --noEmit` nos arquivos do site | limpo |
| `eslint` nos arquivos do site | limpo |
| 9 rotas (8 + 404) | todas 200/404, um `<h1>` cada |
| Hex hardcoded | nenhum |
| Contraste AA (tema escuro) | todos os pares passam; `text-primary` a 5,78:1 |
| Isolamento | nenhum arquivo do design system alterado |

---

## 7. Pendências

- **`npm run build` falha** por 13 erros de TypeScript em `src/components/ui/data-table.tsx`,
  arquivo do outro agente: ele usa a API v8 do `@tanstack/react-table` (`getCoreRowModel`,
  `VisibilityState`) enquanto o projeto tem a v9 instalada, que renomeou para
  `createCoreRowModel`. **Não corrigido por estar fora do contrato de isolamento.**
- Registrar a aba React Bits em `src/app/styleguide/navigation.ts` quando o styleguide
  terminar. Hoje ela existe e funciona em `/styleguide/reactbits`, apenas sem link na barra.
- Promover o site de `/site` para `/` exige editar `src/app/page.tsx` — aguarda decisão.
- Conteúdo fictício marcado em `content.ts`: depoimentos (todos), e setor/ano/descrição dos
  projetos. Os nomes LAUN, mun, DE MARCO e Seu Moacir vêm das próprias peças.
- `submitLead` grava em `.leads/leads.jsonl`. Ao publicar em ambiente sem disco persistente,
  trocar por CRM ou webhook.
