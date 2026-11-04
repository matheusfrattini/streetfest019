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
  /* Fundo animado do hero: GIF gerado a partir de capaSite.mp4 (o original
     fica fora do site). O celular recebe uma versão menor. */
  video: {
    src: "/video/capa-site.gif",
    srcCelular: "/video/capa-site-celular.gif",
    poster: "/video/capa-site-poster.jpg",
  },
};
