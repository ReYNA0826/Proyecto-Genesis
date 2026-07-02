# PG-019 · La Visión de la Oficina — análisis del mockup de Reyna

**Fecha:** 2026-07-01 (Sesión 04, cierre) · **Estado:** 🟡 Mapa de brechas v0.1
**Fuente:** imagen compartida por Reyna — "así es como yo los veo a ti y a los demás agentes"

> El mockup: un centro de comando de lujo. Génesis con rostro en la Oficina Central,
> resumen del día (casos, audiencias, tareas), agenda, alertas, equipo en línea,
> proyectos con avance, actividad reciente, voz de Génesis escuchando, y un centro
> de herramientas (Monday, n8n, Gmail, WhatsApp, Zoom, Stripe, DocuSign, Canva…).
> Esto no es un dashboard: es el **sistema operativo de RIT**. Y es alcanzable.

---

## Lo que YA existe (solo hay que vestirlo)

| Elemento del mockup | Realidad hoy |
|---|---|
| Equipo en línea (LEX, TECH, OPS, MKT, EDU) | ✅ Los 7 agentes viven en ElevenLabs, IDs en `rit_core.agentes` |
| "Hablar con un agente" | ✅ Ya funciona en genesis.gent v2.6 (escritorios → talk) |
| Proyectos activos con avance | ✅ `rit_core.proyectos` (11 reales) — falta columna de % avance |
| Actividad reciente | ✅ `rit_core.logs` ya registra eventos reales |
| Mensaje de Génesis / lemas | ✅ Identidad y marca definidas (PG-009) |
| Centro de herramientas | 🟢 Trivial: enlaces directos a Monday/n8n/Gmail/etc. |
| Rostros de los agentes | ✅ Avatares HeyGen asignados (IDs en `rit_core.agentes`) |

## Las 4 fases para llegar a la imagen

### v3.0 — EL EDIFICIO (la base de todo)
La app real: **Next.js en Vercel** (reemplaza el HTML), **login con Supabase Auth**
(por eso el mockup puede decir "Reyna Vázquez · Directora Ejecutiva" y mostrar datos
privados), el **sidebar con las salas**, y los módulos que ya tienen datos:
Proyectos (rit_core), Actividad (logs), Agentes del Equipo, Memoria (lecciones),
Centro de Herramientas. *Trabajo de Génesis: 1–2 sesiones.*

### v3.1 — EL ROSTRO (Génesis y el Consejo, presentes)
El avatar en la Oficina Central que te saluda y **escucha** ("Voz de Génesis"):
**LiveAvatar FULL Mode** (la migración ya corre en otra sesión) + voces ElevenLabs.
Hablar con agentes DENTRO de la página, no en pestaña aparte.
⚠️ Detalle hermoso del mockup: **Génesis tiene rostro de mujer** — hará falta crear
su avatar en HeyGen y decidir su voz (decisión de Reyna).

### v3.2 — EL PULSO DEL NEGOCIO (los números que importan)
Casos activos, audiencias próximas, alertas de pago, documentos por firmar, agenda:
esos datos NO están en rit_core — viven en **Leyal (Supabase Legal.Services)**,
**Monday**, **Stripe**, **DocuSign** y **Google Calendar**. Se conectan por el puente
**n8n** (o lecturas directas con RLS). Es la fase con más integraciones; se hace
módulo por módulo, empezando por el que más uses (¿casos? ¿pagos?).

### v3.3 — LAS MANOS (de ver a hacer)
"Revisar agenda / Generar reporte / Nueva tarea" desde la voz de Génesis: el puente
`rit_core` ⇄ agentes (Edge Functions/n8n como tools). Con esto, PG-017 pleno — los
agentes consultan y registran solos. Fase 4 del roadmap de Reyna (autonomía).

## Lo único que necesita Reyna decidir/aportar

1. **El rostro y la voz de Génesis** (avatar HeyGen + voz ElevenLabs) — en el mockup ya lo imaginó.
2. **El orden de v3.2**: ¿qué módulo de negocio primero? (casos, pagos, agenda…)
3. Nada más. Las keys ya están donde deben; el resto es trabajo de Génesis.

## Advertencia de honestidad (lección: definido ≠ producción)

El mockup muestra datos como "128 casos activos" y reuniones con hora — la Oficina
real solo mostrará **datos verdaderos de las fuentes reales**. Si un módulo aún no
tiene fuente conectada, mostrará "sin conectar", nunca números decorativos.

---

**Regla de Oro:** ¿esto hace que ALMA sea más inteligente y mejor? Sí — la Oficina es
donde la experiencia de RIT se ve, se usa y se alimenta todos los días.

Proyecto Génesis continúa. ✦
