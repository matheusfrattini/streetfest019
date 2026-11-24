# streetfest019
Projeto desenvolvido para o Street Fest 019. Site institucional

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

```bash
npm run build:pages   # export estático para o GitHub Pages (basePath /streetfest019)
```

Stack: Next.js 14 (App Router) + TypeScript. O estilo vive em `app/globals.css`,
com os tokens de cor no `:root`; os textos e listas ficam nos módulos tipados
em `data/`.

Rotas: `/` (hero, galeria e as 10 linguagens em `#frentes`), `/quem-somos`
(`#equipe`), `/eventos` (mapa e agenda), `/tag` e `/contato`. Eventos são
cadastrados à mão em `data/eventos.ts`.

Pendências dos organizadores: bios e fotos originais da equipe
(`data/equipe.ts`), logos de patrocinadores e e-mail/WhatsApp oficiais.
