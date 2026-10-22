"use client";

/* O mapa do bairro: 15 quadras, uma por evento.

   O módulo é autocontido e mexe no DOM direto, então entra por import
   dinâmico dentro do efeito — não dá para ele rodar no servidor, e assim
   também fica fora do bundle da primeira pintura.

   O container define --hairline-plate com o mesmo fundo da seção: sem isso
   as casas saem sobre o #08090a padrão do tema dark do módulo e aparece um
   retângulo mais escuro que o resto do site. */

import { useEffect, useRef } from "react";

export default function MapaBairro({
  aoEscolher,
  aoLer,
}: {
  aoEscolher?: (n: number) => void;
  aoLer?: (texto: string) => void;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  /* os callbacks ficam em ref para o mapa não ser remontado quando o pai
     recria as funções a cada render */
  const escolher = useRef(aoEscolher);
  const ler = useRef(aoLer);
  escolher.current = aoEscolher;
  ler.current = aoLer;

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    let vivo = true;
    let mapa: { destruir: () => void } | null = null;

    import("./bairro-mapa.js").then(({ montarBairro }) => {
      if (!vivo || !caixa.current) return;
      mapa = montarBairro(caixa.current, {
        tema: "dark",
        alcance: 48,
        aoEscolher: (n: number) => escolher.current?.(n),
        aoLer: (texto: string) => ler.current?.(texto),
      });
    });

    return () => {
      vivo = false;
      mapa?.destruir();
    };
  }, []);

  return <div className="mapa-bairro" ref={caixa} />;
}
