import type { CSSProperties } from "react";
import Foto from "./Foto";
import Galeria from "./Galeria";
import Titulo from "./Titulo";
import { formatarData, type Evento } from "@/data/eventos";
import { pilarPorSlug } from "@/data/pilares";

export default function EventDetail({ evento, futuro }: { evento: Evento; futuro: boolean }) {
  const cats = evento.categorias.map((slug) => pilarPorSlug(slug)).filter(Boolean);
  const cor = cats[0]?.cor ?? "var(--vermelho)";
  const info = evento.infoPratica;
  const galeria = evento.galeria ?? [null, null, null];

  return (
    <>
      <section className="ev-detail" style={{ "--acc": cor } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            {futuro ? "Próximo evento" : "Evento realizado"}
          </p>
          <Titulo>{evento.titulo}</Titulo>

          <div className="ev-capa" data-reveal>
            <Foto src={evento.capa} alt={evento.titulo} cor={cor} className="ev-capa-ph" priority />
          </div>

          <dl className="ev-meta" data-reveal>
            <div>
              <dt>Data</dt>
              <dd>
                {formatarData(evento.data)}
                {evento.horario ? " · " + evento.horario : ""}
              </dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>
                {evento.local}
                {evento.endereco ? <span className="ev-endereco">{evento.endereco}</span> : null}
              </dd>
            </div>
            {cats.length > 0 && (
              <div>
                <dt>Categorias</dt>
                <dd>
                  <span className="ev-cats">
                    {cats.map((c) => (
                      <i key={c!.slug} style={{ color: c!.cor }}>
                        {c!.nome}
                      </i>
                    ))}
                  </span>
                </dd>
              </div>
            )}
          </dl>

          <p className="lede" data-reveal>
            {evento.descricao}
          </p>
        </div>
      </section>

      {futuro ? (
        <section style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
          <div className="wrap">
            <p className="label" data-reveal>
              Informações práticas
            </p>
            <dl className="ev-info" data-reveal>
              <div>
                <dt>Inscrição</dt>
                <dd>{info?.inscricao ?? "A definir"}</dd>
              </div>
              <div>
                <dt>Contato</dt>
                <dd>{info?.contato ?? "A definir"}</dd>
              </div>
              <div>
                <dt>O que levar</dt>
                <dd>{info?.oQueLevar ?? "A definir"}</dd>
              </div>
            </dl>
            <div className="ctas" style={{ marginTop: 28 }} data-reveal>
              {/* Mesmo placeholder do CTA da página Contato: destino entra quando
                  o cliente enviar e-mail/WhatsApp oficiais. */}
              <a className="btn btn-primary" href="#">
                <span>Falar com o projeto</span>
              </a>
            </div>
            <p className="pend" data-reveal>
              Pendente: e-mail e WhatsApp oficiais do projeto
            </p>
          </div>
        </section>
      ) : (
        <section style={{ "--acc": "var(--verde)" } as CSSProperties}>
          <div className="wrap">
            <p className="label" data-reveal>
              Galeria
            </p>
            <Galeria fotos={galeria} cor={cor} titulo={evento.titulo} />
            {evento.resultado && (
              <>
                <p className="label" style={{ marginTop: 48 }} data-reveal>
                  Resultado
                </p>
                <p className="lede" data-reveal>
                  {evento.resultado}
                </p>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
