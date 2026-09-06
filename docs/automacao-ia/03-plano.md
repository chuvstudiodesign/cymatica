# Plano de execução — página da automação de design com IA

> Retomada: *"vamos continuar o plano lá do produto de automação de design com
> IA."* Este arquivo diz onde parou e o que falta.

## Estado

| Fase | O quê | Estado |
|---|---|---|
| 0 | Briefing registrado (`00-briefing-lucas.md`) | ✅ |
| 0 | Produto lapidado (`01-o-produto.md`) | ✅ |
| 0 | Branding da vertente (`02-branding.md`) | ✅ |
| 0 | Este plano | ✅ |
| 1 | Estrutura e copy da página (`lib/site-3/automacao.ts`) | ✅ |
| 2 | Componentes de seção (10 arquivos) | ✅ |
| 3 | Demonstração de digitação | ✅ |
| 4 | Seletor de sistemas com preço | ✅ |
| 5 | Rota + metadados + sitemap | ✅ |
| 6 | Ligar o botão da proposta do Juliano | ✅ |
| 7 | Verificação (build, lint, marca, a11y, mobile) | 🔄 |

### Entregue nesta rodada

- `src/app/(site)/automacao-de-design/page.tsx`
- `src/lib/site-3/automacao.ts` — todo o conteúdo, revisado pelo agente de copy
- `src/components/site-3/automacao/` — hero, problema, ganhos, como-funciona,
  demo, materiais, beneficios, pacotes, treinamento, fechamento
- `AUTOMACAO_HREF` da proposta do Juliano aponta para cá; o texto do cartão
  Insane deixou de dizer que a página não existe
- Rota no `sitemap.ts`

### Verificado

`next build` compila · `tsc --noEmit` limpo · lint 0 erros · 10 seções na
ordem planejada · 5 "ver mais" abrindo · seletor somando (24.000 + 14.000 +
7.000 = 45.000) · mensagem de WhatsApp correta · digitação da demo rodando ·
nenhum erro de console.

## Rota

`/automacao-de-design` — pública e indexável, ao contrário da proposta do
Juliano. É página de serviço, não documento privado. Entra no `sitemap.ts`.

## Arquitetura de arquivos

```
web/src/app/(site)/automacao-de-design/page.tsx      rota e metadados
web/src/lib/site-3/automacao.ts                      TODO o conteúdo, em dados
web/src/components/site-3/automacao/*.tsx            seções
```

Mesma disciplina da proposta: nenhuma frase e nenhum preço dentro de JSX.

## Estrutura da página

Decisão de ordem, com o motivo — o Lucas deixou a escolha em aberto e pediu que
fosse pensada:

| # | Seção | Por que aqui |
|---|---|---|
| 1 | **Herói** | A promessa em uma linha. Empresário decide se continua lendo em 3 segundos. |
| 2 | **O problema** | Curto. Nomear a dor antes de vender a cura — ele precisa se reconhecer. |
| 3 | **Três ganhos** | Benefício antes da explicação: dá motivo para aguentar o "como funciona". |
| 4 | **Como funciona** | O step by step pedido. Três passos, linguagem clara, com "ver mais" em cada um. |
| 5 | **Demonstração** | A digitação. Prova, no meio da página, que o negócio existe. |
| 6 | **O que dá para criar** | A lista de materiais. Concretiza o abstrato. |
| 7 | **Benefícios em detalhe** | A segunda leva, agora que ele entendeu o mecanismo. |
| 8 | **Pacotes e sistemas** | Base + seleção de sistemas com preço somando. |
| 9 | **Treinamento** | O segundo serviço. Depois do preço, porque é complemento. |
| 10 | **Encerramento** | CTA para WhatsApp. |

Benefício aparece **duas vezes** de propósito (3 e 7): a primeira é o gancho,
a segunda é o argumento. Foi uma das opções que o Lucas levantou e é a que
funciona melhor para venda longa.

## Regra das camadas

Camada base enxuta; profundidade sob demanda em "ver mais". Onde há mais a
dizer:

- Passo 1 → o que é design system, em linguagem de leigo
- Passo 2 → a cadeia de agentes do sistema de postagem
- Passo 3 → o que "criar novo" significa, contra "escolher template"
- Consistência → por que o sistema é mais coerente que um time grande

## Preços — assumidos, precisam de validação

O Lucas deu o método (preço da peça pronta + margem), não os números. Ver
`01-o-produto.md`. Assumido nesta entrega:

| Item | Valor | Origem |
|---|---|---|
| Fundação (sistema de marca + site + modelo de apresentação) | R$ 15.000 | definido pelo Lucas |
| Sistema de mídia social | R$ 9.000 | definido pelo Lucas |
| Sistema de motion | R$ 9.000 | definido pelo Lucas |
| Sistema de páginas e anúncios | R$ 8.000 | definido pelo Lucas |
| Sistema de apresentações | R$ 7.000 | definido pelo Lucas |
| Consultoria ao vivo | R$ 4.500 | definido pelo Lucas |
| Treinamento gravado | R$ 1.900 | definido pelo Lucas |

Definidos por ele em 2026-09-06, substituindo a estimativa da primeira versão.
Uma nota: mídia social e motion ficaram no mesmo valor, então mídia social
deixou de ser isoladamente o mais caro — o `02-branding.md` registra a ordem
antiga e vale relê-lo se isso voltar a importar.

**Tudo isso é chute fundamentado. Precisa de validação antes de publicar.**

## Fora de escopo, registrado

- **Página para designers** (curso/consultoria de como construir isso). Projeto
  separado, pedido para registro. Ver seção 9 do briefing.
- **Nome de marca da vertente** — candidato em `02-branding.md`, não aplicado.

## Regras herdadas

- Contrato `design-system-readonly`: nada de `globals.css`, `layout.tsx` raiz,
  `styleguide/**`, `components/ui/**`.
- Não apagar nada. Só criar.
- Não interromper para perguntar. Assumir, registrar, reportar no fim.
