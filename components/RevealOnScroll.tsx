"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { countUp } from "./CountUp";

/* IntersectionObserver do mockup: delay escalonado pela posição entre os irmãos
   [data-reveal] (idx * 70ms, teto de 420ms) e disparo dos contadores nos .num. */
export function observarReveal(root: ParentNode): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const parent = el.parentNode as HTMLElement;
        const sibs = Array.prototype.slice.call(parent.querySelectorAll(":scope > [data-reveal]"));
        const idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
        el.classList.add("in");
        if (el.classList.contains("num")) countUp(el.querySelector(".count"), reduce);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
  );
  root.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/* Reaplicado a cada troca de rota, já que o layout persiste entre as páginas. */
export default function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => observarReveal(document), [pathname]);
  return null;
}
