-- =============================================================================
-- 0003_clients_soft_delete — Archivado de clientes (soft-delete)
--
-- Un cliente con envíos NO se puede borrar (FK on delete restrict), y así debe
-- ser: se pierde historial, facturación y rastreo. En su lugar se ARCHIVA:
-- archived_at con timestamp lo saca de la cartera activa sin tocar su historial.
-- El borrado real queda solo para clientes sin ningún envío (duplicados/errores).
-- =============================================================================

alter table clients add column if not exists archived_at timestamptz;

-- Índice parcial: acelera el listado de la cartera activa (archived_at is null).
create index if not exists clients_active_idx on clients (created_at desc) where archived_at is null;
