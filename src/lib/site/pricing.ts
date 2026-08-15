/**
 * Motor de orçamento da Cymatica.
 *
 * Tudo que define preço está neste arquivo, em números explícitos, para que o
 * dono do estúdio ajuste a tabela sem abrir componente. A regra do negócio é
 * simples: o cliente diz quanto pode investir, e nós devolvemos o maior escopo
 * coerente que cabe nesse valor — em vez de um "a partir de" que não significa
 * nada.
 */

/* ───────────────────────────── Tabela base ──────────────────────────── */

export type PricedService = {
  slug: string
  name: string
  /** Preço de referência em reais, para uma empresa de porte médio. */
  base: number
  /** Semanas de execução, somadas com sobreposição parcial. */
  weeks: number
  /** Ordem de importância quando o orçamento não cobre tudo. */
  priority: number
  deliverables: string[]
}

export const pricedServices: PricedService[] = [
  {
    slug: "design-de-marca",
    name: "Design de marca",
    base: 18000,
    weeks: 6,
    priority: 1,
    deliverables: [
      "Território e plataforma de marca",
      "Símbolo, logotipo e variações",
      "Sistema cromático e tipográfico",
      "Manual de aplicação",
    ],
  },
  {
    slug: "experiencia-digital",
    name: "Experiência digital",
    base: 24000,
    weeks: 8,
    priority: 2,
    deliverables: [
      "Arquitetura de informação",
      "Design de interface responsivo",
      "Design system em código",
      "Implementação e deploy",
    ],
  },
  {
    slug: "interface-de-apps",
    name: "Interface de apps",
    base: 28000,
    weeks: 9,
    priority: 3,
    deliverables: [
      "Fluxos e jornadas",
      "Protótipo navegável",
      "Biblioteca de componentes",
      "Especificação para desenvolvimento",
    ],
  },
  {
    slug: "software",
    name: "Desenvolvimento de software",
    base: 42000,
    weeks: 12,
    priority: 4,
    deliverables: [
      "Arquitetura técnica",
      "Aplicação web ou API",
      "Integrações e automações",
      "Infraestrutura e deploy",
    ],
  },
  {
    slug: "motion-design",
    name: "Motion design",
    base: 12000,
    weeks: 4,
    priority: 5,
    deliverables: [
      "Assinatura animada",
      "Sistema de movimento",
      "Peças para campanha",
    ],
  },
  {
    slug: "identidade-verbal",
    name: "Identidade verbal",
    base: 9000,
    weeks: 3,
    priority: 6,
    deliverables: [
      "Plataforma verbal e tom de voz",
      "Naming e arquitetura de nomes",
      "Copy das peças principais",
    ],
  },
  {
    slug: "type-design",
    name: "Type design",
    base: 26000,
    weeks: 10,
    priority: 7,
    deliverables: [
      "Desenho de caracteres",
      "Família com pesos e itálicos",
      "Arquivos web e desktop",
      "Licença exclusiva",
    ],
  },
  {
    slug: "identidade-sonora",
    name: "Identidade sonora",
    base: 11000,
    weeks: 4,
    priority: 8,
    deliverables: ["Assinatura sonora", "Paisagem sonora", "Sons de interface"],
  },
]

/* ──────────────────────────── Multiplicadores ───────────────────────── */

export const companySizes = [
  { value: "solo", label: "Autônomo ou recém-fundada", multiplier: 0.65 },
  { value: "pequena", label: "Até 20 pessoas", multiplier: 0.85 },
  { value: "media", label: "De 20 a 200 pessoas", multiplier: 1 },
  { value: "grande", label: "Mais de 200 pessoas", multiplier: 1.45 },
] as const

export const timelines = [
  { value: "flexivel", label: "Sem pressa", multiplier: 0.92, weekFactor: 1.25 },
  { value: "normal", label: "Prazo normal", multiplier: 1, weekFactor: 1 },
  { value: "urgente", label: "Preciso para ontem", multiplier: 1.4, weekFactor: 0.7 },
] as const

export type CompanySize = (typeof companySizes)[number]["value"]
export type Timeline = (typeof timelines)[number]["value"]

/* ───────────────────────────── Estimativa ───────────────────────────── */

export type QuoteInput = {
  budget: number
  services: string[]
  size: CompanySize
  timeline: Timeline
}

export type Quote = {
  /** Serviços que cabem no orçamento informado. */
  included: PricedService[]
  /** Escolhidos pelo cliente mas fora do alcance deste orçamento. */
  deferred: PricedService[]
  deliverables: string[]
  weeks: number
  low: number
  high: number
  /** Verdadeiro quando o orçamento cobre tudo o que foi pedido. */
  fits: boolean
  /** Menor valor capaz de cobrir todos os serviços escolhidos. */
  fullPrice: number
}

const MIN_PROJECT = 4500

function priceOf(service: PricedService, size: CompanySize, timeline: Timeline) {
  const sizeMultiplier =
    companySizes.find((s) => s.value === size)?.multiplier ?? 1
  const timeMultiplier =
    timelines.find((t) => t.value === timeline)?.multiplier ?? 1
  return Math.round(service.base * sizeMultiplier * timeMultiplier)
}

export function buildQuote({
  budget,
  services,
  size,
  timeline,
}: QuoteInput): Quote {
  const chosen = pricedServices
    .filter((service) => services.includes(service.slug))
    .sort((a, b) => a.priority - b.priority)

  const fullPrice = chosen.reduce(
    (total, service) => total + priceOf(service, size, timeline),
    0
  )

  // Sem orçamento declarado, mostramos o escopo inteiro.
  const ceiling = budget > 0 ? budget : Number.POSITIVE_INFINITY

  const included: PricedService[] = []
  const deferred: PricedService[] = []
  let running = 0

  for (const service of chosen) {
    const price = priceOf(service, size, timeline)
    // O primeiro serviço sempre entra: um orçamento abaixo do mínimo vira
    // conversa, não uma lista vazia.
    if (included.length === 0 || running + price <= ceiling) {
      included.push(service)
      running += price
    } else {
      deferred.push(service)
    }
  }

  const weekFactor = timelines.find((t) => t.value === timeline)?.weekFactor ?? 1
  // Fases se sobrepõem: a soma bruta superestimaria muito o prazo.
  const rawWeeks = included.reduce((total, service) => total + service.weeks, 0)
  const weeks = Math.max(2, Math.round(rawWeeks * 0.68 * weekFactor))

  const subtotal = Math.max(running, MIN_PROJECT)

  return {
    included,
    deferred,
    deliverables: [...new Set(included.flatMap((s) => s.deliverables))],
    weeks,
    low: Math.round((subtotal * 0.9) / 500) * 500,
    high: Math.round((subtotal * 1.15) / 500) * 500,
    fits: deferred.length === 0 && fullPrice <= ceiling,
    fullPrice,
  }
}

/* ─────────────────────────────── Formato ────────────────────────────── */

export function formatBRL(value: number, withSymbol = true) {
  return new Intl.NumberFormat("pt-BR", {
    style: withSymbol ? "currency" : "decimal",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

/** Lê "15.000", "R$ 15.000,00" ou "15000" como 15000. */
export function parseBRL(input: string) {
  const digits = input.replace(/[^\d,]/g, "").split(",")[0]
  const value = Number(digits)
  return Number.isFinite(value) ? value : 0
}
