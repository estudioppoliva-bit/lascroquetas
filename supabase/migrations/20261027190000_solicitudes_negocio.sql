-- Solicitudes de negocios: dueños que quieren reclamar su ficha o información sobre planes.
-- Cualquiera puede enviar una solicitud; nadie puede leerlas desde la web (solo desde el panel de Supabase).

create table if not exists public.solicitudes_negocio (
  id          uuid primary key default gen_random_uuid(),
  creada_en   timestamptz not null default now(),
  negocio     text not null check (char_length(negocio) between 2 and 120),
  lugar_slug  text references public.lugares (slug) on delete set null,
  contacto    text not null check (char_length(contacto) between 2 and 80),
  cargo       text check (char_length(cargo) <= 60),
  email       text not null check (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefono    text check (char_length(telefono) <= 30),
  ciudad      text check (char_length(ciudad) <= 80),
  intereses   text[] not null default '{}' check (
                cardinality(intereses) <= 6
                and intereses <@ array['reclamar', 'destacado', 'fiestas', 'ofertas', 'patrocinio', 'marca']
              ),
  mensaje     text check (char_length(mensaje) <= 1500),
  estado      text not null default 'nueva' check (estado in ('nueva', 'contactada', 'verificada', 'descartada'))
);

create index if not exists solicitudes_negocio_creada_idx on public.solicitudes_negocio (creada_en desc);

alter table public.solicitudes_negocio enable row level security;

drop policy if exists "enviar solicitud" on public.solicitudes_negocio;
create policy "enviar solicitud" on public.solicitudes_negocio
  for insert to anon, authenticated
  with check (estado = 'nueva');

revoke all on public.solicitudes_negocio from anon, authenticated;
grant insert on public.solicitudes_negocio to anon, authenticated;
