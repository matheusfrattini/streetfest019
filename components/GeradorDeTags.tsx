"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Gerador de Tags/Stickers (mural.md, item 3): mini-tool para a pessoa assinar
   o próprio nome em estilo grafite e levar o sticker embora.

   Tudo em canvas 2D, sem dependência externa. As fontes vêm do next/font e são
   lidas pelas custom properties (--font-anton etc.) porque o canvas não resolve
   var(): precisa do nome real da família que o next gerou. */

const LARGURA = 1200;
const ALTURA = 800;
const MAX_CHARS = 14;

type Estilo = { id: string; nome: string; varFonte: string; peso: string; contorno: number };

const ESTILOS: Estilo[] = [
  { id: "throwup", nome: "Throw-up", varFonte: "--font-anton", peso: "400", contorno: 16 },
  { id: "marker", nome: "Marcador", varFonte: "--font-marker", peso: "400", contorno: 10 },
  { id: "spray", nome: "Spray", varFonte: "--font-spray", peso: "400", contorno: 0 },
  { id: "bubble", nome: "Bubble", varFonte: "--font-bungee", peso: "400", contorno: 20 },
];

const CORES = [
  { nome: "Vermelho", hex: "#E42313" },
  { nome: "Amarelo", hex: "#FEB101" },
  { nome: "Verde", hex: "#006A54" },
  { nome: "Roxo", hex: "#6F26A9" },
  { nome: "Off-white", hex: "#F8EFE8" },
];

const FUNDOS = [
  { id: "muro", nome: "Muro" },
  { id: "carvao", nome: "Carvão" },
  { id: "transparente", nome: "Transparente" },
];

/* PRNG por semente: a mesma tag gera sempre o mesmo respingo, então o preview
   não "treme" a cada tecla digitada. */
