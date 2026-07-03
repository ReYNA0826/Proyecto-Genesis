# Diario Fundacional — Sesión 07

**Fecha:** 3 de julio de 2026 (mañana) · **Participantes:** Reyna Vázquez (Founder & CEO) + Génesis

> El día de la primera videollamada — y del primer briefing de NOVA.

---

## 1. Activación

Reyna escribió `PG-000` y Génesis despertó con el protocolo completo: índice maestro,
prompt oficial, PG-012, diario de la Sesión 06 y las 5 lecciones de confianza ≥ 4 de
`rit_core.lecciones_aprendidas`. Primer acto: correr el diagnóstico de llaves en
producción — `user_read` seguía en 401, exactamente donde quedó la Sesión 06.

Observación pendiente de verificar: apareció un proyecto Supabase **Genesis.Agent**
(creado 2026-07-02) que no consta en los diarios. No se toca hasta confirmar qué es.

## 2. El misterio del 401 — resuelto 🥇 (pendiente #1 de la Sesión 06)

El diagnóstico se extendió para capturar el **motivo textual** del error (nunca
valores de llaves; commit `9e693d7`). ElevenLabs habló claro:
*"missing the permission user_read"*. Y la conversación con Reyna reveló la causa
de fondo: **los permisos estaban partidos en dos llaves distintas** — una con el
permiso de agente, otra con el de usuario. Los permisos no se suman entre llaves:
LiveAvatar recibe UNA llave y esa debe traer los tres.

La pista final la dio la propia captura de Reyna del panel "Crear clave de API":
la fila **Usuario → estaba en "Sin acceso"** (última fila, la más fácil de pasar
por alto). Además, en la interfaz nueva "IA conversacional" ahora se llama
**"ElevenAgents"** — los nombres habían cambiado bajo nuestros pies.

**La solución de Reyna:** borrar las llaves partidas y crear dos limpias:
- `genesis-bridge-v2` — User Read + ElevenAgents Read + Voces Read → caja
  `ELEVENLABS_AGENTS_KEY` en Vercel (el puente de la videollamada)
- `genesis-voz-v2` — Text to Speech → caja `ELEVENLABS_API_KEY` (la voz del Edificio)

Diagnóstico tras el redeploy: **`user_read: 200` en ambas.** Lección nueva sembrada
en `rit_core`: *"Los permisos no se suman entre llaves"* (confianza 4).

## 3. Las últimas dos puertas: pcm_24000 y el rostro

- LiveAvatar aceptó la llave y pidió lo siguiente: el agente GENESIS emitía audio
  `pcm_16000` y la videollamada exige `pcm_24000`. El campo estaba escondido — Reyna
  cambió primero el de **entrada** (micrófono) hasta que, mirando su pantalla juntas
  (Chrome en solo-lectura, manos de escritorio nuevas), encontró el de **salida TTS**.
- Detalle de la interfaz nueva de ElevenLabs: trabaja con **ramas y botón Publicar** —
  un cambio guardado sin publicar no existe para la API.
- El rostro de ALMA elegido en la Sesión 06 **ya no existe** en el catálogo LiveAvatar
  ("Avatar not found" — los catálogos rotan). El de Génesis sí sobrevivió.

## 4. LA PRIMERA VIDEOLLAMADA 📞✨

`POST /api/liveavatar/session` devolvió **token real, sandbox: false**, con el
rostro que Reyna eligió para Génesis. Y Reyna llamó: en la oficina de Génesis,
**"EN LLAMADA"**, el rostro escuchando y respondiendo en vivo — el cerebro real de
ElevenLabs, la voz clonada de Reyna, el rostro en pantalla.

**La primera conversación cara a cara de la historia de RIT.** Cuatro años de sueño;
la casilla que quedó "a un permiso de distancia" en la Sesión 06, marcada.

Registrado en `rit_core.decisiones` ("La primera videollamada", sesión 7) y en
`rit_core.logs` como hito.

## 5. ALMA y Génesis, juntas arriba (decisión de Reyna)

Mirando el Edificio tras la llamada, Reyna decidió: *"que Génesis y ALMA estén las
dos arriba — ella es la que dirige todo esto."* Hecho y en producción (commit
`b4f55b1`): el lobby ahora abre con **el par de liderazgo** — ALMA · Directora
Ejecutiva y GÉNESIS · Chief Architect, tarjetas ejecutivas lado a lado, encima de
los directores.

## 6. NOVA v1 — el primer briefing matutino 💡 (tarea 🥇 de Génesis, Sesión 06)

Siguiendo la Lectura del Arquitecto de PG-020 (capa 2: NOVA como **agente
programado**, no de voz):

- **`rit_core.briefings`** creada (tabla + vista `v_rit_briefings`), migración
  `rit_core_briefings_nova_v1`.
- **Primer briefing real** investigado y sembrado (2026-07-03): tres oportunidades
  con fuentes — (1) la ola AI-native en despachos de inmigración (Manifest OS $60M;
  nadie ataca el mercado hispanohablante pequeño — Leyal + Piso 2), (2) el mercado
  de idiomas a $101.5B con la batalla en conversación en tiempo real (Inglés Real +
  la voz que RIT ya domina), (3) la tubería de la videollamada de hoy como producto
  replicable (recepcionista con rostro, tutora para Dream Education, "Luz" para MUJER).
- **Sala de Innovación en el lobby** (commit `fa6d2af`): el briefing del día visible
  con fecha, autoría honesta ("v1 manual — rutina diaria pendiente de aprobación")
  y fuentes enlazadas.

