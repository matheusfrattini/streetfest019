import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import CategoryGalleryCard from "@/components/CategoryGalleryCard";
import Titulo from "@/components/Titulo";
import EventPreviewCard from "@/components/EventPreviewCard";
import NumStat from "@/components/NumStat";
import PilarCard from "@/components/PilarCard";
import ProjectShowcaseCard from "@/components/ProjectShowcaseCard";
import { proximos } from "@/data/eventos";
import { frentes } from "@/data/frentes";
import { impacto } from "@/data/impacto";
import { pilares } from "@/data/pilares";

export const metadata: Metadata = {
  title: "O Que Fazemos — Street Fest 019",
};

/* A divisão próximo/passado vem da data atual: revalida de hora em hora. */
export const revalidate = 3600;

export default function OQueFazemosPage() {
  const agenda = proximos().slice(0, 3);

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

      {/* 3 — Nossos Projetos */}
      <section id="projetos" style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <div className="wrap">
          {/* TODO: headline definitiva */}
          <p className="label" data-reveal>
            Nossos Projetos
          </p>
          <Titulo>Nossos Projetos</Titulo>
          <div className="projetos">
            {frentes.map((frente, i) => (
              <ProjectShowcaseCard
                key={frente.slug}
                frente={frente}
                index={i}
                cor={pilares[i % pilares.length].cor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Próximos Eventos */}
      <section id="proximos-eventos" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          {/* TODO: headline definitiva */}
          <p className="label" data-reveal>
            Próximos Eventos
          </p>
          <Titulo>Próximos Eventos</Titulo>
          {agenda.length > 0 ? (
            <>
              <div className="ev-grid">
                {agenda.map((evento, i) => (
                  <EventPreviewCard key={evento.slug} evento={evento} index={i} />
                ))}
              </div>
              <div className="ctas" style={{ marginTop: 28 }} data-reveal>
                <Link className="btn btn-ghost" href="/eventos">
                  <span>Ver todos os eventos</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="lede" data-reveal>
                Acompanhe nossa agenda
              </p>
              <div className="ctas" style={{ marginTop: 28 }} data-reveal>
                <Link className="btn btn-ghost" href="/eventos">
                  <span>Ver todos os eventos</span>
                </Link>
              </div>
            </>
          )}
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
