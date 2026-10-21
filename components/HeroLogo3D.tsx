"use client";

/* Logo 3D do hero, presa ao scroll.

   No topo da página o adesivo fica grande e centrado. Conforme a pessoa
   rola, ele encolhe e sobe até encaixar no lugar da logo do header — e aí o
   header assume, com o macaco ao lado do nome STREET FEST 019 (regra do
   projeto: no header o macaco nunca aparece sozinho).

   Nada de arrastar nem orbitar: o único controle é a rolagem.

   Três motivos levam ao fallback estático, e em todos ele é o mesmo PNG que
   o resto do site já usa:
     - prefers-reduced-motion
     - aparelho fraco (poucos núcleos, pouca memória ou tela estreita)
     - WebGL indisponível ou que falha ao criar contexto

   O bloco 3D inteiro entra por import dinâmico, então three/fiber/drei não
   encostam no bundle da primeira pintura. */

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

/* O useGLTF busca o caminho cru, sem passar pelo basePath — mesmo buraco que
   o next/image tem com loader custom. No GitHub Pages o site vive em
   /streetfest019/, então o prefixo entra aqui à mão. */
const GLB = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/3d/street-fest-logo.glb";

/* onde o adesivo termina: o lockup do header, medido do próprio header */
const DESTINO_PADRAO = { x: 74, y: 78, lado: 48 };

const Palco = dynamic(() => import("./HeroLogo3DPalco"), {
  ssr: false,
  loading: () => <Estatica />,
});

function Estatica() {
  return (
    <Image
      src="/macaco.png"
      alt="Street Fest 019"
      width={815}
      height={668}
      priority
      className="hero-logo-img"
    />
  );
}

function suportaWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function aparelhoFraco() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  if ((nav.hardwareConcurrency ?? 8) <= 4) return true;
  if ((nav.deviceMemory ?? 8) <= 4) return true;
  /* numa tela estreita a logo some atrás do dedo e o custo não compensa */
  return window.matchMedia("(max-width: 640px)").matches;
}

/* Se o WebGL morrer em tempo de execução, ou o .glb não chegar, o hero não
   pode sumir junto: a barreira troca o palco pela imagem estática. */
class Barreira extends Component<{ children: ReactNode }, { caiu: boolean }> {
  state = { caiu: false };
  static getDerivedStateFromError() {
    return { caiu: true };
  }
  render() {
    return this.state.caiu ? <Estatica /> : this.props.children;
  }
}

export default function HeroLogo3D() {
  const [modo, setModo] = useState<"carregando" | "tresD" | "estatica">("carregando");
  const caixa = useRef<HTMLDivElement>(null);
  const [destino, setDestino] = useState(DESTINO_PADRAO);

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setModo(reduzir || aparelhoFraco() || !suportaWebGL() ? "estatica" : "tresD");
  }, []);

  /* O alvo é a logo real do header, não um palpite: assim o encaixe segue
     certo se o header mudar de altura ou de padding. */
  useEffect(() => {
    if (modo !== "tresD") return;
    const medir = () => {
      const alvo = document.querySelector<HTMLElement>("header .lockup img");
      if (!alvo) return;
      const r = alvo.getBoundingClientRect();
      setDestino({ x: r.left + r.width / 2, y: r.top + r.height / 2, lado: r.width });
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [modo]);

  return (
    <div className="hero-logo" ref={caixa}>
      {modo === "tresD" ? (
        <Barreira>
          <Palco glb={GLB} destino={destino} caixa={caixa} />
        </Barreira>
      ) : (
        <Estatica />
      )}
    </div>
  );
}
