import Image from "next/image";
import type { CSSProperties } from "react";

/* Mesmo padrão visual de pendência que o mockup usa no documentário e nos cards
   da equipe: .gblock com blob colorido animado + marca d'água do logo.
   Nenhuma imagem de banco de imagens entra no projeto. */
export default function PhotoPlaceholder({
  cor = "var(--vermelho)",
  index = 0,
  className = "",
  legenda = "foto pendente",
}: {
  cor?: string;
  index?: number;
  className?: string;
  legenda?: string | null;
}) {
  return (
    <div className={("gblock ph " + className).trim()}>
      <span
        className="blob"
        style={{ background: cor, animationDelay: -(index * 1.7) + "s" } as CSSProperties}
      />
      <Image className="mark" src="/logo.jpg" alt="" width={400} height={400} />
      {legenda && <span className="ph-cap">{legenda}</span>}
    </div>
  );
}
