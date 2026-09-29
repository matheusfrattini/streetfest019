import type { Config } from "tailwindcss";

/* Breakpoints do mockup: 900px (nav/grids) e 540px (equipe em 1 coluna).
   Declarados como max-width para casar exatamente com as @media do CSS original. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-900": { max: "900px" },
        "max-540": { max: "540px" },
      },
      colors: {
        carvao: "var(--carvao)",
        "carvao-2": "var(--carvao-2)",
        "carvao-3": "var(--carvao-3)",
        off: "var(--off)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        vermelho: "var(--vermelho)",
        amarelo: "var(--amarelo)",
        verde: "var(--verde)",
        roxo: "var(--roxo)",
      },
      fontFamily: {
        display: "var(--display)",
        body: "var(--body)",
        mono: "var(--mono)",
      },
      maxWidth: { content: "var(--max)" },
      transitionTimingFunction: { mockup: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
};

export default config;
