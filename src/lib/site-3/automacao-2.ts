/**
 * Automação de design com IA — conteúdo da rota `/automacao-de-design`.
 *
 * Todo o texto, preço e estrutura da página vivem aqui. As seções em
 * `components/site-3/automacao/` só compõem layout.
 *
 * Público: **empresário**, não designer. A régua de cada frase é o que muda no
 * negócio dele. Termo técnico só entra traduzido na mesma frase — "design
 * system" aparece uma vez, explicado, e depois vira "o seu sistema".
 *
 * A página tem duas camadas, por decisão do estúdio: o essencial na superfície
 * e profundidade sob demanda em `detail`. Quem só quer entender o que é lê a
 * camada de cima inteira sem abrir nada.
 *
 * Fonte: `docs/automacao-ia/`. Preços em `03-plano.md` são assumidos e
 * precisam de validação.
 */

import { whatsappLink } from "./copy"
import { formatBRL } from "@/lib/site/pricing"

export { whatsappLink }

/* ────────────────────────────── Metadados ───────────────────────────── */

export const meta = {
  title: "Automação de design com IA",
  description:
    "Transformamos a sua identidade num sistema que a máquina lê e construímos as máquinas que produzem em cima dele. Site, post, apresentação e vídeo sem fila.",
} as const

/* ──────────────────────────────── Herói ─────────────────────────────── */

export const hero = {
  label: "Serviço",
  title: "A sua marca, produzindo sozinha.",
  body: "A gente transforma a sua identidade num sistema e constrói as máquinas que produzem em cima dele. Você pede uma página, um post, uma apresentação ou um vídeo, e recebe no seu padrão, sem fila e sem briefing.",
  primaryCta: { label: "Ver como funciona", href: "#como-funciona" },
  secondaryCta: {
    label: "Falar no WhatsApp",
    message:
      "Olá! Vi a página de automação de design e queria entender como funciona na minha empresa.",
  },
} as const

/* ────────────────────────────── O problema ──────────────────────────── */

export const problema = {
  label: "O problema",
  title: "A marca fica pronta. A produção continua travada.",
  body: "Ter identidade não resolve a sexta-feira em que você precisa de uma página de anúncio, três posts e um PDF até segunda. Cada peça vira um briefing, uma fila e uma conta. E nenhuma sai igual à anterior.",
  pontos: [
    {
      title: "Toda peça começa do zero",
      body: "Briefing, referência, ajuste, aprovação. O ciclo inteiro para a quinta versão do mesmo banner.",
    },
    {
      title: "A fila é o teto",
      body: "Você produz o que o time dá conta. Dobrar a produção é dobrar a folha.",
    },
    {
      title: "A marca escorre",
      body: "Cada pessoa que toca a marca interpreta um pouco diferente. Em um ano, o material de janeiro e o de dezembro parecem de duas empresas.",
    },
  ],
} as const

/* ───────────────────────── Os três ganhos (gancho) ──────────────────── */

export const ganhos = {
  label: "O que muda",
  title: "Produção sem fila, marca sem desvio.",
  itens: [
    {
      numero: "01",
      title: "A marca para de depender de memória",
      body: "Toda peça nasce da mesma estrutura. Ninguém precisa lembrar da regra para a marca sair certa.",
    },
    {
      numero: "02",
      title: "O volume deixa de depender do time",
      body: "Cinco páginas de anúncio até sexta viram um pedido, não um projeto.",
    },
    {
      numero: "03",
      title: "Uma estrutura no lugar de várias contratações",
      body: "Você monta uma vez e usa todo mês, em vez de pagar de novo por cada peça.",
    },
  ],
} as const

/* ────────────────────────── Como funciona ───────────────────────────── */

export type Passo = {
  numero: string
  title: string
  body: string
  /** A camada de baixo: só abre para quem quiser. */
  detail: {
    title: string
    paragraphs: readonly string[]
    /** Lista curta, quando ajuda. Opcional. */
    bullets?: readonly string[]
  }
}

