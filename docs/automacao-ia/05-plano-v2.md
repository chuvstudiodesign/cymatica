# Plano — automação de design, versão 2

> Retomada: *"volta a fazer o plano v2 da automação"*. Este arquivo diz o que
> muda, o que já foi feito e o que falta.
>
> **A v1 fica intocada.** `/automacao-de-design` continua exatamente como está;
> a v2 existe para comparar lado a lado.

## Rota

`/automacao-de-design-2` — mesma estrutura da v1, com as mudanças abaixo.
Fora do `sitemap.ts` enquanto for versão de teste.

## Arquivos

```
src/app/(site)/automacao-de-design-2/page.tsx
src/lib/site-3/automacao-2.ts               conteúdo próprio (cópia + mudanças)
src/components/site-3/automacao-2/*.tsx     seções próprias (cópia + mudanças)
```

Cópia e não reaproveitamento: o objetivo é comparar duas versões, e componente
compartilhado faria a mudança de uma vazar na outra.

## Estado

| # | Item | Estado |
|---|---|---|
| 1 | Rota, dados e seções duplicadas | ✅ |
| 2 | Copy: "o terceiro é infinito" | ✅ |
| 3 | Copy: "máquinas" → sistema escalável, linguagem direta | ✅ |
| 4 | Laranja no "como funciona" | ✅ nos numerais |
| 5 | Mosaico do design system (16:9) sob o passo 1 | ✅ |
| 6 | Cena "o sistema lê o design system" (16:9) sob o passo 2 | ✅ |
| 7 | Cena "criando materiais" — chat + 4 peças em 4:5 | ✅ sob o passo 3 |
| 8 | Verificação (build, lint) | ✅ · marca e a11y ⬜ |

## 2 · Copy — os três passos

- `comoFunciona.title`: "Três passos, e o terceiro é seu." →
  **"Três passos, e o terceiro é infinito."**

## 3 · Copy — o passo 2

O nome "A gente constrói as máquinas" sai. Crítica do estúdio, e ela procede:
*"Que máquina? Parece que eu vou construir algo físico. Não está conversando
com o público."*

- `title`: **"A gente constrói o sistema que escala"**
- `body`: direto, sem metáfora. Em cima do seu design montamos um sistema que
  escala a criação de material — páginas web, apresentações em PDF, post para
  mídia social, vídeo. Cada um segue a sua identidade visual.
- Regra geral da v2: **menos estilizado, mais direto ao ponto.** O que a gente
  faz, dito como se diz a um cliente na mesa.

## 4 · Laranja no "como funciona"

O estúdio sentiu falta de acento na seção. Entra em **um** lugar por dobra —
os números dos passos são o candidato natural, porque marcam progressão sem
competir com o texto.

## 5 · Mosaico do design system — sob o passo 1

Painel 16:9 (empilha no mobile), montado como mosaico: células de tamanhos
diferentes — quadrado, retângulo de duas células, vertical, horizontal.

Cada célula mostra **uma peça do design system da própria Cymatica**, sem
texto explicativo dentro, só a coisa:

| Célula | Conteúdo |
|---|---|
| Logotipo | fundo laranja da marca, símbolo em contraste |
| Paleta de cores | só os campos de cor |
| Tipografia | a palavra "Cymatica" grande, cortada, quase abstrata |
| Botões | os componentes reais |
| Cartão | um card do sistema |
| Ícones / arcos | derivados do símbolo |

Etiqueta em caixa alta no rodapé de **cada célula** (dentro da célula, ~10px
de respiro): LOGOTIPO, PALETA DE CORES, TIPOGRAFIA… O estúdio pediu para
testar com etiqueta; se poluir, a variante sem etiqueta é trivial de voltar.

Movimento: as células entram como quem monta o painel. Nada de "construído por
prompt" — essa ideia foi levantada e descartada pelo próprio estúdio.

## 6 · A cena do passo 2 — o sistema lê o design system

Painel 16:9, dois lados:

- **Esquerda:** o mosaico condensado, rotulado DESIGN SYSTEM.
- As peças se juntam num maço (como arquivos agrupados no Mac) e são
  arrastadas para a direita.
- **Direita:** um chat, digitando. Digitação sem texto legível — o que importa
  é o gesto, não a frase.
- Entre os dois, uma seta com a legenda: **o nosso sistema de criação lê o seu
  design system**.
- Ao soltar: linha de status do tipo "criando a partir do seu design system".

## 7 · A cena das peças — o pulo do gato

Layout de chat à esquerda, material saindo à direita. Quatro pedidos, um por
sistema vendido:

| Pedido | Saída | Formato |
|---|---|---|
| post para mídia social | post de Dia dos Pais | 4:5 |
| apresentação comercial | capa + sumário, empilhados | 4:5 |
| vídeo em motion | peça tipográfica com propósito | 4:5 |
| site | herói de página, como no celular | 4:5 |

Todas as peças **desenhadas no design system da Cymatica**, com qualidade de
design real — não wireframe. O laranja entra como acento, nunca como
preenchimento.

**Decisão registrada:** o estúdio pediu uma foto de Dia dos Pais em preto e
branco. Não temos esse arquivo e não dá para inventá-lo, então o post é
composto tipograficamente, que é mais fiel à marca do que um banco de imagem.
Trocar por foto depois é mudar um bloco.

## Regras herdadas

- Contrato `design-system-readonly`: nada de `globals.css`, `layout.tsx` raiz,
  `styleguide/**`, `components/ui/**`.
- Não apagar nada. A v1 não muda.
- Não interromper para perguntar. Assumir, registrar, reportar no fim.

## Pendência do estúdio

Ele disse ter mais observações de copy e pediu para ser lembrado:
**"tem outras coisas no copy também que eu tô sentindo falta, mas depois eu te
falo. Depois você me lembra de eu te falar."**
