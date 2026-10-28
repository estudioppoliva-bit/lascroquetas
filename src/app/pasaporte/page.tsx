import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import { estilos, zonas } from "@/lib/datos";
import Pasaporte from "./Pasaporte";

export const metadata: Metadata = {
  title: "Mi Pasaporte croquetero",
  robots: { index: false },
};

export default function PaginaPasaporte() {
  return (
    <>
      <Encabezado activo="pasaporte" />
      <main className="contenedor" style={{ display: "flex", flexDirection: "column" }}>
        <nav aria-label="Ruta de navegación" className="migas">
          <Link href="/">Inicio</Link> › Mi pasaporte
        </nav>
        <Pasaporte
          estilos={Object.fromEntries(estilos.map((e) => [e.clave, e.nombre]))}
          zonas={Object.fromEntries(zonas.map((z) => [z.clave, z.nombre]))}
        />
      </main>
    </>
  );
}