function prng(semente: number) {
  let s = semente || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function semeDe(txt: string) {
  let h = 7;
  for (let i = 0; i < txt.length; i++) h = (h * 31 + txt.charCodeAt(i)) % 4294967296;
  return h;
}

export default function GeradorDeTags() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [texto, setTexto] = useState("019");
  const [estilo, setEstilo] = useState(ESTILOS[0].id);
  const [cor, setCor] = useState(CORES[0].hex);
  const [fundo, setFundo] = useState(FUNDOS[0].id);
  const [pingos, setPingos] = useState(true);
  const [respingo, setRespingo] = useState(true);
  const [fontesProntas, setFontesProntas] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  /* Sem esperar o webfont, o canvas desenha com a fonte de fallback e o
     resultado sai errado — o primeiro desenho tem que vir depois do load. */
  useEffect(() => {
    let vivo = true;
    const familias = ESTILOS.map((e) =>
      getComputedStyle(document.documentElement).getPropertyValue(e.varFonte).trim()
    ).filter(Boolean);
    Promise.all(familias.map((f) => document.fonts.load(`120px ${f}`).catch(() => null)))
      .then(() => document.fonts.ready)
      .then(() => vivo && setFontesProntas(true));
    return () => {
      vivo = false;
    };
  }, []);

  const desenhar = useCallback(() => {
    const el = cv.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const est = ESTILOS.find((e) => e.id === estilo) ?? ESTILOS[0];
    const familia =
      getComputedStyle(document.documentElement).getPropertyValue(est.varFonte).trim() ||
      "sans-serif";
    const tag = (texto || "019").toUpperCase();
    const rnd = prng(semeDe(tag + estilo + cor));

    ctx.clearRect(0, 0, LARGURA, ALTURA);

    /* ---- fundo ---- */
    if (fundo === "carvao") {
      ctx.fillStyle = "#171313";
      ctx.fillRect(0, 0, LARGURA, ALTURA);
    } else if (fundo === "muro") {
      ctx.fillStyle = "#6E6A66";
      ctx.fillRect(0, 0, LARGURA, ALTURA);
      /* granulação de concreto */
      for (let i = 0; i < 9000; i++) {
        const t = rnd();
        ctx.fillStyle = t > 0.5 ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.07)";
        ctx.fillRect(rnd() * LARGURA, rnd() * ALTURA, 1 + rnd() * 2, 1 + rnd() * 2);
      }
      /* juntas de bloco */
      ctx.strokeStyle = "rgba(0,0,0,.16)";
      ctx.lineWidth = 3;
      for (let y = 160; y < ALTURA; y += 160) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(LARGURA, y);
        ctx.stroke();
      }
      const vinheta = ctx.createRadialGradient(
        LARGURA / 2, ALTURA / 2, ALTURA * 0.25,
        LARGURA / 2, ALTURA / 2, ALTURA * 0.85
      );
      vinheta.addColorStop(0, "rgba(0,0,0,0)");
      vinheta.addColorStop(1, "rgba(0,0,0,.42)");
      ctx.fillStyle = vinheta;
      ctx.fillRect(0, 0, LARGURA, ALTURA);
    }

    /* ---- corpo da tag ---- */
    ctx.save();
    ctx.translate(LARGURA / 2, ALTURA / 2);
    ctx.rotate((-4 * Math.PI) / 180);

    /* acha o tamanho que cabe na largura útil */
    let tam = 340;
    ctx.font = `${est.peso} ${tam}px ${familia}`;
    const util = LARGURA * 0.78;
    const larg = ctx.measureText(tag).width;
    if (larg > util) tam = Math.floor(tam * (util / larg));
    if (tam > ALTURA * 0.52) tam = Math.floor(ALTURA * 0.52);
    ctx.font = `${est.peso} ${tam}px ${familia}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const m = ctx.measureText(tag);
    const meiaLarg = m.width / 2;

    /* respingo de lata atrás do texto */
    if (respingo) {
      ctx.save();
      ctx.fillStyle = cor;
      for (let i = 0; i < 260; i++) {
        const ang = rnd() * Math.PI * 2;
        const d = Math.pow(rnd(), 0.5);
        const x = Math.cos(ang) * d * (meiaLarg + 90);
        const y = Math.sin(ang) * d * (tam * 0.72);
        ctx.globalAlpha = 0.05 + rnd() * 0.3;
        const s = 2 + rnd() * 9;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    /* pingos de tinta escorrendo, ancorados na base das letras */
    if (pingos) {
      ctx.fillStyle = cor;
      const quantos = 3 + Math.floor(rnd() * 3);
      for (let i = 0; i < quantos; i++) {
        const x = -meiaLarg + rnd() * m.width;
        const topo = tam * 0.3;
        const comp = tam * (0.22 + rnd() * 0.55);
        const esp = tam * (0.035 + rnd() * 0.03);
        ctx.beginPath();
        ctx.moveTo(x - esp, topo);
        ctx.lineTo(x + esp, topo);
        ctx.lineTo(x + esp * 0.7, topo + comp);
        ctx.arc(x, topo + comp, esp * 0.85, 0, Math.PI);
        ctx.lineTo(x - esp, topo);
        ctx.fill();
        /* gota solta abaixo do escorrido */
        ctx.beginPath();
        ctx.arc(x, topo + comp + esp * 3.2, esp * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* sombra dura deslocada — é o que dá o volume do throw-up */
    ctx.fillStyle = fundo === "muro" ? "rgba(0,0,0,.45)" : "#171313";
    ctx.fillText(tag, tam * 0.045, tam * 0.05);

    /* contorno grosso por fora e a cor por dentro */
    if (est.contorno > 0) {
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;
      ctx.strokeStyle = "#171313";
      ctx.lineWidth = (tam / 300) * est.contorno;
      ctx.strokeText(tag, 0, 0);
    }
    ctx.fillStyle = cor;
    ctx.fillText(tag, 0, 0);

    /* brilho: risco claro no topo das letras */
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = "#F8EFE8";
    ctx.lineWidth = Math.max(2, tam / 90);
    ctx.beginPath();
    ctx.moveTo(-meiaLarg * 0.72, -tam * 0.26);
    ctx.lineTo(-meiaLarg * 0.18, -tam * 0.31);
    ctx.stroke();
    ctx.restore();

    ctx.restore();

    /* ---- assinatura do projeto ---- */
    ctx.font = `600 22px ${
      getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim() ||
      "monospace"
    }`;
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = fundo === "transparente" ? "#171313" : "rgba(248,239,232,.65)";
    ctx.fillText("STREET FEST 019", LARGURA - 40, ALTURA - 36);
  }, [texto, estilo, cor, fundo, pingos, respingo]);

  useEffect(() => {
    if (!fontesProntas) return;
    desenhar();
  }, [desenhar, fontesProntas]);

  const arquivo = useCallback(
    () => `tag-${(texto || "019").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-streetfest019.png`,
    [texto]
  );

  function baixar() {
    const el = cv.current;
    if (!el) return;
    el.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = arquivo();
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function compartilhar() {
    const el = cv.current;
    if (!el) return;
    el.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], arquivo(), { type: "image/png" });
      /* navigator.share com arquivo é basicamente mobile; no desktop cai na
         área de transferência, e se nem isso existir sobra o download. */
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "Minha tag — Street Fest 019" });
          return;
        } catch {
          return; /* cancelado pela pessoa */
        }
      }
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setAviso("Tag copiada — é só colar.");
        setTimeout(() => setAviso(null), 3000);
      } catch {
        baixar();
      }
    }, "image/png");
  }

  return (
    <div className="tagger">
      <div className="tagger-tela">
        <canvas
          ref={cv}
          width={LARGURA}
          height={ALTURA}
          role="img"
          aria-label={`Prévia da tag: ${texto || "019"}`}
        />
        {!fontesProntas && <span className="tagger-carregando">carregando as latas…</span>}
      </div>

      <div className="tagger-painel">
        <label className="tagger-campo">
          <span>Sua tag</span>
          <input
            type="text"
            value={texto}
            maxLength={MAX_CHARS}
            placeholder="019"
            onChange={(e) => setTexto(e.target.value)}
          />
          <i>
            {texto.length}/{MAX_CHARS}
          </i>
        </label>

        <fieldset className="tagger-grupo">
          <legend>Estilo</legend>
          <div className="chips">
            {ESTILOS.map((e) => (
              <button
                key={e.id}
                type="button"
                className={"chip" + (estilo === e.id ? " on" : "")}
                aria-pressed={estilo === e.id}
                onClick={() => setEstilo(e.id)}
              >
                {e.nome}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="tagger-grupo">
          <legend>Cor da lata</legend>
          <div className="tagger-latas">
            {CORES.map((c) => (
              <button
                key={c.hex}
                type="button"
                className={"lata" + (cor === c.hex ? " on" : "")}
                style={{ background: c.hex }}
                aria-label={c.nome}
                aria-pressed={cor === c.hex}
                onClick={() => setCor(c.hex)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="tagger-grupo">
          <legend>Fundo</legend>
          <div className="chips">
            {FUNDOS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={"chip" + (fundo === f.id ? " on" : "")}
                aria-pressed={fundo === f.id}
                onClick={() => setFundo(f.id)}
              >
                {f.nome}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="tagger-grupo">
          <legend>Acabamento</legend>
          <div className="chips">
            <button
              type="button"
              className={"chip" + (pingos ? " on" : "")}
              aria-pressed={pingos}
              onClick={() => setPingos((v) => !v)}
            >
              Escorrido
            </button>
            <button
              type="button"
              className={"chip" + (respingo ? " on" : "")}
              aria-pressed={respingo}
              onClick={() => setRespingo((v) => !v)}
            >
              Respingo
            </button>
          </div>
        </fieldset>

        <div className="ctas tagger-acoes">
          <button type="button" className="btn btn-primary" onClick={baixar}>
            <span>Baixar PNG</span>
          </button>
          <button type="button" className="btn btn-ghost" onClick={compartilhar}>
            <span>Compartilhar</span>
          </button>
        </div>
        <p className="tagger-aviso" role="status">
          {aviso}
        </p>
      </div>
    </div>
  );
}