export const comoFunciona = {
  label: "Como funciona",
  title: "Três passos, e o terceiro é infinito.",
  lead: "Os dois primeiros são nossos. O terceiro fica com você, todo dia, sem depender da gente.",
  passos: [
    {
      numero: "01",
      title: "A sua marca vira regra",
      body: "A sua identidade vira estrutura: as cores exatas, os tamanhos de texto, os espaços e as peças visuais que a marca já usa. Escrito de um jeito que a máquina lê e obedece, sem interpretar.",
      detail: {
        title: "O que é isso, na prática",
        paragraphs: [
          "Um manual de marca descreve a regra para uma pessoa interpretar. Funciona enquanto alguém lê, entende e lembra. O que a gente monta no lugar não é um documento: é a regra escrita de um jeito que não admite interpretação.",
          "O nome disso é design system. Ele guarda desde o valor exato de cada cor até peças inteiras já montadas na sua marca: um cartão, um alerta, um cabeçalho, um bloco de preço. Podem ser dezenas ou centenas, mais os padrões de página que as combinam.",
          "É por isso que ele dispensa o manual em vez de vir junto com um. Não há o que interpretar.",
        ],
        bullets: [
          "Cores, tipografia, espaçamento, cantos e sombras, em valores exatos",
          "Peças visuais prontas, montadas na sua marca",
          "Padrões de página, para recombinar sem começar do zero",
        ],
      },
    },
    {
      numero: "02",
      title: "A gente constrói o sistema que escala",
      body: "Em cima do seu design, montamos um sistema que escala a criação de material: páginas web, apresentações em PDF, post para mídia social e vídeo. Cada um segue a sua identidade visual, do primeiro rascunho ao arquivo final.",
      detail: {
        title: "Por que é linha de montagem e não botão",
        paragraphs: [
          "Um site não é só identidade visual. Ele precisa de texto que convença, de uma oferta clara e de saber para que existe. Peça bonita dizendo a coisa errada não serve para nada.",
          "Por isso cada sistema tem etapas separadas e uma conferência antes do desenho. No de mídia social, uma etapa levanta o assunto, outra escreve, uma terceira confere se o que vai ser dito presta. Só então a peça é criada.",
        ],
        bullets: [
          "Levantamento do assunto: uma notícia, um tema, uma data",
          "Escrita do texto",
          "Conferência, antes de qualquer desenho",
          "Criação visual, dentro do seu sistema",
        ],
      },
    },
    {
      numero: "03",
      title: "Você pede, e sai pronto",
      body: "Você recebe uma conversa para cada tipo de material. Escreve o que precisa, em português, e a peça sai no padrão da sua marca. Não gostou? Peça outro caminho e ele faz diferente.",
      detail: {
        title: "Diferente mesmo, não outro template",
        paragraphs: [
          "Essa é a parte que costuma ser mal entendida. O sistema não sorteia entre modelos prontos. Ele compõe peças novas e, quando o pedido exige, cria elementos que ainda não existiam.",
          "O que não muda é a marca. Você pode pedir cinco versões de uma página de anúncio, com textos e composições completamente diferentes, e as cinco continuam sendo a sua empresa.",
          "É a diferença entre um gerador de imagem, que inventa um visual a cada pedido, e um sistema, onde o visual já está decidido e o que muda é o que você quer dizer.",
        ],
      },
    },
  ],
} as const satisfies { label: string; title: string; lead: string; passos: readonly Passo[] }

/* ───────────────────────── A demonstração ───────────────────────────── */

