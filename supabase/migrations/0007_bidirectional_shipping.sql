-- =============================================================================
-- 0007_bidirectional_shipping
-- Envíos en ambos sentidos: USA(TX) -> El Salvador y El Salvador -> USA(TX).
-- Direccion + destino US por envio; ubicaciones de eventos derivadas del sentido.
-- =============================================================================

do $$ begin
  create type shipment_direction as enum ('usa_to_sv', 'sv_to_usa');
exception when duplicate_object then null; end $$;

alter table shipments add column if not exists direction shipment_direction not null default 'usa_to_sv';

-- Destino en USA (se usa cuando direction = 'sv_to_usa'). El remitente sigue
-- siendo un cliente de la cartera (client_id).
alter table shipments add column if not exists us_recipient text;
alter table shipments add column if not exists us_address   text;
alter table shipments add column if not exists us_city      text;
alter table shipments add column if not exists us_state     text;
alter table shipments add column if not exists us_zip       text;

-- Evento inicial: la bodega de origen depende del sentido.
create or replace function public.create_initial_shipment_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.shipment_events (shipment_id, status, note, location)
  values (
    new.id,
    new.status,
    'Paquete recibido en bodega',
    case when new.direction = 'sv_to_usa' then 'El Salvador' else 'Texas, USA' end
  );
  return new;
end;
$$;

-- Cambio de estado: si no se pasa ubicación, se deriva del sentido del envío.
create or replace function public.update_shipments_status(
  p_ids uuid[],
  p_status text,
  p_note text default null,
  p_location text default null
) returns void
language plpgsql
as $$
begin
  if not public.is_admin() then
    raise exception 'No autorizado';
  end if;

  update shipments
     set status = p_status,
         delivered_at = case
           when p_status = 'delivered' then coalesce(delivered_at, now())
           else delivered_at
         end
   where id = any(p_ids);

  insert into shipment_events (shipment_id, status, note, location)
  select s.id, p_status, p_note,
    coalesce(
      p_location,
      case
        when p_status = 'to_airport'  and s.direction = 'usa_to_sv' then 'Texas, USA'
        when p_status = 'to_airport'  and s.direction = 'sv_to_usa' then 'El Salvador'
        when p_status = 'in_transit'                                then 'En vuelo'
        when p_status = 'at_customs'  and s.direction = 'usa_to_sv' then 'El Salvador'
        when p_status = 'at_customs'  and s.direction = 'sv_to_usa' then 'Estados Unidos'
        else null
      end
    )
  from shipments s
  where s.id = any(p_ids);
end;
$$;
