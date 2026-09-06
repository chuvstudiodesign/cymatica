# O produto, lapidado

> O mesmo conteúdo de `00-briefing-lucas.md`, reescrito com estrutura e sem
> hesitação. Este é o documento para consultar quando alguém perguntar "o que é
> esse produto". A fonte continua sendo o briefing.

---

## Em uma frase

A Cymatica sistematiza a identidade de uma marca num design system legível por
máquina e constrói, em cima dele, sistemas que produzem material de design novo
sob demanda — sites, apresentações, posts, motion — sempre dentro daquela
identidade.

## Em um parágrafo

Toda empresa produz material o tempo todo: uma página para um anúncio, um PDF
para um cliente, um post para a semana, um vídeo para uma campanha. Cada peça
dessas custa um briefing, uma fila e um profissional, e sai um pouco diferente
da anterior. A Cymatica resolve isso invertendo a ordem: primeiro transforma a
marca num sistema — cores, tipografia, espaçamento, componentes, padrões de
página —, escrito de um jeito que uma inteligência artificial consegue ler e
obedecer. Depois constrói, em cima desse sistema, as máquinas que produzem as
peças. A partir daí a empresa pede e recebe, no padrão, sem fila.

## O que não é

- **Não é um gerador de imagem com IA.** Gerador de imagem inventa um visual a
  cada pedido. Aqui o visual já está decidido; o que varia é o conteúdo.
- **Não é um template.** Template repete o mesmo layout. O sistema compõe
  layouts novos a partir de peças que já são da marca — e cria componentes
  novos quando precisa.
- **Não é um chat de design genérico.** Chat genérico existe em qualquer
  plataforma e não conhece a marca de ninguém. A diferença inteira está no
  design system por trás.

---

## Como funciona, em três movimentos

### 1. O design system

A identidade da marca deixa de ser um PDF de manual e vira estrutura:

| Camada | O que entra |
|---|---|
| **Design tokens** | paleta de cores, escala tipográfica, escala de espaçamento, corner radius, sombra |
| **Componentes** | accordion, alerta, badge, card, carrossel, calendário — dezenas a centenas |
| **Padrões de página** | protótipos componentizados, prontos para serem recombinados |

O critério que define esta etapa: **a máquina precisa conseguir ler**. Um
manual de marca em PDF descreve a regra para um humano interpretar. Um design
system declara a regra de um jeito que não depende de interpretação — e é por
isso que ele dispensa o manual em vez de acompanhá-lo.

### 2. Os sistemas de criação

Sobre o design system, constroem-se as máquinas que produzem cada tipo de peça.
Cada uma é uma cadeia com orquestrador, agentes especializados e validação —
não um prompt solto.

Exemplo, o sistema de postagem automática:

```
orquestrador
  └─ pesquisa de assunto   (uma notícia, um tema, uma data)
  └─ narrativa e copy
  └─ validação             ← antes de qualquer pixel
  └─ criação visual        (princípios de design + design system)
```

A validação vir **antes** da criação visual não é detalhe: é o que impede o
sistema de produzir uma peça bonita dizendo a coisa errada.

Um site pede mais do que identidade. Pede copy, proposta comercial e clareza
sobre para que ele existe. Essa camada de julgamento é construída junto — é o
que separa "a máquina montou uma página" de "a máquina entregou um site".

### 3. Os chats

O cliente recebe chats prontos, um por tipo de material. Ele pede em português,
o sistema entrega a peça no padrão da marca dele.

- **Páginas** — várias versões para anúncio, cada uma com copy e composição
  diferentes, todas dentro da identidade.
- **Mídia social** — post a post, ou o sistema automático completo.
- **Apresentações comerciais** — PDF e PowerPoint.
- **Motion** — vídeo, pedido por conversa.

E o ponto que costuma ser mal entendido: **o sistema cria peças novas.** Ele
não sorteia entre modelos prontos. Se o cliente não gostou, pede outro modelo e
recebe algo genuinamente diferente — ainda dentro da identidade.

*(Ferramenta: Claude, principalmente pelo Claude Design. A arquitetura não
depende de um fornecedor único.)*

---

## O que dá para produzir

Site · Página de anúncio · Apresentação comercial em PDF · Apresentação em
PowerPoint · Post para mídia social · Sistema de postagem automática · Flyer ·
Motion design

Na prática: qualquer peça cuja produção seja um problema de design.

---

## Os benefícios, na ordem em que importam para quem decide

1. **Escala.** O volume de material deixa de ser função do tamanho do time.
2. **Custo.** Uma estrutura no lugar de várias contratações.
3. **Consistência.** Toda peça nasce do mesmo sistema — e por isso a marca
   tende a ficar **mais coerente** do que ficaria com um time grande, onde cada
   pessoa interpreta a marca um pouco diferente. A consistência não depende de
   ninguém lembrar da regra.
4. **Autonomia.** Quem opera pode ser o designer da casa, que passa a produzir
   numa escala que não conseguia; ou o próprio dono, se a empresa for pequena.
   O requisito é saber usar um computador ou um celular.

---

## Como é vendido

### Serviço 1 — Construção

**Base:** design system + site + modelo de apresentação comercial.
É a fundação e as duas primeiras peças, feitas pela Cymatica.

**Sistemas (à escolha):** a capacidade de o cliente criar sozinho, um sistema
por tipo de material. Preço por sistema, somado à base.

Ordem de preço declarada pelo Lucas: **mídia social é o mais caro**, **PDF é o
mais barato** — sem que "mais barato" signifique barato.

Critério de precificação: o preço do sistema parte do que custaria a peça
entregue pronta, com margem. Referência dele: um site a R$ 8.000 vira um
sistema a R$ 10.000.

### Serviço 2 — Treinamento

Para a equipe operar o que foi construído. Duas modalidades:

- **Consultoria one a one**, por reunião, usando **a marca do cliente** e as
  necessidades reais dele.
- **Treinamento gravado**, usando **uma marca de mercado** como exemplo, com
  suporte.

---

## Vocabulário — como falar disso

| Em vez de | Dizer |
|---|---|
| "IA que faz design" | "a sua marca, sistematizada, produzindo sozinha" |
| "design system" (sozinho, para leigo) | "a sua marca virada em regra" — e só então nomear |
| "prompt" | "você pede" / "você conversa" |
| "componentes" | "peças da sua marca" |
| "automação" | "produção sem fila" |
| "Cloud" | **Claude** (erro recorrente de ditado, corrigir sempre) |

**Público desta página: empresários.** Não designers. Nenhum termo técnico
entra sem tradução imediata, e a régua é sempre o que muda no negócio dele.
