import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";

/* Ponte entre os dados e a tela: enquanto `src` for null o bloco continua sendo o
   placeholder .gblock do mockup; quando a foto real entra em public/fotos/ ela
   assume o mesmo recorte, com grain por cima para não destoar do resto do site.
   Nenhuma imagem de banco de imagens entra no projeto.

   Com `lambe`, a foto entra como cartaz colado na parede: a borda fica rasgada
   e a imagem é revelada de cima para baixo, com duas fitas crepe nos cantos.
   Precisa de dois elementos porque um só não pode ter dois clip-path — o rasgo
   fica no .lambe-corte e a passagem no .gblock. */
export default function Foto({
  src,
  alt,
  cor = "var(--vermelho)",
  index = 0,
  className = "",
  legenda = "foto pendente",
  priority = false,
  lambe = false,
}: {
  src?: string | null;
  alt: string;
  cor?: string;
  index?: number;
  className?: string;
  legenda?: string | null;
  priority?: boolean;
  lambe?: boolean;
}) {
  const bloco = !src ? (
    <PhotoPlaceholder cor={cor} index={index} className={className} legenda={legenda} />
  ) : (
    <div className={("gblock foto " + className).trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:900px) 100vw, 33vw"
        priority={priority}
        className="foto-img"
      />
      <span className="foto-tinta" style={{ background: cor }} aria-hidden="true" />
    </div>
  );

  if (!lambe) return bloco;

  return (
    <span className="lambe" data-reveal>
      <span className="lambe-corte">{bloco}</span>
      <span className="lambe-fita lambe-fita-a" aria-hidden="true" />
      <span className="lambe-fita lambe-fita-b" aria-hidden="true" />
    </span>
  );
}
