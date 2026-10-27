import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import MapaRuta from "@/components/MapaRuta";
import TarjetaLugar from "@/components/TarjetaLugar";
import { marcas } from "@/data/contenido";
import { recetas } from "@/data/recetas";
import { buscarLugares, totales } from "@/lib/datos";

export default async function Portada() {
  const [cifras, mejores, todos] = await Promise.all([
    totales(),
    buscarLugares({ zona: "miami", estilo: "cu" }).then((l) => l.slice(0, 5)),
    buscarLugares(),
  ]);
  const conteo: Record<string, number> = {};
  for (const l of todos) conteo[l.zona] = (conteo[l.zona] ?? 0) + 1;

  return (
    <>
      <Encabezado />
      <main>
        <section className="contenedor portada">
          <div className="portada-texto">
            <span className="etiqueta">Miami y todo EE.UU.</span>
            <h1>Encuentra la croqueta perfecta, cerca de ti</h1>
            <p>
              Panaderías, ventanitas y restaurantes con su evaluación y dirección. Más recetas de {cifras.estilos}{" "}
              estilos del mundo y la historia de la croqueta.
            </p>
            <form action="/lugares" className="buscador" role="search">
              <label htmlFor="q" className="sr-only">
                Qué croqueta buscas
              </label>
              <input id="q" name="q" type="search" placeholder="Lugar o sabor: jamón, coxinha…" />
              <button type="submit" className="boton">
                Buscar
              </button>
            </form>
            <div className="cifras">
              <span>
                <strong>{cifras.lugares}</strong> lugares
              </span>
              <span>
                <strong>{cifras.zonas}</strong> zonas de EE.UU.
              </span>
              <span>
                <strong>{cifras.estilos}</strong> estilos
              </span>
            </div>
          </div>
          <div className="portada-arte">
            <CroquetaCoqueta ancho={300} titulo="La Croqueta Coqueta" />
          </div>
        </section>

        <section className="contenedor seccion" id="mapa">
          <div className="mapa-caja">
            <div className="mapa-texto">
              <span className="etiqueta">De estado en estado</span>
              <h2>La Croqueta Coqueta se va de ruta</h2>
              <p>
                De Miami a Honolulu, hay croquetas en {cifras.zonas} zonas de Estados Unidos. Toca una ciudad para ver sus
                lugares.
              </p>
            </div>
            <MapaRuta conteo={conteo} />
          </div>
        </section>

        <section className="contenedor seccion" id="lugares">
          <h2>Las mejor evaluadas en Miami</h2>
          <ol className="resultados">
            {mejores.map((l, i) => (
              <li key={l.slug}>
                <TarjetaLugar lugar={l} numero={i + 1} />
              </li>
            ))}
          </ol>
          <Link href="/lugares?zona=miami" className="boton boton-contorno" style={{ alignSelf: "flex-start" }}>
            Ver todos los lugares
          </Link>
        </section>

        <section className="contenedor seccion" id="estilos">
          <h2>Croquetas del mundo</h2>
          <div className="rejilla">
            {recetas.map((r) => (
              <Link key={r.clave} href={`/recetas/${r.clave}`} className="tarjeta">
                <strong style={{ fontFamily: "var(--display)", fontSize: 20 }}>{r.titulo}</strong>
                <span className="tenue">{r.origen} · Ver receta</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="contenedor seccion" id="festivales">
          <div className="banda-oscura">
            <div>
              <span className="etiqueta" style={{ color: "#FFB8D0" }}>
                La historia
              </span>
              <h2 style={{ marginTop: 10 }}>De la cocina francesa a la Calle 8</h2>
              <p>
                Nació en la corte francesa del siglo XVII para aprovechar las sobras. En el XIX se hizo de bechamel, España la
                convirtió en tapa, Cuba le dio su forma alargada y el exilio la trajo a las ventanitas de la Calle 8.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
                <Link href="/historia" className="boton">
                  Leer la historia
                </Link>
                <Link href="/historia#cuba" className="boton boton-claro">
                  La croqueta de sustancia
                </Link>
              </div>
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
                <b>Abril</b>
                <span>
                  <strong>Kroqueta Fest y Alacroqueta</strong>
                  <br />
                  Valencia y Alicante, España · <Link href="/historia#festivales" style={{ color: "#FFB8D0" }}>festivales</Link>
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
        </section>

        <section className="banda-hielo" id="congeladas">
          <div className="contenedor seccion" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 300px", display: "flex", gap: 16, alignItems: "center" }}>
              <CroquetaCoqueta ancho={110} congelada />
              <div>
                <h2>Congeladas</h2>
                <p style={{ margin: 0 }}>Para freír en casa.</p>
              </div>
            </div>
            <div className="rejilla" style={{ flex: "2 1 480px" }}>
              {marcas.slice(0, 3).map((m) => (
                <div key={m.nombre} className="tarjeta">
                  <strong>{m.nombre}</strong>
                  <span>{m.tiendas.join(", ") === m.nombre ? m.producto : m.tiendas.join(", ")}</span>
                </div>
              ))}
            </div>
            <Link href="/congeladas" className="boton" style={{ flex: "none" }}>
              Ver todas las congeladas
            </Link>
          </div>
        </section>

        <section className="contenedor seccion" id="negocios">
          <div className="tarjeta" style={{ background: "var(--rosa-suave)", border: 0, padding: 28 }}>
            <span className="etiqueta">Para negocios</span>
            <h2>¿Tienes un negocio de croquetas?</h2>
            <p style={{ margin: 0, maxWidth: "40em" }}>
              Reclama tu ficha gratis, sube fotos y precios, publica ofertas y recibe pedidos para fiestas. Los negocios que
              se sumen antes del 16 de enero serán fundadores de la Ruta.
            </p>
            <Link href="/negocios" className="boton" style={{ alignSelf: "flex-start", marginTop: 8 }}>
              Ver cómo funciona
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
