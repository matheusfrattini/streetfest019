export type Pilar = {
  slug: string;
  nome: string;
  descricao: string;
  cor: string;
  /* null = sem foto do cliente ainda → placeholder .gblock (PhotoPlaceholder) */
  coverPhoto: string | null;
};

export const pilares: Pilar[] = [
  { slug: "skate", nome: "Skate", descricao: "Pistas, sessions e campeonatos", cor: "var(--vermelho)", coverPhoto: "/fotos/skate-grind.jpg" },
  { slug: "basquete-3x3", nome: "Basquete 3x3", descricao: "Campeonatos em quadra pública", cor: "var(--amarelo)", coverPhoto: "/fotos/basquete-3x3-medalhas.jpg" },
  { slug: "breaking", nome: "Breaking", descricao: "Batalhas e apresentações", cor: "var(--roxo)", coverPhoto: "/fotos/breaking-freeze.jpg" },
  { slug: "rap-e-djs", nome: "Rap e DJs", descricao: "Shows, sound system e festival", cor: "var(--verde)", coverPhoto: "/fotos/comic-city-djs.jpg" },
  { slug: "graffiti", nome: "Graffiti", descricao: "Intervenção e oficinas", cor: "var(--vermelho)", coverPhoto: null },
  { slug: "games", nome: "Games", descricao: "Área geek, seminários e leis", cor: "var(--amarelo)", coverPhoto: "/fotos/street-games-dupla.jpg" },
];

export function pilarPorSlug(slug: string) {
  return pilares.find((p) => p.slug === slug);
}
