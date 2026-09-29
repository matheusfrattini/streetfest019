import { frases } from "@/data/marquee";

/* O mockup monta "half" com as frases repetidas 2x e imprime half + half,
   para o loop de translateX(-50%) fechar sem emenda. */
const half = [...frases, ...frases];
const track = [...half, ...half];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" id="track">
        {track.map((f, i) => (
          <b key={i}>
            {f} <i>/</i>
          </b>
        ))}
      </div>
    </div>
  );
}
