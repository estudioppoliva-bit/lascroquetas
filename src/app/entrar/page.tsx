import type { Metadata } from "next";
import Link from "next/link";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import Encabezado from "@/components/Encabezado";
import FormularioEntrar from "./FormularioEntrar";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entra en La Ruta de la Croqueta para sellar tu Pasaporte, guardar lugares y opinar.",
};

export default async function PaginaEntrar({
  searchParams,
}: {
  searchParams: Promise<{ volver?: string; error?: string }>;
}) {
  const p = await searchParams;
  const volver = p.volver?.startsWith("/") && !p.volver.startsWith("//") ? p.volver : "/pasaporte";

  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Entrar
        </nav>
        <section className="entrar">
          <div className="entrar-texto">
            <CroquetaCoqueta ancho={150} titulo="La Croqueta Coqueta" />
            <h1>Tu Pasaporte croquetero</h1>
            <p>Entra para sellar cada croqueta que pruebes, ganar insignias, guardar lugares y contar qué tal estaban.</p>
            <ul className="lista-suave">
              <li>Sella los lugares donde has comido croquetas.</li>
              <li>Gana insignias como &quot;Diez cubanas&quot; o &quot;La vuelta al mundo&quot;.</li>
              <li>Dale tu nota de 1 a 5 croquetas a cada lugar.</li>
            </ul>
          </div>
          <FormularioEntrar volver={volver} errorEnlace={p.error === "enlace"} />
        </section>
      </main>
    </>
  );
}
