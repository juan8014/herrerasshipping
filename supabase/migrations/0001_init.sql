-- =============================================================================
-- Herrera's Shipping — Esquema inicial
-- Migración: 0001_init
--
-- Fuente de verdad del esquema. Este archivo se aplica sobre Supabase (Postgres).
-- No editar la base a mano: todo cambio de esquema nace acá.
--
-- Modelo de dominio:
--   clients          -> cartera de clientes (base de clientes)
--   rates            -> tarifas por tipo de paquete, editables desde el dashboard
--   shipments        -> envíos; congela tarifa y fee al momento de crearse
--   shipment_events  -> historial de rastreo (timeline por envío)
-- =============================================================================

-- Extensiones -----------------------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- Secuencias legibles ---------------------------------------------------------
-- Códigos legibles para clientes (HS-0001) y números de rastreo (HS25-00001).
create sequence if not exists client_code_seq start 1;
create sequence if not exists tracking_seq start 1;

-- Trigger genérico de updated_at ----------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- clients — la cartera
-- =============================================================================
create table if not exists clients (
  id           uuid primary key default gen_random_uuid(),
  client_code  text unique not null default ('HS-' || lpad(nextval('client_code_seq')::text, 4, '0')),
  full_name    text not null,
  email        text,
  phone        text,
  address      text,           -- dirección de destino
  city         text,
  country      text,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger clients_set_updated_at
  before update on clients
  for each row execute function set_updated_at();

-- =============================================================================
-- rates — tarifas por tipo de paquete (editables desde el dashboard)
-- La categoría es la clave: agregar un tipo nuevo = insertar una fila (sin dev).
-- =============================================================================
create table if not exists rates (
  category     text primary key,                 -- online_purchase | encomienda | papers | food | other
  label        text not null,                    -- nombre visible en la UI
  rate_per_lb  numeric(10,2) not null check (rate_per_lb >= 0),
  default_fee  numeric(10,2) not null default 0 check (default_fee >= 0),
  active       boolean not null default true,
  updated_at   timestamptz not null default now()
);

create trigger rates_set_updated_at
  before update on rates
  for each row execute function set_updated_at();

-- Semilla de tipos. Los precios son placeholders: se editan desde el dashboard.
insert into rates (category, label, rate_per_lb, default_fee) values
  ('online_purchase', 'Compra en línea', 0, 0),
  ('encomienda',      'Encomienda',      0, 0),
  ('papers',          'Papeles',         0, 0),
  ('food',            'Comida',          0, 0),
  ('other',           'Otro',            0, 0)
on conflict (category) do nothing;

-- =============================================================================
-- shipments — envíos
-- total_price es una columna GENERADA: la base la calcula sola y no se puede
-- desincronizar. Congela rate_per_lb y shipping_fee al momento de crear el envío.
-- =============================================================================
create table if not exists shipments (
  id              uuid primary key default gen_random_uuid(),
  tracking_number text unique not null
                    default ('HS' || to_char(now(), 'YY') || '-' || lpad(nextval('tracking_seq')::text, 5, '0')),
  client_id       uuid not null references clients(id) on delete restrict,
  category        text not null references rates(category) on update cascade,
  description     text,
  weight_lb       numeric(10,2) not null check (weight_lb >= 0),
  rate_per_lb     numeric(10,2) not null check (rate_per_lb >= 0),   -- snapshot
  shipping_fee    numeric(10,2) not null default 0 check (shipping_fee >= 0), -- snapshot
  total_price     numeric(12,2) generated always as (weight_lb * rate_per_lb + shipping_fee) stored,
  status          text not null default 'received'
                    check (status in ('received','in_transit','at_customs','out_for_delivery','delivered','cancelled')),
  created_at      timestamptz not null default now(),
  delivered_at    timestamptz,
  updated_at      timestamptz not null default now()
);

create index if not exists shipments_client_id_idx on shipments (client_id);
create index if not exists shipments_status_idx    on shipments (status);

create trigger shipments_set_updated_at
  before update on shipments
  for each row execute function set_updated_at();

-- =============================================================================
-- shipment_events — historial de rastreo (timeline)
-- =============================================================================
create table if not exists shipment_events (
  id           uuid primary key default gen_random_uuid(),
  shipment_id  uuid not null references shipments(id) on delete cascade,
  status       text not null,
  note         text,
  location     text,
  created_at   timestamptz not null default now()
);

create index if not exists shipment_events_shipment_id_idx on shipment_events (shipment_id, created_at);

-- =============================================================================
-- Rastreo público (sin login)
-- El cliente NO accede a las tablas directamente. Consulta por número exacto
-- a través de esta función, que solo expone campos seguros del envío.
-- =============================================================================
create or replace function public.track_package(p_tracking text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'tracking_number', s.tracking_number,
    'category',        r.label,
    'weight_lb',       s.weight_lb,
    'status',          s.status,
    'created_at',      s.created_at,
    'delivered_at',    s.delivered_at,
    'events', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'status',     e.status,
          'note',       e.note,
          'location',   e.location,
          'created_at', e.created_at
        ) order by e.created_at
      )
      from shipment_events e
      where e.shipment_id = s.id
    ), '[]'::jsonb)
  )
  from shipments s
  join rates r on r.category = s.category
  where s.tracking_number = p_tracking;
$$;

-- =============================================================================
-- Row Level Security
-- Regla base: todo cerrado. El staff autenticado tiene acceso total.
-- El público solo puede rastrear vía la función track_package (arriba).
-- =============================================================================
alter table clients         enable row level security;
alter table rates           enable row level security;
alter table shipments       enable row level security;
alter table shipment_events enable row level security;

-- Staff autenticado: acceso completo.
-- (Cuando sumemos roles reales, se reemplaza `true` por un chequeo de rol.)
create policy staff_all_clients on clients
  for all to authenticated using (true) with check (true);

create policy staff_all_rates on rates
  for all to authenticated using (true) with check (true);

create policy staff_all_shipments on shipments
  for all to authenticated using (true) with check (true);

create policy staff_all_shipment_events on shipment_events
  for all to authenticated using (true) with check (true);

-- Acceso a la función de rastreo público.
revoke all on function public.track_package(text) from public;
grant execute on function public.track_package(text) to anon, authenticated;
