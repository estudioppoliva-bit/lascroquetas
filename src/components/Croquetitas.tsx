// Nota de 1 a 5 en croquetas (no estrellas).
function Mini({ llena }: { llena: boolean }) {
  return (
    <svg viewBox="0 0 24 14" width="22" height="13" aria-hidden="true">
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="11"
        rx="5.5"
        fill={llena ? "#E39A34" : "#f3e3d0"}
        stroke={llena ? "#6B3410" : "#d9c3aa"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Croquetitas({ nota, etiqueta }: { nota: number; etiqueta?: string }) {
  const redondeada = Math.round(nota);
  return (
    <span className="croquetitas" role="img" aria-label={etiqueta ?? `${nota} de 5 croquetas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Mini key={i} llena={i <= redondeada} />
      ))}
    </span>
  );
}

export function MiniCroqueta({ llena }: { llena: boolean }) {
  return <Mini llena={llena} />;
}
