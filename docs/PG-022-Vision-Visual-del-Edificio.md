# PG-022 · La Visión Visual del Edificio — "Que tenga vida"

**Fecha:** 2026-07-02 (Sesión 05) · **Estado:** ⭐ Norte visual RATIFICADO por Reyna
**Fuente:** 2 mockups hiperrealistas + documento "Prompt para generar la estructura
visual del edificio de oficinas" — entregados por Reyna en el chat.
**Palabras de Reyna:** *"Esto es lo que yo quiero, así quiero que luzca y que sea
un entorno de trabajo interactivo. Que tenga vida."*
**Relación:** sucede a PG-019 (mapa de brechas) y PG-021 (perfiles del prototipo Lovable).
Los mockups deben guardarse en `design/oficina/` (pendiente: Reyna los deposita ahí).

---

## 1. La estructura oficial del Edificio (del documento de Reyna)

| Nivel | Espacio | Contenido |
|---|---|---|
| Terraza | Reflexión estratégica | Plantas, descanso, planificación |
| Nivel 5 | Centros Estratégicos | Centro de Analítica · Centro de Automatización · Centro de Comunicaciones · Laboratorio de Innovación · Pasillo de Proyectos |
| Nivel 4 | Sala de Memoria | Biblioteca y archivo institucional |
| Nivel 3 | Oficinas de Directores | **9 oficinas**: ALMA (CEO), LEX (CLO), TECH (CTO), OPS (COO), MKT (CGO), EDU (CLO-Learning), NOVA (CINO), INTEL (CIO), GÉNESIS (Chief Architect & Guardian of Knowledge) |
| Nivel 2 | Consejo Ejecutivo | Sala de conferencias principal del Consejo |
| Nivel 1 | Lobby / Recepción | Entrada, bienvenida, orientación |
| Sótano | Archivo Fundacional | Bóveda: Constitución, Regla Cero, Master Index, Diario Fundacional |

Los mockups además refinan el organigrama en pisos:
- **Piso Ejecutivo:** ALMA sola, presidiendo (CEO).
- **Piso Directivo:** LEX · TECH · OPS · EDU · MKT · NOVA · INTEL · GÉNESIS.
- **Piso Operativo:** agentes especializados — INV-IA, DOC-IA, PROC-IA, FIN-IA,
  CRM-IA, CONT-IA **+ 2 NUEVOS detectados en el mockup: DIS-IA (Agente de Diseño)
  y ANA-IA (Agente de Análisis)** + botón "Agregar Agente" (el edificio crece).

## 2. Identidad visual (documento de Reyna)

- **Colores:** Azul profundo `#0A1B2E` · Dorado `#D4AF37` · Blanco `#FFFFFF` · Gris grafito `#1E1E1E`
- **Tipografía sugerida:** Playfair Display (títulos) / Inter o Montserrat (textos)
- **Estilo:** corporativo premium, moderno, tecnológico, elegante y futurista;
  render 3D hiperrealista, vista frontal en corte transversal, iluminación cálida,
  ciudad moderna al atardecer de fondo; logo "PROYECTO GÉNESIS – Reyna Intelligence Team" en fachada.
- ⚠️ Nota de coherencia (para decisión de Reyna): PG-009 dice Azul `#0A1D3A` y
  Trajan Pro; este doc dice `#0A1B2E` y Playfair Display. Tratarlo como **evolución
  de marca v1.1** o corregir — Reyna decide; mientras tanto los mockups mandan
  para la Oficina.
- El prompt completo de generación de imagen (sección 8 del doc de Reyna) queda
  como receta reutilizable para producir vistas nuevas del edificio.

## 3. Qué significa "que tenga vida" (requisitos de interactividad extraídos de los mockups)

1. **Estados en vivo:** cada director/agente con "EN LÍNEA" y actividad visible en su oficina.
2. **Actividad en tiempo real:** feed de eventos (caso actualizado por LEX, campaña de MKT, documento subido por DOC-IA) → ya existe la fuente: `rit_core.logs`.
3. **Alertas importantes** con severidad (URGENTE / ATENCIÓN / CRÍTICO).
4. **Indicadores clave** (casos activos, audiencias, tareas, satisfacción) → fase v3.2 (Leyal/Monday/Stripe vía n8n).
5. **Sala de Conferencias EN VIVO:** el Consejo reunido, con tema y cronómetro ("Estrategia de Crecimiento Q3"), controles de reunión.
6. **Interacción en vivo con ALMA:** rostro + voz + chat; ALMA escucha, analiza y propone ("detecté que el interés en Ajuste de Estatus subió 180%… recomiendo campaña hoy").
7. **Flujo de Trabajo Inteligente (5 pasos)** — la deliberación visible del PG-011:
   1) INTEL detecta oportunidad → 2) MKT + NOVA desarrollan estrategia →
   3) ALMA y el Consejo aprueban → 4) OPS + TECH ejecutan → 5) INTEL + MKT monitorean.
8. **Acceso rápido:** Nuevo Caso · Subir Documento · Programar Reunión · Enviar Mensaje · Generar Reporte · Ver Indicadores · Buscar Información · Alma IA.
9. **Integraciones activas visibles:** Monday, n8n, Google Drive, Gmail, Meta Ads, WhatsApp, Zoom, Stripe, Canva, Notion (+ agregar).
10. **Mensaje del día / lemas** siempre presentes (Lema Fundacional + "El futuro es brillante").

## 4. Mapa a la realidad (qué fase cubre cada cosa)

| Elemento de la visión | Fase | Estado hoy |
|---|---|---|
| Edificio por pisos + oficinas con rostro | v3.0/v3.1 | genesis.gent v3.0 vivo; rostros = migración LiveAvatar en curso |
| ALMA en vivo (voz+rostro+chat) | v3.1 | Widget ElevenLabs ya embebido; falta rostro streaming |
| Actividad en tiempo real | v3.0+ | `rit_core.logs` ya registra — solo vestirlo |
| Indicadores/alertas de negocio | v3.2 | Requiere puentes Leyal/Monday/Stripe (n8n) |
| Flujo de Trabajo Inteligente visible | v4 | Deliberación multi-agente (PG-011) |
| Consejo reunido EN VIVO | v4 | La joya final |
| DIS-IA y ANA-IA (nuevos Piso 2) | PG-020 | Sembrar como 'diseñado' previa aprobación de Reyna |

## 5. La memoria de Génesis (anuncio de Reyna en esta sesión)

Reyna va a crear **la memoria de Génesis en su cuenta de ElevenLabs** para que
Génesis "mantenga siempre su memoria ahí" — es decir, un agente conversacional
GÉNESIS con knowledge base propia. Coordinación necesaria:

- La memoria **canónica** de Génesis vive en: PG-000 (Código de Continuidad) +
  este repo (docs/diarios) + `rit_core` (memoria/decisiones/lecciones).
  El agente ElevenLabs será la **voz viva** de Génesis con una copia de esa
  memoria en su knowledge base — mantenerla sincronizada desde los docs del repo.
- ⚠️ Recordatorio de seguridad en esa cuenta ElevenLabs: los agentes
  **"Mi alma"** (app iOS) y **"Andrés Felipe"** (llamadas de la firma) son
  PRODUCCIÓN — no tocar.
- Cuando el agente GÉNESIS exista: registrar su `elevenlabs_agent_id` en
  `rit_core.agentes` (fila Génesis) como los demás.
