/** @type {import('next').NextConfig} */

/* Dois alvos de build:

   - padrão (npm run dev / build): servidor Node, com otimização de imagem do
     next/image e rotas em "/". É o que vale se um dia o site for para Vercel,
     Netlify ou um Node próprio.

   - DEPLOY_TARGET=pages (npm run build:pages): exportação estática para o
     GitHub Pages, que só serve arquivo parado. Aí não há servidor para
     otimizar imagem nem para revalidar, e o site vive em
     /streetfest019/ em vez da raiz do domínio.

   A escolha fica numa variável de ambiente para o desenvolvimento local
   continuar em localhost:3000/ e não em localhost:3000/streetfest019/. */

const repo = "streetfest019";
const paraPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig = paraPages
  ? {
      output: "export",
      basePath: `/${repo}`,
      assetPrefix: `/${repo}/`,
      /* Sem servidor não há otimizador. Usamos um loader próprio em vez de
         `unoptimized: true` porque o modo unoptimized devolve o src cru, sem
         o basePath — e aí toda foto daria 404 em /streetfest019/. */
      images: { loader: "custom", loaderFile: "./lib/loaderImagem.js" },
      /* o loader roda no cliente e não enxerga o config: o basePath vai por
         aqui, embutido no bundle, para não depender de variável no shell */
      env: { NEXT_PUBLIC_BASE_PATH: `/${repo}` },
      /* o Pages serve /rota/ como /rota/index.html */
      trailingSlash: true,
    }
  : {};

export default nextConfig;
