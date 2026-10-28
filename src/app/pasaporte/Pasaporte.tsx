"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import { INSIGNIAS, type SelloConLugar } from "@/lib/insignias";
import { useSesion } from "@/lib/sesion";
import { supabaseNavegador } from "@/lib/supabase-navegador";

type Fila = { creado_en: string; lugares: { slug: string; nombre: string; estilo: string; zona: string } | null };

export default function Pasaporte({
  estilos,
  zonas,
}: {
  estilos: Record<string, string>;
  zonas: Record<string, string>;
}) {
  const usuario = useSesion();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [sellos, setSellos] = useState<SelloConLugar[] | null>(null);
  const [guardados, setGuardados] = useState<SelloConLugar[]>([]);
  const [opiniones, setOpiniones] = useState(0);

  const uid = usuario && usuario !== "cargando" ? usuario.id : null;

  useEffect(() => {
    const sb = supabaseNavegador();
    if (!sb || !uid) return;
    const aLista = (filas: Fila[] | null) =>
      (filas ?? [])
        .filter((f) => f.lugares)
        .map((f) => ({ ...f.lugares!, fecha: f.creado_en }));
    sb.from("perfiles").select("nombre").eq("id", uid).maybeSingle().then(({ data }) => setNombre(data?.nombre ?? ""));
    sb.from("sellos")
      .select("creado_en, lugares(slug, nombre, estilo, zona)")
      .order("creado_en", { ascending: false })
      .then(({ data }) => setSellos(aLista(data as unknown as Fila[])));
    sb.from("guardados")
      .select("creado_en, lugares(slug, nombre, estilo, zona)")
      .order("creado_en", { ascending: false })
      .then(({ data }) => setGuardados(aLista(data as unknown as Fila[])));
    sb.from("comentarios")
      .select("id", { count: "exact", head: true })
      .eq("usuario_id", uid)
      .then(({ count }) => setOpiniones(count ?? 0));
  }, [uid]);

  if (usuario === "cargando") return <p className="tenue">Abriendo tu Pasaporte…</p>;

  if (!usuario) {
    return (
      <div className="vacio" style={{ flexWrap: "wrap" }}>
        <CroquetaCoqueta ancho={110} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span>Entra para ver tu Pasaporte croquetero, tus sellos y tus insignias.</span>
          <Link href="/entrar?volver=/pasaporte" className="boton" style={{ alignSelf: "flex-start" }}>
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  async function guardarNombre(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sb = supabaseNavegador();
    if (!sb || !uid) return;
    const nuevo = String(new FormData(e.currentTarget).get("nombre") ?? "").trim().slice(0, 40);
    if (nuevo.length < 2) return;
    const { error } = await sb.from("perfiles").update({ nombre: nuevo }).eq("id", uid);
    if (!error) {
      setNombre(nuevo);
      setEditandoNombre(false);
    }
  }

  async function salir() {
    await supabaseNavegador()?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const lista = sellos ?? [];
  const estilosProbados = new Set(lista.map((s) => s.estilo)).size;
  const zonasVisitadas = new Set(lista.map((s) => s.zona)).size;

  return (
    <>
      <section className="pasaporte-portada">
        <div className="pasaporte-tapa">
          <span className="etiqueta" style={{ color: "#FFB8D0" }}>
            Pasaporte croquetero
          </span>
          {editandoNombre ? (
            <form onSubmit={guardarNombre} className="nombre-form">
              <label className="sr-only" htmlFor="nombre">
                Tu nombre en la Ruta
              </label>
              <input id="nombre" name="nombre" defaultValue={nombre} minLength={2} maxLength={40} required />
              <button type="submit" className="boton">
                Guardar
              </button>
            </form>
          ) : (
            <h1>
              {nombre || "…"}{" "}
              <button type="button" className="enlace enlace-claro" onClick={() => setEditandoNombre(true)}>
                Cambiar nombre
              </button>
            </h1>
          )}
          <div className="cifras cifras-claras">
            <span>
              <strong>{lista.length}</strong> {lista.length === 1 ? "sello" : "sellos"}
            </span>
            <span>
              <strong>{estilosProbados}</strong> de 11 estilos
            </span>
            <span>
              <strong>{zonasVisitadas}</strong> {zonasVisitadas === 1 ? "zona" : "zonas"}
            </span>
            <span>
              <strong>{opiniones}</strong> {opiniones === 1 ? "opinión" : "opiniones"}
            </span>
          </div>
        </div>
        <CroquetaCoqueta ancho={170} titulo="La Croqueta Coqueta" />
      </section>

      <section className="seccion">
        <h2>Insignias</h2>
        <ul className="insignias">
          {INSIGNIAS.map((i) => {
            const hecho = Math.min(i.progreso(lista, opiniones), i.meta);
            const ganada = hecho >= i.meta;
            return (
              <li key={i.clave} className={ganada ? "insignia insignia-ganada" : "insignia"}>
                <span className="insignia-sello" aria-hidden="true">
                  {ganada ? "★" : `${hecho}/${i.meta}`}
                </span>
                <strong>{i.nombre}</strong>
                <span className="tenue">{i.descripcion}</span>
                <progress value={hecho} max={i.meta} aria-label={`${hecho} de ${i.meta}`} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="seccion">
        <h2>Mis sellos</h2>
        {sellos === null ? (
          <p className="tenue">Cargando…</p>
        ) : lista.length === 0 ? (
          <div className="vacio">
            <CroquetaCoqueta ancho={90} />
            <span>
              ¡Esta todavía no la has probado! Busca un lugar y pulsa <strong>¡Me la comí!</strong> para sellarlo.{" "}
              <Link href="/lugares">Ver lugares</Link>
            </span>
          </div>
        ) : (
          <ul className="sellos">
            {lista.map((s) => (
              <li key={s.slug}>
                <Link href={`/lugares/${s.slug}`} className="sello">
                  <span className="sello-marca" aria-hidden="true">
                    ✓
                  </span>
                  <strong>{s.nombre}</strong>
                  <span className="tenue">
                    {estilos[s.estilo] ?? s.estilo} · {zonas[s.zona] ?? s.zona}
                  </span>
                  <span className="tenue" style={{ fontSize: 13 }}>
                    {new Date(s.fecha).toLocaleDateString("es-US", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="seccion">
        <h2>Guardados para ir</h2>
        {guardados.length === 0 ? (
          <p className="tenue" style={{ margin: 0 }}>
            Aún no has guardado lugares. En cada ficha, pulsa <strong>♡ Guardar para ir</strong>.
          </p>
        ) : (
          <ul className="sellos">
            {guardados.map((s) => (
              <li key={s.slug}>
                <Link href={`/lugares/${s.slug}`} className="sello sello-guardado">
                  <span className="sello-marca" aria-hidden="true">
                    ♥
                  </span>
                  <strong>{s.nombre}</strong>
                  <span className="tenue">
                    {estilos[s.estilo] ?? s.estilo} · {zonas[s.zona] ?? s.zona}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button type="button" className="boton boton-contorno" onClick={salir} style={{ alignSelf: "flex-start", marginBottom: 40 }}>
        Salir de mi cuenta
      </button>
    </>
  );
}
