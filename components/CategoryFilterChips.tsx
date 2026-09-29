"use client";

import type { CSSProperties } from "react";
import { pilares } from "@/data/pilares";

const escuros = ["var(--vermelho)", "var(--verde)", "var(--roxo)"];

/* Multi-seleção; lista vazia = "Todas" (padrão). */
export default function CategoryFilterChips({
  selecionadas,
  onChange,
}: {
  selecionadas: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(slug: string) {
    onChange(
      selecionadas.includes(slug)
        ? selecionadas.filter((s) => s !== slug)
        : [...selecionadas, slug]
    );
  }

  return (
    <div className="chips">
      <button
        type="button"
        className={"chip" + (selecionadas.length === 0 ? " on" : "")}
        onClick={() => onChange([])}
      >
        Todas
      </button>
      {pilares.map((p) => (
        <button
          key={p.slug}
          type="button"
          className={
            "chip" +
            (selecionadas.includes(p.slug) ? " on" : "") +
            (escuros.includes(p.cor) ? " fill-escuro" : "")
          }
          style={{ "--p": p.cor } as CSSProperties}
          onClick={() => toggle(p.slug)}
        >
          {p.nome}
        </button>
      ))}
    </div>
  );
}
