"use client";

import { useState } from "react";
import type { GrupoIngredientes } from "@/data/recetas";

const fracciones: [number, string][] = [
  [0.125, "⅛"],
  [0.25, "¼"],
  [0.33, "⅓"],
  [0.5, "½"],
  [0.66, "⅔"],
  [0.75, "¾"],
];

// Muestra 1.5 como "1½" y 0.66 como "⅔"; redondea a la fracción de cocina más cercana.
function formatoCantidad(n: number): string {
  if (n >= 10) return String(Math.round(n * 2) / 2).replace(".5", "½");
  const entero = Math.floor(n);
  const resto = n - entero;
  if (resto < 0.07) return String(entero || "pizca");
  if (resto > 0.9) return String(entero + 1);
  const [, simbolo] = fracciones.reduce((a, b) => (Math.abs(b[0] - resto) < Math.abs(a[0] - resto) ? b : a));
  return entero ? `${entero}${simbolo}` : simbolo;
}

export default function Ingredientes({
  grupos,
  rinde,
  unidad,
}: {
  grupos: GrupoIngredientes[];
  rinde: number;
  unidad: string;
}) {
  const paso = rinde >= 16 ? Math.round(rinde / 4) : Math.max(1, Math.round(rinde / 4));
  const [cuantas, setCuantas] = useState(rinde);
  const factor = cuantas / rinde;

  return (
    <div className="ingredientes">
      <div className="porciones">
        <span>
          Para <strong>{cuantas}</strong> {unidad}
        </span>
        <div className="porciones-botones">
          <button
            type="button"
            onClick={() => setCuantas((c) => Math.max(paso, c - paso))}
            aria-label={`Hacer ${paso} ${unidad} menos`}
            disabled={cuantas <= paso}
          >
            −
          </button>
          <button type="button" onClick={() => setCuantas((c) => c + paso)} aria-label={`Hacer ${paso} ${unidad} más`}>
            +
          </button>
        </div>
      </div>
      {grupos.map((g) => (
        <div key={g.grupo}>
          <h3>{g.grupo}</h3>
          <ul>
            {g.items.map((i) => (
              <li key={i.nombre}>
                {i.cantidad !== undefined && (
                  <strong>
                    {formatoCantidad(i.cantidad * factor)}
                    {i.unidad ? ` ${i.unidad}` : ""}
                  </strong>
                )}{" "}
                {i.nombre}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {factor !== 1 && (
        <p className="tenue" style={{ margin: 0, fontSize: 14 }}>
          Cantidades ajustadas y redondeadas. Los tiempos de reposo y fritura no cambian.
        </p>
      )}
    </div>
  );
}
