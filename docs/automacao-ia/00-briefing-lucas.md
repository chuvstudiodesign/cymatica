# Briefing original — Automação de design com IA

> Registro do que o Lucas ditou em 2026-09-06, organizado em tópicos mas
> **sem reinterpretação**. Este arquivo é a fonte. Quando houver dúvida sobre o
> produto, é aqui que se confere — os outros documentos derivam deste.
>
> Nada foi removido. O que estava em ordem de fala embaralhada foi agrupado por
> assunto, e as autocorreções dele ("desculpa, não é isso, é aquilo") foram
> resolvidas para a versão final que ele escolheu, com nota quando importava.

---

## 1. O que é o produto

Um serviço em que a Cymatica **constrói uma estrutura que automatiza a criação
de peças de design para uma empresa**.

Funciona em dois movimentos:

1. Criar um **design system** para aquela empresa — toda a estrutura visual da
   marca, sistematizada de um jeito que a inteligência artificial consiga ler.
2. Construir **sistemas de criação** que leem esse design system e produzem
   peças novas alinhadas a ele.

### O design system

Não leva manual de marca. *(Nota: o Lucas chegou a dizer "manual de marca" e se
corrigiu — o design system dispensa manual, porque ele próprio é a regra.)*

Contém:

- **Design tokens** — paleta de cores, escala tipográfica, escala de
  espaçamento, corner radius, sombra. Tudo componentizado.
- **Componentes** — accordion, alerta, badge, carrossel, card, calendário e
  assim por diante. Podem ser **centenas** de componentes.
- **Protótipos componentizados de páginas.**

> "O design system vem pra quê? Pra que a gente consiga sistematizar toda uma
> marca."

### O primeiro passo

> "O primeiro passo é a gente sistematizar toda a marca de uma forma que a
> inteligência artificial ela consiga ler."

### O segundo passo

Depois do design system montado, construir a capacidade de **criar diversas
peças de design alinhadas com ele**.

Exemplo principal: um **site**. De ponta a ponta, com máxima qualidade.

E aqui há um ponto que o Lucas fez questão de marcar: **não basta o sistema ler
o design system**. Isso garante identidade visual e de marca, mas um site
precisa de mais — bom copy, boa proposta comercial, entendimento de para que
aquele site existe. Tudo isso também é construído.

> "A gente consegue construir uma engenharia — eu não sei se talvez essa é a
> melhor palavra, mas é só pra mostrar que não é algo tão simples, mas ao mesmo
> tempo não é algo complexo."

Isso envolve engenharia de prompt, **estrutura de orquestradores** e
**estrutura de qualidade**.

---

## 2. O que dá para criar

- **Site** (de ponta a ponta)
- **Apresentação comercial em PDF**
- **Apresentação comercial em PowerPoint**
- **Posts para mídia social**
- **Sistema de postagens automáticas** (ver abaixo)
- **Flyer para mídia social**
- **Motion design** — vídeos em motion, criados conversando com o chat
- E, de modo geral, **qualquer material que envolva design**

### O sistema de postagens automáticas

Faz tudo de ponta a ponta, com uma cadeia de agentes:

1. Um **orquestrador**.
2. Um agente que **pesquisa o assunto** da postagem — pode ser uma notícia ou
   um assunto específico.
3. Um agente que **desenvolve a narrativa / o copy** do assunto.
4. Um **validador**, antes da criação visual.
5. Um agente que **cria a postagem visualmente**, seguindo princípios de
   design, qualidade de design e o design system.

> "Todas as peças, materiais gráficos, vai ser sempre baseado no design system."

---

## 3. A cereja do bolo — os chats

Há dois momentos:

**Primeiro**, a Cymatica cria a **base inicial** para o cliente: a estrutura
inicial do site, a estrutura inicial do post para mídia, e assim por diante.

**Segundo** — e é aqui que está o diferencial — a Cymatica **disponibiliza
chats** dentro do Claude onde o próprio cliente pede e o sistema cria.

