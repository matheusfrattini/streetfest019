"use client";

import { useEffect, useRef, useState } from "react";
import CategoryFilterChips from "./CategoryFilterChips";
import EventPreviewCard from "./EventPreviewCard";
import { observarReveal } from "./RevealOnScroll";
import { ehFuturo, type Evento } from "@/data/eventos";

type Aba = "proximos" | "realizados";

export default function EventsTabs({ eventos }: { eventos: Evento[] }) {
  const [aba, setAba] = useState<Aba>("proximos");
  const [categorias, setCategorias] = useState<string[]>([]);
  const grade = useRef<HTMLDivElement>(null);

  /* Próximos: data mais próxima primeiro. Realizados: mais recente primeiro. */
  const agora = new Date();
  const lista = eventos
    .filter((e) => (aba === "proximos" ? ehFuturo(e, new Date(agora)) : !ehFuturo(e, new Date(agora))))
    .filter((e) => categorias.length === 0 || e.categorias.some((c) => categorias.includes(c)))
    .sort((a, b) =>
      aba === "proximos"
        ? +new Date(a.data) - +new Date(b.data)
        : +new Date(b.data) - +new Date(a.data)
    );

  /* Os cards trocam sem mudar de rota: reaplica o reveal nos que acabaram de entrar. */
  useEffect(() => {
    if (!grade.current) return;
    return observarReveal(grade.current);
  }, [aba, categorias]);

  return (
    <div className="ev-hub">
      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={aba === "proximos"}
          className={"tab" + (aba === "proximos" ? " on" : "")}
          onClick={() => setAba("proximos")}
        >
          Próximos
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={aba === "realizados"}
          className={"tab" + (aba === "realizados" ? " on" : "")}
          onClick={() => setAba("realizados")}
        >
          Realizados
        </button>
      </div>

      <CategoryFilterChips selecionadas={categorias} onChange={setCategorias} />

      <div className="ev-grid" ref={grade}>
        {lista.map((evento, i) => (
          <EventPreviewCard key={evento.slug} evento={evento} index={i} />
        ))}
      </div>

      {lista.length === 0 && <p className="ev-vazio">Acompanhe nossa agenda</p>}
    </div>
  );
}
