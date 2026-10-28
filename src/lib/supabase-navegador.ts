"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let cliente: SupabaseClient | null | undefined;

// Cliente del navegador, con la sesión guardada en cookies. Solo usa la clave pública.
export function supabaseNavegador(): SupabaseClient | null {
  if (cliente !== undefined) return cliente;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cliente = url && clave ? createBrowserClient(url, clave) : null;
  return cliente;
}
