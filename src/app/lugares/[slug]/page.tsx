import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import lugaresLocales from "@/data/lugares.json";
import { cercanos, formatoNumero, nombreEstilo, nombreZona, obtenerLugar } from "@/lib/datos";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return lugaresLocales.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const lugar = await obtenerLugar((await params).slug);
  if (!lugar) return { title: "Lugar no encontrado" };
  return {
    title: lugar.nombre,
    description: `${nombreEstilo(lugar.estilo)} en ${lugar.nombre}, ${lugar.direccion}.`,
  };
}

export default async function FichaLugar({ params }: { params: Promise<Params> }) {
  const lugar = await obtenerLugar((await params).slug);
  if (!lugar) notFound();
  const otros = await cercanos(lugar);
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lugar.nombre} ${lugar.direccion}`)}`;

  return (
    <>
      <Encabezado activo="lugares" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › <Link href="/lugares">Lugares</Link> ›{" "}
          <Link href={`/lugares?zona=${lugar.zona}`}>{nombreZona(lugar.zona)}</Link> › {lugar.nombre}
        </nav>

        <div className="galeria" aria-label="Fotos del lugar (pendientes)" style={{ marginTop: 16 }}>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className="ficha-cuerpo">
          <div className="ficha-principal">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="chips">
                <span className="chip chip-rosa">{nombreEstilo(lugar.estilo)}</span>
                <span className="chip">{nombreZona(lugar.zona)}</span>
              </div>
              <h1>{lugar.nombre}</h1>
              <span className="tenue" style={{ fontSize: 17 }}>
                {lugar.tipo} · {lugar.direccion}
              </span>
              {lugar.nota && <p style={{ margin: 0, fontSize: 17 }}>{lugar.nota}</p>}
            </div>

            <div className="notas">
              <div className="nota-caja">
                <span className="tenue">Evaluación de Google</span>
                <strong>{lugar.evaluacion !== null ? `★ ${lugar.evaluacion.toFixed(1)}` : "—"}</strong>
                <span className="tenue">
                  {lugar.resenas !== null ? `${formatoNumero(lugar.resenas)} reseñas` : "Sin datos"}
                </span>
              </div>
              <div className="nota-caja">
                <span className="tenue">Nota de la Ruta</span>
                <strong style={{ color: "var(--rosa-oscuro)" }}>— / 5</strong>
                <span className="tenue">Aún sin notas de la comunidad</span>
              </div>
            </div>

            <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontSize: 26 }}>Comentarios de la Ruta</h2>
              <div className="vacio">
                <CroquetaCoqueta ancho={90} />
                <span>¡Nadie ha contado todavía cómo están estas croquetas! Muy pronto podrás escribir el primer comentario.</span>
              </div>
            </section>
          </div>

          <aside className="ficha-lateral" aria-label="Cómo llegar">
            <a href={mapa} className="boton" target="_blank" rel="noopener noreferrer">
              Cómo llegar
            </a>
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <dt className="tenue">Dirección</dt>
                <dd style={{ margin: 0, fontWeight: 700 }}>{lugar.direccion}</dd>
              </div>
              <div>
                <dt className="tenue">Teléfono, horario y entrega</dt>
                <dd style={{ margin: 0, fontWeight: 700 }}>Llegarán desde Google Places</dd>
              </div>
            </dl>
            <Link href={`/negocios?lugar=${lugar.slug}#solicitud`} style={{ fontWeight: 700, textAlign: "center" }}>
              ¿Eres el dueño? Reclama esta ficha
            </Link>
          </aside>
        </div>

        {otros.length > 0 && (
          <section className="seccion">
            <h2 style={{ fontSize: 26 }}>Más croquetas en {nombreZona(lugar.zona)}</h2>
            <div className="rejilla">
              {otros.map((o) => (
                <Link key={o.slug} href={`/lugares/${o.slug}`} className="tarjeta">
                  <strong>{o.nombre}</strong>
                  <span className="tenue">{o.direccion}</span>
                  {o.evaluacion !== null && (
                    <span style={{ fontWeight: 800 }}>
                      ★ {o.evaluacion.toFixed(1)}{" "}
                      {o.resenas !== null && <span className="tenue">({formatoNumero(o.resenas)})</span>}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
