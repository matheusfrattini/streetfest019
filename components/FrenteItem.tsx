import { Fragment } from "react";
import Foto from "./Foto";
import type { Frente } from "@/data/frentes";

/* A linha do mockup ganha a capa à esquerda quando a frente já tem foto;
   sem foto, o grid volta ao desenho original de três colunas. */
export default function FrenteItem({ frente, index = 0 }: { frente: Frente; index?: number }) {
  return (
    <article
      id={frente.slug}
      className={"frente" + (frente.coverPhoto ? " frente-com-foto" : "")}
      data-reveal
    >
      {frente.coverPhoto && (
        <Foto
          src={frente.coverPhoto}
          alt={frente.titulo.join(" ")}
          cor="var(--roxo)"
          index={index}
          className="frente-ph"
          lambe
        />
      )}
      <h3>
        {frente.titulo.map((linha, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {linha}
          </Fragment>
        ))}
      </h3>
      <p>{frente.descricao}</p>
      <span className="per">{frente.periodo}</span>
    </article>
  );
}
