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

---

# Proposta comercial privada — `/proposta-juliano`

**Data:** 2026-09-05
**Status:** pronta para envio
**Cliente:** Juliano, abrindo uma pizzaria

Documento dirigido a uma pessoa, enviado por link direto. Fora do índice
(`robots: { index: false, follow: false }`) e fora do `sitemap.ts`.

## 1. Isolamento

Arquivos criados, e só estes:

```
src/app/(site)/proposta-juliano/page.tsx
src/components/site-3/proposta/*.tsx        13 componentes
src/lib/site-3/proposta.ts                  todo o conteúdo, em dados
```

`git status --short` no fim do trabalho mostra apenas esses caminhos, mais
`src/app/(site)/site.css` e `src/components/site-3/animated-heading.tsx`, que
**já estavam modificados antes desta execução** e não foram tocados.
`package.json`, `package-lock.json` e `components.json` ficaram intactos: os
dois componentes React Bits instalados no meio do caminho não trouxeram
dependência nova, e ambos acabaram descartados (ver seção 4).

## 2. Decisões de arquitetura

**Todo o conteúdo em `lib/site-3/proposta.ts`.** Preço, prazo, taxa, lista de
peças e cada frase. Nenhuma string de cliente dentro de JSX. Trocar o preço de
um pacote é editar um número num lugar só.

**A personalização acontece uma vez.** `hero.personalizacao` é a única linha
que nomeia o cliente. Da segunda seção em diante o texto fala da entrega e usa
alusão indireta ("a casa", "a fachada", "a caixa"). Uma proposta que repete o
nome do cliente a cada seção parece mala direta.

**Ritmo claro/escuro herdado da home:**

```
herói ─ O PACOTE ─ argumento ─ PACOTES ─ PRAZOS ─ mídia social ─ estúdio
```

Pacotes e prazos são duas `LightSection` seguidas, e `.light + .light` no
`site.css` zera o padding de topo da segunda: as duas leem como um bloco só.
Prazo é parte da decisão de preço, não assunto separado.

**Um ponto de laranja por dobra**, e em nenhuma dobra dois:

| Dobra | Onde |
|---|---|
| Herói | ponto ao lado da linha de personalização |
| O pacote | nenhum, de propósito |
| Argumento | o grão central do campo nodal |
| Pacotes | o CTA do Insane (os outros dois são `outline`) |
| Prazos | o ponto do fast |
| Mídia social | o CTA de cotação |
| Estúdio | nenhum |
| Modal | o botão de envio |

O destaque do cartão Insane é feito por **superfície** (`bg-muted`,
`border-foreground/25`), não por cor, justamente para o laranja sobrar para o
CTA.

**O gancho da página de automação de design com IA.** `AUTOMACAO_HREF` é
`null` em `proposta.ts`, com a rota futura comentada logo acima. Enquanto for
`null`, o botão "Entender a automação" abre o WhatsApp com uma mensagem
própria. Quando a página nascer, basta preencher a constante e o botão vira
navegação interna sozinho. Em nenhum momento existe link quebrado.

**O slot do case de mídia social.** `social.case.src` é `null`. O componente
`case-slot.tsx` detecta e rende um campo de interferência em CSS puro (dois
feixes de anéis concêntricos com origens diferentes, em `--color-border`, que
ao se sobreporem produzem franjas) com a etiqueta "Case em produção". Para
trocar: salvar a imagem em `public/projects/`, pôr o caminho em `src` e
descrever em `alt`. Nada no componente muda.

## 3. O seletor

Fluxo: escolher pacote → modal quase de tela cheia → marcar peças Plus →
enviar pelo WhatsApp com a mensagem já formatada.

**Modal montado sobre `@base-ui/react/dialog` cru, não sobre `ui/dialog.tsx`.**
O `DialogContent` do design system traz `sm:max-w-sm` no className, e o
`tailwind-merge` não desduplica variante prefixada: passar largura pelo `cn`
derruba só o valor sem prefixo e o modal trava em 384px. Aqui a moldura é
`inset-4` / `md:inset-10` (40px de respiro), não largura máxima.

**A colisão entre a trava de scroll e o ScrollSmoother.** Verificado no fonte:
`@base-ui/utils/useScrollLock.js`, no caminho para navegador sem
`scrollbar-gutter: stable`, escreve `body.style.height = "100dvh"`. E o
ScrollSmoother usa a altura do `<body>` como curso do scroll. Travar colapsa o
curso, o navegador prende o scroll perto do topo e a página desliza para trás
do modal; ao fechar, o leitor perdeu onde estava. Como o Mac usa barra
sobreposta por padrão e cai no caminho seguro, o defeito só aparece no Windows.

Saída, em duas metades:

- `modal="trap-focus"` quando há smoother. Mantém foco preso e `aria-hidden`
  no resto do documento (`DialogPopup.js` passa `modal !== false` ao gerenciador
  de foco), e só abre mão da trava nativa.
- `ScrollSmoother.paused(true)` na abertura, que alinha a posição nativa à
  renderizada antes de travar — por isso não há salto — e mantém o scroll
  aninhado liberado para o corpo do modal.

Sem smoother (movimento reduzido), `modal={true}` e a trava nativa voltam, e
aí são seguras. **Nada de `ScrollTrigger.refresh()` no fechamento:** a altura
da página não mudou, e remedir tudo produziria um quadro de salto.

