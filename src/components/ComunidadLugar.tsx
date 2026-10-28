"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Croquetitas, { MiniCroqueta } from "./Croquetitas";
import CroquetaCoqueta from "./CroquetaCoqueta";
import { useSesion } from "@/lib/sesion";
import { supabaseNavegador } from "@/lib/supabase-navegador";

type Comentario = {
  id: string;
  usuario_id: string;
  nota: number;
  textura: number | null;
  relleno: number | null;
  precio: number | null;
  texto: string | null;
  creado_en: string;
  perfiles: { nombre: string } | null;
};

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-US", { day: "numeric", month: "long", year: "numeric" });

export default function ComunidadLugar({
  slug,
  nombre,
  children,
}: {
  slug: string;
  nombre: string;
  children?: React.ReactNode;
}) {
  const usuario = useSesion();
  const uid = usuario && usuario !== "cargando" ? usuario.id : null;
  const [lugarId, setLugarId] = useState<string | null>(null);
  const conectado = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [comentarios, setComentarios] = useState<Comentario[] | null>(conectado ? null : []);
  const [version, setVersion] = useState(0);
  const [sellado, setSellado] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [reportados, setReportados] = useState<string[]>([]);

  // Carga el lugar y sus comentarios; se repite cada vez que cambia "version".
  useEffect(() => {
    const sb = supabaseNavegador();
    if (!sb) return;
    let vigente = true;
    (async () => {
      const { data: lugar } = await sb.from("lugares").select("id").eq("slug", slug).maybeSingle();
      if (!vigente) return;
      if (!lugar) {
        setComentarios([]);
        return;
      }
      setLugarId(lugar.id);
      const { data } = await sb
        .from("comentarios")
        .select("id, usuario_id, nota, textura, relleno, precio, texto, creado_en, perfiles(nombre)")
        .eq("lugar_id", lugar.id)
        .order("creado_en", { ascending: false })
        .limit(100);
      if (vigente) setComentarios((data as unknown as Comentario[]) ?? []);
    })();
    return () => {
      vigente = false;
    };
  }, [slug, version]);

  const cargar = () => setVersion((v) => v + 1);

  useEffect(() => {
    const sb = supabaseNavegador();
    if (!sb || !uid || !lugarId) return;
    sb.from("sellos").select("lugar_id").eq("lugar_id", lugarId).maybeSingle().then(({ data }) => setSellado(!!data));
    sb.from("guardados").select("lugar_id").eq("lugar_id", lugarId).maybeSingle().then(({ data }) => setGuardado(!!data));
  }, [uid, lugarId]);

  const mio = comentarios?.find((c) => c.usuario_id === uid);
  const otros = comentarios?.filter((c) => c.usuario_id !== uid) ?? [];
  const media = comentarios?.length ? comentarios.reduce((s, c) => s + c.nota, 0) / comentarios.length : null;
  const entrar = `/entrar?volver=${encodeURIComponent(`/lugares/${slug}`)}`;

  async function alternar(tabla: "sellos" | "guardados", activo: boolean, set: (v: boolean) => void) {
    const sb = supabaseNavegador();
    if (!sb || !uid || !lugarId) return;
    set(!activo);
    const { error } = activo
      ? await sb.from(tabla).delete().eq("lugar_id", lugarId).eq("usuario_id", uid)
      : await sb.from(tabla).insert({ lugar_id: lugarId, usuario_id: uid });
    if (error) {
      set(activo);
      setAviso("No se pudo guardar. Inténtalo de nuevo.");
    }
  }

  async function opinar(e: React.FormEvent<HTMLFormElement>) {
    const sb = supabaseNavegador();
    e.preventDefault();
    if (!sb || !uid || !lugarId) return;
    const f = new FormData(e.currentTarget);
    const num = (c: string) => (f.get(c) ? Number(f.get(c)) : null);
    const nota = num("nota");
    if (!nota) {
      setAviso("Elige tu nota de 1 a 5 croquetas.");
      return;
    }
    const texto = String(f.get("texto") ?? "").trim().slice(0, 2000) || null;
    const { error } = await sb.from("comentarios").upsert(
      { lugar_id: lugarId, usuario_id: uid, nota, textura: num("textura"), relleno: num("relleno"), precio: num("precio"), texto },
      { onConflict: "lugar_id,usuario_id" },
    );
    if (error) {
      setAviso("No se pudo publicar tu opinión. Inténtalo de nuevo.");
      return;
    }
    // Opinar sobre un lugar también lo sella en el Pasaporte.
    if (!sellado) {
      await sb.from("sellos").upsert({ lugar_id: lugarId, usuario_id: uid }, { onConflict: "usuario_id,lugar_id" });
      setSellado(true);
    }
    setAviso("");
    setEditando(false);
    cargar();
  }

  async function borrar() {
    const sb = supabaseNavegador();
    if (!sb || !mio) return;
    if (!window.confirm("¿Borrar tu opinión?")) return;
    await sb.from("comentarios").delete().eq("id", mio.id);
    cargar();
  }

  async function reportar(id: string) {
    const sb = supabaseNavegador();
    if (!sb || !uid) return;
    const { error } = await sb.from("reportes").insert({ comentario_id: id, usuario_id: uid });
    if (!error || error.code === "23505") setReportados((r) => [...r, id]);
  }

  return (
    <>
      <div className="notas">
        {children}
        <div className="nota-caja">
          <span className="tenue">Nota de la Ruta</span>
          {media !== null ? (
            <>
              <strong style={{ color: "var(--rosa-oscuro)" }}>{media.toFixed(1)} / 5</strong>
              <span style={{ display: "block", margin: "2px 0 4px" }}>
                <Croquetitas nota={media} />
              </span>
              <span className="tenue">
                {comentarios!.length} {comentarios!.length === 1 ? "opinión" : "opiniones"} de la comunidad
              </span>
            </>
          ) : (
            <>
              <strong style={{ color: "var(--rosa-oscuro)" }}>— / 5</strong>
              <span className="tenue">Aún sin notas de la comunidad</span>
            </>
          )}
        </div>
      </div>

      <div className="acciones-lugar">
        {uid ? (
          <>
            <button
              type="button"
              className={sellado ? "boton" : "boton boton-contorno"}
              aria-pressed={sellado}
              onClick={() => alternar("sellos", sellado, setSellado)}
            >
              {sellado ? "✓ Sellada en tu Pasaporte" : "¡Me la comí! Sellar"}
            </button>
            <button
              type="button"
              className="boton boton-contorno"
              aria-pressed={guardado}
              onClick={() => alternar("guardados", guardado, setGuardado)}
            >
              {guardado ? "♥ Guardado" : "♡ Guardar para ir"}
            </button>
          </>
        ) : usuario === null ? (
          <Link href={entrar} className="boton boton-contorno">
            Entra para sellar y guardar este lugar
          </Link>
        ) : null}
      </div>

      <section style={{ display: "flex", flexDirection: "column", gap: 14 }} aria-labelledby="titulo-comentarios">
        <h2 id="titulo-comentarios" style={{ fontSize: 26 }}>
          Comentarios de la Ruta
        </h2>

        {uid && (!mio || editando) && (
          <form className="formulario opinion" onSubmit={opinar}>
            <fieldset className="elegir-nota">
              <legend>Tu nota para {nombre}</legend>
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n}>
                  <input type="radio" name="nota" value={n} defaultChecked={mio?.nota === n} required />
                  <span className="elegir-nota-croquetas" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MiniCroqueta key={i} llena={i <= n} />
                    ))}
                  </span>
                  <span className="sr-only">{n} de 5 croquetas</span>
                </label>
              ))}
            </fieldset>
            <div className="campos">
              {(
                [
                  ["textura", "Textura"],
                  ["relleno", "Relleno"],
                  ["precio", "Precio"],
                ] as const
              ).map(([campo, texto]) => (
                <label key={campo}>
                  {texto}
                  <select name={campo} defaultValue={mio?.[campo] ?? ""}>
                    <option value="">Sin nota</option>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} de 5
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <label>
              ¿Qué tal estaban?
              <textarea
                name="texto"
                rows={3}
                maxLength={2000}
                defaultValue={mio?.texto ?? ""}
                placeholder="Crujientes, cremosas, de qué las pediste…"
              />
            </label>
            {aviso && (
              <p className="formulario-aviso" role="alert">
                {aviso}
              </p>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="submit" className="boton">
                {mio ? "Guardar cambios" : "Publicar mi opinión"}
              </button>
              {editando && (
                <button type="button" className="boton boton-contorno" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}

        {mio && !editando && (
          <article className="comentario comentario-mio">
            <div className="comentario-cabecera">
              <strong>Tu opinión</strong>
              <Croquetitas nota={mio.nota} />
            </div>
            {mio.texto && <p>{mio.texto}</p>}
            <div style={{ display: "flex", gap: 14 }}>
              <button type="button" className="enlace" onClick={() => setEditando(true)}>
                Editar
              </button>
              <button type="button" className="enlace" onClick={borrar}>
                Borrar
              </button>
            </div>
          </article>
        )}

        {comentarios === null ? (
          <p className="tenue">Cargando comentarios…</p>
        ) : otros.length === 0 && !mio ? (
          <div className="vacio">
            <CroquetaCoqueta ancho={90} />
            <span>
              ¡Nadie ha contado todavía cómo están estas croquetas!{" "}
              {usuario === null && (
                <Link href={entrar}>Entra y escribe la primera opinión.</Link>
              )}
            </span>
          </div>
        ) : (
          otros.map((c) => (
            <article key={c.id} className="comentario">
              <div className="comentario-cabecera">
                <strong>{c.perfiles?.nombre ?? "Croquetero"}</strong>
                <Croquetitas nota={c.nota} />
              </div>
              {(c.textura || c.relleno || c.precio) && (
                <div className="chips">
                  {c.textura && <span className="chip">Textura {c.textura}/5</span>}
                  {c.relleno && <span className="chip">Relleno {c.relleno}/5</span>}
                  {c.precio && <span className="chip">Precio {c.precio}/5</span>}
                </div>
              )}
              {c.texto && <p>{c.texto}</p>}
              <div className="comentario-pie">
                <span className="tenue">{fecha(c.creado_en)}</span>
                {uid &&
                  (reportados.includes(c.id) ? (
                    <span className="tenue">Reportado. Gracias.</span>
                  ) : (
                    <button type="button" className="enlace" onClick={() => reportar(c.id)}>
                      Reportar
                    </button>
                  ))}
              </div>
            </article>
          ))
        )}
        {aviso && !(uid && (!mio || editando)) && (
          <p className="formulario-aviso" role="alert">
            {aviso}
          </p>
        )}
      </section>
    </>
  );
}
