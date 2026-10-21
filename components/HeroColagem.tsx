"use client";

/* Fotos soltas do hero, no idioma do portfólio impresso: giradas, com fita
   crepe. Ficam nas DUAS laterais e nenhuma invade a faixa central, que é da
   logo — as posições são todas ancoradas em left/right, nunca no meio.

   No celular a colagem some: não há largura para ela e a logo, e quem perde
   é sempre a logo. */

import Image from "next/image";
import { useEffect, useRef } from "react";

const PECAS = [
  { src: "/fotos/linguagens/skate-1.webp", alt: "Skate", cls: "p1", prof: 1 },
  { src: "/fotos/linguagens/graffiti-2.webp", alt: "Graffiti", cls: "p2", prof: 2.2 },
  { src: "/fotos/linguagens/breaking-1.webp", alt: "Breaking", cls: "p3", prof: 1.4 },
  { src: "/fotos/linguagens/basquete-2.webp", alt: "Basquete", cls: "p4", prof: 2.6 },
];

export default function HeroColagem() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("pronta");
      return;
    }
    const t = setTimeout(() => el.classList.add("pronta"), 380);

    let raf = 0;
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        el!.querySelectorAll<HTMLElement>(".peca").forEach((p) => {
          const prof = Number(p.dataset.prof ?? 1);
          p.style.setProperty("--mx", (dx * prof * -10).toFixed(1) + "px");
          p.style.setProperty("--my", (dy * prof * -10).toFixed(1) + "px");
        });
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="colagem" ref={root} aria-hidden="true">
      {PECAS.map((p) => (
        <figure key={p.cls} className={"peca " + p.cls} data-prof={p.prof}>
          <span className="fita" />
          <Image src={p.src} alt={p.alt} fill sizes="(max-width:1100px) 0px, 200px" />
        </figure>
      ))}
    </div>
  );
}
