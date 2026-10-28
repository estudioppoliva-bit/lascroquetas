-- La Ruta de la Croqueta · comunidad
-- Perfiles públicos (solo el nombre que elige cada persona), una opinión por persona y lugar,
-- y reportes de comentarios para moderar.

-- Perfiles ----------------------------------------------------------------

create table if not exists public.perfiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nombre     text not null default 'Croquetero' check (char_length(nombre) between 2 and 40),
  creado_en  timestamptz not null default now()
);

alter table public.perfiles enable row level security;

drop policy if exists "lectura publica" on public.perfiles;
create policy "lectura publica" on public.perfiles for select using (true);
drop policy if exists "editar el propio" on public.perfiles;
create policy "editar el propio" on public.perfiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Al registrarse, se crea su perfil con el nombre que escribió (o "Croquetero").
create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  n text := left(trim(coalesce(new.raw_user_meta_data ->> 'nombre', '')), 40);
begin
  insert into public.perfiles (id, nombre)
  values (new.id, case when char_length(n) >= 2 then n else 'Croquetero' end)
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.crear_perfil() from public, anon, authenticated;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.crear_perfil();

-- Perfiles para quien ya exista
insert into public.perfiles (id) select id from auth.users on conflict (id) do nothing;

-- Comentarios: una opinión por persona y lugar, enlazada a su perfil -------

alter table public.comentarios drop constraint if exists comentarios_un_voto;
alter table public.comentarios add constraint comentarios_un_voto unique (lugar_id, usuario_id);

alter table public.comentarios drop constraint if exists comentarios_perfil_fk;
alter table public.comentarios
  add constraint comentarios_perfil_fk foreign key (usuario_id) references public.perfiles (id) on delete cascade;

-- Reportes de comentarios -----------------------------------------------

create table if not exists public.reportes (
  comentario_id uuid not null references public.comentarios (id) on delete cascade,
  usuario_id    uuid not null references auth.users (id) on delete cascade,
  motivo        text check (char_length(motivo) <= 300),
  creado_en     timestamptz not null default now(),
  primary key (comentario_id, usuario_id)
);

alter table public.reportes enable row level security;

drop policy if exists "reportar" on public.reportes;
create policy "reportar" on public.reportes
  for insert to authenticated with check ((select auth.uid()) = usuario_id);

revoke all on public.reportes from anon, authenticated;
grant insert on public.reportes to authenticated;
