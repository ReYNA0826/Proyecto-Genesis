-- ============================================================================
-- Piso 2 — organigrama como dato + siembra de los 7 agentes operativos
-- Sesión 09 (2026-07-07) · PG-020 (El Edificio Vivo) / PG-021 (perfiles) · Proyecto Génesis
-- ----------------------------------------------------------------------------
-- Aprobado por Reyna (regla de gobierno de GÉNESIS: la incorporación de nuevos
-- agentes requiere aprobación de la fundadora). Roster ratificado: los 7 de PG-021
-- (se reconcilia el "9" de PG-012 → 7). Los 7 nacen 'diseñado', reservados, sin voz
-- ni rostro (igual que NOVA/INTEL); voz/rostro/prompts y mockups son capas posteriores.
--
-- Nueva columna reporta_a: modela el organigrama de PG-020 como dato consultable.
-- Idempotente: la siembra no re-inserta si el nombre ya existe.
-- ============================================================================

-- 1) El organigrama se vuelve dato
ALTER TABLE rit_core.agentes ADD COLUMN IF NOT EXISTS reporta_a text;
COMMENT ON COLUMN rit_core.agentes.reporta_a IS
  'Organigrama (PG-020): nombre del superior directo. Piso 2 → su director; directores/NOVA/INTEL → ALMA; ALMA y Génesis → Reyna (par de liderazgo, S07). NULL = fuera de la cadena de RIT (agentes de producción).';

-- 2) Sembrar los 7 de Piso 2 (perfiles de PG-021)
INSERT INTO rit_core.agentes (nombre, proposito, estado, prompt_version, reporta_a)
SELECT v.nombre, v.proposito, 'diseñado', 'v0.1', v.reporta_a
FROM (VALUES
  ('LEX-IA',  'Agente Legal operativo (→LEX). Extrae datos de I-589/I-130/I-765, arma borradores base de cartas de soporte y rellena checklists por tipo de caso. Todo output pasa por LEX antes del abogado; no envía nada al cliente. Información general, no asesoría.', 'LEX'),
  ('INV-IA',  'Agente de Investigación (→LEX). Busca precedentes e información oficial en USCIS/EOIR/Federal Register, recopila country conditions y resúmenes de precedentes. Solo fuentes verificables con URL y fecha; no interpreta la ley, compila.', 'LEX'),
  ('DOC-IA',  'Agente Documental (→OPS). Renombra por la convención de la firma, clasifica por tipo y caso, y detecta duplicados y faltantes. Nunca borra sin confirmación de OPS; no comparte documentos externos sin aprobación.', 'OPS'),
  ('PROC-IA', 'Agente Procesal (→OPS). Sigue el estado procesal de cada caso (biometrics, hearings, RFEs) y dispara alertas 30/14/7/2 días antes de cada plazo; actualiza estatus en Monday. No presenta ante corte, solo alerta.', 'OPS'),
  ('FIN-IA',  'Agente Financiero (→FIN). Concilia Stripe↔Monday, envía recordatorios de cobro ya aprobados y genera reportes diarios. No modifica montos ni refunda ni ajusta sin FIN.', 'FIN'),
  ('CRM-IA',  'Agente de Clientes (→OPS). Mantiene el pulso de cada cliente: nota de contacto tras cada interacción, alertas de silencio mayor a 14 días y encuestas NPS post-milestone. Bilingüe y sin promesas; no responde consultas legales, deriva a LEX.', 'OPS'),
  ('CONT-IA', 'Agente de Contenido (→MKT). Genera drafts bilingües ES↔EN de captions, carruseles y reels desde el brief de MKT y sugiere hashtags por tema. Nada legal sin visto bueno de LEX vía MKT. No publica, solo entrega drafts.', 'MKT')
) AS v(nombre, proposito, reporta_a)
WHERE NOT EXISTS (SELECT 1 FROM rit_core.agentes a WHERE a.nombre = v.nombre);

-- 3) Cablear el organigrama de los agentes ya existentes (solo si aún no tienen superior)
UPDATE rit_core.agentes SET reporta_a='ALMA'
  WHERE nombre IN ('LEX','TECH','OPS','MKT','EDU','FIN','NOVA','INTEL') AND reporta_a IS NULL;
UPDATE rit_core.agentes SET reporta_a='Reyna'
  WHERE nombre IN ('ALMA','Génesis') AND reporta_a IS NULL;
