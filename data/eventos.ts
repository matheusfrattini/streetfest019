export type Evento = {
  slug: string;
  titulo: string;
  /* ISO — usada para ordenar e para derivar próximo/passado. Não há campo `status`. */
  data: string;
  horario?: string;
  local: string;
  endereco?: string;
  /* slugs de data/pilares.ts */
  categorias: string[];
  /* null = sem foto do cliente ainda → placeholder .gblock (PhotoPlaceholder) */
  capa: string | null;
  descricao: string;
  /* só eventos futuros */
  infoPratica?: { inscricao?: string; contato?: string; oQueLevar?: string };
  /* só eventos passados; null em cada item = placeholder */
  galeria?: (string | null)[];
  /* opcional, só eventos passados */
  resultado?: string;
};

/* CADASTRO MANUAL: cada evento real entra aqui à mão.
   DADOS DE TESTE: os três registros abaixo usam fotos recortadas do portfólio
   (img-test/) só para validar card, capa, galeria e lightbox. Trocar pelos
   eventos e fotos reais quando o cliente enviar. */
export const eventos: Evento[] = [
  {
    slug: "plaza-sessions-2026",
    titulo: "Plaza Sessions",
    data: "2026-11-14",
    horario: "10:00",
    local: "Pista de Skate Plaza 0800",
    endereco: "Av. Guilherme Campos, 500 — Jd. Santa Genebra, Campinas/SP",
    categorias: ["skate", "rap-e-djs"],
    capa: "/fotos/skate-grind.jpg",
    descricao:
      "Session aberta na pista do Plaza 0800, com som de rua e premiação por manobra. Registro de teste — data e programação a confirmar com o projeto.",
    infoPratica: {
      inscricao: "A definir",
      contato: "A definir",
      oQueLevar: "A definir",
    },
  },
  {
    slug: "festival-a-rua-e-nois",
    titulo: "Festival A Rua É Nóis",
    data: "2026-02-07",
    horario: "14:00",
    local: "Estação Cultura",
    endereco: "Praça Marechal Floriano Peixoto, s/n — Centro, Campinas/SP",
    categorias: ["rap-e-djs", "breaking"],
    capa: "/fotos/comic-city-djs.jpg",
    descricao:
      "Festival musical que fecha o ciclo dos três pré-festivais de 2025, reunindo rap, DJs, sound system e batalhas de breaking na Estação Cultura.",
    infoPratica: {
      inscricao: "A definir",
      contato: "A definir",
      oQueLevar: "A definir",
    },
  },
  {
    slug: "seminario-skate-campinas",
    titulo: "1º Seminário Skate Campinas",
    data: "2025-08-15",
    horario: "19:00",
    local: "Auditório FEF/Unicamp",
    endereco: "Av. Érico Veríssimo, 701 — Cidade Universitária, Campinas/SP",
    categorias: ["skate"],
    capa: "/fotos/semana-skate-air.jpg",
    descricao:
      "Desafios sociais do esporte radical: mesa de debate dentro da 2ª Semana do Skate, que levou 12 atividades para a cidade em agosto de 2025.",
    galeria: [
      "/fotos/semana-skate-air.jpg",
      "/fotos/semana-skate-dupla.jpg",
      "/fotos/skate-grind.jpg",
    ],
    resultado:
      "2ª Semana do Skate com 12 atividades na cidade, incluindo o cineclube na pista do Plaza 0800.",
  },
  {
    slug: "3-seminario-campinas-games",
    titulo: "3º Seminário Campinas Games — edição Esportes",
    data: "2024-08-30",
    horario: "09:00",
    local: "Câmara Municipal de Campinas",
    endereco: "Av. Engenheiro Roberto Mange, 66 — Ponte Preta, Campinas/SP",
    categorias: ["games"],
    capa: "/fotos/campinas-games-turma.jpg",
    descricao:
      "Terceira edição do seminário, no Dia dos Games Campinas. A série de seminários resultou na criação de duas leis municipais.",
    galeria: [
      "/fotos/campinas-games-turma.jpg",
      "/fotos/street-games-dupla.jpg",
      "/fotos/street-games-controle.jpg",
      "/fotos/street-games-mesa.jpg",
    ],
    resultado:
      "Lei Municipal do Dia dos Games e Lei Municipal do Dia do Autor Geek e da Cultura Nerd.",
  },
];

export function eventoPorSlug(slug: string) {
  return eventos.find((e) => e.slug === slug);
}

export function ehFuturo(evento: Evento, agora: Date = new Date()) {
  return new Date(evento.data).getTime() >= agora.setHours(0, 0, 0, 0);
}

/* Próximos: data mais próxima primeiro. Realizados: mais recente primeiro. */
export function proximos(agora?: Date) {
  const ref = agora ?? new Date();
  return eventos
    .filter((e) => ehFuturo(e, new Date(ref)))
    .sort((a, b) => +new Date(a.data) - +new Date(b.data));
}

export function realizados(agora?: Date) {
  const ref = agora ?? new Date();
  return eventos
    .filter((e) => !ehFuturo(e, new Date(ref)))
    .sort((a, b) => +new Date(b.data) - +new Date(a.data));
}

export function formatarData(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
