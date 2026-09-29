import type { Metadata } from "next";
import {
  Anton,
  Archivo,
  Bungee,
  IBM_Plex_Mono,
  Permanent_Marker,
  Rubik_Spray_Paint,
} from "next/font/google";
import Boombox from "@/components/Boombox";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MockBanner from "@/components/MockBanner";
import Parallax from "@/components/Parallax";
import ProgressBar from "@/components/ProgressBar";
import RevealOnScroll from "@/components/RevealOnScroll";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

/* Fontes do gerador de tags (mural.md, item 3). preload:false porque só a
   página /tag usa: o navegador só busca o arquivo quando o canvas desenha. */
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-marker",
});

const spray = Rubik_Spray_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-spray",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  title: "Street Fest 019 — Cultura de rua em movimento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable} ${plexMono.variable} ${marker.variable} ${spray.variable} ${bungee.variable}`}>
      <head>
        {/* Mesma marcação do mockup: o CSS só esconde os blocos de reveal quando há JS. */}
        <script
          dangerouslySetInnerHTML={{ __html: 'document.documentElement.className+=" js";' }}
        />
      </head>
      <body>
        <ProgressBar />
        <MockBanner />
        <Header />
        <main id="topo">{children}</main>
        <Footer />
        <RevealOnScroll />
        <Parallax />
        <Boombox />
      </body>
    </html>
  );
}
