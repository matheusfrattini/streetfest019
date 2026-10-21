"use client";

/* Hero da home.

   O centro fica vazio de propósito: é onde a logo 3D entra. Em volta dela,
   só o kicker em cima, o parágrafo embaixo e as fotos soltas nas duas
   laterais — nenhuma delas passa por cima da faixa central.

   Saíram daqui o h1 "Cultura de rua em movimento" e os dois botões; o
   parágrafo é o mesmo de antes, vindo de data/home.ts. */

import { useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";
import HeroColagem from "./HeroColagem";
import HeroLogo3D from "./HeroLogo3D";
import HeroVideo from "./HeroVideo";
import { home } from "@/data/home";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  /* Entrada escalonada do kicker e do parágrafo, no mesmo tempo do mockup. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const partes = ["k1", "k2"].map((id) => el.querySelector<HTMLElement>("#" + id));

    if (reduzir) {
      partes.forEach((p) => p && (p.style.opacity = "1"));
      return;
    }
    partes.forEach((p, i) => {
      if (!p) return;
      const atraso = i === 0 ? 60 : 420;
      p.style.transition =
        "opacity .8s ease " + atraso + "ms, transform .8s cubic-bezier(.16,1,.3,1) " + atraso + "ms";
      p.style.transform = "translateY(16px)";
    });
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        partes.forEach((p) => {
          if (!p) return;
          p.style.opacity = "1";
          p.style.transform = "translateY(0)";
        });
      })
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero" ref={root}>
      <HeroVideo src={home.video.src} poster={home.video.poster} />
      <HeroCanvas />
      <div className="glow" aria-hidden="true" />
      <HeroColagem />

      <div className="wrap hero-centro">
        <p className="kicker" id="k1">
          {home.kicker}
        </p>

        <HeroLogo3D />

        <p className="hero-texto" id="k2">
          {home.texto}
        </p>

        {/* Só aparece quando o crédito oficial existir. */}
        {home.creditoApoio && <p className="hero-credito">{home.creditoApoio}</p>}
      </div>
    </section>
  );
}
