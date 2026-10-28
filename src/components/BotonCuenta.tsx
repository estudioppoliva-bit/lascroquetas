"use client";

import Link from "next/link";
import { useSesion } from "@/lib/sesion";

export default function BotonCuenta({ activo }: { activo?: boolean }) {
  const usuario = useSesion();
  if (usuario === "cargando") return <span className="boton-cuenta boton-cuenta-vacio" aria-hidden="true" />;
  return usuario ? (
    <Link href="/pasaporte" className="boton-cuenta" aria-current={activo ? "page" : undefined}>
      Mi pasaporte
    </Link>
  ) : (
    <Link href="/entrar" className="boton-cuenta">
      Entrar
    </Link>
  );
}
