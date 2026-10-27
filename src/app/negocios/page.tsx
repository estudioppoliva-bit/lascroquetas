import type { Metadata } from "next";
import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import FormularioNegocio from "@/components/FormularioNegocio";
import lugaresLocales from "@/data/lugares.json";
import { totales } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Para negocios",
  description:
    "Reclama la ficha de tu panadería, ventanita o restaurante en La Ruta de la Croqueta: horario, fotos, ofertas y pedidos para fiestas.",
};

const VENTAJAS = [
  { titulo: "Tu ficha, a tu cargo", texto: "Corrige dirección, teléfono, horario y si tienes entrega a domicilio, drive-thru o ventanita." },
  { titulo: "Fotos y precios", texto: "Sube fotos de tus croquetas y del local, y el precio por unidad o por docena." },
  { titulo: "Croquetas recién salidas", texto: "Avisa a los croqueteros cercanos cuando sale una tanda calentita o hay una oferta." },
  { titulo: "Pedidos para fiestas", texto: "Recibe pedidos por docena, fritas o a medio freír, para cumpleaños y reuniones." },
  { titulo: "Responde a la comunidad", texto: "Contesta comentarios y da las gracias a quien sella tu croqueta en su Pasaporte." },
  { titulo: "Sabe cómo te va", texto: "Visitas a tu ficha, clics en \"Cómo llegar\" y llamadas, mes a mes." },
];

const PLANES = [
  {
    nombre: "Ficha básica",
    precio: "Gratis",
    nota: "Para todo negocio que venda croquetas",
    incluye: ["Reclamar y verificar tu ficha", "Datos, horario y servicios", "Fotos y precios", "Responder comentarios"],
    destacado: false,
  },
  {
    nombre: "Destacado",
    precio: "Precio de lanzamiento por anunciar",
    nota: "Condiciones especiales para los negocios fundadores",
    incluye: [
      "Todo lo de la ficha básica",
      "Primero en tu zona y en tu estilo",
      "Ofertas y avisos de croquetas recién salidas",
      "Pedidos para fiestas desde la app",
      "Estadísticas mensuales",
    ],
    destacado: true,
  },
  {
    nombre: "Marcas y patrocinios",
    precio: "A la medida",
    nota: "Para marcas de congeladas, distribuidores y eventos",
    incluye: [
      "Tu marca en la sección Congeladas",
      "Patrocinio de una ruta temática",
      "Premios anuales del 1 de octubre",
      "Festival de la Ruta en Miami",
    ],
    destacado: false,
  },
];

const PASOS = [
  { titulo: "Envía la solicitud", texto: "Con el formulario de abajo. Tarda dos minutos." },
  { titulo: "Verificamos", texto: "Te contactamos para confirmar que el negocio es tuyo antes de darte acceso." },
  { titulo: "Tu ficha es tuya", texto: "Actualizas lo que quieras y empiezas a recibir croqueteros." },
];

const PREGUNTAS = [
  {
    p: "¿Cuesta algo aparecer en la Ruta?",
    r: "No. Todos los lugares que venden croquetas pueden aparecer gratis, y reclamar la ficha también es gratis. Solo el perfil destacado y los patrocinios son de pago.",
  },
  {
    p: "Mi negocio no aparece. ¿Lo pueden añadir?",
    r: "Sí. Envía la solicitud eligiendo \"No está, o no lo sé\" y cuéntanos qué croquetas vendes.",
  },
  {
    p: "¿Puedo borrar un comentario negativo?",
    r: "No, para que la comunidad pueda confiar en la Ruta. Sí puedes responderlo y reportar comentarios falsos u ofensivos, que revisamos.",
  },
  {
    p: "¿Y la evaluación de Google?",
    r: "Se muestra tal cual la da Google, con su número de reseñas. Aparte, la Ruta tiene su propia nota de la comunidad, de 1 a 5 croquetas.",
  },
  {
    p: "¿Cuándo empieza?",
    r: "La Ruta se lanza el 16 de enero de 2027, Día Internacional de la Croqueta. Los negocios que se sumen antes serán los fundadores.",
  },
];

export default async function PaginaNegocios({ searchParams }: { searchParams: Promise<{ lugar?: string }> }) {
  const { lugar } = await searchParams;
  const cifras = await totales();
  const opciones = [...lugaresLocales]
    .map((l) => ({ slug: l.slug, nombre: l.nombre }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  const lugarInicial = opciones.some((o) => o.slug === lugar) ? lugar : undefined;
  const nombreLugar = opciones.find((o) => o.slug === lugarInicial)?.nombre;

  return (
    <>
      <Encabezado activo="negocios" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Para negocios
        </nav>

        <section className="cabecera-seccion">
          <div>
            <span className="etiqueta">Para panaderías, ventanitas, restaurantes y marcas</span>
            <h1>Tu croqueta merece que la encuentren</h1>
            <p>
              La Ruta reúne a la gente que sale a buscar croquetas a propósito. Reclama tu ficha gratis, muestra tus fotos
              y tus precios, y conviértete en parada obligatoria.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href="#solicitud" className="boton">
                Reclamar mi ficha
              </a>
              <a href="#planes" className="boton boton-contorno">
                Ver planes
              </a>
            </div>
            <div className="cifras">
              <span>
                <strong>{cifras.lugares}</strong> lugares en la Ruta
              </span>
              <span>
                <strong>{cifras.zonas}</strong> zonas de EE.UU.
              </span>
              <span>
                <strong>16 ene</strong> lanzamiento
              </span>
            </div>
          </div>
          <CroquetaCoqueta ancho={200} titulo="La Croqueta Coqueta" />
        </section>

        <section className="seccion">
          <h2>Qué puedes hacer en la Ruta</h2>
          <div className="rejilla-recetas" style={{ marginBottom: 0 }}>
            {VENTAJAS.map((v) => (
              <div key={v.titulo} className="tarjeta">
                <strong className="tarjeta-receta-titulo" style={{ fontSize: 20 }}>
                  {v.titulo}
                </strong>
                <span>{v.texto}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="seccion" id="planes">
          <h2>Planes</h2>
          <div className="planes">
            {PLANES.map((p) => (
              <div key={p.nombre} className={p.destacado ? "plan plan-destacado" : "plan"}>
                {p.destacado && <span className="plan-sello">Fundadores</span>}
                <h3>{p.nombre}</h3>
                <strong className="plan-precio">{p.precio}</strong>
                <span className="tenue">{p.nota}</span>
                <ul>
                  {p.incluye.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="seccion">
          <h2>Cómo funciona</h2>
          <ol className="pasos-negocio">
            {PASOS.map((p) => (
              <li key={p.titulo}>
                <strong>{p.titulo}</strong>
                <span>{p.texto}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="seccion" id="solicitud">
          <div className="solicitud-caja">
            <div className="solicitud-texto">
              <span className="etiqueta">Negocios fundadores</span>
              <h2>{nombreLugar ? `Reclama la ficha de ${nombreLugar}` : "Reclama tu ficha"}</h2>
              <p>
                Súmate antes del lanzamiento del 16 de enero y tu negocio será fundador de la Ruta, con condiciones
                especiales en el perfil destacado.
              </p>
            </div>
            <FormularioNegocio lugares={opciones} lugarInicial={lugarInicial} />
          </div>
        </section>

        <section className="seccion">
          <h2>Preguntas frecuentes</h2>
          <div className="preguntas">
            {PREGUNTAS.map((q) => (
              <details key={q.p}>
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
