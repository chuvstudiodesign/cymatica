/**
 * Depoimentos do /site-3.
 *
 * PLACEHOLDER — todos fictícios. Existem para dar peso e medida ao layout, e
 * citam os clientes reais do portfólio atual para que a página seja coerente.
 * Substituir por depoimentos verdadeiros antes de publicar.
 */

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
    role: "Sócia",
    company: "Finíssima",
  },
  {
    quote:
      "Entregaram o manual e treinaram meu time no mesmo dia. Seis meses depois a identidade continua de pé sem eles.",
    author: "Rodrigo Sanches",
    role: "Diretor de marca",
    company: "Grãos do Rio",
  },
  {
    quote:
      "Testaram a marca bordada no avental antes de fechar o arquivo. Ninguém tinha feito isso por mim.",
    author: "Letícia Prado",
    role: "Fundadora",
    company: "canoa e mar",
  },
  {
    quote:
      "Discordaram de mim na primeira semana e estavam certos. É para isso que se contrata um estúdio.",
    author: "Anderson Vilela",
    role: "CEO",
    company: "Norbs",
  },
]
