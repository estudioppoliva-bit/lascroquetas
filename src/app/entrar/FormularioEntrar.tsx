"use client";

import { useState } from "react";
import CroquetaCoqueta from "@/components/CroquetaCoqueta";
import { supabaseNavegador } from "@/lib/supabase-navegador";

export default function FormularioEntrar({ volver, errorEnlace }: { volver: string; errorEnlace: boolean }) {
  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "error">("listo");
  const [mensaje, setMensaje] = useState(errorEnlace ? "El enlace caducó o ya se usó. Pide uno nuevo." : "");
  const [correo, setCorreo] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const email = String(datos.get("email") ?? "").trim();
    const nombre = String(datos.get("nombre") ?? "").trim().slice(0, 40);
    const sb = supabaseNavegador();
    if (!sb) {
      setEstado("error");
      setMensaje("Las cuentas no están conectadas todavía.");
      return;
    }
    setEstado("enviando");
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirmar?volver=${encodeURIComponent(volver)}`,
        data: nombre ? { nombre } : undefined,
      },
    });
    if (error) {
      setEstado("error");
      setMensaje(
        error.status === 429
          ? "Hemos enviado demasiados correos seguidos. Espera unos minutos y vuelve a intentarlo."
          : "No pudimos enviar el correo. Revisa la dirección e inténtalo de nuevo.",
      );
      return;
    }
    setCorreo(email);
    setEstado("enviado");
  }

  if (estado === "enviado") {
    return (
      <div className="formulario-listo" role="status">
        <CroquetaCoqueta ancho={110} />
        <div>
          <h2 style={{ fontSize: 26 }}>¡Revisa tu correo!</h2>
          <p>
            Te enviamos un enlace a <strong>{correo}</strong>. Ábrelo en este mismo teléfono o computadora para entrar. Si
            no lo ves, mira en correo no deseado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <label>
        Tu correo
        <input name="email" type="email" required maxLength={160} autoComplete="email" />
      </label>
      <label>
        Cómo quieres que te llamemos <span className="tenue">(si es tu primera vez)</span>
        <input name="nombre" maxLength={40} autoComplete="given-name" placeholder="Así saldrá en tus opiniones" />
      </label>
      {mensaje && (
        <p className="formulario-aviso" role="alert">
          {mensaje}
        </p>
      )}
      <button type="submit" className="boton" disabled={estado === "enviando"} style={{ alignSelf: "flex-start" }}>
        {estado === "enviando" ? "Enviando…" : "Enviarme el enlace"}
      </button>
      <p className="tenue" style={{ margin: 0, fontSize: 14 }}>
        Sin contraseñas: cada vez que quieras entrar te mandamos un enlace al correo. Tu correo nunca se muestra en la Ruta.
      </p>
    </form>
  );
}
