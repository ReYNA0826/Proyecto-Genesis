-- Puente de logs de directores (PG-022 · Sesión 08)
-- ---------------------------------------------------------------------------
-- Registra actividad REAL de un agente del Consejo en rit_core.logs cuando
-- alguien inicia una conversación en vivo en su oficina (genesis.gent). Así su
-- oficina se "enciende" en el lobby (luces vivas v3.2).
--
-- Por qué una función SECURITY DEFINER: anon/authenticated solo tienen SELECT en
-- rit_core.logs (deny-by-default). En vez de abrir INSERT directo, esta función
-- corre con privilegios del owner PERO valida el agente contra rit_core.agentes
-- (whitelist) y usa texto fijo — no permite inserciones arbitrarias. search_path
-- fijo para evitar ataques de resolución de nombres.
--
-- La llama el servidor en app/api/liveavatar/session/route.js tras crear el token
-- de sesión (best-effort: un fallo de log jamás rompe la llamada). Dedup 10 min.
CREATE OR REPLACE FUNCTION public.registrar_conversacion_agente(p_agente text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, rit_core, pg_temp
AS $$
DECLARE
  v_nombre text;
BEGIN
  -- Solo agentes del Consejo activos y con oficina real (agente de ElevenLabs)
  SELECT nombre INTO v_nombre
  FROM rit_core.agentes
  WHERE lower(nombre) = lower(p_agente)
    AND estado = 'activo'
    AND elevenlabs_agent_id IS NOT NULL
  LIMIT 1;

  IF v_nombre IS NULL THEN
    RAISE EXCEPTION 'Agente no válido para registrar actividad: %', p_agente;
  END IF;

  -- Dedup: si ya hay una conversación registrada hace <10 min, no duplicar
  IF EXISTS (
    SELECT 1 FROM rit_core.logs
    WHERE origen = v_nombre
      AND evento LIKE 'Conversación en vivo%'
      AND created_at > now() - interval '10 minutes'
  ) THEN
    RETURN;
  END IF;

  INSERT INTO rit_core.logs (origen, evento)
  VALUES (v_nombre, 'Conversación en vivo en su oficina (genesis.gent)');
END;
$$;

REVOKE ALL ON FUNCTION public.registrar_conversacion_agente(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.registrar_conversacion_agente(text) TO anon, authenticated;
