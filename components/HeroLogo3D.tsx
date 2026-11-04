"use client";

/* Logo 3D do hero, presa ao scroll.

   No topo da página o macaco fica centrado, acima do texto amarelo. Conforme
   a pessoa rola, ele gira, encolhe e sobe até encaixar no lugar da logo do
   header — e aí o header assume, com o macaco ao lado do nome STREET FEST 019
   (regra do projeto: no header o macaco nunca aparece sozinho).

   Nada de arrastar nem orbitar: o único controle é a rolagem.

   Três motivos levam à imagem estática, que faz o mesmo voo sem WebGL:
     - aparelho fraco (poucos núcleos, pouca memória ou tela estreita)
     - WebGL indisponível ou que falha ao criar contexto
     - prefers-reduced-motion, e aí ela fica parada no lugar

   O bloco 3D inteiro entra por import dinâmico, então three/fiber/drei não
   encostam no bundle da primeira pintura. */

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useVooDaLogo, type Destino } from "./useVooDaLogo";

/* onde o macaco termina: o lockup do header, medido do próprio header */
const DESTINO_PADRAO: Destino = { x: 74, y: 78, lado: 48 };

const Palco = dynamic(() => import("./HeroLogo3DPalco"), {
  ssr: false,
  loading: () => <Imagem />,
});

function Imagem() {
  return (
    <Image
      src="/macaco-escuro.webp"
      alt="Street Fest 019"
      width={640}
      height={528}
      priority
      className="hero-logo-img"
    />
  );
}

function Estatica({
  caixa,
  destino,
  voa,
}: {
  caixa: RefObject<HTMLDivElement>;
  destino: Destino;
  voa: boolean;
}) {
  const peca = useRef<HTMLDivElement>(null);
  useVooDaLogo({ peca, caixa, destino, girarNoCss: true, ligado: voa });
  return (
    <div className="hero-logo-palco" ref={peca}>
      <Imagem />
    </div>
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
class Barreira extends Component<{ children: ReactNode; reserva: ReactNode }, { caiu: boolean }> {
  state = { caiu: false };
  static getDerivedStateFromError() {
    return { caiu: true };
  }
  render() {
    return this.state.caiu ? this.props.reserva : this.props.children;
  }
}

export default function HeroLogo3D() {
  const [modo, setModo] = useState<"carregando" | "tresD" | "estatica" | "parada">("carregando");
  const caixa = useRef<HTMLDivElement>(null);
  const [destino, setDestino] = useState(DESTINO_PADRAO);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setModo("parada");
    else setModo(aparelhoFraco() || !suportaWebGL() ? "estatica" : "tresD");
  }, []);

  /* O alvo é a logo real do header, não um palpite: assim o encaixe segue
     certo se o header mudar de altura ou de padding. */
  useEffect(() => {
    if (modo === "carregando" || modo === "parada") return;
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
        <Barreira reserva={<Estatica caixa={caixa} destino={destino} voa />}>
          <Palco destino={destino} caixa={caixa} />
        </Barreira>
      ) : (
        <Estatica caixa={caixa} destino={destino} voa={modo === "estatica"} />
      )}
    </div>
  );
}
