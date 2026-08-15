/**
 * Todo o conteúdo editorial do site em um só lugar.
 *
 * Nenhum componente carrega texto literal — tudo vem daqui, para que o texto
 * mude sem abrir código de interface.
 *
 * PLACEHOLDER: os depoimentos são fictícios, e as descrições dos projetos foram
 * inferidas das peças. Os nomes LAUN, mun, DE MARCO e Seu Moacir aparecem nas
 * próprias imagens; setor, ano e resultado precisam de confirmação.
 */

export const studio = {
  name: "Cymatica",
  tagline: "Estúdio de design e software",
  location: "Belo Horizonte · Londres · Nápoles",
  email: "contato@cymatica.studio",
  instagram: "@cymatica.studio",
  whatsapp: "+55 31 9 9999-0000", // PLACEHOLDER
} as const

/* ─────────────────────────── Herói ─────────────────────────── */

export const hero = {
  label: "Estúdio de design",
  /** Rendido em TextPressure — reage ao cursor. */
  display: "CYMATICA",
  title: "Design de alta qualidade deixou de ser privilégio.",
  body: "Diga quanto você pode investir. Receba na hora um escopo real, com entregáveis e prazo — não uma promessa de retorno em três dias úteis.",
  primaryCta: { label: "Pedir orçamento", href: "/site/orcamento" },
  secondaryCta: { label: "Ver projetos", href: "/site/projetos" },
} as const

/* ────────────────────────── Manifesto ───────────────────────── */

export const manifesto = {
  label: "Manifesto",
  /** Revelado palavra a palavra no scroll. */
  lines: [
    "Cimática é o estudo dos padrões que o som forma na matéria.",
    "Uma placa vibrando organiza a areia em figuras exatas.",
    "O ruído vira forma — e a forma é função da frequência.",
  ],
  statement: "Design é vibração que vira forma.",
  body: "O briefing de um cliente é a frequência. A identidade é o padrão que emerge dela. Nosso trabalho é encontrar a frequência certa e deixar a forma acontecer — com método, não com sorte.",
} as const

/* ─────────────────────── Prova de posição ───────────────────── */

export const positioning = {
  label: "Por que existimos",
  title: "Contratar design nunca foi transparente.",
  body: "Orçamento que demora semanas. Escopo que ninguém consegue explicar. Preço que aparece no fim, sem conta à vista. O mercado tratou isso como normal por tempo demais.",
  counter: "Nós invertemos a ordem: o preço entra na conversa primeiro.",
  stats: [
    { value: "48h", label: "para a primeira entrega de território" },
    { value: "3 min", label: "para receber um escopo com preço" },
    { value: "100%", label: "do escopo definido antes de começar" },
  ],
} as const

/* ─────────────────────────── Serviços ───────────────────────── */

