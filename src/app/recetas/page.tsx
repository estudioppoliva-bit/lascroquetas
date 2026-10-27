import type { Metadata } from "next";
import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import { recetas } from "@/data/recetas";
import { buscarLugares } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Croquetas y recetas",
  description: "Recetas de 11 estilos de croqueta del mundo, con sus variantes y su historia.",
};

export default async function PaginaRecetas() {
  const todos = await buscarLugares();
  const lugaresPorEstilo = (clave: string) => todos.filter((l) => l.estilo === clave).length;

  return (
    <>
      <Encabezado activo="recetas" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Croquetas y recetas
        </nav>
        <section className="cabecera-seccion">
          <div>
            <span className="etiqueta">{recetas.length} estilos del mundo</span>
            <h1>Croquetas y recetas</h1>
            <p>
              De la cubana de jamón a la coxinha brasileña: la receta base de cada estilo, sus variantes y de dónde viene.
              Y si no te apetece freír, te decimos dónde comerla hecha.
            </p>
          </div>
          <CroquetaCoqueta ancho={170} titulo="La Croqueta Coqueta" />
        </section>

        <ul className="rejilla-recetas">
          {recetas.map((r) => {
            const n = lugaresPorEstilo(r.clave);
            return (
              <li key={r.clave}>
                <Link href={`/recetas/${r.clave}`} className="tarjeta tarjeta-receta">
                  <span className="etiqueta">{r.origen}</span>
                  <strong className="tarjeta-receta-titulo">{r.titulo}</strong>
                  <span>{r.resumen}</span>
                  <span className="tenue" style={{ marginTop: "auto", fontSize: 14, fontWeight: 700 }}>
                    {(r.tiempos.find((t) => t.etiqueta === "Preparación") ?? r.tiempos[0]).valor} de preparación · {n} {n === 1 ? "lugar" : "lugares"} en la Ruta
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
