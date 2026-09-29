/* Loader de imagem para a exportação estática.

   Sem servidor não há otimizador, e o next/image com `unoptimized` devolve o
   `src` cru — sem o basePath. No GitHub Pages, onde o site vive em
   /streetfest019/, isso faz toda foto dar 404. Este loader prefixa o caminho.

   Caminhos absolutos (http, data:) passam intactos. */
export default function loaderImagem({ src }) {
  if (!src.startsWith("/")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return base + src;
}
