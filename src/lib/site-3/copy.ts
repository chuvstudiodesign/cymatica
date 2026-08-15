/**
 * Copy próprio do /site-3.
 *
 * Substitui os trechos herdados do site anterior. Duas regras guiaram a
 * reescrita:
 *
 *  1. Sem travessão. O travessão em excesso virou marca registrada de texto
 *     gerado por máquina, e o estúdio não quer soar assim.
 *  2. Sem tom de barganha. A Cymatica democratiza o acesso ao design de alto
 *     nível, o que é diferente de competir por preço. O argumento é a
 *     experiência de contratação e o padrão de entrega, nunca o desconto.
 */

/* ─────────────────────────── Contato direto ─────────────────────────── */

export const whatsapp = {
  /** Formato internacional, só dígitos, como o wa.me exige. */
  number: "447424714087",
  display: "+44 7424 714087",
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}

/* ─────────────────────────────── Herói ──────────────────────────────── */

export const hero = {
  label: "Estúdio de design",
  display: "CYMATICA",
  title: "Design de alta qualidade deixou de ser privilégio.",
  body: "Identidades e experiências para marcas que precisam ser reconhecíveis em qualquer superfície. Comece por um diagnóstico da sua marca, sem custo.",
  primaryCta: { label: "Fazer diagnóstico", href: "/site-3/diagnostico" },
  secondaryCta: { label: "Ver projetos", href: "/site-3/projetos" },
} as const

/* ────────────────────────────- Manifesto ────────────────────────────── */

export const manifesto = {
  label: "Manifesto",
  lines: [
    "Cimática é o estudo dos padrões que o som forma na matéria.",
    "Uma placa vibrando organiza a areia em figuras exatas.",
    "O ruído vira forma, e a forma é função da frequência.",
  ],
  statement: "Design é vibração que vira forma.",
  body: "O briefing de um cliente é a frequência. A identidade é o padrão que emerge dela. Nosso trabalho é encontrar a frequência certa e deixar a forma acontecer, com método, não com sorte.",
} as const

/* ───────────────────────────- Posicionamento ────────────────────────── */

export const positioning = {
  label: "Por que existimos",
  title: "Contratar design nunca foi transparente.",
  body: "Orçamento que demora semanas. Escopo que ninguém consegue explicar. Três reuniões antes de qualquer resposta objetiva. O mercado tratou isso como normal por tempo demais.",
  counter:
    "Tratamos a contratação com o mesmo cuidado que damos ao projeto: clareza desde a primeira conversa e um padrão de entrega que não muda conforme o tamanho do contrato.",
  stats: [
    { value: "48h", label: "para a primeira entrega de território" },
    { value: "30 min", label: "para receber um escopo com preço" },
    { value: "100%", label: "do escopo definido antes de começar" },
  ],
} as const

/* ────────────────────────────── Diagnóstico ─────────────────────────── */

export const diagnostic = {
  label: "Diagnóstico",
  title: "Antes de propor qualquer coisa, a gente olha.",
  body: "Um diagnóstico da sua marca sem custo: onde ela está hoje, o que já funciona, o que está custando oportunidade e o que o design resolve primeiro. Feito por um designer olhando o seu caso, não por um relatório automático.",
  steps: [
    {
      number: "01",
      name: "Você conta o contexto",
      description:
        "Um formulário curto sobre a empresa, o momento dela e o que já existe de marca. Leva menos de dez minutos.",
    },
    {
      number: "02",
      name: "A gente estuda",
      description:
        "Analisamos o que você enviou junto com a sua categoria e os concorrentes diretos, procurando onde há espaço.",
    },
    {
      number: "03",
      name: "Conversamos",
      description:
        "Uma hora com o diagnóstico na tela e as prioridades em ordem, da que mais muda o jogo para a que pode esperar.",
    },
    {
      number: "04",
      name: "O documento fica com você",
      description:
        "Com ou sem projeto depois. Se fizer sentido seguir, o diagnóstico já é o começo do escopo.",
    },
  ],
  /** Escassez explicada pela operação, não usada como filtro de status. */
  note: "Cada diagnóstico é feito à mão, então abrimos um número limitado por mês. Se o seu não entrar na leva atual, avisamos e reservamos a próxima data.",
  cta: { label: "Solicitar diagnóstico", href: "/site-3/diagnostico" },
} as const

/* ─────────────────────── IA dentro do processo ──────────────────────── */

export const ai = {
  label: "Ferramenta, não substituto",
  title: "IA integrada ao processo.",
  body: "Usamos IA onde ela é boa: ampliar a exploração inicial, produzir variação em escala, acelerar a parte mecânica da produção. O julgamento sobre o que presta continua sendo nosso, e é por ele que você paga.",
  points: [
    {
      title: "Exploração ampliada",
      description:
        "Centenas de direções testadas na primeira semana, em vez de três. A seleção é humana, o volume é máquina.",
    },
    {
      title: "Produção acelerada",
      description:
        "Adaptação de peça, tratamento de imagem e variação de formato deixam de consumir o tempo que deveria ir para o desenho.",
    },
    {
      title: "Diagnóstico mais fundo",
      description:
        "Leitura de categoria e concorrência em escala, para que a conversa comece de um retrato completo.",
    },
    {
      title: "Julgamento humano",
      description:
        "Nenhuma peça sai daqui sem passar por um designer que sabe explicar cada decisão. Isso não é negociável.",
    },
  ],
} as const

/* ────────────────────────────── Método ──────────────────────────────── */

export const method = {
  label: "Como trabalhamos",
  title: "Cinco etapas, na ordem da física.",
  body: "O nome de cada fase não é metáfora decorativa: é a descrição do que acontece nela.",
  steps: [
    {
      number: "01",
      name: "Frequência",
      duration: "Parte 1",
      description:
        "Entender o que a marca está tentando dizer e para quem. Entrevistas, análise de categoria e a pergunta que ninguém fez ainda.",
    },
    {
      number: "02",
      name: "Amplitude",
      duration: "Parte 2",
      description:
        "Definir a força e o alcance de cada decisão. Territórios possíveis, com as consequências de cada um sobre a mesa antes da escolha.",
    },
    {
      number: "03",
      name: "Padrão",
      duration: "Parte 3",
      description:
        "O sistema emerge. Símbolo, tipografia, cor, movimento e voz desenhados como partes de uma coisa só.",
    },
    {
      number: "04",
      name: "Matéria",
      duration: "Parte 4",
      description:
        "O sistema encontra a superfície real: papel, tela, tecido, código. É aqui que decisão bonita e decisão certa se separam.",
    },
    {
      number: "05",
      name: "Ressonância",
      duration: "Parte 5",
      description:
        "Entrega, treinamento da equipe e acompanhamento. Uma identidade que ninguém sabe operar não sobrevive ao segundo trimestre.",
    },
  ],
} as const

/* ─────────────────────── CTA de encerramento ────────────────────────── */

export const closingCta = {
  title: "Comece por um diagnóstico.",
  body: "Sem custo e sem compromisso de seguir. No fim você tem um retrato da sua marca e a ordem do que resolver primeiro.",
  cta: { label: "Solicitar diagnóstico", href: "/site-3/diagnostico" },
} as const