export type Service = {
  slug: string
  name: string
  /** Uma frase sobre o que o cliente ganha — não sobre o que fazemos. */
  benefit: string
  description: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    slug: "design-de-marca",
    name: "Design de marca",
    benefit: "Sua marca reconhecível em qualquer superfície, do favicon à fachada.",
    description:
      "Identidade construída como sistema, não como logotipo solto. Definimos o território, desenhamos os elementos e entregamos as regras que mantêm tudo coerente quando outra pessoa assumir a operação.",
    deliverables: [
      "Território e plataforma de marca",
      "Símbolo, logotipo e variações",
      "Sistema cromático e tipográfico",
      "Manual de aplicação",
      "Kit de arquivos para produção",
    ],
  },
  {
    slug: "experiencia-digital",
    name: "Experiência digital",
    benefit: "Um site que converte e que a sua equipe consegue manter.",
    description:
      "Sites e plataformas desenhados e construídos por nós, do wireframe ao deploy. Sem template disfarçado, sem entregar Figma e desejar boa sorte.",
    deliverables: [
      "Arquitetura de informação",
      "Design de interface responsivo",
      "Design system em código",
      "Implementação e deploy",
      "Medição e otimização",
    ],
  },
  {
    slug: "interface-de-apps",
    name: "Interface de apps",
    benefit: "Produto que o usuário entende na primeira tela.",
    description:
      "Interfaces para iOS, Android e web, desenhadas a partir do fluxo real de uso. Protótipo navegável antes de qualquer linha de código.",
    deliverables: [
      "Fluxos e jornadas",
      "Protótipo navegável",
      "Biblioteca de componentes",
      "Especificação para desenvolvimento",
      "Acompanhamento de implementação",
    ],
  },
  {
    slug: "motion-design",
    name: "Motion design",
    benefit: "Sua marca em movimento, com a mesma precisão que ela tem parada.",
    description:
      "Animação de identidade, peças para campanha e microinterações de produto. O movimento sai do sistema da marca — não é efeito aplicado por cima.",
    deliverables: [
      "Assinatura animada",
      "Sistema de movimento",
      "Peças para social e campanha",
      "Microinterações de produto",
      "Arquivos editáveis e Lottie",
    ],
  },
  {
    slug: "identidade-verbal",
    name: "Identidade verbal",
    benefit: "Sua marca soando igual em toda mensagem que ela envia.",
    description:
      "Tom de voz, nomenclatura e as frases que a marca de fato usa. Entregamos exemplos aplicados, não adjetivos sobre como a marca deveria falar.",
    deliverables: [
      "Plataforma verbal e tom de voz",
      "Naming e arquitetura de nomes",
      "Copy de peças principais",
      "Guia com exemplos aplicados",
    ],
  },
  {
    slug: "identidade-sonora",
    name: "Identidade sonora",
    benefit: "Ser reconhecido antes de aparecer na tela.",
    description:
      "Assinatura sonora, paisagem de marca e som de interface. A camada que quase ninguém trabalha e que é a primeira a criar memória.",
    deliverables: [
      "Assinatura sonora",
      "Paleta e paisagem sonora",
      "Sons de interface",
      "Guia de uso e biblioteca",
    ],
  },
  {
    slug: "type-design",
    name: "Type design",
    benefit: "Uma tipografia que é só sua, e que ninguém pode licenciar.",
    description:
      "Fontes sob medida e customização de famílias existentes. Desenhamos os caracteres, produzimos os arquivos e entregamos a licença no seu nome.",
    deliverables: [
      "Desenho de caracteres",
      "Família com pesos e itálicos",
      "Fonte variável",
      "Arquivos web e desktop",
      "Licença exclusiva",
    ],
  },
  {
    slug: "software",
    name: "Desenvolvimento de software",
    benefit: "O produto no ar, não só o desenho dele.",
    description:
      "Somos também software house. Construímos o que desenhamos — aplicações web, integrações e automações — com o mesmo cuidado de acabamento que aplicamos no design.",
    deliverables: [
      "Arquitetura técnica",
      "Aplicação web ou API",
      "Integrações e automações",
      "Infraestrutura e deploy",
      "Manutenção evolutiva",
    ],
  },
]

/* ─────────────────────────── Projetos ───────────────────────── */

export type Project = {
  slug: string
  client: string
  sector: string
  year: string
  /** Uma linha, mostrada no card. */
  summary: string
  challenge: string
  approach: string
  outcome: string
  services: string[]
  cover: string
  images: string[]
}

