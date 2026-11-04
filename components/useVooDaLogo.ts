"use client";

/* O voo da logo: de onde ela está no hero até o lugar da logo do header,
   ligado à rolagem. O progresso vai de 0 no topo da página a 1 quando a logo
   encaixa, e é aplicado direto no transform, sem re-render.

   Fica fora do palco 3D de propósito: a versão em imagem usa o mesmo voo e
   não pode carregar o three junto. */

import { useEffect, type MutableRefObject, type RefObject } from "react";

export type Destino = { x: number; y: number; lado: number };

export function useVooDaLogo({
  peca,
  caixa,
  destino,
  progresso,
  girarNoCss = false,
  ligado = true,
}: {
  peca: RefObject<HTMLDivElement>;
  caixa: RefObject<HTMLDivElement>;
  destino: Destino;
  /* o palco 3D lê daqui para girar o macaco dentro do canvas */
  progresso?: MutableRefObject<number>;
  /* a imagem não tem canvas: o giro vem do próprio transform */
  girarNoCss?: boolean;
  ligado?: boolean;
}) {
  useEffect(() => {
    const el = peca.current;
    const pai = caixa.current;
    if (!el || !pai || !ligado) return;

    let raf = 0;
    let pendente = false;

    function aplicar() {
      pendente = false;
      const r = pai!.getBoundingClientRect();
      /* o percurso acaba quando a caixa inteira passou do header */
      const rolado = window.scrollY;
      const percurso = Math.max(1, r.top + rolado + r.height - destino.y);
      const p = Math.min(rolado / percurso, 1);
      if (progresso) progresso.current = p;

      const escala = 1 + (destino.lado / r.width - 1) * p;
      const dx = (destino.x - (r.left + r.width / 2)) * p;
      const dy = (destino.y - (r.top + r.height / 2)) * p;
      const giro = girarNoCss ? ` perspective(700px) rotateY(${(p * 90).toFixed(1)}deg)` : "";

      el!.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${escala.toFixed(3)})${giro}`;
      /* some nos últimos 12%, quando o header já mostra a logo de verdade */
      el!.style.opacity = p > 0.88 ? String(Math.max(0, (1 - p) / 0.12)) : "1";
    }

    function agendar() {
      if (pendente) return;
      pendente = true;
      raf = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [peca, caixa, destino, progresso, girarNoCss, ligado]);
}
