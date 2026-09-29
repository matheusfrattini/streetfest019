import { equipe } from "./equipe";

/* Seção "Organizadores" em discos de vinil.

   O organizador principal é DJ — daí a metáfora: cada pessoa é um álbum, a
   foto é a capa e o disco sai da capa com o macaco no selo.

   Os dados não são duplicados: esta é uma projeção de data/equipe.ts, que já
   é a fonte de verdade de nome, função, cor e foto. Os campos de texto longo
   (sobre, noProjeto, antes, instagram) continuam null até os organizadores
   mandarem o conteúdo — nada aqui é escrito por nós. */
export type Organizador = {
  id: string;
  nome: string;
  /* ex.: "DJ e fundador" */
  papel?: string;
  /* capa do álbum; null = sem foto ainda → placeholder do projeto */
  foto: string | null;
  /* cor do selo do disco (token do projeto) */
  cor: string;
  /* quem é a pessoa */
  sobre?: string | null;
  /* realizações no Street Fest */
  noProjeto?: string[] | null;
  /* realizações antes do projeto */
  antes?: string[] | null;
  /* sem @ */
  instagram?: string | null;
};

function idDe(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

export const organizadores: Organizador[] = equipe.map((p) => ({
  id: idDe(p.nome),
  nome: p.nome,
  papel: p.funcao,
  foto: p.foto,
  cor: p.cor,
  sobre: p.sobre ?? null,
  noProjeto: p.noProjeto ?? null,
  antes: p.antes ?? null,
  instagram: p.instagram ?? null,
}));
