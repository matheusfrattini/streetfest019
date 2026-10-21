import type { Metadata } from "next";
import type { CSSProperties } from "react";
import FrentesLinguagens from "@/components/FrentesLinguagens";
import Titulo from "@/components/Titulo";
import { frentes } from "@/data/frentes";

export const metadata: Metadata = {
  title: "Eventos — Street Fest 019",
};

export default function EventosPage() {
  return (
    <>
      {/* Mapa: o bairro.js entra aqui quando o runtime HL estiver disponível.
          Até lá o espaço fica reservado e marcado, sem placeholder falso. */}
      <section id="mapa" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Mapa
          </p>
          <Titulo>Onde a rua virou nossa</Titulo>
          <p className="pend" data-reveal>
            Mapa das 15 quadras (bairro.js) entra aqui — pendente do runtime HL/hairline.
          </p>
        </div>
      </section>

      <section id="frentes" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Linguagens
          </p>
          <Titulo>Dez jeitos de ocupar a rua</Titulo>
          <FrentesLinguagens frentes={frentes} />
        </div>
      </section>
    </>
  );
}