*(Nota: o Lucas disse "cloud", referindo-se ao Claude. Ele mesmo observou que
"a gente precisa encontrar a forma de falar isso corretamente".)*

Exemplos que ele deu:

- O cliente precisa de **várias páginas para rodar em anúncio**, com copies
  diferentes e estilos visuais diferentes dentro da identidade dele. Com
  prompts, conversando com um chat, ele constrói a página completa — com
  qualidade superior e, principalmente, a identidade da marca dele.
- Um **chat para mídia social** / postagens do Instagram. Pode ser um chat que
  cria post a post ("a gente digita o que quer e ele faz"), ou o sistema
  automático completo.
- Um **chat para apresentações comerciais** — pede qualquer apresentação, ele
  desenvolve.
- Um **chat para motion**.

> "A gente pode usar o Claude, a gente pode usar qualquer ferramenta. Mas
> principalmente é o Claude, por causa do Claude Design."

---

## 4. O diferencial — dito por ele, com a autocorreção

Ele começou perguntando e respondendo:

> "Qual que é o nosso diferencial? Está em ter um chat que cria design? **Não,
> porque isso já existe.** Qualquer plataforma você pede pra criar um design."

E chegou à formulação final:

> "O nosso diferencial é criar um design system ao ponto que ele consiga criar
> materiais de design seguindo a **identidade de marca da empresa dele**."

*(Nota: ele hesitou entre "qualquer material" e "materiais", e entre "qualidade
de design" e "identidade de marca" — ficou com **materiais** e **identidade de
marca**, e disse que "qualquer" talvez fosse pesado demais.)*

Ou seja: **a possibilidade de criar materiais com alta qualidade seguindo a
identidade visual.**

### Um ponto importante sobre criação nova

O sistema **não apenas monta com componentes prontos — ele cria novos.**

> "Ele vai criar sempre novos posts. Claro, seguindo a identidade, mas você
> pode pedir: cria pra mim [tal coisa]. E aí, não gostando, ele fala: não, cria
> seguindo o meu design system um outro modelo. Então ele vai criar
> completamente diferente, ele não fica sempre no mesmo. É realmente coisas
> novas que ele cria."

---

## 5. Os benefícios para a empresa

- **Escala de produção.**
- **Diminuição de custo** com contratação de vários profissionais.
- **Quem opera pode ser qualquer um**: dependendo do porte, o próprio
  empresário; ou um designer contratado, que passa a escalar a produção "em um
  nível surpreendente".
- **Consistência de marca** — e aqui uma afirmação forte, que o Lucas pediu
  cuidado para formular:

> "Muitas das vezes ele vai ter mais qualidade de marca do que se ele
> contratasse um time gigante. Por quê? Porque tudo vai ser desenvolvido
> baseado no design system."

---

## 6. Como o produto é vendido

### 6.1 — Serviço 1: construção

Um **pacote base**: o design system, mais a criação inicial de peças.

O Lucas foi refinando em voz alta e fechou assim: o pacote base é **design
system + site + modelo de orçamento (apresentação comercial em PDF)**.

> "A gente pode fazer um pacote que ele já contrata o design system e já vem
> com esses três — não, vamos só fazer dois, pronto. Ele contrata o design
> system mais esses dois, que é modelo de orçamento e site."

Depois disso, vêm os **sistemas** — a capacidade de o cliente criar sozinho.
Ele **seleciona quais sistemas quer**, e cada sistema tem um valor próprio.

> "Quanto mais sistemas a gente desenvolve, mais caro fica."

Ordem de preço declarada:

