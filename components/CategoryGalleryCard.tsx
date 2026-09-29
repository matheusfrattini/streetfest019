import type { CSSProperties } from "react";
import Foto from "./Foto";
import type { Pilar } from "@/data/pilares";

/* Clique rola até o pilar correspondente no bloco 1 da mesma página
   (âncora local — não é navegação entre rotas). */
export default function CategoryGalleryCard({ pilar, index }: { pilar: Pilar; index: number }) {
  return (
    <a
      className="gal-card"
      href={"#pilar-" + pilar.slug}
      data-reveal
      style={{ "--p": pilar.cor } as CSSProperties}
    >
      <Foto
        src={pilar.coverPhoto}
        alt={pilar.nome}
        cor={pilar.cor}
        index={index}
        className="gal-ph"
          lambe
      />
      <b>{pilar.nome}</b>
    </a>
  );
}
