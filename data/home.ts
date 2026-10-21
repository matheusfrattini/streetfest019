/* Conteúdo do hero da home.

   O parágrafo é o mesmo que já estava no hero — não foi reescrito. */

export const home = {
  kicker: "Campinas/SP e região · desde 2022",
  texto:
    "Mais que evento, é movimento. Ocupamos ruas, praças e parques com skate, basquete 3x3, breaking, rap, graffiti e games — transformando cultura de rua em ferramenta de educação e inclusão.",
  /* Crédito oficial do apoio/patrocínio. Enquanto for null, o hero não
     desenha a linha — nada de placeholder no lugar.
     TODO organizadores: texto oficial do crédito. */
  creditoApoio: null as string | null,
  /* Vídeo de fundo do hero. Os dois arquivos ainda não existem; enquanto
     `src` for null, o <HeroVideo> mantém só o fundo escuro.
     TODO: videoteca do projeto. */
  video: {
    src: null as string | null,
    poster: null as string | null,
  },
};
