"use client";

/**
 * Street Fest 019 — seção "Organizadores" em formato de discos de vinil.
 *
 * Capa do álbum = foto do organizador.
 * Clique → abre o painel, o disco desliza para fora da capa e gira
 * (selo com o macaco). Nome em destaque no topo do texto.
 * Só visual, sem som. Respeita "reduzir movimento" do sistema.
 *
 * Adaptado ao repositório: a estrutura e o comportamento vêm do código-base,
 * mas o estilo usa as classes semânticas .vinil-* do globals.css com os
 * tokens do projeto (--carvao, --off, --vermelho…), como os outros
 * componentes do site — nada de utilities soltas nem paleta nova.
 */

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Foto from "./Foto";
import type { Organizador } from "@/data/organizadores";

const MACACO = "/macaco.png";
/* quanto do disco sai da capa: o selo só fica inteiro visível a partir daqui */
const SAIDA = "72%";

type Props = {
  organizadores: Organizador[];
  titulo?: string;
};

export default function OrganizadoresVinil({
  organizadores,
  titulo = "Quem faz o Street Fest",
}: Props) {
  const [aberto, setAberto] = useState<Organizador | null>(null);
  const gatilho = useRef<HTMLButtonElement | null>(null);

  const fechar = useCallback(() => {
    setAberto(null);
    gatilho.current?.focus();
  }, []);

  return (
    <>
      <ul className="vinil-grade">
        {organizadores.map((o, i) => (
          <li key={o.id} data-reveal>
            <button
              type="button"
              onClick={(e) => {
                gatilho.current = e.currentTarget;
                setAberto(o);
              }}
              aria-label={`Abrir o disco de ${o.nome}`}
              className="vinil-capa-btn"
              style={{ "--p": o.cor } as CSSProperties}
            >
              <span className="vinil-album">
                {/* borda do disco espiando atrás da capa no hover */}
                <span className="vinil-borda" aria-hidden="true" />
                <Foto
                  src={o.foto}
                  alt={`Foto de ${o.nome}`}
                  cor={o.cor}
                  index={i}
                  className="vinil-capa"
                  legenda="foto pendente"
                />
              </span>
              <b>{o.nome}</b>
              {o.papel && <span>{o.papel}</span>}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {aberto && <Painel key={aberto.id} o={aberto} onFechar={fechar} titulo={titulo} />}
      </AnimatePresence>
    </>
  );
}

function Disco({ cor, girando }: { cor: string; girando: boolean }) {
  return (
    <div className={"vinil-disco" + (girando ? " girando" : "")} aria-hidden="true">
      <span className="vinil-selo" style={{ background: cor }}>
        <Image src={MACACO} alt="" width={240} height={240} />
        <i className="vinil-furo" />
      </span>
    </div>
  );
}

function Painel({
  o,
  onFechar,
  titulo,
}: {
  o: Organizador;
  onFechar: () => void;
  titulo: string;
}) {
  const reduzir = useReducedMotion();
  const [girando, setGirando] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  /* Esc fecha, trava o scroll da página, foco preso no painel */
  useEffect(() => {
    fecharRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      if (e.key === "Tab" && painelRef.current) {
        const f = painelRef.current.querySelectorAll<HTMLElement>("a[href],button");
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onFechar]);

  const semTexto = !o.sobre && !o.noProjeto?.length && !o.antes?.length && !o.instagram;

  const painel = (
    <motion.div
      className="vinil-fundo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onFechar}
    >
      <motion.div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`org-${o.id}-nome`}
        onClick={(e) => e.stopPropagation()}
        initial={reduzir ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduzir ? { opacity: 0 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="vinil-painel"
        style={{ "--p": o.cor } as CSSProperties}
      >
        <button
          ref={fecharRef}
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="vinil-fechar"
        >
          ×
        </button>

        {/* Capa + disco: em cima no celular, à esquerda no desktop */}
        <div className="vinil-palco">
          <div className="vinil-conjunto">
            <motion.div
              className="vinil-disco-wrap"
              initial={reduzir ? { x: SAIDA } : { x: "0%" }}
              animate={{ x: SAIDA }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => setGirando(!reduzir)}
            >
              <Disco cor={o.cor} girando={girando} />
            </motion.div>
            <Foto
              src={o.foto}
              alt={`Foto de ${o.nome}`}
              cor={o.cor}
              className="vinil-capa vinil-capa-painel"
              legenda="foto pendente"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="vinil-texto">
          {o.papel && <p className="vinil-papel">{o.papel}</p>}
          <h3 id={`org-${o.id}-nome`} className="vinil-nome">
            {o.nome}
          </h3>

          {o.sobre && <p className="vinil-sobre">{o.sobre}</p>}

          {o.noProjeto?.length ? <Lista titulo="No Street Fest" itens={o.noProjeto} /> : null}
          {o.antes?.length ? <Lista titulo="Antes do projeto" itens={o.antes} /> : null}

          {o.instagram && (
            <a
              href={`https://instagram.com/${o.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vinil-insta"
            >
              @{o.instagram}
            </a>
          )}

          {semTexto && (
            <p className="pend vinil-pend">
              Pendente dos organizadores: apresentação, realizações no projeto, realizações
              anteriores e Instagram — {titulo.toLowerCase()}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* Portal no body: dentro da seção, o .wrap (z-index:1) cria contexto de
     empilhamento e o painel ficaria por baixo de elementos fixos como o
     boombox. No body, o z-index do diálogo vale de verdade. */
  return typeof document === "undefined" ? painel : createPortal(painel, document.body);
}

function Lista({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div className="vinil-lista">
      <h4>{titulo}</h4>
      <ul>
        {itens.map((i) => (
          <li key={i}>
            <span aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
