"use client";

/* O palco WebGL do macaco. Separado do HeroLogo3D de propósito: é este
   arquivo que carrega three/fiber/drei, e ele só é importado quando o modo
   3D é aprovado — então nada disso entra no bundle da primeira pintura.

   Mesma construção do street-fest-emoji.obj: folhas empilhadas que formam a
   espessura de um adesivo. Só que aquele modelo são retângulos sem imagem, e
   era daí que vinha o cartão bege em volta do macaco. Aqui cada folha é
   recortada pela silhueta do mascote, então a espessura segue o desenho. */

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import { DoubleSide, SRGBColorSpace, type Group } from "three";
import { useVooDaLogo, type Destino } from "./useVooDaLogo";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* mesma proporção da arte (640x528) */
const LARGURA = 0.32;
const ALTURA = (LARGURA * 528) / 640;
const FOLHAS = 16;
const ESPESSURA = 0.024;

function Adesivo({ progresso }: { progresso: RefObject<number> }) {
  const [frente, silhueta] = useTexture([
    BASE + "/3d/macaco-frente.webp",
    BASE + "/3d/macaco-silhueta.webp",
  ]);
  const g = useRef<Group>(null);

  /* Sem o colorSpace explícito a textura é lida como linear e o creme
     escurece. */
  useMemo(() => {
    frente.colorSpace = SRGBColorSpace;
    silhueta.colorSpace = SRGBColorSpace;
    frente.anisotropy = 8;
    frente.needsUpdate = true;
    silhueta.needsUpdate = true;
  }, [frente, silhueta]);

  useFrame(() => {
    if (!g.current) return;
    const p = progresso.current ?? 0;
    /* um quarto de volta ao longo do percurso, nada de giro contínuo */
    g.current.rotation.y = p * Math.PI * 0.5;
    g.current.rotation.x = (1 - p) * 0.08;
  });

  return (
    <group ref={g}>
      {Array.from({ length: FOLHAS }, (_, i) => (
        <mesh key={i} position={[0, 0, -ESPESSURA / 2 + (ESPESSURA * i) / FOLHAS]}>
          <planeGeometry args={[LARGURA, ALTURA]} />
          <meshBasicMaterial map={silhueta} alphaTest={0.5} side={DoubleSide} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 0, ESPESSURA / 2]}>
        <planeGeometry args={[LARGURA, ALTURA]} />
        <meshBasicMaterial map={frente} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroLogo3DPalco({
  destino,
  caixa,
}: {
  destino: Destino;
  caixa: RefObject<HTMLDivElement>;
}) {
  const palco = useRef<HTMLDivElement>(null);
  const progresso = useRef(0);

  useVooDaLogo({ peca: palco, caixa, destino, progresso });

  return (
    <div className="hero-logo-palco" ref={palco}>
      <Canvas
        /* `flat` desliga o tone mapping ACES que o r3f liga por padrao: o
           creme da marca saia cinza. */
        flat
        camera={{ position: [0, 0, 0.42], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Adesivo progresso={progresso} />
      </Canvas>
    </div>
  );
}
