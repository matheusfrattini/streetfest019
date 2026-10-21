"use client";

/* O palco WebGL do adesivo. Separado do HeroLogo3D de propósito: é este
   arquivo que carrega three/fiber/drei, e ele só é importado quando o modo
   3D é aprovado — então nada disso entra no bundle da primeira pintura.

   O progresso da rolagem (0 no topo, 1 encaixado no header) é calculado em
   pixels de tela e aplicado direto no transform do <div> que envolve o
   canvas. É mais barato que mexer na câmera e mantém o encaixe exato com a
   logo do header, que é um elemento DOM.

   Dentro do canvas o adesivo só gira um pouco em torno do próprio eixo,
   acompanhando o mesmo progresso. */

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { SRGBColorSpace, type BufferGeometry, type Group, type Mesh } from "three";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Destino = { x: number; y: number; lado: number };

function Adesivo({ glb, progresso }: { glb: string; progresso: RefObject<number> }) {
  const { scene } = useGLTF(glb);
  const face = useTexture(BASE + "/3d/street-fest-face.webp");
  const g = useRef<Group>(null);

  /* As malhas são montadas aqui em JSX, e não mutando o material do que veio
     do .glb: mutar depois do load não pegava e o adesivo continuava sendo
     desenhado com o material PBR do loader — a luz comia o creme da marca e
     ele saía cinza.

     O adesivo é um gráfico chapado, então frente e verso usam
     meshBasicMaterial, que ignora luz e entrega a cor exata. Só a borda
     responde à luz, que é o que dá relevo quando ele gira. */
  const pecas = useMemo(() => {
    const lista: { geo: BufferGeometry; mat: string }[] = [];
    scene.traverse((o) => {
      const m = o as Mesh;
      if (m.isMesh) lista.push({ geo: m.geometry, mat: (m.material as { name?: string })?.name ?? "" });
    });
    return lista;
  }, [scene]);

  /* Sem o colorSpace explícito a textura é lida como linear e o creme
     escurece. flipY:false porque o UV do glTF já vem invertido. */
  useMemo(() => {
    face.colorSpace = SRGBColorSpace;
    face.flipY = false;
    face.needsUpdate = true;
  }, [face]);

  useFrame(() => {
    if (!g.current) return;
    const p = progresso.current ?? 0;
    /* meia volta suave ao longo do percurso, nada de giro contínuo */
    g.current.rotation.y = p * Math.PI * 0.5;
    g.current.rotation.x = (1 - p) * 0.08;
  });

  return (
    <group ref={g}>
      {pecas.map((p, i) => (
        <mesh key={i} geometry={p.geo}>
          {p.mat === "sticker_front" ? (
            <meshBasicMaterial map={face} toneMapped={false} />
          ) : p.mat === "sticker_back" ? (
            <meshBasicMaterial color="#F8EFE8" toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#171313" roughness={0.7} metalness={0} />
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function HeroLogo3DPalco({
  glb,
  destino,
  caixa,
}: {
  glb: string;
  destino: Destino;
  caixa: RefObject<HTMLDivElement>;
}) {
  const palco = useRef<HTMLDivElement>(null);
  const progresso = useRef(0);

  useEffect(() => {
    const el = palco.current;
    const pai = caixa.current;
    if (!el || !pai) return;

    let raf = 0;
    let pendente = false;

    function aplicar() {
      pendente = false;
      const r = pai!.getBoundingClientRect();
      /* o percurso acaba quando o topo da caixa alcança o header */
      const percurso = Math.max(1, r.height + destino.y);
      const andado = Math.min(Math.max(-r.top + destino.y, 0), percurso);
      const p = andado / percurso;
      progresso.current = p;

      const ladoInicial = r.width;
      const escala = 1 + (destino.lado / ladoInicial - 1) * p;
      /* de onde está para onde o lockup do header está, em px de tela */
      const cxAgora = r.left + r.width / 2;
      const cyAgora = r.top + r.height / 2;
      const dx = (destino.x - cxAgora) * p;
      const dy = (destino.y - cyAgora) * p;

      el!.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${escala.toFixed(3)})`;
      /* some nos últimos 12%, quando o header já mostra a logo de verdade */
      el!.style.opacity = p > 0.88 ? String(Math.max(0, (1 - p) / 0.12)) : "1";
    }

    function agendar() {
      if (pendente) return;
      pendente = true;
      raf = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [destino, caixa]);

  return (
    <div className="hero-logo-palco" ref={palco}>
      <Canvas
        /* `flat` desliga o tone mapping ACES que o r3f liga por padrao. Sem
           isso o creme da marca saia cinza: o ACES comprime o alto da faixa
           e um grafico chapado nao quer nada disso. */
        flat
        camera={{ position: [0, 0, 0.42], fov: 38 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        /* sem loop contínuo: só redesenha quando algo muda */
        frameloop="always"
      >
        {/* three r155+ usa unidades fisicas: com intensidade baixa o adesivo
            creme lia como cinza. O ambiente forte mantem a cor da marca e as
            direcionais so marcam o relevo da borda. */}
        <ambientLight intensity={3.4} />
        <directionalLight position={[2, 3, 4]} intensity={2.6} />
        <directionalLight position={[-3, -1, 2]} intensity={1.2} />
        <Adesivo glb={glb} progresso={progresso} />
      </Canvas>
    </div>
  );
}

useGLTF.preload((process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/3d/street-fest-logo.glb");
