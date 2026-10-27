import lugaresLocales from "@/data/lugares.json";
import catalogo from "@/data/catalogo.json";
import { supabase } from "@/lib/supabase";

export type Lugar = {
  slug: string;
  nombre: string;
  tipo: string;
  direccion: string;
  zona: string;
  estilo: string;
  evaluacion: number | null;
  resenas: number | null;
  nota: string | null;
};

export type Filtros = {
  q?: string;
  zona?: string;
  estilo?: string;
  min?: number;
};

export const zonas: { clave: string; nombre: string }[] = catalogo.zonas;
export const estilos: { clave: string; nombre: string }[] = catalogo.estilos;

export const nombreZona = (clave: string) => zonas.find((z) => z.clave === clave)?.nombre ?? clave;
export const nombreEstilo = (clave: string) => estilos.find((e) => e.clave === clave)?.nombre ?? clave;

const sinAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Lee de Supabase cuando hay credenciales; si no, usa los datos iniciales del repositorio.
async function todos(): Promise<Lugar[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("lugares")
      .select("slug, nombre, tipo, direccion, zona, estilo, nota, evaluacion_google, resenas_google");
    if (!error && data) {
      return data.map((l) => ({
        slug: l.slug,
        nombre: l.nombre,
        tipo: l.tipo,
        direccion: l.direccion,
        zona: l.zona,
        estilo: l.estilo,
        nota: l.nota,
        evaluacion: l.evaluacion_google === null ? null : Number(l.evaluacion_google),
        resenas: l.resenas_google,
      }));
    }
    console.error("No se pudo leer Supabase; se usan los datos locales.", error?.message);
  }
  return lugaresLocales as Lugar[];
}

export async function buscarLugares(f: Filtros = {}): Promise<Lugar[]> {
  const q = f.q ? sinAcentos(f.q.trim()) : "";
  return (await todos())
    .filter((l) => !f.zona || l.zona === f.zona)
    .filter((l) => !f.estilo || l.estilo === f.estilo)
    .filter((l) => !f.min || (l.evaluacion ?? 0) >= f.min)
    .filter((l) => !q || sinAcentos(`${l.nombre} ${l.direccion} ${l.nota ?? ""} ${l.tipo}`).includes(q))
    .sort((a, b) => (b.evaluacion ?? 0) - (a.evaluacion ?? 0) || (b.resenas ?? 0) - (a.resenas ?? 0));
}

export async function obtenerLugar(slug: string): Promise<Lugar | undefined> {
  return (await todos()).find((l) => l.slug === slug);
}

export async function cercanos(lugar: Lugar, cuantos = 3): Promise<Lugar[]> {
  return (await buscarLugares({ zona: lugar.zona })).filter((l) => l.slug !== lugar.slug).slice(0, cuantos);
}

export async function totales() {
  const t = await todos();
  return {
    lugares: t.length,
    zonas: new Set(t.map((l) => l.zona)).size,
    estilos: new Set(t.map((l) => l.estilo)).size,
  };
}

export const formatoNumero = (n: number) => n.toLocaleString("en-US");