export const projects: Project[] = [
  {
    slug: "laun",
    client: "LAUN",
    sector: "Acessórios em couro", // PLACEHOLDER
    year: "2025",
    summary: "Uma marca de couro que precisava caber num relevo de 12 milímetros.",
    challenge:
      "O símbolo teria de funcionar gravado a quente no couro, onde não existe cor, contraste nem meio-tom — só profundidade.",
    approach:
      "Desenhamos a partir da restrição: um monograma de traço único, testado em relevo antes de existir em tela. A paleta veio depois, do próprio material.",
    outcome:
      "Uma identidade que sobrevive a qualquer superfície, porque nasceu na mais difícil delas.",
    services: ["Design de marca", "Type design"],
    cover: "/projects/laun.webp",
    images: ["/projects/laun.webp"],
  },
  {
    slug: "mun",
    client: "mun",
    sector: "Arquitetura e interiores", // PLACEHOLDER
    year: "2025",
    summary: "Sinalização que se comporta como arquitetura, não como aviso.",
    challenge:
      "Um escritório de arquitetura cuja comunicação impressa competia com os próprios projetos em vez de emoldurá-los.",
    approach:
      "Reduzimos a identidade a formas primárias em três tons de material. As peças passaram a se instalar no espaço em vez de se pendurar nele.",
    outcome: "A sinalização virou parte do repertório do escritório.",
    services: ["Design de marca", "Experiência digital"],
    cover: "/projects/mun.webp",
    images: ["/projects/mun.webp"],
  },
  {
    slug: "de-marco",
    client: "DE MARCO",
    sector: "Joalheria", // PLACEHOLDER
    year: "2024",
    summary: "Embalagem que carrega o valor da peça antes de ela aparecer.",
    challenge:
      "Joia de alto valor entregue numa caixa que não sustentava o preço no momento em que o cliente abria.",
    approach:
      "Sistema de embalagem em três camadas, com monograma em relevo seco e nenhuma cor além do material. A abertura foi desenhada como sequência.",
    outcome: "O desembrulho passou a ser parte do produto.",
    services: ["Design de marca", "Identidade verbal"],
    cover: "/projects/de-marco.webp",
    images: ["/projects/de-marco.webp"],
  },
  {
    slug: "ouro-preto",
    client: "Plataforma de avaliações", // PLACEHOLDER — nome do cliente a confirmar
    sector: "Produto digital · Gastronomia",
    year: "2025",
    summary: "Um app de avaliações para uma cidade tombada.",
    challenge:
      "Recomendação de restaurantes em Ouro Preto, onde o repertório visual da cidade é forte demais para ser ignorado e fácil demais para virar caricatura.",
    approach:
      "Interface escura para deixar a fotografia da cidade conduzir, tipografia condensada de cartaz e um único acento quente. Entrada por Apple e Google, sem cadastro longo.",
    outcome: "Produto no ar, do desenho ao deploy.",
    services: ["Interface de apps", "Desenvolvimento de software"],
    cover: "/projects/ouro-preto.webp",
    images: ["/projects/ouro-preto.webp"],
  },
  {
    slug: "seu-moacir",
    client: "Seu Moacir",
    sector: "Café especial", // PLACEHOLDER
    year: "2024",
    summary: "Café especial sem o clichê visual do café especial.",
    challenge:
      "A categoria inteira usa kraft, ilustração de montanha e serifa rústica. A marca desaparecia na prateleira por parecer com todas as outras.",
    approach:
      "Rosa terroso, tipografia geométrica e hierarquia de rótulo enxuta. A informação técnica da torra virou o elemento gráfico principal.",
    outcome: "Uma embalagem que se distingue a três metros de distância.",
    services: ["Design de marca", "Identidade verbal"],
    cover: "/projects/seu-moacir.webp",
    images: ["/projects/seu-moacir.webp"],
  },
  {
    slug: "yelluy",
    client: "yelluy",
    sector: "Marca digital", // PLACEHOLDER
    year: "2025",
    summary: "Letra que existe em três dimensões antes de existir em duas.",
    challenge:
      "Uma marca nativa digital que precisava de presença em vídeo curto sem virar mais um logotipo animado genérico.",
    approach:
      "Desenhamos o logotipo já como objeto: volume, material e comportamento de luz definidos junto com o traço. O 2D é uma vista do 3D, não o contrário.",
    outcome: "Uma marca que se move sem precisar ser animada por fora.",
    services: ["Type design", "Motion design"],
    cover: "/projects/yelluy.webp",
    images: ["/projects/yelluy.webp", "/projects/motion.webp"],
  },
  {
    slug: "vi-sim",
    client: "Vi sim!", // PLACEHOLDER
    sector: "Óptica",
    year: "2024",
    summary: "Uma óptica que fala como gente.",
    challenge:
      "Categoria dominada por linguagem clínica, num negócio que é de autoestima muito antes de ser de saúde.",
    approach:
      "Voz coloquial no nome e no sistema inteiro, azul saturado e fotografia de produto sem modelo. A marca virou uma frase que o cliente repete.",
    outcome: "Reconhecimento imediato numa categoria sem personalidade.",
    services: ["Design de marca", "Identidade verbal"],
    cover: "/projects/vi-sim.webp",
    images: ["/projects/vi-sim.webp", "/projects/vestuario.webp"],
  },
]

