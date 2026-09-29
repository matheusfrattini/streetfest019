export type Numero = {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  descricao: string;
  separador?: boolean;
};

export const impacto: Numero[] = [
  { valor: 1000, prefixo: "+", descricao: "atividades temáticas e oficinas", separador: true },
  { valor: 50, prefixo: "+", descricao: "eventos e atividades culturais" },
  { valor: 26, descricao: "bairros e espaços públicos impactados só em Campinas" },
  { valor: 100, prefixo: "+", sufixo: " mil", descricao: "pessoas alcançadas" },
];
