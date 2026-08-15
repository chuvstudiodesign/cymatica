/**
 * Os sete projetos da home do /site-3.
 *
 * A ordem aqui é a ordem da home, definida pelo estúdio. O texto foi escrito a
 * partir do que as próprias apresentações declaram — método, símbolo e decisões
 * de tipografia saem dos PDFs, não de suposição. O que não estava nos arquivos
 * (ano, nome do contratante, resultado de negócio) simplesmente não aparece.
 */

import { projectPages, type ProjectImage } from "./project-pages"

export type Project = {
  slug: string
  client: string
  sector: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  services: string[]
  cover: ProjectImage
  pages: ProjectImage[]
}

type ProjectCopy = Omit<Project, "cover" | "pages">

const copy: ProjectCopy[] = [
  {
    slug: "rango",
    client: "Rango",
    sector: "Alimentação para pets",
    summary: "Um cão desenhado à mão que precisava sobreviver à redução.",
    challenge:
      "A marca queria ser alegre e divertida sem abrir mão de aplicar bem em tamanho pequeno, que é o inimigo declarado de qualquer ilustração com muito detalhe.",
    approach:
      "Começamos no papel, com ilustração tradicional, até chegar a um cão exclusivo. Depois somamos o elemento natural e trabalhamos a perspectiva mantendo flat design, o que dá volume à cena sem criar detalhe que se perca quando a marca encolhe.",
    outcome:
      "Uma identidade que segura tanto o mobiliário urbano quanto o rótulo pequeno.",
    services: ["Design de marca", "Experiência digital"],
  },
  {
    slug: "makakitus",
    client: "Makakitus",
    sector: "Sorveteria",
    summary: "Uma sorveteria que precisava ser vista do outro lado da rua.",
    challenge:
      "Categoria saturada de tons pastel e letra manuscrita. A marca desaparecia justamente onde deveria chamar: na vitrine e no copo na mão de quem passa.",
    approach:
      "Mascote de traço grosso, magenta cheio e um padrão de bananas que transforma qualquer superfície em superfície de marca. O sistema foi desenhado a partir do copo, não do logotipo.",
    outcome:
      "Uma identidade que funciona como sinalização, mesmo à distância.",
    services: ["Design de marca", "Identidade verbal"],
  },
  {
    slug: "finisima",
    client: "Finíssima",
    sector: "Pizzaria e delivery",
    summary: "A letra F e uma fatia de pizza no mesmo traço.",
    challenge:
      "Construir uma marca de pizzaria que transmitisse movimento, já que a entrega é parte do produto, sem cair no clichê de chapéu de chef e bandeira italiana.",
    approach:
      "O processo começou manual, esboçando ideias que reunissem a pizza e o F de Finíssima. A assinatura ganhou inclinação para carregar a sensação de deslocamento, e o ouro sobre preto deu à categoria um registro que ela raramente tem.",
    outcome: "Uma marca de delivery que se comporta como marca de restaurante.",
    services: ["Design de marca", "Type design"],
  },
  {
    slug: "canoa-e-mar",
    client: "canoa e mar",
    sector: "Moda",
    summary: "Relaxamento e diversão traduzidos em geometria.",
    challenge:
      "Uma marca de roupas que precisava comunicar leveza sem recorrer ao repertório óbvio de praia: palmeira, onda, pôr do sol.",
    approach:
      "A canoa foi construída sobre grid elíptico, porque a elipse transmite um ar amigável na psicologia das formas. A separação em positivo e negativo na lateral do casco cria a impressão de movimento, e a proa alta reforça o aspecto de diversão.",
    outcome:
      "Um símbolo que carrega o conceito inteiro numa forma só, sem depender de cor.",
    services: ["Design de marca", "Identidade verbal"],
  },
  {
    slug: "natturi",
    client: "Natturi",
    sector: "Alimentação para pets",
    summary: "Alimento natural dito por uma curva, não por um adjetivo.",
    challenge:
      "Unir animal de estimação e natureza sem empilhar dois símbolos. O resultado óbvio seria um pet ao lado de uma folha, e não uma marca.",
    approach:
      "A folha virou o ponto de encontro entre os dois territórios. A tipografia de arestas arredondadas e orgânicas conversa com o foco da marca, e o símbolo foi construído a partir das curvas dela, para que letra e desenho pertençam à mesma família.",
    outcome: "Símbolo e tipografia que se explicam mutuamente.",
    services: ["Design de marca", "Type design"],
  },
  {
    slug: "graos-do-rio",
    client: "Grãos do Rio",
    sector: "Café e chá",
    summary: "Uma casa de grãos com temperatura de loja, não de commodity.",
    challenge:
      "O verde-petróleo escuro precisava atravessar do sachê ao avental, do cartão à embalagem, sem perder identidade em nenhuma das superfícies.",
    approach:
      "Sistema construído em torno de um único par cromático e de um logotipo desenhado para ser bordado, impresso em papel e estampado em tecido. Cada aplicação foi testada no material antes de virar arquivo final.",
    outcome: "Uma marca coerente da prateleira ao uniforme.",
    services: ["Design de marca", "Experiência digital"],
  },
  {
    slug: "norbs",
    client: "Norbs",
    sector: "Castanhas e snacks",
    summary: "A castanha entrou no lugar da letra.",
    challenge:
      "Diferenciar uma marca de castanhas numa categoria que trata o produto como granel: saco transparente, etiqueta genérica, nenhuma personalidade.",
    approach:
      "O símbolo mora dentro do próprio logotipo: a castanha ocupa o lugar do O. Âmbar sobre marrom profundo, padrão construído a partir da mesma forma, e embalagem em kraft que deixa o produto ser o material.",
    outcome:
      "Uma marca que se reconhece pelo contorno, mesmo sem o nome à vista.",
    services: ["Design de marca", "Identidade verbal"],
  },
]

export const projects: Project[] = copy.map((project) => {
  const entry = projectPages[project.slug]
  return {
    ...project,
    cover: entry.coverImage,
    pages: entry.pages,
  }
})

/**
 * A gaveta: trabalhos que aparecem só na página de projetos, atrás do botão
 * "ver mais projetos".
 *
 * Os PDFs existem em `PROJETOS CYMATICA/GAVETA`, mas ainda não foram extraídos
 * nem tiveram o texto escrito. Enquanto a lista estiver vazia, o botão e a
 * segunda leva não são renderizados: a página não mostra um controle que não
 * leva a lugar nenhum.
 */
export const drawerProjects: Project[] = []
