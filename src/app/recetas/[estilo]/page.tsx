import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Encabezado from "@/components/Encabezado";
import Ingredientes from "@/components/Ingredientes";
import TarjetaLugar from "@/components/TarjetaLugar";
import { obtenerReceta, otrasFormasGenerales, recetas } from "@/data/recetas";
import { buscarLugares, nombreEstilo } from "@/lib/datos";

type Params = { estilo: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return recetas.map((r) => ({ estilo: r.clave }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const receta = obtenerReceta((await params).estilo);
  if (!receta) return { title: "Receta no encontrada" };
  return { title: receta.titulo, description: receta.resumen };
}

export default async function PaginaReceta({ params }: { params: Promise<Params> }) {
  const receta = obtenerReceta((await params).estilo);
  if (!receta) notFound();
  const lugares = await buscarLugares({ estilo: receta.clave });
  const indice = recetas.findIndex((r) => r.clave === receta.clave);
  const siguiente = recetas[(indice + 1) % recetas.length];

  return (
    <>
      <Encabezado activo="recetas" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › <Link href="/recetas">Croquetas y recetas</Link> › {nombreEstilo(receta.clave)}
        </nav>

        <header className="receta-cabecera">
          <span className="etiqueta">{receta.origen}</span>
          <h1>{receta.titulo}</h1>
          <p>{receta.resumen}</p>
          <dl className="tiempos">
            {receta.tiempos.map((t) => (
              <div key={t.etiqueta}>
                <dt>{t.etiqueta}</dt>
                <dd>{t.valor}</dd>
              </div>
            ))}
            <div>
              <dt>Base</dt>
              <dd>{receta.base}</dd>
            </div>
          </dl>
        </header>

        <div className="receta-cuerpo">
          <aside className="receta-lateral">
            <Ingredientes grupos={receta.ingredientes} rinde={receta.rinde} unidad={receta.unidadRinde} />
          </aside>

          <div className="receta-principal">
            <section>
              <h2>Paso a paso</h2>
              <ol className="pasos">
                {receta.pasos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2>Variantes</h2>
              <div className="rejilla">
                {receta.variantes.map((v) => (
                  <div key={v.nombre} className="tarjeta">
                    <strong>{v.nombre}</strong>
                    <span>{v.texto}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Al horno, en freidora de aire o sin gluten</h2>
              <ul className="lista-suave">
                {otrasFormasGenerales.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <section className="historia-receta">
              <h2>La historia</h2>
              {receta.historia.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <Link href="/historia">Lee la historia completa de la croqueta</Link>
            </section>

            <p className="nota-prueba">
              Receta base de la Ruta. La estamos probando y fotografiando en nuestra cocina antes del lanzamiento.
            </p>
          </div>
        </div>

        <section className="seccion" id="donde">
          <h2>¿Dónde la como hecha?</h2>
          {lugares.length > 0 ? (
            <>
              <ol className="resultados">
                {lugares.slice(0, 4).map((l, i) => (
                  <li key={l.slug}>
                    <TarjetaLugar lugar={l} numero={i + 1} />
                  </li>
                ))}
              </ol>
              <Link
                href={`/lugares?estilo=${receta.clave}`}
                className="boton boton-contorno"
                style={{ alignSelf: "flex-start" }}
              >
                Ver los {lugares.length} lugares
              </Link>
            </>
          ) : (
            <p className="tenue">Todavía no tenemos lugares de este estilo. ¿Conoces uno?</p>
          )}
        </section>

        <section className="seccion">
          <Link href={`/recetas/${siguiente.clave}`} className="tarjeta" style={{ background: "var(--rosa-suave)", border: 0 }}>
            <span className="etiqueta">Siguiente receta</span>
            <strong className="tarjeta-receta-titulo">{siguiente.titulo}</strong>
            <span>{siguiente.resumen}</span>
          </Link>
        </section>
      </main>
    </>
  );
}
