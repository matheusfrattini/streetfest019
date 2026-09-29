"use client";

import { useEffect, useRef, useState } from "react";
import Foto from "./Foto";
import type { Marco } from "@/data/linhaDoTempo";

/* Linha do tempo com a coluna do ano presa na tela enquanto os marcos rolam.

   A fixação é position:sticky puro — sem travar o scroll da página, que é o
   que costuma quebrar em celular e em leitor de tela. O que o JS faz é só
   trocar qual marco está ativo, via IntersectionObserver, para o ano grande e
   a barra de progresso acompanharem.

   Com prefers-reduced-motion, o ano não faz a transição de troca e a barra
   não anima — a informação continua toda lá. */
export default function LinhaDoTempo({ marcos }: { marcos: Marco[] }) {
  const [ativo, setAtivo] = useState(0);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const alvos = itens.current.filter(Boolean) as HTMLLIElement[];
    if (alvos.length === 0) return;

    /* a faixa de leitura é o meio da tela: o marco que cruza essa linha manda */
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = alvos.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setAtivo(i);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    alvos.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [marcos.length]);

  const marco = marcos[ativo];
  const progresso = marcos.length > 1 ? (ativo / (marcos.length - 1)) * 100 : 100;

  return (
    <div className="ldt">
      <div className="ldt-preso">
        <div className="ldt-preso-in">
          <span className="ldt-ano" key={marco.ano} aria-hidden="true">
            {marco.ano}
          </span>
          <span className="ldt-periodo">{marco.periodo}</span>
          <span className="ldt-barra" aria-hidden="true">
            <i style={{ "--w": progresso + "%" } as React.CSSProperties} />
          </span>
          <span className="ldt-conta">
            {ativo + 1} / {marcos.length}
          </span>
        </div>
      </div>

      <ol className="ldt-lista">
        {marcos.map((m, i) => (
          <li
            key={m.slug}
            id={"marco-" + m.slug}
            ref={(el) => {
              itens.current[i] = el;
            }}
            className={"ldt-item" + (i === ativo ? " ativo" : "")}
          >
            <div className="ldt-cabeca">
              <span className="ldt-ponto" aria-hidden="true" />
              <span className="ldt-item-ano">{m.periodo}</span>
            </div>
            <h3>{m.titulo}</h3>
            <p>{m.descricao}</p>
            <Foto
              src={m.foto}
              alt={m.titulo}
              cor="var(--roxo)"
              index={i}
              className="ldt-ph"
              lambe
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
