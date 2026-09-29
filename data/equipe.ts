export type Pessoa = {
  nome: string;
  funcao: string;
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
   As fotos sao recortes provisorios do portfolio (img-test/) so para teste.

   PENDENTE DOS ORGANIZADORES: bio, sobre, noProjeto, antes, @instagram e
   linkedin. Os campos ficam null até o texto real chegar — a seção de vinil
   mostra um aviso de pendência no lugar em vez de texto inventado. */
export const equipe: Pessoa[] = [
  {
    nome: "Gabriel Urso",
    funcao: "Diretor de projeto e cientista social",
    cor: "var(--vermelho)",
    foto: "/fotos/equipe-gabriel-urso.jpg",
    bio: null,
    instagram: null,
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
    instagram: null,
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
    instagram: null,
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
  },
  {
    nome: "Guilherme Mesquita",
    funcao: "Coordenação de área — basquete",
    cor: "var(--vermelho)",
    foto: "/fotos/equipe-guilherme-mesquita.jpg",
    bio: null,
    instagram: null,
    linkedin: null,
    sobre: null,
    noProjeto: null,
    antes: null,
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
];
