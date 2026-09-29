import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="lockup">
            <Image src="/logo.jpg" alt="" width={84} height={84} />
            <span className="nome">
              Street
              <br />
              Fest 019
            </span>
          </div>
          <nav>
            <Link href="/quem-somos">Quem somos</Link>
            <Link href="/frentes">Frentes</Link>
            <Link href="/eventos">Eventos</Link>
            <a href="https://instagram.com/streetfest019">Instagram</a>
          </nav>
        </div>
        <small>
          Street Fest 019 · Projeto de inclusão social sem fins lucrativos · Campinas/SP e região ·
          Cultura de rua em movimento
        </small>
      </div>
    </footer>
  );
}
