/**
 * Proposta comercial privada — Juliano.
 *
 * Todo o conteúdo da rota `/proposta-juliano` vive aqui, em dados. As seções
 * em `components/site-3/proposta/` só compõem layout: nenhuma frase, nenhum
 * preço e nenhuma peça está escrita dentro de JSX.
 *
 * Duas regras herdadas de `copy.ts` valem igual: sem travessão e sem tom de
 * barganha. O argumento é margem, não desconto.
 *
 * A personalização acontece **uma única vez**, em `hero.personalizacao`. Do
 * segundo bloco em diante o texto fala da entrega, não do cliente, e usa
 * alusão indireta ("a casa", "a fachada", "a caixa") no lugar do nome.
 */

/**
 * O WhatsApp desta proposta é o do atendimento comercial, não o do site.
 *
 * `copy.ts` guarda o número institucional do estúdio, usado pelo rodapé e
 * pelos formulários públicos, e ele continua intocado. Aqui os orçamentos
 * caem num número próprio — trocar o de lá mudaria as outras sete rotas.
 */
const WHATSAPP_ORCAMENTO = "5531992423560"

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_ORCAMENTO}?text=${encodeURIComponent(message)}`
}
import { formatBRL } from "@/lib/site/pricing"

/* ────────────────────────────── Metadados ───────────────────────────── */

export const meta = {
  title: "Proposta de identidade visual",
  description:
    "Proposta de identidade visual com preço fechado, prazos e a lista do que entra em cada pacote. Documento privado, escrito para um projeto específico.",
} as const

/* ──────────────────────────────── Herói ─────────────────────────────── */

export const hero = {
  label: "Proposta de identidade visual",
  title: "Uma marca que já nasce cobrando mais.",
  /** O único lugar da página onde o cliente é nomeado. */
  personalizacao: "Para Juliano Brandalisse",
  body: "Você tem um ponto, um forno e uma data. Falta o que faz alguém escolher a sua porta e voltar na semana seguinte, além da massa. Esta página traz o escopo completo, o preço de cada pacote de design e o prazo. Sem reunião para descobrir o valor.",
  primaryCta: { label: "Escolher um pacote", href: "#pacotes" },
  secondaryCta: {
    label: "Falar no WhatsApp",
    message: "Olá! Recebi a proposta de identidade visual e queria conversar.",
  },
} as const

/* ─────────────────── O que é um pacote de identidade ────────────────── */

export const kit = {
  label: "A entrega",
  title: "Seis peças que trabalham juntas.",
  intro:
    "Identidade visual não é o desenho de um símbolo. É um conjunto de decisões tomadas uma vez para que tudo que a casa produzir depois saia parecido consigo mesmo. São seis peças. Cada uma resolve um problema diferente.",
  /**
   * `role` responde "e daí?" em uma linha; `body` explica sem jargão. O leitor
   * não é designer, então nenhuma definição é técnica: todas são operacionais.
   */
  pieces: [
    {
      name: "Logotipo",
      role: "A assinatura.",
      body: "É o sinal que precisa ser reconhecido de longe, na fachada, e pequeno, na etiqueta de uma embalagem. Entregamos em todas as versões necessárias: horizontal, vertical, símbolo isolado e as versões para fundo claro e escuro.",
    },
    {
      name: "Paleta de cores",
      role: "O que as pessoas lembram primeiro.",
      body: "Ninguém lembra o nome do restaurante que visitou uma vez, mas lembra que era vermelho e branco. A paleta define as cores exatas, com os códigos para tela e para gráfica, para que o vermelho da parede seja o mesmo vermelho da caixa.",
    },
    {
      name: "Estampa",
      role: "Superfície barata que parece cara.",
      body: "Um padrão gráfico que se repete e preenche qualquer área: papel de forro, sacola, guardanapo, parede, uniforme, fundo de post. É a peça que mais rende, porque transforma material simples em material que parece pensado.",
    },
    {
      name: "Tipografia",
      role: "O tom de voz por escrito.",
      body: "As fontes escolhidas para o cardápio, para a placa e para as redes. Definem se a casa parece tradicional ou moderna, cara ou popular, antes mesmo de alguém ler a palavra. Você recebe os arquivos e a regra de quando usar cada uma.",
    },
    {
      name: "Ícones",
      role: "Informação sem legenda.",
      body: "Um conjunto desenhado no mesmo traço da marca para marcar o que é vegetariano, o que é apimentado, o que sai em dez minutos, o que é retirada e o que é entrega. Cardápio com ícone bom se lê mais rápido, e cliente que entende rápido pede mais.",
    },
    {
      name: "Manual de marca",
      role: "A regra que impede o estrago.",
      body: "Um documento que qualquer gráfica, fornecedor ou social media abre e entende. Diz o que pode e o que não pode, com exemplos. É o que garante que a marca continue igual quando você não estiver olhando.",
    },
  ],
  /** O pedido explícito de arquivos completos para mídia social e impressos. */
  closing:
    "A entrega inclui todos os arquivos, organizados e prontos para uso. As versões de mídia social já saem nos formatos de feed, stories e foto de perfil. As versões de impresso saem em alta resolução, com sangria e marca de corte, do jeito que a gráfica pede.",
} as const

/* ───────────────────────── Por que gera valor ───────────────────────── */

export const value = {
  label: "O benefício",
  title: "Marca boa é margem, não despesa.",
  /** Título dos três benefícios, para que eles não leiam como notas soltas. */
  claimsLabel: "O que você ganha",
  paragraphs: [
    "Duas casas podem vender a mesma pizza, com a mesma farinha e o mesmo forno. Uma cobra 49. A outra cobra 79 e tem fila. A diferença não está só na massa.",
    "O que faz alguém aceitar pagar mais é a impressão de estar comprando algo cuidado. Essa impressão se forma antes da primeira mordida: na fachada, na caixa, no cardápio, no post que apareceu no celular. Tudo isso é design, e tudo isso é decidido agora, antes de abrir.",
    "Quem abre com a marca resolvida não precisa competir por preço para se estabelecer. Nasce num patamar e defende ele. Quem abre sem, entra na comparação, e sair dela depois custa muito mais caro do que qualquer pacote desta página.",
  ],
  claims: [
    {
      title: "O preço que você consegue pedir.",
      body: "A margem se decide no que o cliente enxerga antes de provar.",
    },
    {
      title: "Ser lembrado ou ser comparado.",
      body: "Marca sem forma própria só compete pelo número mais baixo da lista.",
    },
    {
      title: "O custo de refazer.",
      body: "Trocar identidade com a casa aberta significa refazer fachada, cardápio, embalagem e redes ao mesmo tempo.",
    },
  ],
} as const

/* ─────────────────────────── Os três pacotes ────────────────────────── */

export type PackageId = "pro" | "pro-max" | "insane"

export type PackageItem = {
  name: string
  /** Só onde o nome não se explica sozinho para quem não é designer. */
  note?: string
}

export type ProposalPackage = {
  id: PackageId
  name: string
  price: number
  positioning: string
  items: readonly PackageItem[]
  ctaLabel: string
  /** Um só. O destaque é o único ponto de laranja da dobra. */
  featured?: boolean
  badge?: string
}

export const packages: readonly ProposalPackage[] = [
  {
    id: "pro",
    name: "Pro",
    price: 2900,
    positioning: "Para abrir com tudo que a marca precisa no primeiro dia.",
    items: [
      { name: "Logotipo" },
      { name: "Paleta de cores" },
      { name: "Estampa" },
      { name: "Tipografia" },
      { name: "Ícones" },
      { name: "Manual de marca" },
    ],
    ctaLabel: "Escolher Pro",
  },
  {
    id: "pro-max",
    name: "Pro Max",
    /** Pro (R$ 2.900) mais o site (R$ 3.000). */
    price: 5900,
    positioning: "Para quem também quer existir fora das redes sociais.",
    items: [
      { name: "Tudo do Pro" },
      {
        name: "Desenvolvimento de site",
        note: "Site próprio com cardápio, endereço, horário e botão de pedido, no ar e no seu domínio.",
      },
    ],
    ctaLabel: "Escolher Pro Max",
  },
  {
    id: "insane",
    name: "Insane",
    /**
     * Pro Max (R$ 5.900) mais a fundação da automação (R$ 15.000) = R$ 20.900,
     * com desconto de pacote. A fundação já traz o sistema de marca, o site e
     * o modelo de apresentação — por isso não há sistemas avulsos somados
     * aqui: eles são o passo seguinte, na página da automação.
     */
    price: 18900,
    positioning: "Para quem já sabe que não vai parar numa casa só.",
    items: [
      { name: "Tudo do Pro Max" },
      {
        name: "Design system",
        note: "Um conjunto de peças prontas e regras de montagem, para que todo material novo saia no padrão sem começar do zero.",
      },
      {
        name: "Automação de design com IA",
        note: "Um fluxo montado com a sua marca dentro, onde você gera os próprios posts e peças no padrão certo, sem depender de designer para cada publicação.",
      },
    ],
    ctaLabel: "Escolher Insane",
    featured: true,
    badge: "Escolha do estúdio",
  },
] as const

export const packagesSection = {
  label: "Pacotes",
  title: "Três níveis, preço fechado.",
  lead: "O escopo é o que está escrito. Nada entra depois com valor surpresa.",
} as const

/**
 * Gancho da página de automação de design com IA.
 *
 * A página ainda não existe. Quando ela existir, basta trocar `null` pela rota
 * (algo como `"/automacao-de-design"`) e o botão de destaque no cartão Insane
 * passa sozinho de conversa no WhatsApp para navegação interna. Enquanto for
 * `null`, o botão continua funcionando: abre o WhatsApp com a mensagem de
 * `automation.whatsapp`. Em nenhum momento existe link quebrado.
 *
 * export const AUTOMACAO_HREF = "/automacao-de-design"
 */
export const AUTOMACAO_HREF: string | null = "/automacao-de-design"

export const automation = {
  ctaLabel: "Entender a automação",
  body: "A página explica o serviço inteiro: como a sua marca vira sistema e o que dá para produzir a partir dele.",
  whatsapp:
    "Olá! Vi a proposta e queria entender a automação de design com IA do pacote Insane.",
} as const

/* ────────────────────────────── Prazos ──────────────────────────────── */

export type DeadlineId = "padrao" | "fast"

export type Deadline = {
  id: DeadlineId
  name: string
  /** Sempre em dias úteis. Nunca escrever "dias" sozinho. */
  days: number
  fee: number
  summary: string
  /** Rótulo curto para o seletor do modal. */
  option: string
}

export const deadlines: readonly Deadline[] = [
  {
    id: "padrao",
    name: "Padrão",
    days: 25,
    fee: 0,
    summary: "25 dias úteis. Incluso em qualquer pacote, sem custo adicional.",
    option: "Padrão · 25 dias úteis",
  },
  {
    id: "fast",
    name: "Fast",
    days: 10,
    fee: 450,
    summary: "10 dias úteis. Taxa de R$ 450 sobre qualquer pacote.",
    option: "Fast · 10 dias úteis · + R$ 450",
  },
] as const

export const deadlinesSection = {
  label: "Prazo",
  title: "Duas velocidades.",
  note: "A diferença entre os dois não é qualidade. É fila. No prazo padrão, o seu projeto divide a agenda com os outros da vez. No fast, ele passa na frente e o estúdio trabalha nele em dedicação concentrada. A entrega é a mesma, com o mesmo número de peças e as mesmas rodadas de ajuste.",
} as const

/* ──────────────────────── Cuidado de mídia social ───────────────────── */

export const social = {
  label: "Pacote de mídia social",
  title: "Marca parada não vende.",
  body: "A identidade dá a forma. O que mantém ela viva é o que sai toda semana. Cuidamos disso por inteiro: o que publicar, quando publicar e a peça pronta para publicar. Você abre o celular e o conteúdo está lá, no padrão certo, sem você ter tirado a foto às onze da noite depois de fechar.",
  items: [
    {
      title: "Criação de post",
      body: "Peças desenhadas na sua identidade, com a legenda escrita.",
    },
    {
      title: "Calendário editorial",
      body: "O mês inteiro planejado antes de começar, com data e assunto de cada publicação.",
    },
    {
      title: "Produção",
      body: "Fotografia e vídeo do produto, do espaço e dos bastidores, feitos no local.",
    },
  ],
  ctaLabel: "Pedir cotação no WhatsApp",
  ctaNote:
    "O valor depende da frequência e do volume de produção. Resposta no mesmo dia.",
  whatsapp:
    "Olá! Vi a proposta e queria uma cotação do cuidado de mídia social: criação de post, calendário e produção.",
  /**
   * Slot do case de mídia social.
   *
   * ┌──────────────────────────────────────────────────────────────────┐
   * │ TROCAR AQUI quando a imagem do case chegar.                      │
   * │                                                                  │
   * │ 1. Salve o arquivo em `public/projects/` (ex.:                   │
   * │    `public/projects/social-case.jpg`).                           │
   * │ 2. Troque `src: null` pelo caminho: `src: "/projects/…"`.        │
   * │ 3. Ajuste `alt` para descrever o que a imagem mostra.            │
   * │                                                                  │
   * │ Enquanto `src` for `null`, a seção rende o placeholder de        │
   * │ interferência em `proposta/case-slot.tsx`, que é composição da   │
   * │ marca e não parece imagem quebrada.                              │
   * └──────────────────────────────────────────────────────────────────┘
   */
  case: {
    src: "/projects/rango-feed-social.png" as string | null,
    /** Dimensões reais do arquivo. É delas que sai a proporção do slot. */
    width: 1060,
    height: 1075,
    alt: "Nove publicações da Rango dispostas como o feed do Instagram: fotos de cães, embalagens e peças de texto, todas na mesma identidade verde e azul.",
    /** Sem legenda: a imagem mostra o trabalho melhor do que a frase dizia. */
    caption: null as string | null,
  },
} as const

/* ───────────────────────────── Quem somos ───────────────────────────── */

export const studio = {
  label: "Cymatica",
  body: "A Cymatica é um estúdio de design e software house. Trabalhamos em identidades e experiências que movem cultura, comércio e indústria, com o preço na mesa desde a primeira conversa. O que prometemos entregar é exatamente o que vai para o contrato.",
} as const

/* ──────────────────────────── Peças Plus ────────────────────────────── */

export type Piece = {
  name: string
  /** Preço do design da peça, em reais. Não inclui impressão nem produção. */
  price: number
}

export type PieceGroup = {
  id: string
  /** Uma palavra: em quatro grupos lado a lado, rótulo curto não quebra. */
  name: string
  pieces: readonly Piece[]
}

/**
 * As peças avulsas que podem somar ao pacote.
 *
 * Levantadas para a realidade de uma casa de pizza, não para uma lista
 * genérica de papelaria: os quatro grupos seguem o caminho físico do cliente
 * dela, do salão até a rua.
 *
 * Cada peça tem preço fechado, de mercado, e é só o **design** — arquivo
 * pronto para a gráfica. Impressão, produção e material ficam por conta de
 * quem contrata. O valor acompanha a complexidade: uma caixa de pizza pede
 * planificação e prova de dobra, um carimbo não.
 */
/*
 * Preços revistos para baixo em 2026-09-06: cada peça ficou em torno de 55%
 * do valor anterior. A tabela antiga pesava demais ao lado de um pacote base
 * de R$ 2.900 — somar três peças chegava a um quarto do projeto inteiro.
 */
export const pieceGroups: readonly PieceGroup[] = [
  {
    id: "salao",
    name: "Salão",
    pieces: [
      { name: "Cardápio", price: 430 },
      { name: "Menu board", price: 350 },
      { name: "Guardanapo", price: 130 },
      { name: "Jogo americano", price: 190 },
      { name: "Placa de mesa com QR", price: 150 },
      { name: "Uniforme", price: 250 },
      { name: "Avental", price: 190 },
      { name: "Quadro temático", price: 230 },
    ],
  },
  {
    id: "delivery",
    name: "Delivery",
    pieces: [
      { name: "Caixa de pizza", price: 480 },
      { name: "Embalagem de acompanhamento", price: 290 },
      { name: "Sacola", price: 230 },
      { name: "Etiqueta e lacre", price: 150 },
      { name: "Cinta de caixa", price: 160 },
      { name: "Copo", price: 160 },
      { name: "Caneca", price: 150 },
      { name: "Imã de geladeira", price: 120 },
    ],
  },
  {
    id: "papelaria",
    name: "Papelaria",
    pieces: [
      { name: "Cartão de visita", price: 200 },
      { name: "Cartão interativo", price: 260 },
      { name: "Cartão cortesia", price: 150 },
      { name: "Cartão fidelidade", price: 180 },
      { name: "Bloco de anotação", price: 130 },
      { name: "Comanda", price: 150 },
      { name: "Carimbo", price: 110 },
    ],
  },
  {
    id: "fachada",
    name: "Fachada",
    pieces: [
      { name: "Fachada", price: 540 },
      { name: "Banner físico", price: 230 },
      { name: "Adesivo", price: 130 },
      { name: "Catálogo", price: 510 },
      { name: "Pack de 5 posts para Instagram", price: 350 },
      { name: "Capas de destaque do Instagram", price: 200 },
    ],
  },
] as const

/** Todas as peças numa lista só, para consultar preço pelo nome. */
export const allPieces: readonly Piece[] = pieceGroups.flatMap((g) => g.pieces)

export function priceOfPieces(nomes: readonly string[]) {
  return nomes.reduce(
    (total, nome) =>
      total + (allPieces.find((p) => p.name === nome)?.price ?? 0),
    0
  )
}

/* ───────────────────────────── O seletor ────────────────────────────── */

/**
 * O seletor é guiado, em dois passos.
 *
 * Antes, peças, prazo e avisos apareciam de uma vez: o cliente abria o popup
 * numa parede de texto e não sabia por onde começar. Agora a tela faz uma
 * pergunta de cada vez, na ordem em que ele decide — primeiro o que quer, e só
 * depois em quanto tempo — e a barra de progresso mostra que falta pouco.
 */
export const steps = [
  {
    n: 1,
    title: "Quais peças de design você precisa desenvolver?",
    instruction:
      "Marque o que você vai precisar na operação e tenha o design pronto para mandar para a sua gráfica de confiança.",
    /** Curto, entre parênteses, colado na instrução. Não é bloco separado. */
    aside: "Apenas design, sem impressão.",
  },
  {
    n: 2,
    title: "Em quanto tempo você precisa?",
    instruction: "Falta só isto. Depois é conferir o resumo e enviar.",
    aside: null,
  },
] as const

/**
 * A abertura do seletor, antes da grade aparecer.
 *
 * O cliente acabou de clicar num pacote e cai numa tela que pede outra
 * decisão. Sem transição, ele não sabe se a escolha valeu nem o que fazer
 * agora. A abertura confirma o que ele fez, diz o que vem em seguida e mostra
 * — num diagrama, não em texto — que é para marcar itens numa lista.
 */
export const intro = {
  done: "Pacote escolhido.",
  skipLabel: "Pular",
  /** Legenda do diagrama, para quem não vê o cursor se mexer. */
  demoAlt:
    "Demonstração: um cursor marca duas opções numa lista de exemplo e clica em continuar.",
  /** Igual ao botão de verdade do passo 1 — é ele que precisa ser reconhecido. */
  demoCta: "Continuar",
} as const

export const selector = {
  nextLabel: "Continuar",
  /** Adianta a abertura animada. */
  skipLabel: "Pular",
  /** Segue para o prazo sem marcar nenhuma peça. */
  noPiecesLabel: "Seguir sem peças",
  backLabel: "Voltar",
  submitLabel: "Enviar seleção",
  cancelLabel: "Cancelar",
  closeLabel: "Fechar",
  /** "Passo 1 de 2". */
  stepCounter: (n: number, total: number) => `Passo ${n} de ${total}`,
  deadlineLegend: "Prazo",
  piecesLegend: "Peças",
  summaryLegend: "Resumo",
  summaryNone: "Nenhuma",
  summaryTotal: "Total",
  emptyLabel: "Nenhuma peça",
  /** "1 peça" / "7 peças". */
  counter: (n: number) => (n === 1 ? "1 peça" : `${n} peças`),
} as const

/* ─────────────────────── A mensagem do WhatsApp ─────────────────────── */

/**
 * Monta a mensagem que chega para o estúdio.
 *
 * É o único artefato que sobrevive à página: precisa ser lida em dois segundos
 * numa tela de celular e conter tudo que decide o orçamento. Por isso traz o
 * pacote com preço, o prazo com a taxa quando houver, o total do que já tem
 * preço fechado, e as peças agrupadas exatamente como estavam na tela.
 *
 * O aviso de impressão vai junto, para não haver ambiguidade nem no histórico
 * da conversa.
 */
export function buildProposalMessage(input: {
  pkg: ProposalPackage
  deadline: Deadline
  pieces: readonly string[]
}) {
  const { pkg, deadline, pieces } = input
  const pecas = priceOfPieces(pieces)
  const total = pkg.price + deadline.fee + pecas

  const linhas: string[] = [
    "*Proposta Cymatica*",
    "",
    `*Pacote:* ${pkg.name} · ${formatBRL(pkg.price)}`,
    `*Prazo:* ${deadline.days} dias úteis (${deadline.name.toLowerCase()}${
      deadline.fee > 0 ? `, taxa de ${formatBRL(deadline.fee)}` : ", sem taxa"
    })`,
  ]

  if (pieces.length > 0) {
    linhas.push("", `*Peças de design* (${pieces.length}) — ${formatBRL(pecas)}`)
    for (const group of pieceGroups) {
      const marcadas = group.pieces.filter((p) => pieces.includes(p.name))
      if (marcadas.length === 0) continue
      linhas.push("", `_${group.name}_`)
      linhas.push(
        ...marcadas.map((p) => `• ${p.name} — ${formatBRL(p.price)}`)
      )
    }
    linhas.push("", "As peças são só o design, sem impressão.")
  } else {
    linhas.push("", "Sem peças avulsas.")
  }

  linhas.push("", `*Total:* ${formatBRL(total)}`)

  return linhas.join("\n")
}

export function proposalWhatsappLink(input: Parameters<typeof buildProposalMessage>[0]) {
  return whatsappLink(buildProposalMessage(input))
}

export { whatsappLink }
