import type { CSSProperties } from "react";
import type { Pilar } from "@/data/pilares";

const escuros = ["var(--vermelho)", "var(--verde)", "var(--roxo)"];

export default function PilarCard({ pilar }: { pilar: Pilar }) {
  return (
    <div
      id={"pilar-" + pilar.slug}
      className={"pilar" + (escuros.includes(pilar.cor) ? " fill-escuro" : "")}
      data-reveal
      style={{ "--p": pilar.cor } as CSSProperties}
      tabIndex={0}
    >
      <b>{pilar.nome}</b>
      <span>{pilar.descricao}</span>
    </div>
  );
}
