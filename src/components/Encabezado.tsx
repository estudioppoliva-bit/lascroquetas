import Link from "next/link";
import CroquetaCoqueta from "./CroquetaCoqueta";

type Seccion = "lugares" | "recetas" | "historia" | "congeladas";

const enlaces: { href: string; texto: string; seccion?: Seccion }[] = [
  { href: "/lugares", texto: "Lugares", seccion: "lugares" },
  { href: "/recetas", texto: "Croquetas y recetas", seccion: "recetas" },
  { href: "/historia", texto: "Historia", seccion: "historia" },
  { href: "/congeladas", texto: "Congeladas", seccion: "congeladas" },
  { href: "/historia#festivales", texto: "Festivales" },
  { href: "/#negocios", texto: "Para negocios" },
];

export default function Encabezado({ activo }: { activo?: Seccion }) {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado-fila">
        <Link href="/" className="marca">
          <CroquetaCoqueta ancho={56} animada={false} />
          <span>La Ruta de la Croqueta</span>
        </Link>
        <nav aria-label="Secciones" className="menu">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} aria-current={e.seccion && e.seccion === activo ? "page" : undefined}>
              {e.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