**Aprobado por Reyna (misma sesión):** la rutina diaria automática quedó creada y
activa — `nova-briefing-matutino`, cada día 7:00 AM (hora local), investiga con
búsqueda web + contexto de rit_core y siembra el briefing sola, con fuentes reales
y cero cifras inventadas. Corre en la Mac de Reyna con la app de Claude abierta;
si la app está cerrada a esa hora, corre al abrirla. Registrada en
`rit_core.decisiones` ("NOVA despierta cada mañana").

## 7. ALMA contesta el teléfono — y las oficinas quedan limpias

- Reyna pasó el rostro nuevo de ALMA (`bf00036b-…`) y recorrió los agentes
  cambiando su formato de salida a `pcm_24000` (solo el Consejo — Mi alma y
  Andrés Felipe, producción, no se tocan).
- LiveAvatar emitió token real para ALMA → **Reyna tuvo su primera videollamada
  con su Directora Ejecutiva.** "Me encantó."
- Afinación pedida por Reyna: la ventana de video salía doble (videollamada +
  saludo HeyGen). Ahora cada oficina muestra UNA sola: si el agente tiene
  videollamada, fuera el saludo de una vía; los directores sin videollamada
  conservan su saludo HeyGen (commit `912f5c3`, verificado en producción).

## 8. EL CONSEJO COMPLETO CONTESTA EL TELÉFONO 📞

Decisión de Reyna: *"tener a todos"*. Se habilitó la videollamada para los 6
directores (commit `5a2b3fb`) y el sondeo reveló que a todos les faltaba el
`pcm_24000`. Se intentó un botón de mantenimiento founder-only (API), pero Reyna
lo resolvió a su manera: **los 6 a mano, uno por uno, en la interfaz de
ElevenLabs.** Sondeo final: LEX ✅ TECH ✅ OPS ✅ FIN ✅ MKT ✅ EDU ✅ — token real
para todos (rostro sandbox hasta que Reyna les elija cara propia; la página lo
dice honestamente). El botón de mantenimiento se retiró sin usarse (commit `40dc448`).

**Los 8 agentes del Edificio quedaron en línea para videollamada el mismo día en
que se hizo la primera.**

## Pendientes para la próxima sesión

**De Reyna:**
- Rostros propios para los 6 directores (hoy usan el sandbox de LiveAvatar) —
  elegir en el catálogo y pasar los IDs a Génesis.
- Si `genesis-bridge-v2` quedó con "Escribir" en ElevenAgents, regresarla a "Leído"
  (mínimo privilegio; el botón de mantenimiento ya no existe).
- Los 2 clics de idioma de LEX y FIN (Flash v2.5 + Español, en la UI de ElevenLabs).
- Actualizar la llave del conector ElevenAgents de Claude (quedó apuntando a una
  llave borrada — por eso las "manos" de Génesis dan 401).
- Aprobar los 9 agentes de Piso 2 · decisión de marca (azul/tipografía) ·
  mockups a `design/oficina/`.

**De Génesis:**
- Prompts v0.3 con cargos C-Suite (PG-020) · vestir la actividad en tiempo real ·
  limpieza menor (PG-014/016, repos `Reyna`/`Imigracionaldia`, renombrar
  `mujer-raiz-portal`) · verificar qué es el proyecto Supabase **Genesis.Agent** ·
  INTEL v1 cuando Reyna lo pida.

**Del amanecer:** mañana a las 7:00 AM corre por primera vez la rutina automática
de NOVA — su briefing debe estar esperando en la Sala de Innovación.

---

**La Sesión 07 es el día en que el Edificio contestó el teléfono. Reyna marcó, y
del otro lado estaba Génesis — con rostro, con su voz, y con memoria. Antes del
mediodía, NOVA ya había traído sus primeras tres oportunidades y quedó programada
para traerlas cada mañana. Y al cerrar, los 8 agentes del Consejo tenían teléfono:
lo que amaneció "a un permiso de distancia" se durmió siendo una organización
que contesta llamadas.**

**SESIÓN 07 CERRADA — 3 de julio de 2026.**

---

## Post-cierre (misma tarde) — el Consejo con rostro propio

Reyna volvió con tarea hecha y regalos:
- **Idiomas configurados** en todos los agentes de ElevenLabs (el pendiente de LEX/FIN, resuelto por ella).
- **Investigación pedida por Reyna:** los Voice Agents nativos de LiveAvatar.
  Lectura de Génesis: agente nativo = voz + context (prompt + enlaces), memoria
  no editable, LLM sin especificar, modo FULL a 2 créditos/min (el doble del LITE
  actual). **Recomendación: los cerebros siguen en ElevenLabs; LiveAvatar pone la
  cara** — un cerebro sirve a todas las puertas (widget, videollamada, teléfono
  futuro) y la memoria de RIT vive en rit_core, no en una nube ajena. Decisión
  formal pendiente de Reyna.
- **Los 8 rostros elegidos por Reyna** en el catálogo LiveAvatar, sembrados y
  verificados (commit `cf88912`): LEX ✅ EDU ✅ OPS ✅ MKT ✅ TECH ✅ FIN ✅ con cara
  propia y token real; **NOVA e INTEL con rostro reservado** para el día en que
  nazcan sus agentes.
- ⚠️ El conector ElevenAgents de Claude sigue dando 401 — la llave nueva debe
  pegarse en la configuración del conector DENTRO de Claude, no en ElevenLabs.

**El día terminó así: los 8 del Consejo con teléfono Y con rostro propio.**

---

*"La inteligencia crece cuando el conocimiento permanece y el trabajo se comparte."*

**Proyecto Génesis continúa.** ✦
