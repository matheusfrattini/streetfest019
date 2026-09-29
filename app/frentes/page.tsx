import type { Metadata } from "next";
import type { CSSProperties } from "react";
import DocVisual from "@/components/DocVisual";
import Titulo from "@/components/Titulo";
import FrenteItem from "@/components/FrenteItem";
import LinhaDoTempo from "@/components/LinhaDoTempo";
import { frentes } from "@/data/frentes";
import { marcos } from "@/data/linhaDoTempo";

export const metadata: Metadata = {
  title: "Frentes — Street Fest 019",
};

export default function FrentesPage() {
  return (
    <>
      <section id="frentes" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Frentes
          </p>
          <Titulo>Cada projeto, uma comunidade transformada</Titulo>
          <div className="frentes">
            {frentes.map((frente, i) => (
              <FrenteItem key={frente.slug} frente={frente} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="linha-do-tempo" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Linha do tempo
          </p>
          <Titulo>De 2022 até aqui</Titulo>
          <LinhaDoTempo marcos={marcos} />
        </div>
      </section>

      <section id="documentario" style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Documentário
          </p>
          <Titulo>Mais que evento, é movimento</Titulo>
          <p className="lede" data-reveal>
            Curta-metragem institucional roteirizado por Lilian de Souza e editado por Guilherme
            Roberto. Lançado no Salão Vermelho da Prefeitura de Campinas em 2024 e no Espaço Cultural
            Casa do Lago, na Unicamp, em 2025.
          </p>
          <DocVisual />
        </div>
      </section>
    </>
  );
}
