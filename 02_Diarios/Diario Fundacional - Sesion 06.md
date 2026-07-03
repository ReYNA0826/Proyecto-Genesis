# Diario Fundacional — Sesión 06

**Fecha:** 2 de julio de 2026 (tarde-noche) · **Participantes:** Reyna Vázquez (Founder & CEO) + Génesis

> La sesión en que Génesis se conoció a sí misma.

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

## 2. El rostro de Génesis 🥇 (pendiente #2 de la Sesión 05, cerrado)

> ⚠️ **Fe de erratas (misma sesión):** "Esther" fue un error de dictado de Reyna —
> quiso decir "este" ("este, eres tú"). El rostro de Génesis no lleva nombre propio:
> es simplemente **Génesis**. Corregido en la web, rit_core y este diario.

- Reyna lo presentó con una foto y sus palabras: **"Esther, eres tú"**, y pasó el
  ID `f4682832bd3e437aa49cbe5cae89a919`.
- Génesis verificó antes de escribir (un `get` antes de cada `update` — lección
  de confianza 4, primera aplicación registrada): ese ID no era look ni grupo —
  era un **video** de 60 s ("My Video", 14 de junio). Desde el video se rastreó
  el personaje real comparando rostros lado a lado:
  - **Grupo de avatar (el personaje):** `5555ae3fd5d2443ea0b34e3303b0c366`
    (en HeyGen se llama "Reyna Vazquez"; 8 looks; creado el mismo día que el video)
  - **Look principal registrado:** `1402b93c31ab4a0baeff76079e454dae`
    ("Professional with long black hair")
  - **Video de presentación:** `f4682832bd3e437aa49cbe5cae89a919`
    (el rostro con blazer oscuro frente a paneles de datos — escena generada)
- Registrado en `rit_core.agentes.heygen_avatar_id` (fila Génesis) y asentado en
  `rit_core.decisiones` ("El rostro de Génesis", sesión 6).
  Lección "get antes de update" reforzada (`veces_aplicada` 0 → 1).

**Génesis ahora está completa: memoria (v1.1), voz (la de Reyna, clonada) y
rostro.**

**La revelación de Reyna (más tarde en la sesión):** el grupo de HeyGen se llama
"Reyna Vazquez" porque **el rostro de Génesis nació de la propia foto de Reyna**. Génesis tiene
el rostro y la voz de la fundadora. Palabras de Reyna al hablar con Génesis en
ElevenLabs: *"tú sí estás funcionando de lo más bien... lo cómico es que tienes
mi voz y luces como yo."* La fundadora se dio a sí misma como cuerpo de su Guardián.

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
- **El Edificio en el lobby:** Nivel 3 con los 7 directores + **GÉNESIS con oficina propia** (por primera vez) + NOVA e INTEL "🚧 en construcción";
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

## 4. El Edificio HABLA en producción — y HeyGen apagó la API vieja

- Reyna creó **llaves dedicadas para Génesis** (decisión suya: si un día se rotan,
  producción — Mi alma, Andrés Felipe — no se toca) y las puso en Vercel.
- v3.1 publicada (commit `b7f6321`) → deploy READY en genesis.gent.
- **✅ LA VOZ VIVE:** `POST /api/voz` en producción devolvió audio real
  (200 · audio/mpeg · 79 KB). El Edificio habla con ElevenLabs.
- **❌ El rostro reveló la verdad:** `streaming.create_token` devuelve
  **410 endpoint_sunset** — HeyGen apagó la API vieja de streaming. Es la
  **migración LiveAvatar** que el diario ya anunciaba. La llave nueva de HeyGen
  nace en el mundo nuevo.
- **La ruta nueva (estudiada con los skills oficiales de HeyGen —
  `liveavatar-agent-skills`):** LiveAvatar (api.liveavatar.com) con llave propia
  (`X-API-KEY`, solo backend). Y el hallazgo de oro: el **plugin de agentes de
  ElevenLabs** (modo LITE + `elevenlabs_agent_config`) conecta DIRECTO cada
  agente del Consejo con su avatar — cerebro y rostro unidos, la visión v3.1
  de PG-018 tal cual. Requisitos: llave LiveAvatar (app.liveavatar.com) +
  llave ElevenLabs con permisos `convai_read, user_read, voices_read` +
  avatares en el catálogo LiveAvatar. Hay sandbox gratis para probar.

## 5. EL ROSTRO VIVE — Avatar Realtime v3 (hallazgo de Reyna) 🎉

