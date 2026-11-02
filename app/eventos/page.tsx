import type { Metadata } from "next";
import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import AgendaCalendario from "@/components/AgendaCalendario";
import Titulo from "@/components/Titulo";

/* O mapa mexe no DOM direto: nada de SSR. */
const MapaEventos = dynamic(() => import("@/components/mapa/MapaEventos"), { ssr: false });

export const metadata: Metadata = {
  title: "Eventos — Street Fest 019",
};

export default function EventosPage() {
  return (
    <>
      <section id="mapa" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Mapa
          </p>
          <Titulo>Onde a rua virou nossa</Titulo>
          <MapaEventos />
        </div>
      </section>

      <section id="agenda" style={{ "--acc": "var(--vermelho)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Agenda
          </p>
          <Titulo>Próximas datas</Titulo>
          <AgendaCalendario />
        </div>
      </section>
    </>
  );
}
