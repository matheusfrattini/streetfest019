export type Frente = {
  slug: string;
  /* O <h3> do mockup tem quebra de linha: cada item do array é uma linha. */
  titulo: string[];
  descricao: string;
  periodo: string;
  /* null = sem foto do cliente ainda → placeholder .gblock (PhotoPlaceholder) */
  coverPhoto: string | null;
};

export const frentes: Frente[] = [
  {
    slug: "street-cultura-de-rua",
    titulo: ["Street", "Cultura de Rua"],
    descricao:
      "Ocupação cultural em ruas, praças, parques e centros públicos. Mais de 20 edições — Taquaral, Sousas, Unicamp, São Fernando, Barão, Bentão, Plaza Art e outros.",
    periodo: "2022 — 2026",
    coverPhoto: "/fotos/basquete-3x3-medalhas.jpg",
  },
  {
    slug: "street-games",
    titulo: ["Street Games"],
    descricao:
      "Games em espaços públicos e equipamentos culturais. Mais de 10 edições, de Plaza e Taquaral a FEF/Unicamp e escolas da rede.",
    periodo: "2024 — 2026",
    coverPhoto: "/fotos/street-games-controle.jpg",
  },
  {
    slug: "campinas-games",
    titulo: ["Campinas Games"],
    descricao:
      "Seminários na Câmara Municipal que viraram lei: Dia dos Games e Dia do Autor Geek e da Cultura Nerd. Três edições, mais encontros e excursões.",
    periodo: "2023 — 2024",
    coverPhoto: "/fotos/campinas-games-turma.jpg",
  },
  {
    slug: "semana-do-skate",
    titulo: ["Semana do Skate"],
    descricao:
      "12 atividades pela cidade na 2ª edição, incluindo o 1º Seminário Skate Campinas na FEF/Unicamp e o cineclube na pista do Plaza 0800.",
    periodo: "2025",
    coverPhoto: "/fotos/semana-skate-air.jpg",
  },
  {
    slug: "semana-da-juventude",
    titulo: ["Semana da Juventude"],
    descricao:
      "22 atividades na programação de 2024 e a celebração do Dia Internacional da Juventude em 2025.",
    periodo: "2024 — 2025",
    coverPhoto: null,
  },
  {
    slug: "festival-a-rua-e-nois",
    titulo: ["Festival", "A Rua É Nóis"],
    descricao:
      "Três pré-festivais em 2025 e o Festival Musical na Estação Cultura de Campinas em 7 de fevereiro de 2026.",
    periodo: "2025 — 2026",
    coverPhoto: "/fotos/comic-city-djs.jpg",
  },
];

export function frentePorSlug(slug: string) {
  return frentes.find((f) => f.slug === slug);
}
