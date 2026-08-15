/**
 * Texto dos projetos da gaveta.
 *
 * Escrito a partir do que cada apresentação declara: o simbolismo, a escolha
 * de tipografia e o raciocínio de construção saem dos próprios PDFs. Onde o
 * arquivo não trazia texto extraível, o texto se apoia apenas no que as peças
 * mostram, sem inventar resultado de negócio.
 *
 * Assim como nos projetos principais, ano e nome do contratante não aparecem:
 * não estavam nos arquivos.
 */

export type DrawerCopy = {
  slug: string
  client: string
  sector: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  services: string[]
}

export const drawerCopy: DrawerCopy[] = [
  {
    slug: "minha-casa-solar",
    client: "Minha Casa Solar",
    sector: "Energia solar",
    summary: "Uma casa e um sol resolvidos num símbolo só.",
    challenge:
      "A marca existia desde 2010 e carregava um sol detalhado demais, inconsistente entre aplicações. Era preciso modernizar sem perder o aspecto natural que o público já reconhecia.",
    approach:
      "Unificamos os elementos num símbolo minimalista e mais consistente que o anterior. A cor foi equilibrada entre amarelo e laranja, para que o sol continuasse quente sem competir com o restante da comunicação.",
    outcome: "Moderno, minimalista e consistente, mantendo o natural.",
    services: ["Design de marca"],
  },
  {
    slug: "technpol",
    client: "Technpol",
    sector: "Saúde e impressão 3D",
    summary: "Um ponto de exclamação com bico de impressora 3D.",
    challenge:
      "Representar uma empresa de saúde que trabalha com impressão 3D sem cair no repertório clínico nem no tecnológico genérico.",
    approach:
      "O símbolo é uma exclamação que lembra o bico de uma impressora 3D, com o cubo sendo impresso logo abaixo, como uma caixa de surpresa para a área da saúde. A tipografia alta traz seriedade e atemporalidade, e as arestas arredondadas conversam com as bordas do símbolo.",
    outcome: "Seriedade sem frieza, tecnologia sem clichê.",
    services: ["Design de marca", "Type design"],
  },
  {
    slug: "principe-de-gales",
    client: "Residencial Príncipe de Gales",
    sector: "Incorporação imobiliária",
    summary: "Três iniciais e dois pilares na mesma assinatura.",
    challenge:
      "Um residencial precisa transmitir estrutura e permanência, e ainda assim caber num logotipo que se aplique de placa de obra a material de venda.",
    approach:
      "Escolhemos um elemento visual de estrutura e construção e o integramos ao símbolo como dois pilares. Depois incorporamos as iniciais: o P de Príncipe, que também sugere uma nuvem e o vento, trazendo a ideia de vista e altura, mais o G de Gales e o R de Residencial.",
    outcome: "Um monograma que conta a promessa do empreendimento.",
    services: ["Design de marca"],
  },
  {
    slug: "battist",
    client: "Battist",
    sector: "Marca de moda",
    summary: "Uma tipografia escolhida para carregar a fase nova.",
    challenge:
      "A marca entrava em outra etapa e precisava de uma letra que preservasse a identidade já reconhecida enquanto sinalizava a mudança.",
    approach:
      "O trabalho concentrou-se na busca tipográfica, até chegar à Chennai, lapidada para a marca. Cada ajuste foi medido contra os aspectos essenciais definidos no briefing, em vez de perseguir novidade.",
    outcome: "Continuidade e mudança na mesma assinatura.",
    services: ["Design de marca", "Type design"],
  },
  {
    slug: "recria",
    client: "Rêcria",
    sector: "Marketing",
    summary: "Uma lâmpada que também é uma pessoa pensando.",
    challenge:
      "Uma agência de marketing precisava parecer criativa e divertida sem perder o equilíbrio profissional que o cliente dela espera.",
    approach:
      "O símbolo une a primeira letra da marca à lâmpada. A perna do R junto com a lâmpada desenha uma pessoa pensando, referência direta à fundadora. Tipografia, cores e formas carregam a diversão; a estrutura mantém a compostura.",
    outcome: "Criatividade declarada na forma, não no adjetivo.",
    services: ["Design de marca", "Identidade verbal"],
  },
  {
    slug: "enort",
    client: "eNort",
    sector: "Contabilidade",
    summary: "Um farol para quem navega a contabilidade.",
    challenge:
      "Entrar num mercado sisudo com uma marca que fosse moderna e acessível, sem escorregar para o infantil.",
    approach:
      "O conceito é o farol que guia o navio até águas tranquilas. A tipografia alta traz modernidade, a caixa baixa suaviza, e as arestas levemente arredondadas equilibram sério e divertido. As pontas quadradas devolvem agressividade, e o conjunto da letra e foi separado para lembrar o arroba, ligando a marca à tecnologia.",
    outcome: "Uma contabilidade que não parece um cartório.",
    services: ["Design de marca", "Type design"],
  },
  {
    slug: "diiverso",
    client: "Diiverso",
    sector: "E-commerce",
    summary: "Dois is porque são diversos, e um movimento porque são um só.",
    challenge:
      "Um e-commerce de catálogo amplo precisava dizer variedade e unidade ao mesmo tempo, o que costuma ser contraditório numa marca.",
    approach:
      "O nome ganhou um segundo i, porque são diversos. Em seguida demos movimento à marca, como se os dois is estivessem se juntando em um: a empresa é uma só. A ideia inteira acontece dentro do naming.",
    outcome: "Conceito e nome resolvidos no mesmo gesto.",
    services: ["Design de marca", "Identidade verbal", "Motion design"],
  },
  {
    slug: "aline-phil",
    client: "Aline Phil",
    sector: "Marca pessoal",
    summary: "Ousadia e minimalismo calibrados um contra o outro.",
    challenge:
      "Equilibrar quatro traços de personalidade que puxam para lados diferentes: ousada, minimalista, clássica e criativa.",
    approach:
      "A ousadia veio da tipografia alta com hastes grossas, que firma posição. O minimalismo veio da subtração, com a retirada das ligações, o que de quebra abriu espaço para a criatividade. E o movimento fechou o conjunto.",
    outcome: "Quatro personalidades num sistema só, sem ruído.",
    services: ["Design de marca", "Motion design"],
  },
  {
    slug: "onda-longboard",
    client: "Onda Longboard",
    sector: "Esporte",
    summary: "A onda, o asfalto e a letra O na mesma forma.",
    challenge:
      "Um longboard anda no asfalto, mas a marca se chama Onda. O símbolo tinha de segurar os dois territórios sem escolher um.",
    approach:
      "Trabalhamos três elementos: a onda, o asfalto e a letra O, que conecta o desenho ao nome. Toda a marca foi desenhada de forma cem por cento digital, inclusive os esboços, o que manteve o traço limpo desde o começo.",
    outcome: "Um símbolo que lê como onda e como pista.",
    services: ["Design de marca"],
  },
  {
    slug: "california-br",
    client: "California BR",
    sector: "Vestuário",
    summary: "Brasil na cor, Califórnia na letra.",
    challenge:
      "Uma marca que carrega dois lugares no nome precisava representar os dois sem virar colagem de bandeiras.",
    approach:
      "Dividimos a tarefa entre os recursos: a cor representa o Brasil e a tipografia representa a Califórnia, tirada dos dois elementos de destaque das placas de carro do estado. O pôr do sol entra como terceiro elo.",
    outcome: "Dois territórios sem que nenhum vire enfeite.",
    services: ["Design de marca"],
  },
  {
    slug: "cozinha-da-mika",
    client: "Cozinha da Mika",
    sector: "Alimentação",
    summary: "Assinatura manuscrita sobre laranja quente.",
    challenge:
      "Uma cozinha com nome próprio pede pessoalidade, e pessoalidade escrita à mão costuma perder força quando reduzida.",
    approach:
      "A assinatura foi desenhada com peso suficiente para segurar aplicações pequenas, e o laranja saturado dá o calor que o manuscrito sozinho não sustentaria. O sistema foi montado a partir da papelaria.",
    outcome: "Pessoal na letra, firme na aplicação.",
    services: ["Design de marca"],
  },
  {
    slug: "quallium",
    client: "Quallium",
    sector: "Alimentos",
    summary: "Embalagem de alho que precisa funcionar sob refrigeração.",
    challenge:
      "Produto de gôndola refrigerada, com toda a informação obrigatória: tabela nutricional, conservação, prazo depois de aberto. Tudo isso sem afogar a marca.",
    approach:
      "Fundo escuro para o produto claro saltar, hierarquia de rótulo que separa o nome do que é exigência legal, e a informação técnica organizada em bloco próprio, legível sem competir com a marca.",
    outcome: "Norma cumprida sem a embalagem virar bula.",
    services: ["Design de marca"],
  },
]
