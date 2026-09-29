"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ItemGaleria } from "@/data/galeria";

/* Galeria em rolagem horizontal.

   Usa a rolagem nativa da trilha com scroll-snap, em vez de sequestrar a
   rolagem vertical da página: assim o gesto de arrastar no celular, a roda do
   mouse com shift, o teclado e o leitor de tela continuam funcionando sozinhos.
   As setas são um atalho, não o único caminho.

   Com prefers-reduced-motion, o scrollTo vai sem suavização. */
export default function GaleriaHorizontal({ itens }: { itens: ItemGaleria[] }) {
  const trilha = useRef<HTMLUListElement>(null);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  const medir = useCallback(() => {
    const el = trilha.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setNoInicio(el.scrollLeft <= 2);
    setNoFim(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    medir();
    const el = trilha.current;
    if (!el) return;
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  function mover(dir: 1 | -1) {
    const el = trilha.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gh-item");
    const passo = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * passo, behavior: suave ? "smooth" : "auto" });
  }

  return (
    <div className="gh">
      <ul
        className="gh-trilha"
        ref={trilha}
        tabIndex={0}
        role="list"
        aria-label="Galeria de fotos, role para o lado"
      >
        {itens.map((it, i) => (
          <li className="gh-item" key={it.src} style={{ "--p": it.cor } as React.CSSProperties}>
            <figure>
              <span className="gh-moldura">
                <Image
                  src={it.src}
                  alt={it.legenda}
                  fill
                  sizes="(max-width:900px) 78vw, 30vw"
                  className="gh-img"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </span>
              <figcaption>
                <b>{it.legenda}</b>
                <span>{it.frente}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="gh-setas">
        <button
          type="button"
          onClick={() => mover(-1)}
          disabled={noInicio}
          aria-label="Foto anterior"
        >
          ←
        </button>
        <button type="button" onClick={() => mover(1)} disabled={noFim} aria-label="Próxima foto">
          →
        </button>
      </div>
    </div>
  );
}