**Seleção de peças:** `ToggleGroup multiple` + `Toggle` do Base UI, primitivas
cruas (o wrapper `ui/toggle-group.tsx` fixa `w-fit`, `flex-row` e a altura do
`toggleVariants`). Entrega `aria-pressed`, roving tabindex e navegação por
seta. O estado marcado é **inversão de superfície**, monocromática: 29 acentos
laranja na mesma tela não seriam acento nenhum.

**As 29 peças**, em quatro grupos que seguem o caminho físico do cliente da
casa, do salão até a rua: Salão (8), Delivery (8), Papelaria (7), Fachada (6).
Nenhuma tem preço — a seleção vai para cotação. O aviso de que **se contrata o
design da peça, não a impressão** é o primeiro bloco da área rolável, visível
sem rolar, e volta na mensagem do WhatsApp.

**A mensagem do WhatsApp** (`buildProposalMessage`) é o único artefato que
sobrevive à página. Traz pacote com preço, prazo com taxa, total fechado e as
peças agrupadas na mesma ordem da tela.

## 4. Bibliotecas

| Fonte | Onde |
|---|---|
| Base UI | `Dialog`, `ToggleGroup`, `Toggle`, `RadioGroup`, `Radio` — primitivas cruas |
| Design system | `Button` (via `CtaButton`), `Container`, `Section`, `LightSection`, `SectionLabel`, `Reveal`, `Rule` |
| GSAP | ScrollTrigger e matchMedia no campo nodal e na onda dos cartões; `ScrollSmoother.get()` na trava e na âncora |
| React Bits | **nenhum novo** |

Avaliados e **descartados**, com motivo:

- **`SplitFlapText`** (React Bits, zero dependência): o painel de aeroporto é
  bonito e mecânico, mas mecânico não é o vocabulário da marca. Cimática é
  onda, interferência e padrão nodal, não engrenagem.
- **`StrokeText`** (React Bits): o traçado que se desenha *é* vocabulário da
  marca, mas o componente rende SVG com `fontSize` em px fixo e não acompanha
  a escala fluida do `site.css`. Um tamanho fora da escala numa página que usa
  a escala em todos os outros títulos custaria mais do que ganharia.
- **`Noise`** (React Bits): laço de `requestAnimationFrame` permanente num
  slot que existe só até a imagem do case chegar, e sem caminho para
  `prefers-reduced-motion`. Movimento sem causa. O campo de interferência em
  CSS faz o mesmo trabalho a custo zero.
- **Blocos de pricing** de 21st.dev e cards do Cult UI: todos chegam com
  `rounded-2xl` com glow, bullets em check-circle e badge "Most popular". Seria
  remover 100% do que os define. Composto à mão.

Os dois primeiros chegaram a ser instalados e foram removidos; `package.json`
não registra diferença.

## 5. Movimento

Dois momentos notáveis na página inteira. O resto é silêncio.

**`nodal-field.tsx`** — 150 grãos espalhados ao acaso migram para as linhas
nodais de uma figura de Chladni quando a seção do argumento entra na tela. É a
mesma equação e o mesmo laço de Newton do `chladni-shader.ts` que roda em WebGL
na home, portados para JS e aplicados a nós do DOM: a placa e este campo
desenham a mesma figura, muda só o suporte. Caos vira ordem, e a ordem é função
da frequência — que é a tese da marca aplicada à tese da seção. DOM puro, sem
WebGL, sem canvas, sem dependência. `once: true`, `will-change` posto e
removido em lote, metade dos grãos no celular, figura já formada em
`prefers-reduced-motion`.

**`use-package-wave.tsx`** — os três cartões entram como propagação de onda a
partir da crista (o cartão em destaque), não na ordem do DOM. Precisa de
ScrollTrigger próprio: o `batch` do provider escalona da esquerda para a
direita e agruparia a etiqueta e o título da seção no mesmo escalonamento.

O estado inicial é aplicado **por JavaScript e só quando o elemento ainda está
abaixo da dobra**. Nunca há `opacity-0` no HTML do servidor: esta é a tabela de
preços de uma proposta enviada por link, e uma falha de script não pode
deixá-la invisível.

**`scroll-cta.tsx`** — o CTA do herói rola até `#pacotes` por
`smoother.scrollTo()`. O salto nativo cai deslocado porque o ScrollSmoother
transforma `#smooth-content` e a posição que o navegador calcula é a
transformada. O `href` continua no HTML: sem JS, o link funciona pelo caminho
do navegador.

## 6. Pendência encontrada e **não** corrigida

**`[data-reveal]` está inerte no site inteiro.** Em
`smooth-scroll-provider.tsx`, `data-reveal-ready` é posto no `<html>` logo
depois de criar o `ScrollTrigger.batch`. A regra
`[data-reveal-ready] [data-reveal] { opacity: 1; transform: none }` do
`site.css` passa a valer imediatamente, então quando o `onEnter` dispara o
GSAP lê `opacity: 1` e anima de 1 para 1. Nada se move: os elementos aparecem
todos no instante em que o atributo entra. E `data-reveal-delay` escreve
`transitionDelay`, propriedade que tween de GSAP ignora — resquício de uma
versão anterior baseada em transição CSS.

Correção, duas linhas dentro do `gsap.context` e **antes** de setar o atributo:

```ts
gsap.set(gsap.utils.toArray<HTMLElement>("[data-reveal]"), { opacity: 0, y: 26 })
document.documentElement.setAttribute("data-reveal-ready", "")
```

Não aplicada: `smooth-scroll-provider.tsx` e `site.css` estão fora do escopo
desta tarefa e a mudança afetaria a home e as outras sete rotas. Fica
registrada para quem tocar o sistema de revelação.
