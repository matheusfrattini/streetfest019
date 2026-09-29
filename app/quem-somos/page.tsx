import type { Metadata } from "next";
import type { CSSProperties } from "react";
import InstCard from "@/components/InstCard";
import Titulo from "@/components/Titulo";
import OrganizadoresVinil from "@/components/OrganizadoresVinil";
import SprayScroll from "@/components/SprayScroll";
import { organizadores } from "@/data/organizadores";
import { institucional } from "@/data/institucional";

export const metadata: Metadata = {
  title: "Quem Somos — Street Fest 019",
};

export default function QuemSomosPage() {
  return (
    <>
      <section id="quem" style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Quem somos
          </p>
          <div className="manifesto">
            <div>
              <Titulo>Nascemos da ausência de espaço — e viramos espaço</Titulo>
              <p className="lede" data-reveal>
                O Street Fest 019 nasceu em 20 de dezembro de 2022, em Campinas/SP, como expressão
                da luta pela criação de espaços culturais autênticos voltados às juventudes
                periféricas.
              </p>
              <p data-reveal>
                Somos um movimento que ressignifica a visão sobre a cultura de rua e a inclusão
                social por meio de ações, atividades, eventos e campanhas desenvolvidas em escolas,
                organizações da sociedade civil, praças e parques — sempre por meio da arte, do
                esporte e da educação, potencializando territórios invisibilizados em palcos de
                expressão de identidades.
              </p>
              <p data-reveal>
                Atuamos com infâncias e juventudes de 6 a 29 anos, e com as famílias que formam a
                rede em volta delas.
              </p>
            </div>
            <blockquote data-reveal>
              Acreditamos que o conhecimento nasce na vivência: na batida do hip hop, no universo do
              skate, na união das comunidades.
            </blockquote>
          </div>
        </div>
      </section>

      <section style={{ "--acc": "var(--verde)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Atuação institucional
          </p>
          <Titulo>Estruturar para mudar</Titulo>
          <div className="inst">
            {institucional.map((card) => (
              <InstCard key={card.titulo} card={card} />
            ))}
          </div>
        </div>
      </section>
      <section id="equipe" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <SprayScroll cor="var(--vermelho)" />
        <div className="wrap">
          <p className="label" data-reveal>
            Equipe
          </p>
          <Titulo>Quem faz o Street Fest</Titulo>
          <p className="lede" data-reveal>
            O organizador principal é DJ — então cada um aqui é um álbum. Clica na capa para o
            disco sair e conhecer a pessoa.
          </p>
          <OrganizadoresVinil organizadores={organizadores} titulo="Quem faz o Street Fest" />
          <p className="pend" data-reveal>
            Fotos são recortes provisórios do portfólio · pendente dos organizadores: apresentação,
            realizações e Instagram
          </p>
        </div>
      </section>
    </>
  );
}
