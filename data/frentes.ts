/* As 10 linguagens do Street Fest 019.
   Fonte única: nenhum caminho de imagem vive espalhado em componente.

   TEXTO PROVISÓRIO. Só o `resumo` tem texto, escrito por nós, falando da
   linguagem em si — sem número, data, nome de evento ou local, e sem dizer
   nada sobre o que o Street Fest fez. Marcado com `provisorio: true`, que o
   modal mostra na tela. Substituir pelo texto dos organizadores.

   `comoETrabalhada` e `oQueFoiFeito` ficam null e o modal não desenha a
   seção. Os rascunhos de `comoETrabalhada` estão guardados no fim deste
   arquivo, comentados. `eventosRealizados` só tem item com fonte literal no
   portfólio ou no mockup, citada no comentário de cada um.

   As fotos são originais do projeto, otimizadas a partir de originals/
   (fora do versionamento). */

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
  /** null quando a fonte não diz o local (ex.: programação espalhada) */
  local: string | null;
};

export type Frente = {
  slug: string;
  nome: string;
  /** chamada curta, aparece no card e no topo do modal */
  resumo: string | null;
  /** true = `resumo` e `comoETrabalhada` sao texto de espera, escrito por nos,
      falando so da linguagem em si. O modal marca isso na tela. */
  provisorio?: boolean;
  /** cor de acento (token do projeto) */
  cor: string;
  /** primeira foto do array, repetida aqui por clareza de leitura */
  capa: FotoFrente;
  fotos: FotoFrente[];
  /* ---- seções do modal; o que for null/vazio não é renderizado ---- */
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
    resumo:
      "Esporte e linguagem de rua ao mesmo tempo. O skate lê a cidade como terreno: corrimão, escada e banco viram obstáculo.",
    provisorio: true,
    cor: "var(--vermelho)",
    capa: V("skate-1", "Skatista descendo o bowl com o banner do Street Fest ao fundo"),
    fotos: [
      V("skate-1", "Skatista descendo o bowl com o banner do Street Fest ao fundo"),
      V("skate-2", "Skatista no ar durante um ollie sobre obstáculo na rua"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [
      /* Portfólio, slide "Semana do Skate" */
      { nome: "2ª Semana do Skate", data: "3 a 21 de agosto de 2025", local: null },
      {
        nome: "1º Seminário Skate Campinas — Desafios Sociais do Esporte Radical",
        data: "15 de agosto de 2025",
        local: "Auditório FEF/Unicamp",
      },
      { nome: "Plaza Sessions", data: "12 de abril de 2025", local: "Pista de Skate Plaza 0800" },
    ],
    oQueFoiFeito: null,
  },
  {
    slug: "basquete",
    nome: "Basquete",
    resumo:
      "Basquete de quadra pública, jogado em meia quadra, com times pequenos e partida curta.",
    provisorio: true,
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
    resumo:
      "Dança nascida no hip hop, feita no chão e no giro. Cada passagem é uma resposta à anterior.",
    provisorio: true,
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
    resumo:
      "Pintura em muro e superfície urbana, do traço rápido da assinatura ao painel autoral.",
    provisorio: true,
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
    resumo:
      "Quem sustenta o som: seleção, mixagem e leitura do público em tempo real.",
    provisorio: true,
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
    resumo:
      "A voz sobre a batida: rima escrita, improviso e presença no microfone.",
    provisorio: true,
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
    resumo:
      "O registro do que acontece — e também uma porta de entrada técnica para quem quer trabalhar com imagem.",
    provisorio: true,
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
    resumo:
      "Banda no palco, instrumento ao vivo, volume alto. O formato mais direto de show.",
    provisorio: true,
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
    resumo:
      "Jogo eletrônico tirado de casa e levado para a praça: console, monitor e disputa no mesmo lugar.",
    provisorio: true,
    cor: "var(--vermelho)",
    capa: P("games-2", "Jogadores diante dos monitores na área de games", 1000, 1500),
    fotos: [
      P("games-2", "Jogadores diante dos monitores na área de games", 1000, 1500),
      P("games-1", "Mesa de videogame montada ao ar livre, em lente olho de peixe", 1000, 1500),
    ],
    comoETrabalhada: null,
    eventosRealizados: [
      /* Portfólio, slide "Street Games" */
      {
        nome: "Street Games",
        data: "27 de janeiro de 2024 a 9 de fevereiro de 2026",
        local: null,
      },
      /* Mockup (reference/home.html), frente "Campinas Games" */
      { nome: "Campinas Games", data: "2023 — 2024", local: null },
      /* Portfólio, slide "Campinas Games": "3º Seminário Campinas GAMES,
         edição Esportes, 30 de agosto de 2024, Câmara Municipal de
         Campinas, Dia dos Games Campinas." Mesmo registro do evento 03 em
         data/eventos.ts. */
      {
        nome: "3º Seminário Campinas GAMES — edição Esportes",
        data: "30 de agosto de 2024",
        local: "Câmara Municipal de Campinas",
      },
    ],
    oQueFoiFeito: null,
  },
  {
    slug: "hq-autores-nerd",
    nome: "HQ e Autores Nerd",
    resumo:
      "Quadrinhos, ilustração e cultura nerd produzidos por autoras e autores independentes.",
    provisorio: true,
    cor: "var(--amarelo)",
    capa: V("hq-2", "Autora ao lado da banca com seus quadrinhos"),
    fotos: [
      V("hq-2", "Autora ao lado da banca com seus quadrinhos"),
      V("hq-1", "Quadro de história em quadrinhos exposto sobre a mesa"),
    ],
    comoETrabalhada: null,
    eventosRealizados: [
      /* Portfólio, slide "Campinas Games": "Resultou na criação da Lei
         Municipal Dia do Autor Geek e da Cultura Nerd." */
      {
        nome: "2º Seminário Campinas GAMES — edição Educação",
        data: "28 de maio de 2024",
        local: "Câmara Municipal de Campinas",
      },
    ],
    oQueFoiFeito: null,
  },
];

export function frentePorSlug(slug: string) {
  return frentes.find((f) => f.slug === slug);
}

/* ----------------------------------------------------------------------
   RASCUNHOS de `comoETrabalhada`, escritos por nós e desligados a pedido.
   Ficam aqui para não se perderem; nunca foram para a tela. Para religar,
   basta devolver o texto ao campo da linguagem correspondente.
   ----------------------------------------------------------------------

   skate:
   "Aparece tanto em pista quanto em pico de rua, da sessão aberta ao campeonato. A roda se forma em volta de quem está andando, e a troca entre iniciante e veterano acontece ali mesmo. Oficina e empréstimo de equipamento costumam abrir a porta para quem nunca subiu num shape."

   basquete:
   "Funciona em formato de torneio, com times se inscrevendo na hora e rodando a cada partida. A quadra fica aberta entre os jogos, então quem chegou para assistir acaba entrando. Som e locução costumam acompanhar, puxando o público do entorno."

   breaking:
   "Acontece em roda ou em batalha com chaveamento, sempre com DJ ao vivo ditando o ritmo. O júri costuma ser formado por dançarinos mais experientes da cena. Entre uma batalha e outra, a roda fica aberta para quem quiser entrar."

   graffiti:
   "Painéis coletivos são pintados ao vivo durante o evento, com o muro liberado e o processo à vista do público. Oficinas ensinam traço, preenchimento e uso da lata para quem está começando. O resultado fica no lugar depois que tudo acaba."

   dj:
   "A discotecagem ancora as outras linguagens — é o DJ que dá o ritmo da batalha de breaking e do microfone aberto. Os sets se revezam ao longo do dia, variando entre rap, funk e black music. Em formato de oficina, a mesa fica aberta para quem quer entender o equipamento."

   mc:
   "Aparece em show, em microfone aberto e em batalha de rima, com tema sorteado ou livre. O público responde na hora, e é essa resposta que mede a rima. Rodas de conversa sobre escrita e postura no palco costumam acompanhar."

   fotografia-audiovisual:
   "Equipes cobrem o evento fotografando e filmando, e o material volta para a comunidade depois. Oficinas passam enquadramento, luz e edição, muitas vezes usando só o celular. Quem participa sai com imagem própria para publicar."

   rock-banda:
   "As bandas se revezam no palco montado no próprio espaço do evento, com passagem de som aberta ao público. A programação costuma misturar grupos novos e nomes já rodados da cena. Equipamento compartilhado reduz a barreira para quem está começando."

   video-games:
   "Estações de jogo são montadas ao ar livre ou em equipamento cultural, com acesso livre. Campeonatos acontecem em chave, mas a maior parte do tempo é jogo solto, com gente se revezando no controle. Disputa em dupla puxa quem não se considera gamer."

   hq-autores-nerd:
   "Bancas de autor expõem e vendem material próprio, com quem desenhou atendendo ali. Mesas e encontros discutem publicação independente e circulação do trabalho. Oficinas de desenho e roteiro abrem espaço para quem quer começar a publicar."
*/
