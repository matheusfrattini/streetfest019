import { Fragment } from "react";

/* Título que entra palavra por palavra.

   Não tem JS próprio: cada palavra vira um span com overflow hidden e sobe
   quando o IntersectionObserver de RevealOnScroll marca o h2 com .in. O atraso
   escalonado sai do índice, via custom property --i lida pelo CSS.

   O espaço entre as palavras é um espaço de verdade no HTML, não um gap de
   flex: assim copiar o título continua dando a frase com espaços, e o leitor
   de tela não lê tudo emendado. Por isso as palavras são inline-block.

   Server component de propósito — o HTML já vai pronto, sem custo no cliente. */
export default function Titulo({
  children,
  id,
  className,
}: {
  children: string;
  id?: string;
  className?: string;
}) {
  const palavras = children.split(" ");
  return (
    <h2 id={id} className={className} data-reveal data-palavras>
      {palavras.map((palavra, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="pal" style={{ "--i": i } as React.CSSProperties}>
            <span>{palavra}</span>
          </span>
        </Fragment>
      ))}
    </h2>
  );
}