- **Sistema de post para mídia social — o mais caro.**
- **Sistema de PDF — o mais barato** (ele ressalvou: "não no sentido de ser
  baratinho").

Sobre a formação de preço:

> "Poxa, um site quanto que custa? Vamos supor que a gente faria um site por 8
> mil. Poxa, vamos vender isso por 10 mil."

Ele pediu um **sistema de seleção** para o cliente escolher o que quer, no
mesmo espírito do que já existe na proposta do Juliano.

### 6.2 — Serviço 2: treinamento

Depois de contratar a construção, há o treinamento para a equipe usar os
materiais.

Quem pode ser treinado: qualquer pessoa com noção mínima de tecnologia. Pode
ser designer, pode ser programador, **pode ser o próprio empresário**. Precisa
saber mexer em um computador ou celular — depende do tipo de sistema.

São **duas modalidades**:

1. **Consultoria one a one, por meeting** — usando **a marca dele** e dentro
   das necessidades do cliente.
2. **Treinamento gravado** — usando **uma marca já existente no mercado** como
   exemplo, com suporte.

---

## 7. O que ele quer construído — a página

Uma página para explicar este produto. **Falada para empresários**, não para
designers.

> "Eu preciso de uma página animal. Eu preciso que a página consiga
> tangibilizar tudo isso daí, todo o diferencial."

### Estrutura

Ele pediu que eu decidisse a ordem mais inteligente, mas deu as balizas:

- Uma **hero irresistível**.
- **Step by step** de como funciona: primeiro criamos o seu design system (em
  linguagem clara para ele), depois o design system vira material — sites,
  PDFs, posts —, depois vêm os sistemas.
- **Benefícios**: ou antes da explicação, ou depois, ou um pouco antes e o
  detalhe depois. Decisão de estrutura minha.

Sobre o copy:

> "Não pode ser técnico pra design, tem que ser um copy que mostre o que a
> gente tá vendendo pra ele. A gente tá vendendo automatização de design, mas a
> gente tá também vendendo junto **consistência de marca** com **diminuição de
> custo de equipe**."

### Camadas — regra marcada como "alerta, alerta"

> "Tudo que eu tô falando aqui eu preciso que a gente explique lá, nessas
> diferentes nuances, mas eu preciso que a gente tenha uma inteligência de
> desenvolvimento de um site, onde a gente fale **o essencial na camada base**,
> mas que a gente tenha **botões que abram como se fossem um ver mais**."

Ou seja: camada principal enxuta, e profundidade sob demanda para quem se
interessar.

### Demonstração visual do prompt

> "Eu queria demonstrar isso tipo visual, no design system da Cymatica, ele
> digitando, mostrando digitação na tela e mostrando ele pedindo: cria um
> design X pra mim. E aí, ele não gostando: não, cria seguindo o meu design
> system um outro modelo."

---

## 8. Registros pedidos

Ele pediu explicitamente que fossem gravados em `.md`:

1. **A transcrição** do que ele falou — este arquivo.
2. **O produto nas minhas palavras**, lapidado. → `01-o-produto.md`
3. Um arquivo **quase de branding**, transformando isso no tom de voz da
   Cymatica. → `02-branding.md`
4. **O plano de execução** ponta a ponta. → `03-plano.md`

Motivo declarado: esse material vai alimentar a página do curso para
designers, postagens para mídia, e servir de consulta ("Claude, o que eu falei
sobre o produto tal? Qual era a ideia mesmo?").

> "A gente tá quase montando um branding de uma vertente da nossa marca. É como
> se fosse a Cymatica guarda-chuva e a gente tá criando esse produto novo, um
> produto especial."

---

## 9. Projeto futuro — registrado, não executado agora

Vender o mesmo conhecimento **para designers**: como construir um ecossistema
de marca com identidade visual, como criar peças automáticas para acelerar o
processo do dia a dia, ou para revender a clientes.

Formato: **consultoria do estúdio**. E, como desdobramento, "até ter
possibilidades, talvez, depois de trabalhar no estúdio".

Isso vira uma **outra página**, depois. Não faz parte desta entrega.

---

## 10. Regras de execução que ele deu

- Fazer o plano primeiro, em `.md`, e **já começar a executar**.
- **Não parar para perguntar nada** — nem durante, nem depois. Pergunta
  interrompe a produção.
- Entregar **de ponta a ponta**, um produto mínimo viável mas completo, para
  ele validar depois.
- **Não apagar nada** do projeto. Nenhuma página, nenhum documento. Só criar.
- O que eu não souber, **assumir e registrar** — e apontar no relatório final.
