import type { Metadata } from "next";
import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import { eventos, lecturas, linea, mundo } from "@/data/contenido";
import { nombreEstilo } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Historia de la croqueta",
  description:
    "De la corte francesa a la Calle 8: la historia de la croqueta, sus fechas para celebrar y los festivales dedicados a ella.",
};

export default function PaginaHistoria() {
  return (
    <>
      <Encabezado activo="historia" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Historia
        </nav>

        <section className="cabecera-seccion">
          <div>
            <span className="etiqueta">La historia</span>
            <h1>De la cocina francesa a la Calle 8</h1>
            <p>
              Nació en Francia para aprovechar las sobras, se hizo cremosa en España, alargada en Cuba y famosa en Miami.
              Por el camino dio la vuelta al mundo y cambió en cada país.
            </p>
          </div>
          <CroquetaCoqueta ancho={170} titulo="La Croqueta Coqueta" />
        </section>

        <section className="seccion">
          <h2>La croqueta original</h2>
          <ol className="linea">
            {linea.map((h) => (
              <li key={h.titulo}>
                <span className="linea-cuando">{h.cuando}</span>
                <div>
                  <h3>{h.titulo}</h3>
                  <p>{h.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="seccion">
          <h2>La vuelta al mundo</h2>
          <p className="tenue" style={{ margin: 0 }}>
            Cada país la adaptó con lo que tenía a mano. Toca un estilo para ver su receta.
          </p>
          <div className="rejilla">
            {mundo.map((m) => (
              <Link key={m.clave} href={`/recetas/${m.clave}`} className="tarjeta">
                <strong>{nombreEstilo(m.clave)}</strong>
                <span>{m.texto}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="seccion" id="festivales">
          <div className="banda-oscura">
            <div>
              <span className="etiqueta" style={{ color: "#FFB8D0" }}>
                Fechas para celebrar
              </span>
              <h2 style={{ marginTop: 10 }}>Dos días al año son de la croqueta</h2>
              <p>
                El 16 de enero, Día Internacional de la Croqueta, se lanza la Ruta. El 1 de octubre, Día de la Croqueta en
                Miami, anunciaremos los premios anuales votados por la comunidad.
              </p>
            </div>
            <div>
              <div className="fecha">
                <b>16 ene</b>
                <span>
                  <strong>Día Internacional de la Croqueta</strong>
                  <br />
                  Lanzamiento de la Ruta, 2027
                </span>
              </div>
              <div className="fecha">
                <b>1 oct</b>
                <span>
                  <strong>Día de la Croqueta en Miami</strong>
                  <br />
                  Premios anuales de la Ruta
                </span>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: 16 }}>Festivales</h2>
          <ul className="eventos">
            {eventos.map((e) => (
              <li key={e.nombre} className="tarjeta">
                <span className="etiqueta">{e.cuando}</span>
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="evento-nombre">
                  {e.nombre}
                </a>
                <span className="tenue" style={{ fontWeight: 700 }}>
                  {e.donde}
                </span>
                <span>{e.que}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="seccion">
          <h2>Para leer más</h2>
          <ul className="lista-suave">
            {lecturas.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.titulo}
                </a>{" "}
                <span className="tenue">· {l.fuente}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
