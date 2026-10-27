type Props = {
  ancho?: number;
  congelada?: boolean;
  animada?: boolean;
  titulo?: string;
};

// La mascota: croqueta en caricatura con lazos rosas. Animación definida en globals.css.
export default function CroquetaCoqueta({ ancho = 120, congelada = false, animada = true, titulo }: Props) {
  const masa = congelada ? "#7DBDED" : "#E39A34";
  const borde = congelada ? "#1E4E7A" : "#6B3410";
  const tinta = congelada ? "#123452" : "#3A1A0E";
  return (
    <svg
      width={ancho}
      height={(ancho * 80) / 120}
      viewBox="0 0 120 80"
      className={animada ? (congelada ? "coqueta tiembla" : "coqueta") : "coqueta"}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <g transform="rotate(-8 60 43)">
        <rect x="14" y="20" width="92" height="46" rx="23" fill={masa} stroke={borde} strokeWidth="3" />
        {congelada && (
          <path
            d="M22 30 C 34 16, 86 16, 98 30 C 88 27, 80 32, 72 28 C 64 33, 56 27, 48 31 C 40 27, 32 33, 22 30 Z"
            fill="#FFFFFF"
            stroke={borde}
            strokeWidth="2"
          />
        )}
        <g className="ojo">
          <ellipse cx="48" cy="42" rx="4.5" ry="5.5" fill={tinta} />
          <circle cx="49.5" cy="40" r="1.5" fill="#FFFFFF" />
        </g>
        <g className="ojo">
          <ellipse cx="72" cy="42" rx="4.5" ry="5.5" fill={tinta} />
          <circle cx="73.5" cy="40" r="1.5" fill="#FFFFFF" />
        </g>
        <ellipse cx="42" cy="52" rx="5" ry="3" fill="#FF6E9C" opacity="0.6" />
        <ellipse cx="78" cy="52" rx="5" ry="3" fill="#FF6E9C" opacity="0.6" />
        <path className="sonrisa" d="M54 52 Q60 58 66 52" fill="none" stroke={tinta} strokeWidth="2.6" strokeLinecap="round" />
        {[
          { x: 18, r: -28 },
          { x: 102, r: 28 },
        ].map((lazo) => (
          <g key={lazo.x} transform={`translate(${lazo.x} 24) rotate(${lazo.r})`}>
            <path
              d="M0 0 C -12 -12 -22 -2 -16 7 C -12 12 -5 6 0 0 Z M0 0 C 12 -12 22 -2 16 7 C 12 12 5 6 0 0 Z"
              fill="#E9508A"
              stroke="#9E1F52"
              strokeWidth="2"
            />
            <circle r="3.5" fill="#FF6E9C" stroke="#9E1F52" strokeWidth="2" />
          </g>
        ))}
      </g>
    </svg>
  );
}
