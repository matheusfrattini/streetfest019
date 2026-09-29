"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Colagem do hero, no mesmo idioma visual do portfólio impresso: fotos soltas,
   levemente giradas, com fita crepe. Reagem ao mouse (paralaxe suave) e entram
   escalonadas junto com as linhas do h1.

   As fotos são recortes de baixa resolução do portfólio — servem para teste.
   Trocar por arquivos grandes quando o cliente enviar. */
const PECAS = [
  { src: "/fotos/breaking-freeze.jpg", alt: "Breaking", cls: "p1", z: 3, prof: 1 },
  { src: "/fotos/skate-grind.jpg", alt: "Skate", cls: "p2", z: 2, prof: 1.8 },
  { src: "/fotos/basquete-3x3-medalhas.jpg", alt: "Basquete 3x3", cls: "p3", z: 1, prof: 2.6 },
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
    const t = setTimeout(() => el.classList.add("pronta"), 420);

    let raf = 0;
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        el!.querySelectorAll<HTMLElement>(".peca").forEach((p) => {
          const prof = Number(p.dataset.prof ?? 1);
          p.style.setProperty("--mx", (dx * prof * -14).toFixed(1) + "px");
          p.style.setProperty("--my", (dy * prof * -14).toFixed(1) + "px");
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
        <figure key={p.cls} className={"peca " + p.cls} data-prof={p.prof} style={{ zIndex: p.z }}>
          <span className="fita" />
          <Image src={p.src} alt={p.alt} fill sizes="(max-width:1100px) 0px, 320px" />
        </figure>
      ))}
    </div>
  );
}
