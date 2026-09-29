import CountUp from "./CountUp";
import type { Numero } from "@/data/impacto";

export default function NumStat({ numero }: { numero: Numero }) {
  return (
    <div className="num" data-reveal>
      <b>
        {numero.prefixo && <i>{numero.prefixo}</i>}
        <CountUp valor={numero.valor} separador={numero.separador} />
        {numero.sufixo}
      </b>
      <span>{numero.descricao}</span>
    </div>
  );
}