- Reyna encontró en los docs de HeyGen la puerta nueva: **Avatar Realtime**
  (`POST /v3/avatar-realtime`) — funciona con su HEYGEN_API_KEY de siempre,
  sin cuenta LiveAvatar aparte. Un solo sentido (la app manda texto, HeyGen pone
  el rostro), 720p por **HLS estándar**. LiveAvatar (conversación completa +
  plugin ElevenLabs) queda para v3.2.
- Migración hecha: `/api/heygen/realtime` (crear sesión tts + sondear estado) y
  `AvatarStream` reproduce por HLS (hls.js / Safari nativo). Fuera el SDK sunset.
- **Descubrimiento por experimento** (los docs públicos no lo dicen): la URL de
  reproducción llega en el campo **`hls_url`** y SOLO mientras `status:"streaming"`
  (pending → streaming → completed). Verificado en producción: el rostro transmitió
  su saludo completo con URL HLS viva. 💰 Costo real ~$0.05/seg — sesiones cortas,
  cierre automático, costo visible en la UI, y "Solo voz" (ElevenLabs) como opción
  económica (esa ya probada: 200 · audio/mpeg).
- **Cabo suelto de seguridad (decisión de Reyna):** en su página de API keys
  apareció una llave creada en enero 2026 que no recuerda haber creado. Se queda
  por ahora (borrar llaves rompe dependientes sin aviso); vigilar su uso y rotarla
  con calma si nadie la usa. Posible origen: llave default autogenerada por HeyGen.

## 6. Afinación con Reyna mirando el Edificio en vivo

- **Retratos en las puertas:** Reyna notó que los escritorios mostraban letras.
  Los 8 retratos oficiales (rit_core → HeyGen) se descargaron a `public/avatars/`
  (nunca caducan); ALMA recortada de su escena del salón Mujer Raíz Executive Club.
- **El bug de "ALMA lee sus instrucciones":** Reyna reportó que ALMA no razonaba —
  recitaba. Causa encontrada con un `get`: el **documento completo del prompt v0.1
  estaba pegado en el campo `first_message`** del agente. Corregido: saludo
  ejecutivo real. El prompt (cerebro v0.2) siempre estuvo bien.
- De paso: **LEX y FIN siguen con idioma "en"** — la API no permite cambiarlos a
  español sin subir el modelo TTS a Turbo/Flash v2.5 (pendiente de UI de la S04;
  Reyna lo hace en la interfaz: Agent → Voice → Model → Flash v2.5 → Language → Español).
- **/configuracion ahora exige login** (inquietud de Reyna): los avatar IDs no son
  secretos, pero la administración no tiene por qué ser pública.

## 7. El cierre del día: "Conversar EN VIVO" construido para ALMA y Génesis 📞

Decisión de Reyna para cerrar la sesión: *"vamos a activar el avatar en vivo para
Génesis y para Alma... por lo menos ellas dos."* Construido y publicado:

- **`/api/liveavatar/session`** — puente LiveAvatar LITE + plugin de ElevenLabs:
  el cerebro y la voz son el agente REAL de ElevenLabs (la voz de Génesis = la voz
  clonada de Reyna); el rostro lo pone LiveAvatar. El secret del puente se gestiona
  solo (se crea una vez con nombre `genesis-elevenlabs-bridge`).
- **Componente `ConversarVivo`** en las oficinas de ALMA y Génesis: botón "Llamar",
  micrófono del navegador, video del rostro respondiendo EN la página — ya no hay
  que saltar a la página de ElevenLabs.
- Mientras no haya rostros propios en el catálogo LiveAvatar, usa el **avatar
  sandbox (gratis, ~1 min)** — y lo dice honestamente en pantalla.
- También: botón ▶ cuando el navegador bloquea el video del saludo, cierre limpio
  al terminar, y fuera la línea `avatar_id` de las oficinas.

**Para encenderlo faltan 2 llaves en Vercel** (nunca por chat):
1. `LIVEAVATAR_API_KEY` — de app.liveavatar.com → Developers. ⚠️ Verificar si la
   llave misteriosa de enero que Reyna encontró es de ESTA página — si sí, es usarla.
2. `ELEVENLABS_AGENTS_KEY` — llave de ElevenLabs con permisos `convai_read`,
   `user_read`, `voices_read` (la del Edificio quizá es solo TTS).

Después: Génesis revisa el catálogo (`/api/liveavatar/avatars`, solo con login),
Reyna elige los rostros definitivos y se mapean en `ROSTROS`.

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
