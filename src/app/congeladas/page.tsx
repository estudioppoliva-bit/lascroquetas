import type { Metadata } from "next";
import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import { marcas, marcasMundo } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Congeladas",
  description: "Croquetas congeladas para freír en casa: marcas y dónde comprarlas en EE.UU.",
};

export default function PaginaCongeladas() {
  const tiendas = [...new Set(marcas.flatMap((m) => m.tiendas))];

  return (
    <>
      <Encabezado activo="congeladas" />
      <main>
        <div className="banda-hielo">
          <div className="contenedor">
            <nav aria-label="Ruta de navegación" className="migas" style={{ color: "var(--hielo-tinta)" }}>
              <Link href="/">Inicio</Link> › Congeladas
            </nav>
            <section className="cabecera-seccion">
              <div>
                <span className="etiqueta" style={{ color: "var(--hielo-tinta)" }}>
                  Para freír en casa
                </span>
                <h1>Congeladas</h1>
                <p>
                  Cuando el antojo llega a medianoche: las marcas de croquetas congeladas que se consiguen en EE.UU. y dónde
                  comprarlas.
                </p>
                <div className="chips" aria-label="Tiendas">
                  {tiendas.map((t) => (
                    <span key={t} className="chip chip-hielo">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <CroquetaCoqueta ancho={190} congelada titulo="La Croqueta Coqueta, muerta de frío" />
            </section>
          </div>
        </div>

        <div className="contenedor">
          <section className="seccion">
            <h2>Marcas en EE.UU.</h2>
            <ul className="rejilla-recetas">
              {marcas.map((m) => (
                <li key={m.nombre} className="tarjeta tarjeta-marca">
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="evento-nombre">
                    {m.nombre}
                  </a>
                  <span>{m.producto}</span>
                  <span className="tenue" style={{ fontWeight: 700, fontSize: 14 }}>
                    {m.donde}
                  </span>
                  <div className="chips">
                    {m.tiendas.map((t) => (
                      <span key={t} className="chip chip-hielo">
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <p className="tenue" style={{ margin: 0, fontSize: 14 }}>
              La disponibilidad cambia según la tienda y la temporada. Confirma en tu tienda antes de ir.
            </p>
          </section>

          <section className="seccion">
            <h2>Cómo freírlas</h2>
            <div className="rejilla">
              <div className="tarjeta">
                <strong>En aceite</strong>
                <span>Sin descongelar, a 350 °F, de 3 a 4 minutos, pocas a la vez para que el aceite no se enfríe.</span>
              </div>
              <div className="tarjeta">
                <strong>En freidora de aire</strong>
                <span>Rocíalas con un poco de aceite y cocínalas a 390 °F de 8 a 10 minutos, volteándolas a la mitad.</span>
              </div>
              <div className="tarjeta">
                <strong>Al horno</strong>
                <span>A 425 °F unos 15 minutos sobre papel de hornear, volteándolas a la mitad.</span>
              </div>
            </div>
            <p className="tenue" style={{ margin: 0, fontSize: 14 }}>
              Sigue siempre las instrucciones del paquete: cada marca tiene sus tiempos.
            </p>
          </section>

          <section className="seccion">
            <div className="tarjeta" style={{ background: "var(--hielo)", border: 0 }}>
              <h2>¿Prefieres las de panadería?</h2>
              <p style={{ margin: 0 }}>
                Muchas panaderías cubanas venden croquetas por docena, crudas o a medio freír, para terminarlas en casa.
                Pregunta en las de la Ruta.
              </p>
              <Link href="/lugares?estilo=cu&q=panadería" className="boton" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                Ver panaderías cubanas
              </Link>
            </div>
          </section>

          <section className="seccion">
            <h2>En otros países</h2>
            <p className="tenue" style={{ margin: 0 }}>
              Como referencia cultural: las marcas de congeladas más conocidas en otras tierras de croquetas.
            </p>
            <div className="rejilla">
              {marcasMundo.map((m) => (
                <div key={m.pais} className="tarjeta">
                  <strong>{m.pais}</strong>
                  <span>{m.nombres}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
