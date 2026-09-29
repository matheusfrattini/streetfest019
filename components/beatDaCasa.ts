/* Beat sintetizado na hora, sem arquivo de áudio nenhum.

   Existe porque o boombox do mural.md pede "beats e sets dos DJs", e nenhum
   set real chegou ainda — assim o toca-discos já funciona de verdade em vez de
   ser um botão morto. Quando os mp3 dos DJs entrarem, esta faixa continua como
   a "casa" do projeto.

   Boom-bap em 16 passos a 88 BPM: bumbo, caixa, chimbal e uma linha de baixo.
   Agendamento com lookahead — o setInterval só enfileira, quem cronometra é o
   relógio do próprio AudioContext. */

const BPM = 88;
const PASSOS = 16;
const LOOKAHEAD_MS = 25;
const JANELA_S = 0.12;

/*        1 e   2 e   3 e   4 e    */
const BUMBO = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
const CAIXA = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1];
const CHIMBAL = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0];
/* semitons relativos a lá1 (55 Hz); null = silêncio */
const BAIXO: (number | null)[] = [0, null, null, null, 3, null, null, null,
                                  5, null, null, null, 3, null, 2, null];

export type Beat = { parar: () => void; setVolume: (v: number) => void };

export function tocarBeatDaCasa(ctx: AudioContext, volume: number): Beat {
  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  /* um buffer de ruído reaproveitado pela caixa e pelo chimbal */
  const ruido = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
  const dados = ruido.getChannelData(0);
  for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1;

  function env(no: AudioNode, t: number, pico: number, decaimento: number) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(pico, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decaimento);
    no.connect(g);
    g.connect(master);
    return g;
  }

  function bumbo(t: number) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.13);
    env(o, t, 0.95, 0.34);
    o.start(t);
    o.stop(t + 0.36);
  }

  function caixa(t: number) {
    const s = ctx.createBufferSource();
    s.buffer = ruido;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1900;
    bp.Q.value = 0.8;
    s.connect(bp);
    env(bp, t, 0.42, 0.17);
    s.start(t);
    s.stop(t + 0.2);
  }

  function chimbal(t: number, aberto: boolean) {
    const s = ctx.createBufferSource();
    s.buffer = ruido;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 8200;
    s.connect(hp);
    env(hp, t, aberto ? 0.14 : 0.1, aberto ? 0.14 : 0.045);
    s.start(t);
    s.stop(t + 0.2);
  }

  function baixo(t: number, semitom: number, dur: number) {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = 55 * Math.pow(2, semitom / 12);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;
    o.connect(lp);
    env(lp, t, 0.5, dur);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  const passoS = 60 / BPM / 4;
  let passo = 0;
  let proximo = ctx.currentTime + 0.08;

  function enfileirar() {
    while (proximo < ctx.currentTime + JANELA_S) {
      const t = proximo;
      /* swing: as semicolcheias ímpares atrasam um pouco */
      const at = passo % 2 === 1 ? t + passoS * 0.16 : t;
      if (BUMBO[passo]) bumbo(at);
      if (CAIXA[passo]) caixa(at);
      if (CHIMBAL[passo]) chimbal(at, passo % 8 === 6);
      const n = BAIXO[passo];
      if (n !== null) baixo(at, n, passoS * 3.4);
      passo = (passo + 1) % PASSOS;
      proximo += passoS;
    }
  }

  enfileirar();
  const timer = window.setInterval(enfileirar, LOOKAHEAD_MS);

  return {
    parar() {
      window.clearInterval(timer);
      /* corta o rabo do que já foi agendado em vez de estalar */
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12);
      window.setTimeout(() => master.disconnect(), 400);
    },
    setVolume(v: number) {
      master.gain.setTargetAtTime(v, ctx.currentTime, 0.02);
    },
  };
}
