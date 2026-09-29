"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { Pessoa } from "@/data/equipe";

function iniciais(nome: string) {
  return nome
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

/* Card colecionável do line-up (mural.md, item 2): a frente é a mesma do mockup,
   o verso gira para mostrar bio e redes. Gira no hover, no foco e no clique —
   o clique é o que faz funcionar no toque e no teclado. */
export default function PessoaCard({ pessoa, index }: { pessoa: Pessoa; index: number }) {
  const [virado, setVirado] = useState(false);
  const temVerso = Boolean(pessoa.bio || pessoa.instagram || pessoa.linkedin);

  return (
    <div className="pessoa" data-reveal>
      <div
        className={"card3d" + (virado ? " virado" : "") + (temVerso ? "" : " sem-verso")}
        role={temVerso ? "button" : undefined}
        tabIndex={temVerso ? 0 : undefined}
        aria-pressed={temVerso ? virado : undefined}
        aria-label={temVerso ? `Ver bio de ${pessoa.nome}` : undefined}
        onClick={() => temVerso && setVirado((v) => !v)}
        onKeyDown={(e) => {
          if (!temVerso) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setVirado((v) => !v);
          }
        }}
      >
        <div className="card3d-in">
          <div className="card3d-face gblock">
            <span
              className="blob"
              style={
                { background: pessoa.cor, animationDelay: -(index * 1.7) + "s" } as CSSProperties
              }
            />
            {pessoa.foto ? (
              <Image className="foto-img" src={pessoa.foto} alt={pessoa.nome} fill sizes="33vw" />
            ) : (
              <>
                <Image className="mark" src="/logo.jpg" alt="" width={400} height={400} />
                <span className="ini">{iniciais(pessoa.nome)}</span>
              </>
            )}
            {temVerso && <span className="card3d-dica">girar</span>}
          </div>

          <div className="card3d-face card3d-verso" style={{ "--p": pessoa.cor } as CSSProperties}>
            <b>{pessoa.nome}</b>
            {pessoa.bio && <p>{pessoa.bio}</p>}
            <span className="card3d-redes">
              {pessoa.instagram && (
                <a
                  href={"https://instagram.com/" + pessoa.instagram.replace(/^@/, "")}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  Instagram
                </a>
              )}
              {pessoa.linkedin && (
                <a
                  href={pessoa.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  LinkedIn
                </a>
              )}
            </span>
          </div>
        </div>
      </div>
      <b>{pessoa.nome}</b>
      <span>{pessoa.funcao}</span>
    </div>
  );
}
