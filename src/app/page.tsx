import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import TarjetaLugar from "@/components/TarjetaLugar";
import { buscarLugares, estilos, totales } from "@/lib/datos";

export default async function Portada() {
  const [cifras, mejores] = await Promise.all([
    totales(),
    buscarLugares({ zona: "miami", estilo: "cu" }).then((l) => l.slice(0, 5)),
  ]);

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
            {estilos.map((e) => (
              <Link key={e.clave} href={`/lugares?estilo=${e.clave}`} className="tarjeta">
                <strong style={{ fontFamily: "var(--display)", fontSize: 20 }}>{e.nombre}</strong>
                <span className="tenue">Ver lugares</span>
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
              <p>[Texto pendiente: cómo la croqueta nació en Francia, se hizo de bechamel en España y llegó a Cuba y a Miami.]</p>
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
                  Valencia y Alicante, España
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
              <div className="tarjeta">
                <strong>Catalina</strong>
                <span>Publix, Sedano&apos;s, Walmart, Winn-Dixie</span>
              </div>
              <div className="tarjeta">
                <strong>Trader Joe&apos;s</strong>
                <span>Papas rellenas</span>
              </div>
              <div className="tarjeta">
                <strong>José Andrés Foods</strong>
                <span>Croquetas de pollo, en línea</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contenedor seccion" id="negocios">
          <div className="tarjeta" style={{ background: "var(--rosa-suave)", border: 0 }}>
            <h2>¿Tienes un negocio de croquetas?</h2>
            <p style={{ margin: 0 }}>Muy pronto podrás reclamar tu ficha, actualizar horarios y publicar ofertas.</p>
          </div>
        </section>
      </main>
    </>
  );
}
