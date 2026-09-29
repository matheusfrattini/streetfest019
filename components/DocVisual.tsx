import Image from "next/image";

export default function DocVisual() {
  return (
    <div className="gblock doc-visual" data-reveal>
      <span className="blob a" />
      <span className="blob b" />
      <Image className="mark" src="/logo.jpg" alt="" width={240} height={240} />
      <span className="play" aria-hidden="true" />
      <span className="cap">Espaço do player · pendente: URL do vídeo no YouTube</span>
    </div>
  );
}
