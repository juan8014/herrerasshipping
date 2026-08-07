-- =============================================================================
-- 0005_add_to_airport_status
-- Agrega el estado 'to_airport' (Rumbo al aeropuerto) al ciclo de vida del envío.
-- Ciclo: received -> to_airport -> in_transit -> at_customs -> out_for_delivery
--        -> delivered  (+ cancelled)
-- =============================================================================

alter table shipments drop constraint if exists shipments_status_check;

alter table shipments add constraint shipments_status_check
  check (status in (
    'received',
    'to_airport',
    'in_transit',
    'at_customs',
    'out_for_delivery',
    'delivered',
    'cancelled'
  ));
