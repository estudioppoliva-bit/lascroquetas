import CroquetaCoqueta from "./CroquetaCoqueta";
import { BORDE, ESTADOS, PUNTOS, RELLENO, VIEWBOX } from "@/data/mapaUsa";

type P = [number, number];

// Paradas del recorrido, en orden. Es un circuito: después de la última vuelve a Miami.
const RECORRIDO = ["miami", "tampa", "nola", "co", "la", "chi", "mi", "ma", "ny", "phl", "dc", "ky", "orl"];

// Marcas del mapa: zona(s) que agrupa, texto y posición de la etiqueta.
const MARCAS: { zonas: string[]; punto: string; nombre: string; dx: number; dy: number; ancla: "start" | "end" | "middle" }[] = [
  { zonas: ["miami", "sfl"], punto: "miami", nombre: "Miami", dx: -12, dy: 5, ancla: "end" },
  { zonas: ["tampa"], punto: "tampa", nombre: "Tampa", dx: -12, dy: 5, ancla: "end" },
  { zonas: ["orl", "daytona"], punto: "orl", nombre: "Orlando", dx: 12, dy: -6, ancla: "start" },
  { zonas: ["nola"], punto: "nola", nombre: "Nueva Orleans", dx: -12, dy: 5, ancla: "end" },
  { zonas: ["ky"], punto: "ky", nombre: "Kentucky", dx: 0, dy: 24, ancla: "middle" },
  { zonas: ["chi"], punto: "chi", nombre: "Chicago", dx: -12, dy: 5, ancla: "end" },
  { zonas: ["mi"], punto: "mi", nombre: "Michigan", dx: 0, dy: -14, ancla: "middle" },
  { zonas: ["dc"], punto: "dc", nombre: "Washington", dx: -12, dy: 10, ancla: "end" },
  { zonas: ["phl"], punto: "phl", nombre: "Filadelfia", dx: -12, dy: 6, ancla: "end" },
  { zonas: ["ny", "nj"], punto: "ny", nombre: "Nueva York", dx: -12, dy: -2, ancla: "end" },
  { zonas: ["ma"], punto: "ma", nombre: "Boston", dx: -12, dy: -6, ancla: "end" },
  { zonas: ["co"], punto: "co", nombre: "Denver", dx: 0, dy: -14, ancla: "middle" },
  { zonas: ["la"], punto: "la", nombre: "Los Ángeles", dx: 12, dy: 18, ancla: "start" },
  { zonas: ["hi"], punto: "hi", nombre: "Honolulu", dx: 0, dy: 26, ancla: "middle" },
];

// Curva suave entre dos paradas: punto de control desplazado hacia un lado.
function control(a: P, b: P): P {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const k = 0.18;
  return [Math.round(mx - dy * k), Math.round(my + dx * k)];
}

function largo(a: P, c: P, b: P): number {
  let total = 0;
  let prev = a;
  for (let i = 1; i <= 24; i++) {
    const t = i / 24;
    const x = (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t ** 2 * b[0];
    const y = (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t ** 2 * b[1];
    total += Math.hypot(x - prev[0], y - prev[1]);
    prev = [x, y];
  }
  return total;
}

const paradas = [...RECORRIDO, RECORRIDO[0]].map((z) => PUNTOS[z]);
const tramos = paradas.slice(1).map((b, i) => {
  const a = paradas[i];
  const c = control(a, b);
  return { a, b, c, largo: largo(a, c, b) };
});
const RUTA = `M${paradas[0].join(" ")} ` + tramos.map((t) => `Q${t.c.join(" ")} ${t.b.join(" ")}`).join(" ");

// La croqueta viaja a velocidad constante y hace una pausa corta en cada parada.
const PAUSA = 0.9;
const VELOCIDAD = 110; // unidades del mapa por segundo
const totalLargo = tramos.reduce((s, t) => s + t.largo, 0);
const DURACION = tramos.reduce((s, t) => s + t.largo / VELOCIDAD + PAUSA, 0);
const claves = (() => {
  const puntos = [0];
  const tiempos = [0];
  let recorrido = 0;
  let tiempo = 0;
  for (const t of tramos) {
    tiempo += PAUSA;
    puntos.push(recorrido / totalLargo);
    tiempos.push(tiempo / DURACION);
    tiempo += t.largo / VELOCIDAD;
    recorrido += t.largo;
    puntos.push(recorrido / totalLargo);
    tiempos.push(tiempo / DURACION);
  }
  puntos[puntos.length - 1] = 1;
  tiempos[tiempos.length - 1] = 1;
  const f = (n: number) => n.toFixed(4);
  return { keyPoints: puntos.map(f).join(";"), keyTimes: tiempos.map(f).join(";") };
})();

const SALTO_HAWAI = (() => {
  const a = PUNTOS.la;
  const b = PUNTOS.hi;
  return `M${a.join(" ")} Q${a[0] + 40} ${(a[1] + b[1]) / 2 + 60} ${b.join(" ")}`;
})();

export default function MapaRuta({ conteo }: { conteo: Record<string, number> }) {
  return (
    <svg viewBox={VIEWBOX} className="mapa-ruta" role="img" aria-labelledby="mapa-titulo mapa-desc">
      <title id="mapa-titulo">La Croqueta Coqueta recorre la Ruta por Estados Unidos</title>
      <desc id="mapa-desc">
        Mapa de EE.UU. con las ciudades donde hay croquetas en la Ruta: Miami, Tampa, Orlando, Nueva Orleans, Denver,
        Los Ángeles, Chicago, Michigan, Boston, Nueva York, Filadelfia, Washington, Kentucky y Honolulu.
      </desc>
      <path d={RELLENO} className="mapa-tierra" />
      <path d={ESTADOS} className="mapa-estados" />
      <path d={BORDE} className="mapa-borde" />

      <path d={SALTO_HAWAI} className="mapa-salto" />
      <path d={RUTA} className="mapa-ruta-linea" />

      {MARCAS.map((m) => {
        const [x, y] = PUNTOS[m.punto];
        const n = m.zonas.reduce((s, z) => s + (conteo[z] ?? 0), 0);
        return (
          <a key={m.punto} href={`/lugares?zona=${m.zonas[0]}`} className="mapa-marca">
            <title>{`${m.nombre}: ${n} ${n === 1 ? "lugar" : "lugares"}`}</title>
            <circle cx={x} cy={y} r="13" className="mapa-pulso" />
            <circle cx={x} cy={y} r="7" className="mapa-punto" />
            <text x={x + m.dx} y={y + m.dy} textAnchor={m.ancla} className="mapa-etiqueta">
              {m.nombre}
            </text>
          </a>
        );
      })}

      {/* La viajera: se mueve por la ruta. Con movimiento reducido se queda quieta en Miami. */}
      <g className="mapa-viajera" aria-hidden="true">
        <g transform="translate(-45 -56)">
          <CroquetaCoqueta ancho={90} />
        </g>
        <animateMotion
          dur={`${DURACION.toFixed(1)}s`}
          repeatCount="indefinite"
          path={RUTA}
          keyPoints={claves.keyPoints}
          keyTimes={claves.keyTimes}
          calcMode="linear"
        />
      </g>
      <g className="mapa-quieta" aria-hidden="true" transform={`translate(${PUNTOS.miami[0] - 45} ${PUNTOS.miami[1] - 56})`}>
        <CroquetaCoqueta ancho={90} animada={false} />
      </g>
    </svg>
  );
}
