import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import CategoryGalleryCard from "@/components/CategoryGalleryCard";
import Titulo from "@/components/Titulo";
import NumStat from "@/components/NumStat";
import PilarCard from "@/components/PilarCard";
import { impacto } from "@/data/impacto";
import { pilares } from "@/data/pilares";

export const metadata: Metadata = {
  title: "O Que Fazemos — Street Fest 019",
};

export default function OQueFazemosPage() {
  return (
    <>
      {/* 1 — Pilares (mockup) */}
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
            Também circulam pelo projeto: histórias em quadrinhos, linguagem audiovisual, funk, rock
            e futebol de rua.
          </p>
        </div>
      </section>

      {/* 2 — Galeria por categoria */}
      <section id="galeria" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
        <div className="wrap">
          {/* TODO: headline definitiva */}
          <p className="label" data-reveal>
            Galeria por categoria
          </p>
          <Titulo>Galeria por categoria</Titulo>
          <div className="galeria">
            {pilares.map((pilar, i) => (
              <CategoryGalleryCard key={pilar.slug} pilar={pilar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — As linguagens agora vivem em /eventos#frentes */}
      <section id="projetos" style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Linguagens
          </p>
          <Titulo>Dez jeitos de ocupar a rua</Titulo>
          <p className="lede" data-reveal>
            Skate, basquete, breaking, graffiti, DJ, MC, fotografia e audiovisual, rock, video
            games e quadrinhos — cada uma com sua própria página.
          </p>
          <div className="ctas" style={{ marginTop: 28 }} data-reveal>
            <Link className="btn btn-ghost" href="/eventos#frentes">
              <span>Ver as linguagens</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 — Agenda: pendente da lista real dos 15 eventos */}
      <section id="proximos-eventos" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Agenda
          </p>
          <Titulo>Onde a gente vai estar</Titulo>
          <div className="ctas" style={{ marginTop: 28 }} data-reveal>
            <Link className="btn btn-ghost" href="/eventos">
              <span>Ver o mapa dos eventos</span>
            </Link>
          </div>
          <p className="pend" data-reveal>
            TODO organizadores — a lista dos 15 eventos (nome, data, local, descrição) ainda não
            chegou.
          </p>
        </div>
      </section>

      {/* 5 — Impacto (mockup) */}
      <section
        id="impacto"
        className="numeros"
        style={{ "--acc": "var(--vermelho)" } as CSSProperties}
      >
        <div className="wrap">
          <p className="label" data-reveal>
            Impacto
          </p>
          <Titulo>Geramos impacto real</Titulo>
          <div className="num-grid">
            {impacto.map((numero) => (
              <NumStat key={numero.descricao} numero={numero} />
            ))}
          </div>
          <p style={{ marginTop: 36, color: "#6B615C", fontSize: 15 }} data-reveal>
            Nossas ações contribuem diretamente para o alcance de 9 Objetivos de Desenvolvimento
            Sustentável.
          </p>
        </div>
      </section>

      {/* 6 — CTA final: reaproveita o heading da página Contato */}
      <section className="final">
        <div className="wrap">
          <Titulo>Bora movimentar a rua juntos?</Titulo>
          <div className="ctas" data-reveal>
            <Link className="btn btn-primary" href="/contato">
              <span>Contato</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
