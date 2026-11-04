"use client";

import { useEffect, useRef, useState } from "react";
import { tocarBeatDaCasa, type Beat } from "./beatDaCasa";
import { faixas } from "@/data/sets";

/* Player Boombox (mural.md, item 3): som de rua fixo no canto, com os sets dos
   DJs. Enquanto os mp3 não chegam, a faixa "Beat da Casa" é sintetizada no
   Web Audio, então o aparelho já toca de verdade.

   O boombox é CSS 3D: caixa com perspectiva, alto-falantes que pulsam no ritmo
   e as bobinas da fita girando enquanto toca. */
export default function Boombox() {
  const [aberto, setAberto] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [atual, setAtual] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const ctxRef = useRef<AudioContext | null>(null);
  const beatRef = useRef<Beat | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const caixa = useRef<HTMLDivElement>(null);

  const faixa = faixas[atual];
  const tocavel = Boolean(faixa.arquivo || faixa.sintetizado);

  function pararTudo() {
    beatRef.current?.parar();
    beatRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }

  useEffect(() => pararTudo, []);

  /* A caixa desce fixa com a página até o início do rodapé e para ali: quando
     o rodapé entra na tela, ela sobe o mesmo tanto, sem nunca cobri-lo. O
     ResizeObserver cobre troca de página e imagem que muda a altura sem rolar. */
  useEffect(() => {
    const el = caixa.current;
    const rodape = document.querySelector("footer");
    if (!el || !rodape) return;

    let raf = 0;
    function aplicar() {
      raf = 0;
      const invade = Math.max(0, Math.round(window.innerHeight - rodape!.getBoundingClientRect().top));
      el!.style.transform = invade ? `translateY(${-invade}px)` : "";
      /* o painel aberto usa isto para caber no espaço que sobrou acima */
      el!.style.setProperty("--bb-sobe", `${invade}px`);
    }
    function agendar() {
      if (!raf) raf = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    const ro = new ResizeObserver(agendar);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      ro.disconnect();
    };
  }, []);

  /* Trocar de faixa com o som ligado já emenda na nova. */
  useEffect(() => {
    if (!tocando) return;
    pararTudo();
    if (!tocavel) {
      setTocando(false);
      return;
    }
    if (faixa.arquivo) {
      const a = new Audio(faixa.arquivo);
      a.volume = volume;
      a.loop = true;
      audioRef.current = a;
      a.play().catch(() => setTocando(false));
    } else {
      const ctx =
        ctxRef.current ??
        new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();
      beatRef.current = tocarBeatDaCasa(ctx, volume);
    }
    return pararTudo;
    /* volume tem o próprio efeito: não queremos reiniciar a faixa ao arrastar */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocando, atual]);

  useEffect(() => {
    beatRef.current?.setVolume(volume);
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div ref={caixa} className={"boombox" + (aberto ? " aberto" : "") + (tocando ? " tocando" : "")}>
      <button
        type="button"
        className="bb-aparelho"
        aria-expanded={aberto}
        aria-label={aberto ? "Fechar o som de rua" : "Abrir o som de rua"}
        onClick={() => setAberto((v) => !v)}
      >
        <span className="bb-alca" />
        <span className="bb-corpo">
          <span className="bb-falante bb-esq">
            <i />
          </span>
          <span className="bb-deck">
            <span className="bb-bobina" />
            <span className="bb-bobina" />
          </span>
          <span className="bb-falante bb-dir">
            <i />
          </span>
        </span>
        <span className="bb-marca">019</span>
      </button>

      <div className="bb-painel" hidden={!aberto}>
        <p className="bb-titulo">Som de rua</p>

        <ul className="bb-lista">
          {faixas.map((f, i) => {
            const podeTocar = Boolean(f.arquivo || f.sintetizado);
            return (
              <li key={f.id}>
                <button
                  type="button"
                  className={"bb-faixa" + (i === atual ? " on" : "")}
                  disabled={!podeTocar}
                  onClick={() => {
                    setAtual(i);
                    setTocando(true);
                  }}
                >
                  <b>{f.titulo}</b>
                  <span>{f.artista}</span>
                  {!podeTocar && <i>áudio pendente</i>}
                  {f.sintetizado && <i>ao vivo no navegador</i>}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="bb-controles">
          <button
            type="button"
            className="bb-play"
            disabled={!tocavel}
            aria-label={tocando ? "Pausar" : "Tocar"}
            onClick={() => setTocando((v) => !v)}
          >
            {tocando ? "❚❚" : "▶"}
          </button>
          <label className="bb-vol">
            <span>Vol</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
            />
          </label>
        </div>

        <p className="bb-nota">Sets dos DJs entram aqui quando os arquivos chegarem.</p>
      </div>
    </div>
  );
}
