"use client";

/* Leitura em karaokê: o texto nasce apagado e vai acendendo palavra por
   palavra, da esquerda para a direita, como a letra no Spotify.

   Cada palavra é um span com o índice em --i; o CSS atrasa a transição de
   opacidade de cada uma por --i × --passo. O JS só liga a classe .aceso
   quando o texto entra 20% na tela, e uma vez só: um texto já lido volta
   aceso se o pop-up for aberto de novo.

   O ritmo é fixo por palavra, então o tempo total acompanha o tamanho do
   texto: 400 ms × 50 palavras dá 20 s, 60 palavras dão 24 s.

   O espaço entre as palavras é texto de verdade, não gap: copiar a bio e o
   leitor de tela continuam pegando a frase inteira. */

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

const MS_POR_PALAVRA = 400;

/* textos já lidos nesta visita */
const lidos = new Set<string>();

export default function TextoKaraoke({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [aceso, setAceso] = useState(() => lidos.has(texto));

  useEffect(() => {
    const el = ref.current;
    if (!el || lidos.has(texto)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lidos.add(texto);
      setAceso(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        lidos.add(texto);
        setAceso(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [texto]);

  const palavras = texto.split(/\s+/).filter(Boolean);

  return (
    <p
      ref={ref}
      className={[className, "karaoke", aceso && "aceso"].filter(Boolean).join(" ")}
      style={{ "--passo": `${MS_POR_PALAVRA}ms` } as CSSProperties}
    >
      {palavras.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span style={{ "--i": i } as CSSProperties}>{p}</span>
        </Fragment>
      ))}
    </p>
  );
}
