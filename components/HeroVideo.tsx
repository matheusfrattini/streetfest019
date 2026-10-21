"use client";

/* Fundo em vídeo do hero.

   Os arquivos ainda não existem. Enquanto `src` for null, o componente
   desenha só o fundo escuro atual (canvas de partículas + glow seguem por
   fora, no Hero). Quando o vídeo chegar, basta preencher data/home.ts.

   O <video> já nasce com o que um fundo decorativo precisa: autoplay mudo
   (única forma de o navegador deixar tocar sozinho), loop, playsInline para
   o iOS não abrir em tela cheia, e preload="metadata" para não baixar o
   arquivo inteiro antes da hora. Em prefers-reduced-motion não toca: fica o
   poster parado.

   A camada escura por cima é o que garante a leitura do texto sobre
   qualquer frame. */
export default function HeroVideo({
  src,
  poster,
}: {
  src: string | null;
  poster: string | null;
}) {
  return (
    <div className="hero-video" aria-hidden="true">
      {src && (
        <video
          className="hero-video-el"
          src={src}
          poster={poster ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      )}
      <span className="hero-video-escurece" />
    </div>
  );
}
