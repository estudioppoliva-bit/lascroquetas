import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// El enlace del correo trae aquí un código; lo cambiamos por una sesión y volvemos a donde estaba la persona.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const codigo = searchParams.get("code");
  const volver = searchParams.get("volver") ?? "/pasaporte";
  const destino = volver.startsWith("/") && !volver.startsWith("//") ? volver : "/pasaporte";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!codigo || !url || !clave) return NextResponse.redirect(`${origin}/entrar?error=enlace`);

  const almacen = await cookies();
  const supabase = createServerClient(url, clave, {
    cookies: {
      getAll: () => almacen.getAll(),
      setAll: (lista) => {
        for (const { name, value, options } of lista) almacen.set(name, value, options);
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(codigo);
  if (error) return NextResponse.redirect(`${origin}/entrar?error=enlace`);
  return NextResponse.redirect(`${origin}${destino}`);
}
