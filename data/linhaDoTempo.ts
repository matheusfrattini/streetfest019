import { frentes, type Frente } from "./frentes";

/* Linha do tempo das frentes. Nada é inventado aqui: ano, título, descrição e
   foto saem de data/frentes.ts, que veio do portfólio do projeto. O ano do
   marco é o início do período ("2024 — 2026" → 2024). */
export type Marco = {
  slug: string;
  ano: string;
  periodo: string;
  titulo: string;
  descricao: string;
  foto: string | null;
};

function anoInicial(periodo: string) {
  const m = periodo.match(/\d{4}/);
  return m ? m[0] : periodo;
}

export const marcos: Marco[] = [...frentes]
  .sort((a: Frente, b: Frente) => +anoInicial(a.periodo) - +anoInicial(b.periodo))
  .map((f) => ({
    slug: f.slug,
    ano: anoInicial(f.periodo),
    periodo: f.periodo,
    titulo: f.titulo.join(" "),
    descricao: f.descricao,
    foto: f.coverPhoto,
  }));
