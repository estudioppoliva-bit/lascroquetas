"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabaseNavegador } from "./supabase-navegador";

// Usuario con sesión iniciada, o null. "cargando" mientras se comprueba.
export function useSesion(): User | null | "cargando" {
  const conectado = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [usuario, setUsuario] = useState<User | null | "cargando">(conectado ? "cargando" : null);

  useEffect(() => {
    const sb = supabaseNavegador();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setUsuario(data.user ?? null));
    const { data } = sb.auth.onAuthStateChange((_evento, sesion) => setUsuario(sesion?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  return usuario;
}
