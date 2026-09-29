"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Parallax das fotos: a imagem dentro de .foto corre mais devagar que o bloco
   que a recorta, então a foto "respira" na rolagem. A imagem já entra com
   scale(1.18) no CSS, o que dá a folga para deslocar sem mostrar borda.

   Um único listener de scroll para a página inteira, atualizando só as fotos
   que estão na viewport. Desligado em prefers-reduced-motion. */
const AMPLITUDE = 0.08; /* fração da altura do bloco */

export default function Parallax() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alvos: HTMLElement[] = [];
    let pendente = false;
    let raf = 0;

    function coletar() {
      alvos = Array.from(document.querySelectorAll<HTMLElement>(".foto .foto-img"));
    }

    function aplicar() {
      pendente = false;
      const alturaJanela = window.innerHeight;
      for (const img of alvos) {
        const bloco = img.parentElement;
        if (!bloco) continue;
        const r = bloco.getBoundingClientRect();
        if (r.bottom < -200 || r.top > alturaJanela + 200) continue;
        /* -1 (entrando pela base) → 1 (saindo pelo topo) */
        const p = (alturaJanela / 2 - (r.top + r.height / 2)) / (alturaJanela / 2 + r.height / 2);
        img.style.transform = `translate3d(0, ${(p * AMPLITUDE * r.height).toFixed(1)}px, 0)`;
      }
    }

    function agendar() {
      if (pendente) return;
      pendente = true;
      raf = requestAnimationFrame(aplicar);
    }

    coletar();
    agendar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    /* fotos podem entrar depois (abas de eventos, filtros de categoria) */
    const mo = new MutationObserver(() => {
      coletar();
      agendar();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
