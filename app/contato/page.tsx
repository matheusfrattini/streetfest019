import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ApoioSlot from "@/components/ApoioSlot";
import IconeInstagram from "@/components/IconeInstagram";
import Titulo from "@/components/Titulo";
import { apoio } from "@/data/apoio";

export const metadata: Metadata = {
  title: "Contato — Street Fest 019",
};

export default function ContatoPage() {
  return (
    <>
      <section id="contato" className="final">
        <div className="wrap">
          <p className="label" data-reveal>
            Contato
          </p>
          <Titulo>Bora movimentar a rua juntos?</Titulo>
          <p className="lede" style={{ color: "#FFDAD5" }} data-reveal>
            Patrocínio, parceria, edital ou uma ideia solta — chama a gente.
          </p>
          <div className="ctas" style={{ marginTop: 28 }} data-reveal>
            {/* Placeholder: destino entra quando o cliente enviar e-mail/WhatsApp oficiais. */}
            <a className="btn btn-primary" href="#">
              <span>Falar com o projeto</span>
            </a>
            <a
              className="btn btn-ghost btn-insta"
              href="https://www.instagram.com/streetfest019/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Street Fest 019: @streetfest019"
            >
              <span>
                <IconeInstagram />
                @streetfest019
              </span>
            </a>
          </div>
          <p className="pend" data-reveal>
            Pendente: e-mail e WhatsApp oficiais do projeto
          </p>
        </div>
      </section>

      <section style={{ "--acc": "var(--amarelo)" } as CSSProperties}>
        <div className="wrap">
          <p className="label" data-reveal>
            Apoio
          </p>
          <Titulo>Essas empresas já acreditaram no nosso trabalho</Titulo>
          <p className="lede" data-reveal>
            Carrossel de logos dos patrocinadores e apoiadores.
          </p>
          <div className="apoio-slots">
            {apoio.map((texto, i) => (
              <ApoioSlot key={i} texto={texto} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
