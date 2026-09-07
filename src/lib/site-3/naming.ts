/**
 * Proposta de naming — Juliano.
 *
 * Documento privado, como a proposta de identidade. Mesma disciplina: todo o
 * texto e todo o preço vivem aqui, e as seções só compõem layout.
 *
 * O cliente é o mesmo da proposta de identidade visual e já escolheu o pacote
 * dela. Isso **não aparece no texto** — a página é uma proposta de naming e
 * se sustenta sozinha, sem depender de o leitor lembrar de outro documento.
 *
 * A regra mais importante deste arquivo: **nada aqui pode prometer registro no
 * INPI.** O trabalho aumenta as chances; quem concede é um órgão externo. Cada
 * frase sobre registro passa por esse crivo.
 */

import { formatBRL } from "@/lib/site/pricing"

/* ──────────────────────── Contato desta proposta ─────────────────────── */

/** O mesmo canal comercial da proposta de identidade. */
const WHATSAPP_ORCAMENTO = "5531992423560"

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_ORCAMENTO}?text=${encodeURIComponent(message)}`
}

/* ────────────────────────────── Metadados ───────────────────────────── */

export const meta = {
  title: "Proposta de naming",
  description:
    "Proposta de desenvolvimento de nome de marca, com processo, entregáveis, prazo e investimento. Documento privado.",
} as const

/* ──────────────────────────────── Herói ─────────────────────────────── */

export const hero = {
  label: "Proposta de naming",
  title: "O nome vem antes de tudo.",
  personalizacao: "Para Juliano Brandalisse",
  body: "Antes da fachada, da caixa e do cardápio, existe a palavra que as pessoas vão dizer quando indicarem a sua casa para alguém. É o único elemento da marca que sobrevive ao boca a boca. Esta proposta é sobre acertar essa palavra.",
  primaryCta: { label: "Ver o processo", href: "#processo" },
  secondaryCta: {
    label: "Falar no WhatsApp",
    message: "Olá! Recebi a proposta de naming e queria conversar.",
  },
} as const

/* ───────────────────────────── O argumento ──────────────────────────── */

export const argumento = {
  label: "O benefício",
  title: "Nome ruim custa caro, e cobra depois.",
  claimsLabel: "O que está em jogo",
  paragraphs: [
    "Um nome difícil de falar não é indicado. Um nome difícil de escrever não é encontrado. Um nome parecido com o do concorrente entrega cliente de graça para ele. Nenhum desses problemas aparece no primeiro mês, todos aparecem quando trocar já custa caro.",
    "E há o problema que ninguém vê antes da hora: nome que não dá para registrar. Quando a casa já está aberta, a fachada instalada e a rede com seguidores, descobrir que a marca não pode ser sua é o pior momento possível para descobrir.",
  ],
  claims: [
    {
      title: "Ser dito sem esforço.",
      body: "Nome que trava na boca não circula. O boca a boca é o canal mais barato que existe, e ele só funciona com palavra fácil.",
    },
    {
      title: "Ser achado.",
      body: "Se escrever errado leva a outro lugar, você paga para o cliente chegar até você todas as vezes.",
    },
    {
      title: "Ser seu.",
      body: "Um nome que você não consegue proteger é um investimento que qualquer um pode usar depois.",
    },
  ],
} as const

/* ────────────────────────────── O processo ──────────────────────────── */

export type Etapa = {
  numero: string
  title: string
  body: string
}

export const processo = {
  label: "Como funciona",
  title: "Quatro etapas até a palavra certa.",
  lead: "Naming não é lista de sugestões. É pesquisa, construção e eliminação, e a maior parte do trabalho está no que a gente descarta.",
  etapas: [
    {
      numero: "01",
      title: "Briefing",
      body: "A conversa que define tudo o que vem depois: o que a casa é, para quem ela fala, o que ela não quer parecer, e o que já existe no bairro e na categoria. Sem essa etapa, o resto é chute com boa apresentação.",
    },
    {
      numero: "02",
      title: "Território e construção",
      body: "A partir do briefing, definimos os caminhos possíveis e construímos nomes dentro de cada um. Aqui entram as técnicas: nomes novos, formados por método, e não palavras achadas no dicionário.",
    },
    {
      numero: "03",
      title: "Filtro",
      body: "Cada candidato passa por teste de pronúncia, de escrita, de leitura em voz alta e de busca. Os que travam em qualquer um deles caem, por melhores que sejam no papel.",
    },
    {
      numero: "04",
      title: "Apresentação",
      body: "As opções finais chegam explicadas: de onde o nome vem, o que ele carrega, como ele se comporta escrito e falado, e o que encontramos na consulta de registro.",
    },
  ],
} as const satisfies { label: string; title: string; lead: string; etapas: readonly Etapa[] }

/* ─────────────────────────────── Técnicas ───────────────────────────── */

export const tecnicas = {
  label: "O método",
  title: "As mesmas técnicas que nomearam marcas globais.",
  lead: "Nome de marca grande quase nunca é uma palavra que já existia. É construção, e construção tem método.",
  itens: [
    {
      title: "Alternância de vogal e consoante",
      body: "As palavras mais fáceis do Ocidente alternam vogal e consoante num ritmo previsível. É o que faz um nome ser lido certo na primeira tentativa, por quem nunca o viu escrito.",
    },
    {
      title: "Raízes latinas",
      body: "Construir a partir do latim dá ao nome um significado que sustenta a história da marca, e produz palavras novas, que é justamente o que um registro precisa.",
    },
    {
      title: "Palavra nova, não palavra emprestada",
      body: "Nome inventado com método é mais fácil de proteger e mais difícil de confundir do que um termo comum da categoria.",
    },
    {
      title: "Teste de boca e de tela",
      body: "Cada candidato é dito em voz alta, escrito por quem nunca o viu e buscado na internet. O que não passa nos três, não chega até você.",
    },
  ],
} as const

/* ───────────────────────────── O registro ───────────────────────────── */

export const registro = {
  label: "Registro",
  title: "A gente trabalha para aumentar as chances. Garantir, não dá.",
  paragraphs: [
    "Todo nome que apresentamos passa por consulta prévia na base do INPI, e a construção já é pensada para reduzir colisão: palavra nova tem menos chance de esbarrar em marca existente do que termo comum da categoria.",
    "Mas é preciso dizer com clareza: **o registro é concedido pelo INPI, que é um órgão independente**. Nenhum estúdio de naming no mundo pode garantir deferimento. O que a gente entrega é um nome construído para ter a melhor chance possível, com a consulta feita e o que encontramos na mesa.",
    "Deixando claro o limite do serviço: a Cymatica desenvolve o nome. O registro no INPI não faz parte desta proposta e não é feito por nós.",
  ],
} as const

/* ──────────────────────────── O que você recebe ─────────────────────── */

export const entrega = {
  label: "A entrega",
  title: "De duas a três opções, estudadas em detalhes.",
  lead: "Não é uma lista de cinquenta nomes para você escolher. São poucas opções, cada uma defensável, com o raciocínio inteiro na mesa.",
  itens: [
    {
      name: "De 2 a 3 nomes finais",
      body: "Cada um com o conceito explicado: de onde vem, o que carrega, por que sobreviveu ao filtro.",
    },
    {
      name: "Consulta de registro",
      body: "O que encontramos na base do INPI para cada opção, e a leitura do que isso significa.",
    },
    {
      name: "Teste de uso",
      body: "Como o nome se comporta falado, escrito, no domínio e no perfil da rede.",
    },
    {
      name: "Documento de apresentação",
      body: "Em link ou PDF, com todo o raciocínio, para você consultar e mostrar a quem precisar.",
    },
  ],
  apresentacao: {
    title: "Como a entrega chega até você",
    body: "Você escolhe: uma reunião em que apresentamos e discutimos ao vivo, ou o documento enviado pelo WhatsApp para você ler no seu tempo. Projetos com mais gente decidindo costumam pedir a reunião.",
  },
} as const

/* ────────────────────────── Prazo e investimento ────────────────────── */

export type Prazo = {
  id: "padrao" | "fast"
  name: string
  days: number
  fee: number
  summary: string
  option: string
}

export const prazos: readonly Prazo[] = [
  {
    id: "padrao",
    name: "Padrão",
    days: 12,
    fee: 0,
    summary: "12 dias úteis, do briefing à apresentação. Sem custo adicional.",
    option: "Padrão · 12 dias úteis",
  },
  {
    id: "fast",
    name: "Fast",
    days: 6,
    fee: 450,
    summary: "6 dias úteis. Taxa de R$ 450, o mesmo valor da proposta de identidade.",
    option: "Fast · 6 dias úteis · + R$ 450",
  },
]

/**
 * O investimento.
 *
 * Valor único: naming não tem pacote maior e menor — o processo é o mesmo, e
 * cortar etapa aqui significaria entregar nome pior.
 */
export const investimento = {
  label: "Investimento",
  title: "Um valor, o processo inteiro.",
  name: "Desenvolvimento de naming",
  price: 2400,
  body: "Briefing, construção, filtro, consulta de registro e apresentação. De duas a três opções finais, com o conceito de cada uma.",
  prazoLegend: "Prazo",
  totalLabel: "Total",
  ctaLabel: "Aprovar e começar",
} as const

/* ───────────────────────────── Encerramento ─────────────────────────── */

export const fechamento = {
  label: "Começar",
  title: "O briefing é a primeira conversa.",
  body: "Assim que você aprovar, marcamos o briefing. É dele que sai tudo o que vem depois.",
  ctaLabel: "Falar no WhatsApp",
  message: "Olá! Quero aprovar a proposta de naming e marcar o briefing.",
} as const

/* ─────────────────────────────── Mensagem ───────────────────────────── */

export function buildNamingMessage(prazo: Prazo) {
  const total = investimento.price + prazo.fee
  return [
    "*Proposta de naming, Cymatica*",
    "",
    `*Serviço:* ${investimento.name} · ${formatBRL(investimento.price)}`,
    `*Prazo:* ${prazo.days} dias úteis (${prazo.name.toLowerCase()}${
      prazo.fee > 0 ? `, taxa de ${formatBRL(prazo.fee)}` : ", sem taxa"
    })`,
    "",
    `*Total:* ${formatBRL(total)}`,
    "",
    "Quero aprovar e marcar o briefing.",
  ].join("\n")
}

export function namingWhatsappLink(prazo: Prazo) {
  return whatsappLink(buildNamingMessage(prazo))
}
