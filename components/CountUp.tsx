import type { Numero } from "@/data/impacto";

/* Anima de 0 até o alvo em 1400ms com easing cúbico — mesma função do mockup.
   Disparada pelo observer de RevealOnScroll quando o bloco .num entra na tela. */
export function countUp(el: HTMLElement | null, reduce: boolean) {
  if (!el) return;
  const to = parseInt(el.getAttribute("data-to") || "0", 10);
  const sep = el.getAttribute("data-sep");
  const fmt = (n: number) => (sep ? n.toLocaleString("pt-BR") : String(n));
  if (reduce) {
    el.textContent = fmt(to);
    return;
  }
  const dur = 1400;
  let t0: number | null = null;
  function step(t: number) {
    if (t0 === null) t0 = t;
    const k = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - k, 3);
    el!.textContent = fmt(Math.round(to * eased));
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function CountUp({ valor, separador }: Pick<Numero, "valor" | "separador">) {
  return (
    <span className="count" data-to={valor} data-sep={separador ? "1" : undefined}>
      0
    </span>
  );
}
