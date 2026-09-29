import type { InstCardData } from "@/data/institucional";

export default function InstCard({ card }: { card: InstCardData }) {
  return (
    <div className="inst-card" data-reveal>
      <h3>{card.titulo}</h3>
      <p>{card.descricao}</p>
    </div>
  );
}
