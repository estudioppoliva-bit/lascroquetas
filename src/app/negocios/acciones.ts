"use server";

import { supabase } from "@/lib/supabase";
import lugares from "@/data/lugares.json";

export type EstadoSolicitud = {
  ok: boolean;
  mensaje: string;
  errores?: Record<string, string>;
  // Lo que escribió la persona, para no perderlo si hay que corregir algo.
  valores?: Record<string, string>;
  intereses?: string[];
};

const INTERESES = ["reclamar", "destacado", "fiestas", "ofertas", "patrocinio", "marca"];
const slugs = new Set(lugares.map((l) => l.slug));

const texto = (f: FormData, campo: string, max: number) => String(f.get(campo) ?? "").trim().slice(0, max);

export async function enviarSolicitud(_previo: EstadoSolicitud, f: FormData): Promise<EstadoSolicitud> {
  // Campo trampa: las personas no lo ven; los robots lo rellenan.
  if (texto(f, "sitio_web", 200)) return { ok: true, mensaje: "¡Recibido!" };

  const datos = {
    negocio: texto(f, "negocio", 120),
    lugar_slug: texto(f, "lugar", 120) || null,
    contacto: texto(f, "contacto", 80),
    cargo: texto(f, "cargo", 60) || null,
    email: texto(f, "email", 160),
    telefono: texto(f, "telefono", 30) || null,
    ciudad: texto(f, "ciudad", 80) || null,
    intereses: f.getAll("intereses").map(String).filter((i) => INTERESES.includes(i)),
    mensaje: texto(f, "mensaje", 1500) || null,
  };

  const valores = Object.fromEntries(
    ["negocio", "lugar", "contacto", "cargo", "email", "telefono", "ciudad", "mensaje"].map((c) => [c, texto(f, c, 1500)]),
  );
  const conservar = { valores, intereses: datos.intereses };

  const errores: Record<string, string> = {};
  if (datos.negocio.length < 2) errores.negocio = "Escribe el nombre del negocio.";
  if (datos.contacto.length < 2) errores.contacto = "Escribe tu nombre.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(datos.email)) errores.email = "Revisa el correo.";
  if (datos.lugar_slug && !slugs.has(datos.lugar_slug)) datos.lugar_slug = null;
  if (Object.keys(errores).length) {
    return { ok: false, mensaje: "Faltan algunos datos.", errores, ...conservar };
  }

  if (!supabase) {
    return { ok: false, mensaje: "El formulario no está conectado todavía. Escríbenos más tarde.", ...conservar };
  }

  const { error } = await supabase.from("solicitudes_negocio").insert(datos);
  if (error) {
    console.error("No se pudo guardar la solicitud:", error.message);
    return { ok: false, mensaje: "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos.", ...conservar };
  }

  return {
    ok: true,
    mensaje: `¡Gracias, ${datos.contacto.split(" ")[0]}! Te escribiremos a ${datos.email} para verificar que el negocio es tuyo.`,
  };
}
