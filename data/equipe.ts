export type Pessoa = {
  nome: string;
  /* null = função ainda não informada; o card só mostra o nome */
  funcao: string | null;
  cor: string;
  /* null = sem foto do cliente ainda → placeholder .gblock */
  foto: string | null;
  /* Verso do card colecionável (mural.md, item 2). Tudo opcional: o que for
     null simplesmente não aparece. `bio` é a fala curta de apresentação. */
  bio?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  /* --- Seção Organizadores em vinil ---
     Cada pessoa é um álbum: a foto é a capa e o painel mostra estes textos.
     PENDENTE DOS ORGANIZADORES: nada aqui pode ser escrito por nós. */
  sobre?: string | null;
  /* realizações dentro do Street Fest */
  noProjeto?: string[] | null;
  /* realizações anteriores ao projeto */
  antes?: string[] | null;
};

/* Array `equipe` do <script> do mockup, na mesma ordem.
   Nome, função e cor vieram do portfólio do próprio projeto.
   Fotos: Guilherme Roberto e Guilherme Mesquita já usam as originais enviadas
   (originals/); as outras ainda são recortes provisórios do portfólio.

   DJ Binho, Guilherme Mesquita e Thales Brito já mandaram a apresentação
   (24/11/2026); o texto deles só teve grafia e pontuação padronizadas.
   PENDENTE DOS OUTROS: sobre, noProjeto e antes. Os campos ficam null até o
   texto real chegar — a seção de vinil mostra um aviso de pendência no lugar
   em vez de texto inventado. */
export const equipe: Pessoa[] = [
  {
    nome: "DJ Binho",
    funcao: "DJ e oficineiro",
    cor: "var(--roxo)",
    foto: "/fotos/equipe-dj-binho.jpg",
    bio: null,
    instagram: "djbinhodj",
    linkedin: null,
    sobre: "Sou DJ e grafiteiro, arte-educador e militante da cultura e do movimento hip hop de Campinas desde 1998. Atuo como DJ e oficineiro no Street Fest desde o início do projeto.",
    noProjeto: [
      "Discotecagem na maioria dos eventos.",
      "Oficinas de DJ em escolas e OSCs.",
    ],
    antes: [
      "Início no hip hop pelo graffiti, no fim dos anos 90.",
      "Arte-educação com graffiti em escolas, na Fundação Casa e em ONGs.",
      "Participação na construção da primeira Casa do Hip Hop de Campinas.",
      "Desde 2010, DJ em eventos de rap, skate e festivais de hip hop em Campinas e região.",
    ],
  },
  {
    nome: "Gabriel Urso",
    funcao: "Diretor de projeto e cientista social",
    cor: "var(--vermelho)",
    foto: "/fotos/equipe-gabriel-urso.jpg",
    bio: null,
    instagram: "gabrielourso",
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Cleber Geraldo",
    funcao: "Produção artística e produtor técnico",
    cor: "var(--verde)",
    foto: "/fotos/equipe-cleber-geraldo.jpg",
    bio: null,
    instagram: null,
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Juliana Basso",
    funcao: "Produção cultural e gestão de pessoas",
    cor: "var(--roxo)",
    foto: "/fotos/equipe-juliana-basso.jpg",
    bio: null,
    instagram: "jukisbasso",
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Guilherme Roberto",
    funcao: "Produção audiovisual e cinegrafista",
    cor: "var(--amarelo)",
    foto: "/fotos/equipe-guilherme-roberto.jpg",
    bio: null,
    instagram: "guirobert0",
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Guilherme Mesquita",
    funcao: "Coordenador esportivo — basquete",
    cor: "var(--vermelho)",
    foto: "/fotos/equipe-guilherme-mesquita.jpg",
    bio: null,
    instagram: "g.mesquitasalles",
    linkedin: null,
    sobre: "Sou educador social e atuo há mais de 13 anos com o basquete, usando o esporte como ferramenta de desenvolvimento humano, inclusão e transformação social. Acredito no esporte como espaço de construção de oportunidades, fortalecimento de vínculos e protagonismo da juventude.",
    noProjeto: [
      "Idealização e desenvolvimento das ações de basquete do Street Fest 019.",
      "Organização e coordenação de eventos e torneios de basquete 3x3.",
      "Planejamento e execução de etapas esportivas.",
      "Articulação com atletas, equipes, parceiros e comunidade.",
      "Iniciativas que fortalecem o acesso ao esporte, a participação e o protagonismo juvenil.",
    ],
    antes: [
      "Mais de 20 anos de relação com o basquete.",
      "5 anos de atuação profissional na área socioeducativa.",
      "Desenvolvimento de projetos sociais, organização de atividades esportivas e trabalho com crianças e adolescentes, aproximando o esporte da educação, da cultura e da transformação social.",
    ],
  },
  {
    nome: "Rafael Martins",
    funcao: "Coordenação de projeto e pedagogo",
    cor: "var(--verde)",
    foto: "/fotos/equipe-rafael-martins.jpg",
    bio: null,
    instagram: null,
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Thales Brito",
    funcao: "Coordenador cultural — skate",
    cor: "var(--amarelo)",
    foto: "/fotos/equipe-thales-brito.jpg",
    bio: null,
    instagram: "britoskt",
    linkedin: null,
    sobre: "Sou Thales Brito, skatista de Campinas, e produzo conteúdo para marcas e parceiros. Comecei no Street Fest como educador e hoje sou coordenador cultural de skate: planejo e executo ações e acompanho as atividades e os projetos ligados à cultura do skate dentro do projeto.",
    noProjeto: [
      "Atuação em comunidades, escolas e na Fundação Casa.",
      "Organização de campeonatos, como o do Dia Municipal do Skate, no Taquaral.",
    ],
    antes: [
      "Produção de conteúdo com skate.",
      "Trabalho social no Rio Grande do Sul.",
      "Atuação como educador em projetos para os quais foi convidado.",
      "Organização de eventos, como o 1º Go Skate Day de Hortolândia.",
    ],
  },
];