/* ────────────────────────── Abordagem ───────────────────────── */

export const method = {
  label: "Como trabalhamos",
  title: "Cinco etapas, na ordem da física.",
  body: "O nome de cada fase não é metáfora decorativa: é a descrição do que acontece nela.",
  steps: [
    {
      number: "01",
      name: "Frequência",
      duration: "Semana 1",
      description:
        "Entender o que a marca está tentando dizer e para quem. Entrevistas, análise de categoria e a pergunta que ninguém fez ainda.",
    },
    {
      number: "02",
      name: "Amplitude",
      duration: "Semana 2",
      description:
        "Definir a força e o alcance de cada decisão. Territórios possíveis, com as consequências de cada um sobre a mesa antes da escolha.",
    },
    {
      number: "03",
      name: "Padrão",
      duration: "Semanas 3–5",
      description:
        "O sistema emerge. Símbolo, tipografia, cor, movimento e voz desenhados como partes de uma coisa só.",
    },
    {
      number: "04",
      name: "Matéria",
      duration: "Semanas 6–8",
      description:
        "O sistema encontra a superfície real: papel, tela, tecido, código. É aqui que decisão bonita e decisão certa se separam.",
    },
    {
      number: "05",
      name: "Ressonância",
      duration: "Contínuo",
      description:
        "Entrega, treinamento da equipe e acompanhamento. Uma identidade que ninguém sabe operar não sobrevive ao segundo trimestre.",
    },
  ],
} as const

/* ─────────────────────── IA dentro do processo ──────────────── */

export const ai = {
  label: "Ferramenta, não substituto",
  title: "IA integrada ao processo.",
  body: "Usamos IA onde ela é boa: ampliar a exploração inicial, produzir variação em escala, acelerar a parte mecânica da produção. O julgamento sobre o que presta continua sendo nosso — e é por ele que você paga.",
  points: [
    {
      title: "Exploração ampliada",
      description:
        "Centenas de direções testadas na primeira semana, em vez de três. A seleção é humana; o volume é máquina.",
    },
    {
      title: "Produção acelerada",
      description:
        "Adaptação de peça, tratamento de imagem e variação de formato deixam de consumir o tempo que deveria ir para o desenho.",
    },
    {
      title: "Orçamento na hora",
      description:
        "O motor que estima escopo e preço em minutos é nosso, treinado nos projetos que já entregamos.",
    },
    {
      title: "Julgamento humano",
      description:
        "Nenhuma peça sai daqui sem passar por um designer que sabe explicar cada decisão. Isso não é negociável.",
    },
  ],
} as const

/* ───────────────────────── Depoimentos ──────────────────────── */
/* PLACEHOLDER — todos fictícios. Substituir por depoimentos reais. */

