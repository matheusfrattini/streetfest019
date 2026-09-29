import type { CSSProperties } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import GaleriaHorizontal from "@/components/GaleriaHorizontal";
import Marquee from "@/components/Marquee";
import Titulo from "@/components/Titulo";
import SprayScroll from "@/components/SprayScroll";
import { galeria } from "@/data/galeria";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <section style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <SprayScroll />
        <div className="wrap">
          <p className="label" data-reveal>
            Quem somos
          </p>
          <div className="manifesto">
            <div>
              <p className="lede" data-reveal>
                O Street Fest 019 nasceu em 20 de dezembro de 2022, em Campinas/SP, como expressão
                da luta pela criação de espaços culturais autênticos voltados às juventudes
                periféricas.
              </p>
              <div className="ctas" style={{ marginTop: 28 }} data-reveal>
                <Link className="btn btn-ghost" href="/quem-somos">
                  <span>Saiba mais</span>
                </Link>
              </div>
            </div>
            <blockquote data-reveal>
              Acreditamos que o conhecimento nasce na vivência: na batida do hip hop, no universo do
              skate, na união das comunidades.
            </blockquote>
          </div>
        </div>
      </section>

      <section id="na-rua" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Na rua
          </p>
          <Titulo>O que rola quando a rua é nossa</Titulo>
          <GaleriaHorizontal itens={galeria} />
        </div>
      </section>
    </>
  );
}