import Link from "next/link";
import { formatoNumero, nombreEstilo, nombreZona, type Lugar } from "@/lib/datos";

export default function TarjetaLugar({ lugar, numero }: { lugar: Lugar; numero?: number }) {
  return (
    <Link href={`/lugares/${lugar.slug}`} className="tarjeta-lugar">
      <div className="foto-lugar" aria-hidden="true" />
      <div className="tarjeta-cuerpo">
        <div className="tarjeta-titulo">
          <h3>
            {numero ? `${numero}. ` : ""}
            {lugar.nombre}
          </h3>
          {lugar.evaluacion !== null && (
            <span className="estrellas">
              ★ {lugar.evaluacion.toFixed(1)}
              {lugar.resenas !== null && <small> ({formatoNumero(lugar.resenas)})</small>}
            </span>
          )}
        </div>
        <p className="tenue">
          {lugar.tipo} · {lugar.direccion}
        </p>
        {lugar.nota && <p>{lugar.nota}</p>}
        <div className="chips">
          <span className="chip chip-rosa">{nombreEstilo(lugar.estilo)}</span>
          <span className="chip">{nombreZona(lugar.zona)}</span>
        </div>
      </div>
    </Link>
  );
}
