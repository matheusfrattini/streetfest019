import Link from "next/link";
import Foto from "./Foto";
import type { Frente } from "@/data/frentes";

/* Só capa, nome e período — o texto completo fica na página Frentes. */
export default function ProjectShowcaseCard({
  frente,
  index,
  cor,
}: {
  frente: Frente;
  index: number;
  cor: string;
}) {
  return (
    <Link className="proj-card" href={"/frentes#" + frente.slug} data-reveal>
      <Foto
        src={frente.coverPhoto}
        alt={frente.titulo.join(" ")}
        cor={cor}
        index={index}
        className="proj-ph"
          lambe
      />
      <b>{frente.titulo.join(" ")}</b>
      <span className="per">{frente.periodo}</span>
    </Link>
  );
}
