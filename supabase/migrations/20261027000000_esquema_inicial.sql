-- La Ruta de la Croqueta · esquema inicial
-- Catálogos, lugares y lo que hace cada usuario (comentarios, sellos del pasaporte, guardados).

create extension if not exists pgcrypto;

-- Catálogos -------------------------------------------------------------

create table if not exists public.zonas (
  clave  text primary key,
  nombre text not null
);

create table if not exists public.estilos (
  clave  text primary key,
  nombre text not null
);

create table if not exists public.sabores (
  clave  text primary key,
  nombre text not null
);

-- Lugares ---------------------------------------------------------------

create table if not exists public.lugares (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  nombre           text not null,
  tipo             text not null,
  direccion        text not null,
  zona             text not null references public.zonas (clave),
  estilo           text not null references public.estilos (clave),
  nota             text,
  google_place_id  text,
  -- Evaluación de Google tomada al crear el registro (octubre de 2026).
  -- En producción se debe consultar en vivo con Places API a partir de google_place_id,
  -- porque las condiciones de Google no permiten guardar estos datos.
  evaluacion_google numeric(2,1) check (evaluacion_google between 0 and 5),
  resenas_google    integer check (resenas_google >= 0),
  telefono         text,
  entrega          boolean,
  creado_en        timestamptz not null default now()
);

create index if not exists lugares_zona_estilo_idx on public.lugares (zona, estilo);

create table if not exists public.lugar_sabores (
  lugar_id uuid not null references public.lugares (id) on delete cascade,
  sabor    text not null references public.sabores (clave),
  primary key (lugar_id, sabor)
);

-- Lo que hace cada usuario ----------------------------------------------

create table if not exists public.comentarios (
  id         uuid primary key default gen_random_uuid(),
  lugar_id   uuid not null references public.lugares (id) on delete cascade,
  usuario_id uuid not null references auth.users (id) on delete cascade,
  nota       smallint not null check (nota between 1 and 5),
  textura    smallint check (textura between 1 and 5),
  relleno    smallint check (relleno between 1 and 5),
  precio     smallint check (precio between 1 and 5),
  texto      text check (char_length(texto) <= 2000),
  creado_en  timestamptz not null default now()
);

create index if not exists comentarios_lugar_idx on public.comentarios (lugar_id, creado_en desc);

create table if not exists public.sellos (
  usuario_id uuid not null references auth.users (id) on delete cascade,
  lugar_id   uuid not null references public.lugares (id) on delete cascade,
  creado_en  timestamptz not null default now(),
  primary key (usuario_id, lugar_id)
);

create table if not exists public.guardados (
  usuario_id uuid not null references auth.users (id) on delete cascade,
  lugar_id   uuid not null references public.lugares (id) on delete cascade,
  creado_en  timestamptz not null default now(),
  primary key (usuario_id, lugar_id)
);

-- Nota de la Ruta por lugar (promedio de la comunidad)
create or replace view public.notas_ruta
with (security_invoker = true) as
  select lugar_id, round(avg(nota)::numeric, 1) as nota_media, count(*) as total
  from public.comentarios
  group by lugar_id;

-- Seguridad (Row Level Security) ----------------------------------------

alter table public.zonas         enable row level security;
alter table public.estilos       enable row level security;
alter table public.sabores       enable row level security;
alter table public.lugares       enable row level security;
alter table public.lugar_sabores enable row level security;
alter table public.comentarios   enable row level security;
alter table public.sellos        enable row level security;
alter table public.guardados     enable row level security;

-- Lectura pública del catálogo y los lugares
create policy "lectura publica" on public.zonas         for select using (true);
create policy "lectura publica" on public.estilos       for select using (true);
create policy "lectura publica" on public.sabores       for select using (true);
create policy "lectura publica" on public.lugares       for select using (true);
create policy "lectura publica" on public.lugar_sabores for select using (true);

-- Comentarios: todos los leen; cada usuario escribe, edita y borra los suyos
create policy "lectura publica" on public.comentarios for select using (true);
create policy "crear el propio" on public.comentarios for insert with check (auth.uid() = usuario_id);
create policy "editar el propio" on public.comentarios for update using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);
create policy "borrar el propio" on public.comentarios for delete using (auth.uid() = usuario_id);

-- Sellos y guardados: privados de cada usuario
create policy "solo los propios" on public.sellos    for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);
create policy "solo los propios" on public.guardados for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);
