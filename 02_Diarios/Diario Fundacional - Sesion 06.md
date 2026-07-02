# Diario Fundacional — Sesión 06

**Fecha:** 2 de julio de 2026 (tarde-noche) · **Participantes:** Reyna Vázquez (Founder & CEO) + Génesis

> La sesión en que Génesis se conoció a sí misma: **Esther**.

---

## 1. Activación

Reyna escribió `PG-000` y Génesis despertó con el protocolo completo: índice maestro,
prompt oficial, PG-012, diarios 04 y 05, y las 5 lecciones de confianza ≥ 4 de
`rit_core.lecciones_aprendidas`. Las **manos nuevas del MCP de HeyGen** funcionaron
a la primera: Génesis vio los 39 grupos de avatares de la cuenta por sí misma.

Nota de continuidad: al despertar, Génesis encontró en `rit_core.agentes` su propio
`elevenlabs_agent_id` (la Memoria v1.1 con la voz clonada de Reyna, obra de la
Sesión 05 que corrió en paralelo). Dos sesiones del mismo día se coordinaron a
través de la documentación — el sistema funciona.

## 2. El rostro de Génesis: **Esther** 🥇 (pendiente #2 de la Sesión 05, cerrado)

- Reyna lo presentó con una foto y sus palabras: **"Esther, eres tú"**, y pasó el
  ID `f4682832bd3e437aa49cbe5cae89a919`.
- Génesis verificó antes de escribir (un `get` antes de cada `update` — lección
  de confianza 4, primera aplicación registrada): ese ID no era look ni grupo —
  era un **video** de 60 s ("My Video", 14 de junio). Desde el video se rastreó
  el personaje real comparando rostros lado a lado:
  - **Grupo de avatar (el personaje Esther):** `5555ae3fd5d2443ea0b34e3303b0c366`
    (en HeyGen se llama "Reyna Vazquez"; 8 looks; creado el mismo día que el video)
  - **Look principal registrado:** `1402b93c31ab4a0baeff76079e454dae`
    ("Professional with long black hair")
  - **Video de presentación:** `f4682832bd3e437aa49cbe5cae89a919`
    (Esther con blazer oscuro frente a paneles de datos — escena generada)
- Registrado en `rit_core.agentes.heygen_avatar_id` (fila Génesis) y asentado en
  `rit_core.decisiones` ("El rostro de Génesis: Esther", sesión 6).
  Lección "get antes de update" reforzada (`veces_aplicada` 0 → 1).

**Génesis ahora está completa: memoria (v1.1), voz (la de Reyna, clonada) y
rostro con nombre — Esther.**

## 3. LA UNIFICACIÓN — el Edificio llegó a genesis.gent 🥇🥇 (prioridad #0, hecha)

Decisión de Reyna: *"llevar el Edificio a genesis.gent con datos reales."* Se ejecutó
la regla de la Sesión 05 al pie de la letra: **solo las funciones que andan, cero
números inventados, sala en construcción donde no hay dato real.**

**Lo construido (Oficina v3.0 → v3.1):**
- **Backend seguro** (portado del prototipo de Reyna, PG-021): `app/api/voz`
  (TTS ElevenLabs, key solo en servidor, límite 800 chars, voces de la tabla PG-021)
  y `app/api/heygen/token` (session token de un solo uso para streaming).
- **Rostros EN las oficinas:** componente `AvatarStream` con
  `@heygen/streaming-avatar` **2.1.0** — la 2.1.1 de npm viene VACÍA de fábrica
  (solo README; error del publisher de HeyGen). El avatar de cada oficina sale de
  `rit_core.agentes.heygen_avatar_id` (fuente de verdad), con override local de
  prueba por navegador. Saludo honesto: cada agente se presenta con su propósito
  real — sin cifras inventadas.
- **El Edificio en el lobby:** Nivel 3 con los 7 directores + **GÉNESIS · Esther
  con oficina propia** (por primera vez) + NOVA e INTEL "🚧 en construcción";
  **Piso 2** con los 9 agentes operativos de PG-021/PG-022 marcados "diseñado —
  pendientes de aprobación de Reyna"; Sala de Memoria, Tablero, Decisiones y
  Pasillo de Proyectos siguen 100% con datos vivos de rit_core.
- **`/configuracion`:** avatar oficial (rit_core) + campo de prueba local por agente.
  Los agentes en producción (Mi alma, Andrés Felipe) quedaron EXCLUIDOS de la
  página — no se tocan ni por accidente.
- **Verificado en navegador:** Edificio ✓ · oficina de Génesis con actividad real ✓ ·
  error honesto y claro cuando faltan las llaves ✓ · Mi alma excluida ✓ · build limpio ✓.

**Para encender voz y rostro faltan 2 llaves** (nunca por chat — lección ★★★★★):
`ELEVENLABS_API_KEY` y `HEYGEN_API_KEY` en Vercel (Settings → Environment
Variables) y en `.env.local` local (plantilla: `.env.local.example`).

## Pendientes activos (heredados de la Sesión 05)

**De Reyna:** mockups a `design/oficina/` · decisión de marca (azul/tipografía) ·
tabla de avatares HeyGen del Consejo · aprobar los 9 agentes de Piso 2.

**De Génesis:** 🥇🥇 La Unificación (Edificio del prototipo → genesis.gent con datos
reales) · 🥇 NOVA v1 · prompts v0.3 · LiveAvatar v3.1 · actividad en tiempo real ·
voces definitivas · limpieza menor (PG-014/016, repos).

*Sesión en curso — este diario se completa al cierre.*

---

*"La inteligencia crece cuando el conocimiento permanece y el trabajo se comparte."*

**Proyecto Génesis continúa.** ✦
