# La Ruta de la Croqueta

App web para encontrar dónde comer croquetas en Miami y en todo EE.UU., con recetas de 11 estilos y la historia de la croqueta.
Dominio principal: **larutadelacroqueta.com** (también lascroquetas.com). Lanzamiento previsto: 16 de enero de 2027, Día Internacional de la Croqueta.

## Qué hay en esta primera versión

- **Portada** (`/`): buscador, las mejor evaluadas de Miami, estilos, historia y fechas, congeladas.
- **Lugares** (`/lugares`): búsqueda con filtros por zona, estilo y evaluación mínima.
- **Ficha de cada lugar** (`/lugares/[slug]`): 144 páginas generadas, una por lugar.
- **La Croqueta Coqueta**: la mascota en SVG, que pestañea y sonríe (la congelada tiembla).
- **App instalable** (manifest e icono).

## Cómo correrla en tu computadora

Necesitas Node.js 20 o más reciente.

```bash
npm install
cp .env.example .env.local   # y pega tu anon key de Supabase
npm run dev                  # abre http://localhost:3000
```

Sin `.env.local`, la app funciona igual con los datos de `src/data/lugares.json`.

## Base de datos (Supabase)

- `supabase/migrations/20261027000000_esquema_inicial.sql`: tablas de zonas, estilos, sabores, lugares, comentarios, sellos del pasaporte y guardados, con seguridad por filas (cada usuario solo toca lo suyo).
- `supabase/seed.sql`: carga las zonas, los estilos, los sabores y los 144 lugares.
- `supabase/migrations/20261027190000_solicitudes_negocio.sql`: solicitudes del formulario Para negocios. La web solo puede enviarlas; se leen en el panel de Supabase (Table Editor → solicitudes_negocio).

Para aplicarlos: en el panel de Supabase, abre el editor SQL, pega y ejecuta primero la migración y después `seed.sql`.

**Importante sobre Google:** la evaluación y el número de reseñas de Google que trae el registro inicial son de octubre de 2026. Las condiciones de Google Places no permiten guardar esos datos, así que en producción hay que consultarlos en vivo a partir de `google_place_id`.

## Estructura

```
src/app/            páginas (portada, lugares, ficha), estilos y manifest
src/components/     Encabezado, TarjetaLugar, CroquetaCoqueta
src/lib/datos.ts    lectura de lugares (Supabase o datos locales)
src/data/           datos iniciales: lugares.json y catalogo.json
supabase/           migración y datos iniciales
```

## Próximos pasos

- Inicio de sesión, comentarios y pasaporte con Supabase Auth.
- Datos en vivo de Google Places (teléfono, horario, entrega, fotos).
- Secciones de recetas, congeladas, festivales y negocios.
- Despliegue en Vercel con el dominio.