export type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "O que me convenceu foi receber o preço antes da reunião. Nunca tinha acontecido em dez anos comprando design.",
    author: "Marina Alcântara",
    role: "Diretora de marca",
    company: "LAUN",
  },
  {
    quote:
      "Entregaram o manual e treinaram meu time no mesmo dia. Seis meses depois a identidade continua de pé sem eles.",
    author: "Rodrigo Sanches",
    role: "Sócio",
    company: "mun",
  },
  {
    quote:
      "Pedi um site e recebi um produto no ar. A diferença entre desenhar e construir ficou clara.",
    author: "Letícia Prado",
    role: "Fundadora",
    company: "Plataforma de avaliações",
  },
  {
    quote:
      "Discordaram de mim na primeira semana e estavam certos. É para isso que se contrata um estúdio.",
    author: "Anderson Vilela",
    role: "CEO",
    company: "DE MARCO",
  },
]

/* ──────────────────────────── Sobre ─────────────────────────── */

export const about = {
  label: "Quem somos",
  title: "Um estúdio construído em torno de uma discordância.",
  lead: "Acreditamos que design de alta qualidade não deveria depender de quem você conhece, nem de quanto tempo você aguenta esperar por um orçamento.",
  body: [
    "A Cymatica nasceu de uma percepção simples: a barreira para contratar design bem-feito quase nunca é o dinheiro. É a opacidade. O cliente não sabe o que vai receber, quanto vai custar, nem quando. Então adia — ou aceita o mais barato que aparece.",
    "Montamos o estúdio ao contrário. O preço entra na primeira conversa. O escopo é fechado antes de qualquer desenho. E o que prometemos entregar é exatamente o que vai para o contrato.",
    "Trabalhamos em identidades e experiências que movem cultura, comércio e indústria — de marcas de couro a plataformas digitais. Somos também software house, o que significa que não paramos no arquivo: construímos o que desenhamos.",
  ],
  values: [
    {
      title: "Preço primeiro",
      description:
        "Orçamento na hora, escopo fechado antes de começar. Sem surpresa no meio do caminho.",
    },
    {
      title: "Sistema, não peça",
      description:
        "Entregamos regras que sobrevivem à nossa saída, não arquivos que dependem de nós para fazer sentido.",
    },
    {
      title: "Do desenho ao ar",
      description:
        "Somos estúdio e software house. O que desenhamos, construímos.",
    },
    {
      title: "Discordância útil",
      description:
        "Se acharmos que o pedido está errado, dizemos. Concordar com tudo é o pior serviço que um estúdio presta.",
    },
  ],
} as const

/* ──────────────────────────── Contato ───────────────────────── */

export const contact = {
  label: "Contato",
  title: "Vamos começar pelo preço.",
  body: "Se você já sabe quanto pode investir, o orçamento leva três minutos. Se ainda não sabe, escreva — a gente ajuda a chegar no número.",
  form: {
    submit: "Enviar mensagem",
    success: "Mensagem recebida. Respondemos em até um dia útil.",
    error: "Não foi possível enviar. Tente novamente ou escreva para contato@cymatica.studio.",
  },
} as const

/* ─────────────────────── CTA de encerramento ────────────────── */

export const closingCta = {
  title: "Quanto você pode investir?",
  body: "Três minutos, sem cadastro. No fim você tem escopo, entregáveis, prazo e faixa de investimento.",
  cta: { label: "Começar agora", href: "/site/orcamento" },
} as const

/* ────────────────────────── Navegação ───────────────────────── */

export const nav = [
  { label: "Projetos", href: "/site/projetos" },
  { label: "Serviços", href: "/site/servicos" },
  { label: "Sobre", href: "/site/sobre" },
  { label: "Contato", href: "/site/contato" },
] as const

export const footer = {
  statement: "Design é vibração que vira forma.",
  columns: [
    {
      title: "Estúdio",
      links: [
        { label: "Sobre", href: "/site/sobre" },
        { label: "Método", href: "/site/sobre#metodo" },
        { label: "Contato", href: "/site/contato" },
      ],
    },
    {
      title: "Trabalho",
      links: [
        { label: "Projetos", href: "/site/projetos" },
        { label: "Serviços", href: "/site/servicos" },
        { label: "Orçamento", href: "/site/orcamento" },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Cymatica. Todos os direitos reservados.`,
} as const
