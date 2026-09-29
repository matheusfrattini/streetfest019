"use client";

import { useEffect, useRef } from "react";

/* "Wall Spraying" (mural.md, item 2): conforme a seção atravessa a viewport, a
   rolagem vai aplicando tinta de spray no fundo — traço acumulado, nunca apagado,
   como uma parede que vai sendo pichada. A tinta só avança (guardamos o pico da
   rolagem) para não "despichar" quando o usuário sobe a página.

   Sem dependência externa: canvas 2D, um rAF por frame de scroll, e desligado
   inteiro em prefers-reduced-motion. */

const PALETA = ["#E42313", "#FEB101", "#006A54", "#6F26A9"];

type Traco = { x: number; y: number; r: number; c: string };

export default function SprayScroll({
  cor,
  densidade = 1,
}: {
  /* cor única; sem ela usa a paleta do projeto alternando */
  cor?: string;
  /* multiplicador de quanta tinta sai por passo de rolagem */
  densidade?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const secao = cv.parentElement;
    if (!secao) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    /* `cor` pode vir como var(--vermelho): o canvas não resolve custom property,
       então lemos o valor computado uma vez. */
    const tinta = (() => {
      if (!cor) return null;
      const m = cor.match(/var\((--[\w-]+)\)/);
      if (!m) return cor;
      return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || null;
    })();

    let W = 0;
    let H = 0;
    let pico = 0;
    let raf = 0;
    let pendente = false;
    /* traçado determinístico: o mesmo scroll sempre gera a mesma pichação */
    let semente = 1;
    function rnd() {
      semente = (semente * 1664525 + 1013904223) % 4294967296;
      return semente / 4294967296;
    }

    function redimensionar() {
      const r = secao!.getBoundingClientRect();
      W = cv!.width = Math.floor(r.width);
      H = cv!.height = Math.floor(r.height);
      ctx!.clearRect(0, 0, W, H);
      pico = 0;
      semente = 1;
    }

    /* Um "jato": nuvem de pontos em volta de um centro, com queda de densidade
       nas bordas — o que dá a granulação típica da lata. */
    function jato({ x, y, r, c }: Traco) {
      const pontos = Math.floor(26 * densidade);
      ctx!.fillStyle = c;
      for (let i = 0; i < pontos; i++) {
        const ang = rnd() * Math.PI * 2;
        const d = Math.pow(rnd(), 0.6) * r;
        ctx!.globalAlpha = 0.05 + rnd() * 0.12;
        const s = 1 + rnd() * 2.2;
        ctx!.fillRect(x + Math.cos(ang) * d, y + Math.sin(ang) * d, s, s);
      }
      ctx!.globalAlpha = 1;
    }

    function pintar() {
      pendente = false;
      const r = secao!.getBoundingClientRect();
      const alturaJanela = window.innerHeight;
      /* 0 quando a seção entra pela base, 1 quando sai pelo topo */
      const bruto = (alturaJanela - r.top) / (alturaJanela + r.height);
      const p = Math.max(0, Math.min(1, bruto));
      if (p <= pico) return;

      /* pinta todos os passos entre o pico antigo e o novo, para não falhar
         traço em rolagem rápida ou em pulo de âncora */
      const PASSO = 0.012;
      for (let q = pico + PASSO; q <= p; q += PASSO) {
        const t = q * Math.PI * 3.2;
        jato({
          x: (0.5 + Math.sin(t) * 0.42 + (rnd() - 0.5) * 0.12) * W,
          y: q * H,
          r: 26 + rnd() * 46,
          c: tinta ?? PALETA[Math.floor(q * 7) % PALETA.length],
        });
      }
      pico = p;
    }

    function agendar() {
      if (pendente) return;
      pendente = true;
      raf = requestAnimationFrame(pintar);
    }

    redimensionar();
    agendar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", redimensionar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", redimensionar);
    };
  }, [cor, densidade]);

  return <canvas className="spray" ref={ref} aria-hidden="true" />;
}
