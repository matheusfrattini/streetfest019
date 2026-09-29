export default function ApoioSlot({ texto }: { texto: string }) {
  return (
    <div className="slot" data-reveal>
      {texto}
    </div>
  );
}
