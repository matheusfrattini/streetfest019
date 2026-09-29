import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";
import { ehFuturo, eventoPorSlug, eventos } from "@/data/eventos";

type Params = { params: { slug: string } };

/* A divisão próximo/passado vem da data atual: revalida de hora em hora. */
export const revalidate = 3600;

export function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const evento = eventoPorSlug(params.slug);
  return { title: (evento ? evento.titulo : "Eventos") + " — Street Fest 019" };
}

export default function EventoPage({ params }: Params) {
  const evento = eventoPorSlug(params.slug);
  if (!evento) notFound();
  return <EventDetail evento={evento} futuro={ehFuturo(evento)} />;
}
