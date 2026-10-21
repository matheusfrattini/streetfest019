"use client";

/* Modelo 1 — as 10 linguagens, cada card abrindo uma mini-página em modal.

   O site é export estático, e Intercepting Routes não funcionam com
   output:"export". Então o modal é estado de cliente espelhado na query
   ?frente=<slug> via history.pushState: o link é compartilhável e o botão
   voltar do navegador fecha o pop-up, sem o Next trocar de rota.

   Acessibilidade: role="dialog", aria-modal, foco preso, Esc, clique fora,
   scroll do fundo travado e foco devolvido ao card que abriu. */

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { frentePorSlug, type Frente } from "@/data/frentes";

const PARAM = "frente";

export default function FrentesLinguagens({ frentes }: { frentes: Frente[] }) {
  const [aberta, setAberta] = useState<Frente | null>(null);
  const gatilho = useRef<HTMLButtonElement | null>(null);
  /* onde cada card está, para devolver o foco quando o modal fecha */
  const cards = useRef(new Map<string, HTMLButtonElement>());

  /* Abre pelo link direto e responde ao voltar/avançar do navegador. */
  useEffect(() => {
    const daUrl = () => {
      const slug = new URLSearchParams(window.location.search).get(PARAM);
      setAberta(slug ? frentePorSlug(slug) ?? null : null);
    };
    daUrl();
    window.addEventListener("popstate", daUrl);
    return () => window.removeEventListener("popstate", daUrl);
  }, []);

  function abrir(f: Frente, el: HTMLButtonElement) {
    gatilho.current = el;
    setAberta(f);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, f.slug);
    window.history.pushState({ [PARAM]: f.slug }, "", url);
  }

  const fechar = useCallback(() => {
    setAberta(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has(PARAM)) {
      url.searchParams.delete(PARAM);
      window.history.pushState({}, "", url);
    }
    gatilho.current?.focus();
  }, []);

  return (
    <>
      <ul className="lng-grade">
        {frentes.map((f, i) => (
          <li key={f.slug} data-reveal>
            <button
              type="button"
              className="lng-card"
              style={{ "--p": f.cor } as CSSProperties}
              aria-label={`Abrir ${f.nome}`}
              ref={(el) => {
                if (el) cards.current.set(f.slug, el);
              }}
              onClick={(e) => abrir(f, e.currentTarget)}
            >
              <span className="lng-moldura">
                <Image
                  src={f.capa.src}
                  alt={f.capa.alt}
                  width={f.capa.largura}
                  height={f.capa.altura}
                  sizes="(max-width:540px) 50vw, (max-width:900px) 33vw, 20vw"
                  /* os 4 primeiros cards ficam acima da dobra no desktop */
                  loading={i < 4 ? "eager" : "lazy"}
                  priority={i < 2}
                  className="lng-img"
                />
                <span className="lng-tinta" aria-hidden="true" />
              </span>
              <b>{f.nome}</b>
              <span className="lng-ver">ver</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {aberta && (
          <Modal
            key={aberta.slug}
            f={aberta}
            onFechar={fechar}
            devolveFoco={() => cards.current.get(aberta.slug)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Modal({
  f,
  onFechar,
  devolveFoco,
}: {
  f: Frente;
  onFechar: () => void;
  devolveFoco: () => HTMLButtonElement | undefined;
}) {
  const reduzir = useReducedMotion();
  const fecharRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fecharRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onFechar();
        return;
      }
      if (e.key !== "Tab" || !painelRef.current) return;
      const f = painelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      if (f.length === 0) return;
      const primeiro = f[0];
      const ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      devolveFoco()?.focus();
    };
  }, [onFechar, devolveFoco]);

  const pendente = !f.resumo && !f.comoETrabalhada && !f.oQueFoiFeito && f.eventosRealizados.length === 0;

  const conteudo = (
    <motion.div
      className="lng-fundo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onFechar}
    >
      <motion.div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`lng-${f.slug}-nome`}
        className="lng-modal"
        style={{ "--p": f.cor } as CSSProperties}
        onClick={(e) => e.stopPropagation()}
        initial={reduzir ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduzir ? { opacity: 0 } : { y: 48, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={fecharRef} type="button" className="lng-fechar" aria-label="Fechar" onClick={onFechar}>
          ×
        </button>

        <header className="lng-cab">
          <p className="lng-kicker">Linguagem</p>
          <h3 id={`lng-${f.slug}-nome`}>{f.nome}</h3>
          {f.resumo && <p className="lng-resumo">{f.resumo}</p>}
        </header>

        <div className="lng-corpo">
          <Secao titulo="Como é trabalhada">
            {f.comoETrabalhada ?? <Pendente campo="como é trabalhada" />}
          </Secao>

          <Secao titulo="Eventos realizados">
            {f.eventosRealizados.length > 0 ? (
              <ul className="lng-eventos">
                {f.eventosRealizados.map((e) => (
                  <li key={e.nome}>
                    <b>{e.nome}</b>
                    <span>
                      {e.data} · {e.local}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <Pendente campo="lista de eventos" />
            )}
          </Secao>

          <Secao titulo="O que foi feito">
            {f.oQueFoiFeito ?? <Pendente campo="o que foi feito" />}
            <div className="lng-galeria">
              {f.fotos.map((foto) => (
                <figure key={foto.src}>
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.largura}
                    height={foto.altura}
                    sizes="(max-width:900px) 92vw, 44vw"
                    loading="lazy"
                  />
                  <figcaption>{foto.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Secao>

          {pendente && (
            <p className="pend lng-pend">
              TODO organizadores — falta o texto desta linguagem: resumo, como é trabalhada,
              eventos realizados e o que foi feito.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* portal no body: dentro da seção o .wrap (z-index:1) prenderia o modal */
  return typeof document === "undefined" ? conteudo : createPortal(conteudo, document.body);
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="lng-secao">
      <h4>{titulo}</h4>
      {children}
    </section>
  );
}

function Pendente({ campo }: { campo: string }) {
  return <p className="lng-todo">TODO organizadores · {campo}</p>;
}
