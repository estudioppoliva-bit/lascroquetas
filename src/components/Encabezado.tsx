import Link from "next/link";
import CroquetaCoqueta from "./CroquetaCoqueta";

export default function Encabezado({ activo }: { activo?: "lugares" }) {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <Link href="/" className="marca">
          <CroquetaCoqueta ancho={56} animada={false} />
          <span>La Ruta de la Croqueta</span>
        </Link>
        <nav aria-label="Secciones" className="menu">
          <Link href="/lugares" aria-current={activo === "lugares" ? "page" : undefined}>
            Lugares
          </Link>
          <Link href="/#estilos">Croquetas y recetas</Link>
          <Link href="/#congeladas">Congeladas</Link>
          <Link href="/#festivales">Festivales</Link>
          <Link href="/#negocios">Para negocios</Link>
        </nav>
      </div>
    </header>
  );
}
