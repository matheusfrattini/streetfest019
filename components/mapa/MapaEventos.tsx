"use client";

/* O mapa mais a mini-página de cada evento.

   Mesmo padrão do modal das frentes: estado de cliente espelhado em
   ?evento=08 via history.pushState, porque Intercepting Routes do Next não
   funcionam com output:"export". O voltar do navegador fecha, o link direto
   abre, e o foco fica preso enquanto está aberto.

   Regra do clique: só abre quando o evento tem conteúdo de verdade —
   descrição, foto ou vídeo. Nome e data sozinhos não bastam. Sem isso o
   clique não faz nada e a linha de leitura avisa "em breve", para o toque
   não parecer quebrado. */

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import MapaBairro from "./MapaBairro";
import { eventoPorNumero, formatarData, temConteudo, type Evento } from "@/data/eventos";

const PARAM = "evento";

/** "evento 08" -> 8; "rua"/"rest" -> null */
function numeroDaLeitura(texto: string) {
  const m = texto.match(/evento\s+(\d+)/i);
  return m ? Number(m[1]) : null;
}

export default function MapaEventos() {
  const [aberto, setAberto] = useState<Evento | null>(null);
  const [leitura, setLeitura] = useState("rest");
  const caixa = useRef<HTMLDivElement>(null);

  /* Link direto e voltar/avançar do navegador. */
  useEffect(() => {
    const daUrl = () => {
      const n = Number(new URLSearchParams(window.location.search).get(PARAM));
      const e = Number.isFinite(n) && n > 0 ? eventoPorNumero(n) : undefined;
      setAberto(e && temConteudo(e) ? e : null);
    };
    daUrl();
    window.addEventListener("popstate", daUrl);
    return () => window.removeEventListener("popstate", daUrl);
  }, []);

  const escolher = useCallback((n: number) => {
    const e = eventoPorNumero(n);
    /* sem conteúdo o clique é inerte: a linha de leitura já explica */
    if (!e || !temConteudo(e)) return;
    setAberto(e);
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, String(n).padStart(2, "0"));
    window.history.pushState({ [PARAM]: n }, "", url);
  }, []);

  const fechar = useCallback(() => {
    setAberto(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has(PARAM)) {
      url.searchParams.delete(PARAM);
      window.history.pushState({}, "", url);
    }
    caixa.current?.focus();
  }, []);

  /* A leitura ganha " · em breve" quando a quadra sob o ponteiro não tem o
     que mostrar — é o que diferencia "ainda não tem" de "está quebrado". */
  const n = numeroDaLeitura(leitura);
  const evt = n ? eventoPorNumero(n) : undefined;
  const linha = evt && !temConteudo(evt) ? `${leitura} · em breve` : leitura;

  return (
    <div ref={caixa} tabIndex={-1}>
      <MapaBairro aoEscolher={escolher} aoLer={setLeitura} />

      <p className="mapa-leitura" role="status" aria-live="polite">
        {linha}
      </p>

      <AnimatePresence>
        {aberto && <Modal e={aberto} onFechar={fechar} key={aberto.numero} />}
      </AnimatePresence>
    </div>
  );
}

function Modal({ e, onFechar }: { e: Evento; onFechar: () => void }) {
  const reduzir = useReducedMotion();
  const fecharRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fecharRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onFechar();
        return;
      }
      if (ev.key !== "Tab" || !painelRef.current) return;
      const f = painelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      if (f.length === 0) return;
      const primeiro = f[0];
      const ultimo = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === primeiro) {
        ev.preventDefault();
        ultimo.focus();
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onFechar]);

  const rotulo = `Evento ${String(e.numero).padStart(2, "0")}`;
  /* data e local viram uma linha só, e cada metade só entra se existir */
  const quando = [e.data ? formatarData(e.data) : null, e.horario].filter(Boolean).join(" · ");
  const onde = [e.local, e.endereco].filter(Boolean).join(" — ");

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
        aria-labelledby={`evt-${e.numero}-nome`}
        className="lng-modal evt-modal"
        onClick={(ev) => ev.stopPropagation()}
        initial={reduzir ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduzir ? { opacity: 0 } : { y: 48, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={fecharRef} type="button" className="lng-fechar" aria-label="Fechar" onClick={onFechar}>
          ×
        </button>

        <header className="lng-cab">
          <p className="lng-kicker">{rotulo}</p>
          <h3 id={`evt-${e.numero}-nome`}>{e.nome ?? rotulo}</h3>
          {/* campo que não existe não vira linha vazia */}
          {quando && <p className="evt-meta">{quando}</p>}
          {onde && <p className="evt-meta">{onde}</p>}
        </header>

        <div className="lng-corpo">
          {e.descricao && <p className="lng-resumo evt-descricao">{e.descricao}</p>}

          {e.video && (
            <video className="evt-video" src={e.video} controls playsInline preload="metadata" />
          )}

          {e.fotos.length > 0 && (
            <div className="lng-galeria">
              {e.fotos.map((f) => (
                <figure key={f.src}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={f.largura}
                    height={f.altura}
                    sizes="(max-width:900px) 92vw, 44vw"
                    loading="lazy"
                  />
                  <figcaption>{f.alt}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* portal no body: dentro da seção o .wrap (z-index:1) prenderia o modal */
  return typeof document === "undefined" ? conteudo : createPortal(conteudo, document.body);
}
