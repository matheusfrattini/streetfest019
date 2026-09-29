"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Foto from "./Foto";

/* Galeria do evento com lightbox: só as posições que já têm foto abrem.
   Setas, Esc e clique no fundo fecham/navegam; o foco volta para a grade. */
export default function Galeria({
  fotos,
  cor,
  titulo,
}: {
  fotos: (string | null)[];
  cor: string;
  titulo: string;
}) {
  const [aberta, setAberta] = useState<number | null>(null);
  const comFoto = fotos.map((f, i) => (f ? i : -1)).filter((i) => i >= 0);

  const mover = useCallback(
    (passo: number) => {
      setAberta((atual) => {
        if (atual === null || comFoto.length === 0) return atual;
        const pos = comFoto.indexOf(atual);
        return comFoto[(pos + passo + comFoto.length) % comFoto.length];
      });
    },
    [comFoto]
  );

  useEffect(() => {
    if (aberta === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAberta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    }
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [aberta, mover]);

  return (
    <>
      <div className="ev-galeria">
        {fotos.map((src, i) =>
          src ? (
            <button
              key={i}
              type="button"
              className="ev-gal-btn"
              onClick={() => setAberta(i)}
              aria-label={`Abrir foto ${i + 1} de ${titulo}`}
            >
              <Foto
                src={src}
                alt={`${titulo} — foto ${i + 1}`}
                cor={cor}
                index={i}
                className="ev-gal-ph"
              />
              <span className="ev-gal-lupa" aria-hidden="true" />
            </button>
          ) : (
            <Foto key={i} src={null} alt="" cor={cor} index={i} className="ev-gal-ph" />
          )
        )}
      </div>

      {aberta !== null && fotos[aberta] && (
        <div
          className="lbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${titulo} — foto ${aberta + 1}`}
          onClick={() => setAberta(null)}
        >
          <div className="lbox-palco" onClick={(e) => e.stopPropagation()}>
            <Image
              src={fotos[aberta] as string}
              alt={`${titulo} — foto ${aberta + 1}`}
              fill
              sizes="90vw"
              className="lbox-img"
            />
          </div>
          <button type="button" className="lbox-fechar" onClick={() => setAberta(null)}>
            fechar
          </button>
          {comFoto.length > 1 && (
            <>
              <button
                type="button"
                className="lbox-nav lbox-ant"
                aria-label="Foto anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
              >
                ←
              </button>
              <button
                type="button"
                className="lbox-nav lbox-prox"
                aria-label="Próxima foto"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
