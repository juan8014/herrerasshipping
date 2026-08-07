-- =============================================================================
-- 0004_departamentos_and_status_rpc
-- Departamento de El Salvador en el cliente + RPC transaccional de estados.
-- =============================================================================

-- Los 14 departamentos de El Salvador.
do $$ begin
  create type departamento_sv as enum (
    'Ahuachapán','Cabañas','Chalatenango','Cuscatlán','La Libertad','La Paz',
    'La Unión','Morazán','San Miguel','San Salvador','San Vicente','Santa Ana',
    'Sonsonate','Usulután'
  );
exception when duplicate_object then null; end $$;

alter table clients add column if not exists departamento departamento_sv;

-- Backfill: si la ciudad ya coincide con un departamento, usarla.
update clients
   set departamento = city::departamento_sv
 where departamento is null
   and city in ('Ahuachapán','Cabañas','Chalatenango','Cuscatlán','La Libertad',
                'La Paz','La Unión','Morazán','San Miguel','San Salvador',
                'San Vicente','Santa Ana','Sonsonate','Usulután');

-- =============================================================================
-- update_shipments_status — cambio de estado ATÓMICO (individual o en lote).
-- Actualiza estado + delivered_at y ESCRIBE un evento por cada envío, todo en
-- una transacción. Así el rastreo público nunca queda desincronizado.
-- Solo admin (chequeo explícito además de la RLS).
-- =============================================================================
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
  select id, p_status, p_note, p_location
    from shipments
   where id = any(p_ids);
end;
$$;

revoke all on function public.update_shipments_status(uuid[], text, text, text) from public;
grant execute on function public.update_shipments_status(uuid[], text, text, text) to authenticated;
