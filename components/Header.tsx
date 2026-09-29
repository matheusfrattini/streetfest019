"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/o-que-fazemos", label: "O que fazemos" },
  { href: "/frentes", label: "Frentes" },
  { href: "/eventos", label: "Eventos" },
  { href: "/tag", label: "Tags" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    function onScroll() {
      setStuck(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="hd" className={stuck ? "stuck" : undefined}>
      <div className="wrap bar">
        <Link className="lockup" href="/">
          <Image src="/logo.jpg" alt="" width={96} height={96} priority />
          <span className="nome">
            Street
            <br />
            Fest 019
          </span>
        </Link>
        <nav>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
