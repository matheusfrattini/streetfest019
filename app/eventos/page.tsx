import type { Metadata } from "next";
import type { CSSProperties } from "react";
import EventsTabs from "@/components/EventsTabs";
import Titulo from "@/components/Titulo";
import { eventos } from "@/data/eventos";

export const metadata: Metadata = {
  title: "Eventos — Street Fest 019",
};

/* A divisão próximo/passado vem da data atual: revalida de hora em hora. */
export const revalidate = 3600;

export default function EventosPage() {
  return (
    <section id="eventos" style={{ "--acc": "var(--roxo)" } as CSSProperties}>
      <div className="wrap">
        {/* TODO: headline definitiva */}
        <p className="label" data-reveal>
          Eventos
        </p>
        <Titulo>Eventos</Titulo>
        <EventsTabs eventos={eventos} />
      </div>
    </section>
  );
}
