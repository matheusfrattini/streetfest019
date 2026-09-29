/* Galeria em rolagem horizontal da home.

   As legendas descrevem só o que está na foto e de que frente ela veio —
   tudo conferível no portfólio. As fotos são recortes provisórios dos slides
   (img-test/): trocar pelos arquivos originais quando o cliente enviar. */
export type ItemGaleria = {
  src: string;
  legenda: string;
  frente: string;
  cor: string;
};

export const galeria: ItemGaleria[] = [
  {
    src: "/fotos/breaking-freeze.jpg",
    legenda: "Freeze de breaking em piso quadriculado",
    frente: "Street Cultura de Rua",
    cor: "var(--roxo)",
  },
  {
    src: "/fotos/basquete-3x3-medalhas.jpg",
    legenda: "Time com as medalhas do 3x3 em quadra pública",
    frente: "Street Cultura de Rua",
    cor: "var(--amarelo)",
  },
  {
    src: "/fotos/skate-grind.jpg",
    legenda: "Grind no corrimão",
    frente: "Semana do Skate",
    cor: "var(--vermelho)",
  },
  {
    src: "/fotos/semana-skate-air.jpg",
    legenda: "Aéreo na pista",
    frente: "Semana do Skate",
    cor: "var(--vermelho)",
  },
  {
    src: "/fotos/semana-skate-dupla.jpg",
    legenda: "Dupla com os shapes na pista",
    frente: "Semana do Skate",
    cor: "var(--verde)",
  },
  {
    src: "/fotos/comic-city-djs.jpg",
    legenda: "DJs na Comic City",
    frente: "Comic City Music",
    cor: "var(--roxo)",
  },
  {
    src: "/fotos/comic-city-auditorio.jpg",
    legenda: "Plateia em sessão de lançamento",
    frente: "Lançamento de curta-metragem",
    cor: "var(--verde)",
  },
  {
    src: "/fotos/campinas-games-turma.jpg",
    legenda: "Turma reunida no seminário",
    frente: "Campinas Games",
    cor: "var(--amarelo)",
  },
  {
    src: "/fotos/street-games-dupla.jpg",
    legenda: "Dupla no controle",
    frente: "Street Games",
    cor: "var(--roxo)",
  },
  {
    src: "/fotos/street-games-controle.jpg",
    legenda: "Controle em jogo",
    frente: "Street Games",
    cor: "var(--vermelho)",
  },
  {
    src: "/fotos/street-games-mesa.jpg",
    legenda: "Mesa montada em equipamento cultural",
    frente: "Street Games",
    cor: "var(--verde)",
  },
];
