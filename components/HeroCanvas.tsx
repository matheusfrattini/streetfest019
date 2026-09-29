"use client";

import { useEffect, useRef } from "react";

const cores = ["#E42313", "#FEB101", "#006A54", "#6F26A9"];

type Dot = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number };

/* Textura de partículas do hero — mesmo algoritmo do mockup. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    let raf = 0;

    function size() {
      const r = cv!.getBoundingClientRect();
      W = cv!.width = Math.floor(r.width);
      H = cv!.height = Math.floor(r.height);
      dots = [];
      const n = Math.min(70, Math.max(24, Math.floor(W / 22)));
      for (let i = 0; i < n; i++) {
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 1 + Math.random() * 2.4,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -0.12 - Math.random() * 0.28,
          c: cores[i % cores.length],
          a: 0.15 + Math.random() * 0.35,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -6) {
          d.y = H + 6;
          d.x = Math.random() * W;
        }
        if (d.x < -6) d.x = W + 6;
        if (d.x > W + 6) d.x = -6;
        ctx!.globalAlpha = d.a;
        ctx!.fillStyle = d.c;
        ctx!.fillRect(d.x, d.y, d.r * 2, d.r * 2);
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    }

    size();
    draw();
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="grain" ref={ref} aria-hidden="true" />;
}
