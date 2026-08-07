-- =============================================================================
-- 0002_auth_roles — Cuentas de usuario con roles (admin | client)
--
-- Reemplaza la "quemada" ADMIN_EMAIL por control de acceso basado en base de
-- datos. Cada usuario de auth.users tiene un profile con un rol. El acceso al
-- dashboard se decide por rol = 'admin'; los clientes (rol por defecto) quedan
-- listos para el self-service futuro (ver su propio historial de envíos).
-- =============================================================================

-- Enum de roles ---------------------------------------------------------------
do $$ begin
  create type user_role as enum ('admin', 'client');
exception when duplicate_object then null; end $$;

-- profiles: 1 fila por usuario de auth. role define el acceso; client_id enlaza
-- (opcional) a un registro de la cartera de clientes para el self-service futuro.
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        user_role not null default 'client',
  client_id   uuid references clients(id) on delete set null,
  full_name   text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- Crea el profile automáticamente al registrarse (rol client por defecto).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Chequeo de admin. SECURITY DEFINER => lee profiles sin disparar RLS (evita recursión).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Backfill: profiles para usuarios de auth que ya existan.
insert into public.profiles (id, email, full_name)
select u.id, u.email, coalesce(u.raw_user_meta_data->>'full_name', u.email)
from auth.users u
on conflict (id) do nothing;

-- RLS: profiles ---------------------------------------------------------------
alter table profiles enable row level security;

drop policy if exists profiles_read_own on profiles;
create policy profiles_read_own on profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_admin_manage on profiles;
create policy profiles_admin_manage on profiles
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- RLS por rol en las tablas de negocio ----------------------------------------
-- clients: admin total; cliente lee su propio registro.
drop policy if exists staff_all_clients on clients;
drop policy if exists admin_all_clients on clients;
create policy admin_all_clients on clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists client_read_own_client on clients;
create policy client_read_own_client on clients
  for select to authenticated
  using (id = (select client_id from profiles where id = auth.uid()));

-- rates: lectura para cualquier autenticado; escritura solo admin.
drop policy if exists staff_all_rates on rates;
drop policy if exists admin_all_rates on rates;
drop policy if exists read_rates on rates;
create policy admin_all_rates on rates
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy read_rates on rates
  for select to authenticated using (true);

-- shipments: admin total; cliente lee solo los suyos.
drop policy if exists staff_all_shipments on shipments;
drop policy if exists admin_all_shipments on shipments;
create policy admin_all_shipments on shipments
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists client_read_own_shipments on shipments;
create policy client_read_own_shipments on shipments
  for select to authenticated
  using (client_id = (select client_id from profiles where id = auth.uid()));

-- shipment_events: admin total; cliente lee los de sus envíos.
drop policy if exists staff_all_shipment_events on shipment_events;
drop policy if exists admin_all_shipment_events on shipment_events;
create policy admin_all_shipment_events on shipment_events
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists client_read_own_events on shipment_events;
create policy client_read_own_events on shipment_events
  for select to authenticated
  using (exists (
    select 1 from shipments s
    where s.id = shipment_events.shipment_id
      and s.client_id = (select client_id from profiles where id = auth.uid())
  ));
