"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";
import HeroColagem from "./HeroColagem";

/* Entrada orquestrada do mockup: as 3 linhas do h1 sobem escalonadas e
   kicker/subtítulo/CTAs aparecem em seguida. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const linhas = Array.from(el.querySelectorAll<HTMLElement>("h1 .line > span"));
    const kickers = ["k1", "k2", "k3"].map((id) => el.querySelector<HTMLElement>("#" + id));

    if (reduce) {
      linhas.forEach((s) => (s.style.transform = "none"));
      kickers.forEach((k) => k && (k.style.opacity = "1"));
      return;
    }

    linhas.forEach((s, i) => {
      s.style.transition = "transform .95s cubic-bezier(.16,1,.3,1) " + (180 + i * 110) + "ms";
    });
    kickers.forEach((k, i) => {
      if (!k) return;
      const delay = i === 0 ? 60 : 520 + i * 130;
      k.style.transition =
        "opacity .8s ease " + delay + "ms, transform .8s cubic-bezier(.16,1,.3,1) " + delay + "ms";
      k.style.transform = "translateY(16px)";
    });
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        linhas.forEach((s) => (s.style.transform = "translateY(0)"));
        kickers.forEach((k) => {
          if (!k) return;
          k.style.opacity = "1";
          k.style.transform = "translateY(0)";
        });
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero" ref={root}>
      <HeroCanvas />
      <div className="glow" aria-hidden="true" />
      <HeroColagem />
      <div className="wrap">
        <p className="kicker" id="k1">
          Campinas/SP e região · desde 2022
        </p>
        <h1>
          <span className="line">
            <span>Cultura</span>
          </span>
          <span className="line">
            <span>de rua em</span>
          </span>
          <span className="line">
            <span>movimento</span>
          </span>
        </h1>
        <p className="sub" id="k2">
          Mais que evento, é movimento. Ocupamos ruas, praças e parques com skate, basquete 3x3,
          breaking, rap, graffiti e games — transformando cultura de rua em ferramenta de educação e
          inclusão.
        </p>
        <div className="ctas" id="k3">
          <Link className="btn btn-primary" href="/contato">
            <span>Some com a gente</span>
          </Link>
          <Link className="btn btn-ghost" href="/frentes#documentario">
            <span>Assista ao documentário</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
