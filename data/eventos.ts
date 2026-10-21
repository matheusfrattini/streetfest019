/* Os 15 eventos — uma quadra do mapa (bairro.js) para cada.

   O `numero` é o que o mapa emite no evento `hairline:evento` quando a pessoa
   clica numa quadra, de 1 a 15. É por ele que o pop-up acha o registro.

   PENDENTE DOS ORGANIZADORES. Nos eventos 01 a 04 só entrou o que tem
   procedência conferida — cada um traz a fonte no comentário. Horário,
   endereço e descrição ficam null porque não vieram de fonte nenhuma: o que
   existia antes tinha sido escrito por nós. Os eventos 05 a 15 nascem
   vazios. A ordem 01→15 é provisória, não é a das quadras do mapa. */

export type FotoEvento = {
  src: string;
  alt: string;
  largura: number;
  altura: number;
};

export type Evento = {
  /** 1 a 15, bate com a quadra do mapa */
  numero: number;
  slug: string;
  nome: string | null;
  /** ISO, ex.: "2025-08-15" */
  data: string | null;
  horario: string | null;
  local: string | null;
  endereco: string | null;
  descricao: string | null;
  fotos: FotoEvento[];
  /** um vídeo curto por evento; nenhum existe no projeto ainda */
  video: string | null;
};

function vazio(numero: number): Evento {
  return {
    numero,
    slug: `evento-${String(numero).padStart(2, "0")}`,
    nome: null,
    data: null,
    horario: null,
    local: null,
    endereco: null,
    descricao: null,
    fotos: [],
    video: null,
  };
}

export const eventos: Evento[] = [
  {
    /* Portfólio (slide "Semana do Skate"): "Plaza Sessions, 12 de abril de
       2025, Pista de Skate Plaza 0800". */
    ...vazio(1),
    nome: "Plaza Sessions",
    data: "2025-04-12",
    local: "Pista de Skate Plaza 0800",
  },
  {
    /* Portfólio: "1º Seminário Skate Campinas, Desafios Sociais do Esporte
       Radical, 15 de agosto de 2025, Auditório FEF/Unicamp". */
    ...vazio(2),
    nome: "1º Seminário Skate Campinas",
    data: "2025-08-15",
    local: "Auditório FEF/Unicamp",
  },
  {
    /* Portfólio: "3º Seminário Campinas GAMES, edição Esportes, 30 de agosto
       de 2024, Câmara Municipal de Campinas". */
    ...vazio(3),
    nome: "3º Seminário Campinas Games — edição Esportes",
    data: "2024-08-30",
    local: "Câmara Municipal de Campinas",
  },
  {
    /* Mockup (reference/home.html), frente "Festival A Rua É Nóis": "o
       Festival Musical na Estação Cultura de Campinas em 7 de fevereiro de
       2026". */
    ...vazio(4),
    nome: "Festival A Rua É Nóis",
    data: "2026-02-07",
    local: "Estação Cultura",
  },
  ...Array.from({ length: 11 }, (_, i) => vazio(i + 5)),
];

export function eventoPorNumero(numero: number) {
  return eventos.find((e) => e.numero === numero);
}

export function eventoPorSlug(slug: string) {
  return eventos.find((e) => e.slug === slug);
}

/** rótulo seguro enquanto o nome real não chega */
export function rotuloEvento(e: Evento) {
  return e.nome ?? `Evento ${String(e.numero).padStart(2, "0")}`;
}

export function formatarData(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
