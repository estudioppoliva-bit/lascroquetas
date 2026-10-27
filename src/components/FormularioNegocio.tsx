"use client";

import { useActionState } from "react";
import { enviarSolicitud, type EstadoSolicitud } from "@/app/negocios/acciones";
import CroquetaCoqueta from "./CroquetaCoqueta";

const INTERESES: { valor: string; texto: string }[] = [
  { valor: "reclamar", texto: "Reclamar mi ficha" },
  { valor: "destacado", texto: "Perfil destacado" },
  { valor: "fiestas", texto: "Pedidos para fiestas" },
  { valor: "ofertas", texto: "Publicar ofertas" },
  { valor: "patrocinio", texto: "Patrocinar una ruta o los premios" },
  { valor: "marca", texto: "Tengo una marca de congeladas" },
];

const inicial: EstadoSolicitud = { ok: false, mensaje: "" };

export default function FormularioNegocio({
  lugares,
  lugarInicial,
}: {
  lugares: { slug: string; nombre: string }[];
  lugarInicial?: string;
}) {
  const [estado, accion, enviando] = useActionState(enviarSolicitud, inicial);

  if (estado.ok) {
    return (
      <div className="formulario-listo" role="status">
        <CroquetaCoqueta ancho={120} />
        <div>
          <h3>¡Solicitud enviada!</h3>
          <p>{estado.mensaje}</p>
        </div>
      </div>
    );
  }

  const error = (campo: string) =>
    estado.errores?.[campo] ? (
      <span className="campo-error" id={`error-${campo}`}>
        {estado.errores[campo]}
      </span>
    ) : null;
  const invalido = (campo: string) =>
    estado.errores?.[campo] ? { "aria-invalid": true, "aria-describedby": `error-${campo}` } : {};

  const v = estado.valores ?? {};
  const marcado = (i: string) => (estado.intereses ? estado.intereses.includes(i) : i === "reclamar");

  return (
    <form action={accion} className="formulario" key={JSON.stringify(estado)}>
      <div className="campos">
        <label>
          Nombre del negocio *
          <input name="negocio" defaultValue={v.negocio} required maxLength={120} autoComplete="organization" {...invalido("negocio")} />
          {error("negocio")}
        </label>
        <label>
          ¿Ya está en la Ruta?
          <select name="lugar" defaultValue={v.lugar ?? lugarInicial ?? ""}>
            <option value="">No está, o no lo sé</option>
            {lugares.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tu nombre *
          <input name="contacto" defaultValue={v.contacto} required maxLength={80} autoComplete="name" {...invalido("contacto")} />
          {error("contacto")}
        </label>
        <label>
          Tu cargo
          <input name="cargo" defaultValue={v.cargo} maxLength={60} placeholder="Dueña, gerente…" />
        </label>
        <label>
          Correo *
          <input name="email" defaultValue={v.email} type="email" required maxLength={160} autoComplete="email" {...invalido("email")} />
          {error("email")}
        </label>
        <label>
          Teléfono del negocio
          <input name="telefono" defaultValue={v.telefono} type="tel" maxLength={30} autoComplete="tel" />
        </label>
        <label>
          Ciudad
          <input name="ciudad" defaultValue={v.ciudad} maxLength={80} autoComplete="address-level2" />
        </label>
      </div>

      <fieldset className="intereses">
        <legend>¿Qué te interesa?</legend>
        {INTERESES.map((i) => (
          <label key={i.valor}>
            <input type="checkbox" name="intereses" value={i.valor} defaultChecked={marcado(i.valor)} />
            {i.texto}
          </label>
        ))}
      </fieldset>

      <label className="campo-ancho">
        Cuéntanos algo más
        <textarea name="mensaje" defaultValue={v.mensaje} rows={4} maxLength={1500} placeholder="Horario, croqueta estrella, si hacen pedidos por docena…" />
      </label>

      <label className="trampa" aria-hidden="true">
        No llenes este campo
        <input name="sitio_web" tabIndex={-1} autoComplete="off" />
      </label>

      {estado.mensaje && !estado.ok && (
        <p className="formulario-aviso" role="alert">
          {estado.mensaje}
        </p>
      )}

      <button type="submit" className="boton" disabled={enviando} style={{ alignSelf: "flex-start" }}>
        {enviando ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="tenue" style={{ margin: 0, fontSize: 14 }}>
        Solo usaremos estos datos para contactarte sobre tu ficha en la Ruta.
      </p>
    </form>
  );
}
