"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/o-que-fazemos", label: "O que fazemos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/tag", label: "Tags" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setStuck(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* trocou de página, o menu do celular fecha */
  useEffect(() => setAberto(false), [pathname]);

  /* Esc e toque fora fecham; o Esc devolve o foco ao botão */
  useEffect(() => {
    if (!aberto) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    }
    function onFora(e: PointerEvent) {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onFora);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onFora);
    };
  }, [aberto]);

  return (
    <header id="hd" ref={raiz} className={stuck ? "stuck" : undefined}>
      <div className="wrap bar">
        <Link className="lockup" href="/">
          <Image src="/macaco-escuro.webp" alt="" width={640} height={528} priority />
          <span className="nome">
            Street
            <br />
            Fest 019
          </span>
        </Link>
        <button
          ref={botao}
          type="button"
          className="menu-botao"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="menu-principal" className={"menu" + (aberto ? " aberto" : "")}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setAberto(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
