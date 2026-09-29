import type { Metadata } from "next";
import type { CSSProperties } from "react";
import GeradorDeTags from "@/components/GeradorDeTags";
import Titulo from "@/components/Titulo";
import SprayScroll from "@/components/SprayScroll";

export const metadata: Metadata = {
  title: "Gerador de Tags — Street Fest 019",
  description:
    "Assine seu nome em estilo grafite, baixe o sticker e compartilhe. Uma mini-ferramenta do Street Fest 019.",
};

export default function TagPage() {
  return (
    <section id="tag" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
      <SprayScroll cor="var(--roxo)" densidade={0.6} />
      <div className="wrap">
        <p className="label" data-reveal>
          Gerador de tags
        </p>
        <Titulo>Assina aí</Titulo>
        <p className="lede" data-reveal>
          Escreve teu nome, escolhe a lata e leva o sticker. Dá para baixar em PNG e postar onde
          quiser — marca a gente que a gente reposta.
        </p>
        <div data-reveal>
          <GeradorDeTags />
        </div>
      </div>
    </section>
  );
}
