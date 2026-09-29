import Link from "next/link";
import Foto from "./Foto";
import { formatarData, type Evento } from "@/data/eventos";
import { pilarPorSlug } from "@/data/pilares";

export default function EventPreviewCard({
  evento,
  index = 0,
}: {
  evento: Evento;
  index?: number;
}) {
  const cats = evento.categorias.map((slug) => pilarPorSlug(slug)).filter(Boolean);
  const cor = cats[0]?.cor ?? "var(--vermelho)";

  return (
    <article className="ev-card" data-reveal>
      <Foto src={evento.capa} alt={evento.titulo} cor={cor} index={index} className="ev-ph"
          lambe />
      <div className="ev-body">
        <span className="ev-data">{formatarData(evento.data)}</span>
        <b>{evento.titulo}</b>
        <span className="ev-local">{evento.local}</span>
        {cats.length > 0 && (
          <span className="ev-cats">
            {cats.map((c) => (
              <i key={c!.slug} style={{ color: c!.cor }}>
                {c!.nome}
              </i>
            ))}
          </span>
        )}
        <Link className="btn btn-ghost" href={"/eventos/" + evento.slug}>
          <span>Ver evento</span>
        </Link>
      </div>
    </article>
  );
}
