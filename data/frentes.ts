/* As 10 linguagens do Street Fest 019.
   Fonte única: nenhum caminho de imagem vive espalhado em componente.

   TEXTO PENDENTE DOS ORGANIZADORES. Tudo que é conteúdo editorial nasce como
   null e a interface mostra um aviso de pendência no lugar — nada aqui é
   escrito por nós. As fotos são originais do projeto, otimizadas a partir de
   originals/ (fora do versionamento). */

export type FotoFrente = {
  src: string;
  /** o que aparece na foto, em português — não "imagem 1" */
  alt: string;
  largura: number;
  altura: number;
};

export type EventoDaFrente = {
  nome: string;
  data: string;
  local: string;
};

export type Frente = {
  slug: string;
  nome: string;
  /** chamada curta, aparece no card e no topo do modal */
  resumo: string | null;
  /** cor de acento (token do projeto) */
  cor: string;
  /** primeira foto do array, repetida aqui por clareza de leitura */
  capa: FotoFrente;
  fotos: FotoFrente[];
  /* ---- seções do modal, todas pendentes ---- */
  comoETrabalhada: string | null;
  eventosRealizados: EventoDaFrente[];
  oQueFoiFeito: string | null;
};

const V = (src: string, alt: string): FotoFrente => ({
  src: `/fotos/linguagens/${src}.webp`,
  alt,
  largura: 1600,
  altura: 2400,
});
const H = (src: string, alt: string): FotoFrente => ({
  src: `/fotos/linguagens/${src}.webp`,
  alt,
  largura: 1600,
  altura: 1067,
});
/* as quatro que vieram menores da câmera */
const P = (src: string, alt: string, w: number, h: number): FotoFrente => ({
  src: `/fotos/linguagens/${src}.webp`,
  alt,
  largura: w,
  altura: h,
});

export const frentes: Frente[] = [
  {
    slug: "skate",
    nome: "Skate",
    resumo: null,
    cor: "var(--vermelho)",
    capa: V("skate-1", "Skatista descendo o bowl com o banner do Street Fest ao fundo"),
    fotos: [
      V("skate-1", "Skatista descendo o bowl com o banner do Street Fest ao fundo"),
      V("skate-2", "Skatista no ar durante um ollie sobre obstáculo na rua"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "basquete",
    nome: "Basquete",
    resumo: null,
    cor: "var(--amarelo)",
    capa: V("basquete-1", "Jogadora arremessando na cesta durante partida em quadra pública"),
    fotos: [
      V("basquete-1", "Jogadora arremessando na cesta durante partida em quadra pública"),
      H("basquete-2", "Time comemorando de braços erguidos na quadra"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "breaking",
    nome: "Breaking",
    resumo: null,
    cor: "var(--roxo)",
    capa: V("breaking-1", "B-boy em freeze no centro da roda, com público em volta"),
    fotos: [
      V("breaking-1", "B-boy em freeze no centro da roda, com público em volta"),
      H("breaking-2", "Dois b-boys em movimento de chão no asfalto"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "graffiti",
    nome: "Graffiti",
    resumo: null,
    cor: "var(--verde)",
    capa: V("graffiti-2", "Artista com lata de spray em frente a um painel colorido"),
    fotos: [
      V("graffiti-2", "Artista com lata de spray em frente a um painel colorido"),
      V("graffiti-1", "Grupo pintando um muro de blocos durante oficina de graffiti"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "dj",
    nome: "DJ",
    resumo: null,
    cor: "var(--vermelho)",
    capa: P("dj-1", "DJ mixando nas pick-ups sob a tenda do evento", 1000, 1500),
    fotos: [
      P("dj-1", "DJ mixando nas pick-ups sob a tenda do evento", 1000, 1500),
      H("dj-2", "Vista de cima da mesa do DJ, em lente olho de peixe"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "mc",
    nome: "MC",
    resumo: null,
    cor: "var(--amarelo)",
    capa: P("mc-1", "MCs cantando ao microfone diante do público", 1398, 2097),
    fotos: [
      P("mc-1", "MCs cantando ao microfone diante do público", 1398, 2097),
      V("mc-2", "MC no centro da roda, em lente olho de peixe"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "fotografia-audiovisual",
    nome: "Fotografia e Audiovisual",
    resumo: null,
    cor: "var(--roxo)",
    capa: V("fotografia-1", "Fotógrafo mostrando a câmera para um menino sentado ao lado"),
    fotos: [
      V("fotografia-1", "Fotógrafo mostrando a câmera para um menino sentado ao lado"),
      P("fotografia-2", "Público reunido sob a tenda diante das caixas de som", 1000, 1500),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "rock-banda",
    nome: "Rock e Banda",
    resumo: null,
    cor: "var(--verde)",
    capa: H("rock-2", "Duas vocalistas cantando no palco diante do público"),
    fotos: [
      H("rock-2", "Duas vocalistas cantando no palco diante do público"),
      H("rock-1", "Banda tocando no palco montado sob a tenda"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "video-games",
    nome: "Video Games",
    resumo: null,
    cor: "var(--vermelho)",
    capa: P("games-2", "Jogadores diante dos monitores na área de games", 1000, 1500),
    fotos: [
      P("games-2", "Jogadores diante dos monitores na área de games", 1000, 1500),
      P("games-1", "Mesa de videogame montada ao ar livre, em lente olho de peixe", 1000, 1500),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
  {
    slug: "hq-autores-nerd",
    nome: "HQ e Autores Nerd",
    resumo: null,
    cor: "var(--amarelo)",
    capa: V("hq-2", "Autora ao lado da banca com seus quadrinhos"),
    fotos: [
      V("hq-2", "Autora ao lado da banca com seus quadrinhos"),
      V("hq-1", "Quadro de história em quadrinhos exposto sobre a mesa"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [],
    oQueFoiFeito: null,
  },
];

export function frentePorSlug(slug: string) {
  return frentes.find((f) => f.slug === slug);
}
