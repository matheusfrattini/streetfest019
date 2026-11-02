"use client";

/* A agenda: um mês por vez, com o macaco carimbado em cima de cada dia que
   tem evento marcado.

   É componente de cliente por causa do "hoje": no export estático a página é
   gerada uma vez só, e um "hoje" calculado no build congelaria a agenda na
   data do deploy. Aqui ele é lido no navegador, depois de montar — antes
   disso sai só a caixa vazia, para o HTML do servidor e o do cliente
   baterem.

   Só entram eventos com data a partir de hoje (proximosEventos). Sem nenhum,
   a agenda mostra o mês atual e avisa que as datas ainda não saíram — nada
   de data inventada para preencher. */

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { formatarData, hojeISO, proximosEventos, rotuloEvento } from "@/data/eventos";

const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

type Mes = { ano: number; mes: number }; // mes 0–11

function chaveDia(ano: number, mes: number, dia: number) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${ano}-${p(mes + 1)}-${p(dia)}`;
}

function nomeMes({ ano, mes }: Mes) {
  const s = new Date(ano, mes, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function somar({ ano, mes }: Mes, n: number): Mes {
  const d = new Date(ano, mes + n, 1);
  return { ano: d.getFullYear(), mes: d.getMonth() };
}

function mesDe(iso: string): Mes {
  const [a, m] = iso.split("-").map(Number);
  return { ano: a, mes: m - 1 };
}

export default function AgendaCalendario() {
  const [hoje, setHoje] = useState<string | null>(null);
  const [visto, setVisto] = useState<Mes | null>(null);

  useEffect(() => {
    const h = hojeISO();
    setHoje(h);
    /* abre no mês do próximo evento; sem nenhum, no mês corrente */
    const prox = proximosEventos(h)[0];
    setVisto(mesDe(prox ? prox.data : h));
  }, []);

  const proximos = useMemo(() => (hoje ? proximosEventos(hoje) : []), [hoje]);
  const porDia = useMemo(() => {
    const m = new Map<string, typeof proximos>();
    for (const e of proximos) m.set(e.data, [...(m.get(e.data) ?? []), e]);
    return m;
  }, [proximos]);

  if (!visto || !hoje) return <div className="agenda agenda-carregando" aria-hidden="true" />;

  const mes = visto;
  const primeiroDia = new Date(mes.ano, mes.mes, 1).getDay();
  const diasNoMes = new Date(mes.ano, mes.mes + 1, 0).getDate();
  const celulas: (number | null)[] = [
    ...Array.from({ length: primeiroDia }, () => null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1),
  ];
  while (celulas.length % 7) celulas.push(null);

  const doMes = proximos.filter((e) => {
    const m = mesDe(e.data);
    return m.ano === mes.ano && m.mes === mes.mes;
  });

  /* não deixa voltar para antes do mês corrente: a agenda é só do que vem */
  const mesHoje = mesDe(hoje);
  const podeVoltar = (mes.ano > mesHoje.ano || (mes.ano === mesHoje.ano && mes.mes > mesHoje.mes));

  return (
    <div className="agenda">
      <div className="agenda-cal">
        <div className="agenda-topo">
          <button
            type="button"
            className="agenda-seta"
            aria-label="Mês anterior"
            disabled={!podeVoltar}
            onClick={() => setVisto(somar(mes, -1))}
          >
            ←
          </button>
          <h3 className="agenda-mes" aria-live="polite">
            {nomeMes(mes)}
          </h3>
          <button
            type="button"
            className="agenda-seta"
            aria-label="Próximo mês"
            onClick={() => setVisto(somar(mes, 1))}
          >
            →
          </button>
        </div>

        <div className="agenda-grade" role="grid" aria-label={`Calendário de ${nomeMes(mes)}`}>
          {SEMANA.map((d) => (
            <span key={d} className="agenda-sem" role="columnheader">
              {d}
            </span>
          ))}
          {celulas.map((dia, i) => {
            if (dia === null) return <span key={`v${i}`} className="agenda-dia vazio" aria-hidden="true" />;
            const k = chaveDia(mes.ano, mes.mes, dia);
            const evs = porDia.get(k);
            const passado = k < hoje;
            const classes = ["agenda-dia", evs && "marcado", passado && "passado", k === hoje && "hoje"]
              .filter(Boolean)
              .join(" ");
            return (
              <span
                key={k}
                className={classes}
                role="gridcell"
                aria-label={evs ? `${formatarData(k)}: ${evs.map(rotuloEvento).join(", ")}` : undefined}
              >
                {evs && (
                  <Image src="/macaco.png" alt="" width={815} height={668} className="agenda-macaco" />
                )}
                <b>{dia}</b>
              </span>
            );
          })}
        </div>
      </div>

      <div className="agenda-lista">
        <p className="agenda-lista-tit">Próximas datas</p>
        {proximos.length === 0 ? (
          <p className="agenda-vazio">
            As próximas datas ainda vão ser anunciadas.
          </p>
        ) : (
          <ol>
            {proximos.map((e) => (
              <li key={e.numero} className={doMes.includes(e) ? "no-mes" : undefined}>
                <button type="button" onClick={() => setVisto(mesDe(e.data))}>
                  <span className="agenda-data">{formatarData(e.data)}</span>
                  <span className="agenda-nome">{rotuloEvento(e)}</span>
                  {(e.horario || e.local) && (
                    <span className="agenda-onde">{[e.horario, e.local].filter(Boolean).join(" · ")}</span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
