-- =============================================================================
-- 0006_initial_shipment_event_trigger
-- Al crear un envío, nace con su primer evento de rastreo ("Recibido en bodega").
-- Garantiza que todo envío tenga timeline desde el inicio, sin importar la fuente.
-- =============================================================================

create or replace function public.create_initial_shipment_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.shipment_events (shipment_id, status, note, location)
  values (new.id, new.status, 'Paquete recibido en bodega', 'Texas, USA');
  return new;
end;
$$;

drop trigger if exists shipments_initial_event on shipments;
create trigger shipments_initial_event
  after insert on shipments
  for each row execute function public.create_initial_shipment_event();
