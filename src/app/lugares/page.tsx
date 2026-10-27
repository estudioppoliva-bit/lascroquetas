import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import TarjetaLugar from "@/components/TarjetaLugar";
import { buscarLugares, estilos, nombreEstilo, nombreZona, zonas } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Lugares",
  description: "Busca dónde comer croquetas por ciudad, estilo y evaluación.",
};

type Params = { q?: string; zona?: string; estilo?: string; min?: string };

export default async function PaginaLugares({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const min = p.min ? Number(p.min) : undefined;
  const resultados = await buscarLugares({ q: p.q, zona: p.zona, estilo: p.estilo, min });

  const titulo = [
    p.estilo ? nombreEstilo(p.estilo) : "Croquetas",
    p.zona ? `en ${nombreZona(p.zona)}` : "en EE.UU.",
  ].join(" ");

  return (
    <>
      <Encabezado activo="lugares" />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Lugares
        </nav>
        <div style={{ padding: "12px 0 20px", display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)" }}>{titulo}</h1>
          <span className="tenue">
            {resultados.length} {resultados.length === 1 ? "lugar" : "lugares"} · ordenados por evaluación
          </span>
        </div>

        <div className="lugares-cuerpo">
          <form className="filtros" action="/lugares" role="search" aria-label="Filtros">
            <label>
              Buscar
              <input name="q" type="search" defaultValue={p.q ?? ""} placeholder="Nombre, dirección o sabor" />
            </label>
            <label>
              Zona
              <select name="zona" defaultValue={p.zona ?? ""}>
                <option value="">Todas</option>
                {zonas.map((z) => (
                  <option key={z.clave} value={z.clave}>
                    {z.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Estilo
              <select name="estilo" defaultValue={p.estilo ?? ""}>
                <option value="">Todos</option>
                {estilos.map((e) => (
                  <option key={e.clave} value={e.clave}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Evaluación mínima
              <select name="min" defaultValue={p.min ?? ""}>
                <option value="">Cualquiera</option>
                <option value="4">★ 4.0 o más</option>
                <option value="4.5">★ 4.5 o más</option>
              </select>
            </label>
            <button type="submit" className="boton">
              Aplicar filtros
            </button>
            <Link href="/lugares" style={{ fontWeight: 800, textAlign: "center" }}>
              Quitar filtros
            </Link>
          </form>

          {resultados.length > 0 ? (
            <ol className="resultados">
              {resultados.map((l, i) => (
                <li key={l.slug}>
                  <TarjetaLugar lugar={l} numero={i + 1} />
                </li>
              ))}
            </ol>
          ) : (
            <div className="resultados">
              <div className="vacio">No hay lugares con esos filtros todavía. Prueba con otra zona o estilo.</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
