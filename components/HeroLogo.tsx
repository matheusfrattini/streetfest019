/* Logo central do hero: o macaco parado no lugar, acima do texto amarelo.

   Antes ele era um adesivo 3D que girava e voava até o header conforme a
   rolagem; saiu a pedido, a logo agora fica fixa. Como imagem simples, não
   carrega three/fiber/drei nem depende de WebGL. */

import Image from "next/image";

export default function HeroLogo() {
  return (
    <div className="hero-logo">
      <Image
        src="/macaco-escuro.webp"
        alt="Street Fest 019"
        width={640}
        height={528}
        priority
        className="hero-logo-img"
      />
    </div>
  );
}
