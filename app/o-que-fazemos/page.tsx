import type { Metadata } from "next";
import type { CSSProperties } from "react";
import FrentesLinguagens from "@/components/FrentesLinguagens";
import PilarCard from "@/components/PilarCard";
import Titulo from "@/components/Titulo";
import { frentes } from "@/data/frentes";
import { pilares } from "@/data/pilares";

export const metadata: Metadata = {
  title: "O Que Fazemos — Street Fest 019",
};

/* Só as seções aprovadas ficam nesta página: os pilares e as linguagens. A
   agenda foi para /eventos, junto do mapa. */
export default function OQueFazemosPage() {
  return (
    <>
      <section id="pilares" style={{ "--acc": "var(--verde)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            O que fazemos
          </p>
          <Titulo>Vivemos a cultura de rua em todas as suas formas</Titulo>
          <div className="pilares">
            {pilares.map((pilar) => (
              <PilarCard key={pilar.slug} pilar={pilar} />
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--muted)" }} data-reveal>
            Também circulam pelo projeto: histórias em quadrinhos, linguagem audiovisual, funk, rock e
            futebol de rua.
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
