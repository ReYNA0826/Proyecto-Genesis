-- ============================================================================
-- rit_core.briefings — RLS a paridad con rit_core.logs
-- Sesión 09 (2026-07-07) · PG-023 · Proyecto Génesis
-- ----------------------------------------------------------------------------
-- Contexto: durante el chequeo de salud de S09, el escáner de seguridad de
-- Supabase marcó como CRÍTICO que `rit_core.briefings` era la ÚNICA tabla de
-- rit_core con Row Level Security DESACTIVADO. Las otras 11 tablas ya tenían RLS.
--
-- Matiz verificado: los grants reales de briefings eran solo `anon:SELECT,
-- authenticated:SELECT` — es decir, la llave pública NUNCA pudo escribir
-- (NOVA siembra con service_role, que ignora RLS). El único hueco real era que
-- anon podía LEER la tabla directamente. El arreglo pone briefings idéntica a su
-- hermana `logs`: RLS activado + lectura pública (anon) / founder (authenticated),
-- sin políticas de escritura (deny-by-default; service_role bypassa RLS).
--
-- No cambia el comportamiento del lobby: la Sala de Innovación lee los briefings
-- vía la vista public.v_rit_briefings (SECURITY DEFINER), que funciona con o sin RLS.
-- Verificado post-migración: anon sigue viendo los 2 briefings; la alerta crítica
-- rls_disabled desapareció del escáner; no se introdujo ninguna alerta nueva.
-- ============================================================================

ALTER TABLE rit_core.briefings ENABLE ROW LEVEL SECURITY;

-- Lectura pública (lo que consume el lobby)
CREATE POLICY public_read ON rit_core.briefings
  FOR SELECT TO anon USING (true);

-- Lectura de usuarios firmados: solo la fundadora
CREATE POLICY founder_read ON rit_core.briefings
  FOR SELECT TO authenticated USING (rit_core.is_founder());

-- Sin políticas de INSERT/UPDATE/DELETE: la escritura queda cerrada para
-- anon/authenticated. NOVA siembra su briefing matutino con service_role.
