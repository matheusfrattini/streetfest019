"use client";

/* Fundo animado do hero: um GIF gerado a partir de capaSite.mp4.

   O poster fica como fundo da caixa, então aparece enquanto o GIF baixa. GIF
   não tem pause, então prefers-reduced-motion é resolvido no <picture>: quem
   pede menos movimento recebe o poster parado no lugar. O celular recebe a
   versão menor.

   A camada escura por cima é o que garante a leitura do texto sobre
   qualquer frame. */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function HeroVideo({
  src,
  srcCelular,
  poster,
}: {
  src: string;
  srcCelular: string;
  poster: string;
}) {
  return (
    <div
      className="hero-video"
      aria-hidden="true"
      style={{ backgroundImage: `url(${BASE + poster})` }}
    >
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet={BASE + poster} />
        <source media="(max-width: 640px)" srcSet={BASE + srcCelular} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-video-el" src={BASE + src} alt="" decoding="async" />
      </picture>
      <span className="hero-video-escurece" />
    </div>
  );
}
