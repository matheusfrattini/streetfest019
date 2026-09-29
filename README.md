# streetfest019
Projeto desenvolvido para o Street Fest 019. Site institucional

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

Stack: Next.js 14 (App Router) + TypeScript + Tailwind. O mockup original de
referência está em `reference/home.html` — o CSS dele foi copiado para
`app/globals.css` sem alterações visuais, e os textos/arrays viraram os módulos
tipados em `data/`.

Rotas: `/`, `/quem-somos` (`#equipe`), `/o-que-fazemos` (`#impacto`),
`/frentes` (`#documentario` e um id por projeto), `/eventos` e `/eventos/[slug]`,
`/contato`. Eventos são cadastrados à mão em `data/eventos.ts` — hoje há só um
registro de exemplo, marcado como placeholder.

Pendências do cliente mantidas no site: logos de patrocinadores, fotos da
equipe, URL do vídeo no YouTube e e-mail/WhatsApp oficiais.