export const demo = {
  label: "Na prática",
  title: "Você escreve. Ele entrega.",
  body: "Sem software para aprender, sem arquivo para abrir. É uma conversa.",
  /** Cada troca é uma cena da animação de digitação. */
  turnos: [
    {
      prompt: "Cria uma página de anúncio para a campanha de julho",
      resposta: "Página montada no seu sistema, com título, oferta e formulário.",
    },
    {
      prompt: "Não gostei. Faz outro caminho, mais direto",
      resposta: "Nova composição, outro texto. Mesma marca.",
    },
    {
      prompt: "Agora um post disso para o Instagram",
      resposta: "Peça no formato do feed, no seu padrão.",
    },
  ],
  /** Legenda da placa ao lado: é ela que transforma a figura em argumento. */
  plateCaption: "Mesma placa, outra figura.",
  footnote:
    "As respostas acima descrevem o que sai. A peça vem pronta, no formato que você pediu.",
} as const

/* ─────────────────────── O que dá para criar ────────────────────────── */

export const materiais = {
  label: "O que dá para criar",
  title: "Sete tipos de material. Por enquanto.",
  itens: [
    { name: "Site", body: "De ponta a ponta, com texto e oferta, não só o desenho." },
    { name: "Página de anúncio", body: "Quantas variações a campanha pedir." },
    { name: "Apresentação comercial", body: "Em PDF e PowerPoint." },
    { name: "Post para mídia social", body: "Peça a peça ou a semana inteira." },
    { name: "Postagem automática", body: "Assunto, texto e arte, de ponta a ponta." },
    { name: "Flyer", body: "Para rede social ou para a gráfica." },
    { name: "Motion", body: "Vídeo animado, pedido por conversa." },
  ],
} as const

/* ───────────────────── Benefícios em detalhe ────────────────────────── */

export const beneficios = {
  label: "Por que isso importa",
  title: "O que muda quando a regra vira estrutura.",
  itens: [
    {
      title: "Coerência que não escorre",
      body: "Um time grande interpreta a marca de muitas maneiras, todas defensáveis, todas um pouco diferentes. Um sistema interpreta de uma só. Não é sobre quem trabalha melhor. É sobre onde a regra está guardada.",
      detail: {
        title: "E o designer, onde entra?",
        paragraphs: [
          "Entra como quem opera melhor a ferramenta. Com o sistema na mão, ele produz num volume que não alcançaria sozinho e continua sendo quem julga o que presta.",
          "Nada aqui substitui o julgamento de design. O que a estrutura tira do caminho é a repetição: montar pela quinta vez a mesma peça com outro texto.",
        ],
      },
    },
    {
      title: "Escala sem folha",
      body: "O quanto você produz deixa de depender de quantas pessoas você contratou. A estrutura se monta uma vez e trabalha todo mês.",
    },
    {
      title: "Quem opera pode ser você",
      body: "Não precisa ser designer nem programador. Precisa saber usar um computador. Em alguns sistemas, um celular basta.",
    },
    {
      title: "A marca fica com você",
      body: "O sistema é seu. Não mora na cabeça de um fornecedor e não some se a gente parar de trabalhar junto.",
    },
  ],
} as const

/* ──────────────────────── Pacotes e sistemas ────────────────────────── */

export const base = {
  label: "A base",
  name: "Fundação",
  price: 15000,
  title: "Onde todo mundo começa.",
  body: "Sem ela, os sistemas não têm o que ler. É o seu sistema de marca, mais as duas primeiras peças feitas por nós.",
  items: [
    {
      name: "O seu sistema de marca",
      note: "Cores, tipografia, espaçamento, peças e padrões de página, escritos para a máquina ler.",
    },
    {
      name: "Site",
      note: "Construído sobre o sistema, no ar e no seu domínio.",
    },
    {
      name: "Modelo de apresentação comercial",
      note: "O seu orçamento e a sua proposta, no padrão da marca.",
    },
  ],
} as const

export type Sistema = {
  id: string
  name: string
  price: number
  body: string
}

