export type Faixa = {
  id: string;
  titulo: string;
  artista: string;
  /* null = áudio ainda não enviado pelo cliente. A faixa aparece na lista
     marcada como pendente e não toca. Quando o arquivo chegar, é só apontar
     para /audio/<arquivo>.mp3 aqui. */
  arquivo: string | null;
  /* true = beat sintetizado na hora pelo Web Audio, sem arquivo nenhum.
     Existe para o boombox já funcionar antes dos sets reais chegarem. */
  sintetizado?: boolean;
};

/* PENDENTE DO CLIENTE: os sets dos DJs em mp3, e o nome/ordem das faixas.
   Os DJs abaixo saíram do portfólio (Comic City Music). */
export const faixas: Faixa[] = [
  {
    id: "beat-da-casa",
    titulo: "Beat da Casa",
    artista: "Street Fest 019",
    arquivo: null,
    sintetizado: true,
  },
  { id: "dj-urso", titulo: "Set Comic City — Edição 2", artista: "DJ Urso", arquivo: null },
  { id: "dj-binho", titulo: "Set Comic City — Edição 1", artista: "DJ Binho", arquivo: null },
];