/**
 * Os sistemas são somados à base, um por tipo de material.
 *
 * Ordem de preço definida pelo estúdio: mídia social é o mais caro, e o de
 * apresentações é o mais barato — sem que barato signifique barato. O critério
 * é o custo da peça entregue pronta, com margem.
 */
export const sistemas: readonly Sistema[] = [
  {
    id: "social",
    name: "Sistema de mídia social",
    price: 9000,
    body: "Post a post ou a operação inteira: levanta o assunto, escreve, confere e desenha.",
  },
  {
    id: "motion",
    name: "Sistema de motion",
    price: 9000,
    body: "Vídeo animado na sua marca, pedido por conversa.",
  },
  {
    id: "paginas",
    name: "Sistema de páginas e anúncios",
    price: 8000,
    body: "Quantas páginas a campanha pedir, cada uma com texto e composição próprios.",
  },
  {
    id: "apresentacoes",
    name: "Sistema de apresentações",
    price: 7000,
    body: "Proposta, orçamento e apresentação comercial, em PDF e PowerPoint.",
  },
]

export const pacotes = {
  label: "Investimento",
  title: "A fundação, e o que você somar a ela.",
  lead: "Escolha os sistemas que a sua operação vai usar. O valor soma na hora.",
  baseLegend: "Incluso sempre",
  sistemasLegend: "Escolha os sistemas",
  totalLabel: "Total",
  emptyLabel: "Só a fundação",
  ctaLabel: "Enviar seleção",
  counter: (n: number) => (n === 1 ? "1 sistema" : `${n} sistemas`),
} as const

/* ───────────────────────────── Treinamento ──────────────────────────── */

export const treinamento = {
  label: "Depois de construído",
  title: "Alguém precisa saber usar.",
  lead: "A estrutura é entregue funcionando. O treinamento é para a sua equipe operar sozinha.",
  opcoes: [
    {
      name: "Consultoria, ao vivo",
      price: 4500,
      body: "Encontros com a sua equipe, usando a sua marca e os casos reais do seu dia. Sai da reunião sabendo pedir o que precisa.",
      badge: "Com a sua marca",
    },
    {
      name: "Treinamento gravado",
      price: 1900,
      body: "O caminho inteiro demonstrado sobre uma marca de mercado, com suporte para as dúvidas que vierem depois.",
      badge: "No seu ritmo",
    },
  ],
} as const

/* ───────────────────────────── Encerramento ─────────────────────────── */

export const fechamento = {
  label: "Começar",
  title: "Traga a sua marca. A gente devolve produzindo.",
  body: "A conversa começa pelo que a sua empresa produz hoje, quanto isso custa e onde trava.",
  ctaLabel: "Falar no WhatsApp",
  message:
    "Olá! Quero entender a automação de design para a minha empresa.",
} as const

/* ─────────────────────────────── Cálculo ────────────────────────────── */

export function precoDosSistemas(ids: readonly string[]) {
  return ids.reduce(
    (total, id) => total + (sistemas.find((s) => s.id === id)?.price ?? 0),
    0
  )
}

export function buildAutomacaoMessage(ids: readonly string[]) {
  const escolhidos = sistemas.filter((s) => ids.includes(s.id))
  const total = base.price + precoDosSistemas(ids)

  const linhas = [
    "*Automação de design — Cymatica*",
    "",
    `*${base.name}:* ${formatBRL(base.price)}`,
  ]

  if (escolhidos.length > 0) {
    linhas.push("", `*Sistemas* (${escolhidos.length})`)
    linhas.push(
      ...escolhidos.map((s) => `• ${s.name} — ${formatBRL(s.price)}`)
    )
  } else {
    linhas.push("", "Sem sistemas adicionais por enquanto.")
  }

  linhas.push("", `*Total:* ${formatBRL(total)}`)

  return linhas.join("\n")
}

export function automacaoWhatsappLink(ids: readonly string[]) {
  return whatsappLink(buildAutomacaoMessage(ids))
}
