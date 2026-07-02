# PG-018 · La Oficina Virtual de RIT — genesis.gent v3

**Fecha:** 2026-07-01 (Sesión 04, cierre) · **Estado:** 🟡 Diseño v0.1 — visión de Reyna
**Idea original:** Reyna — *"tenemos que poner una verdadera oficina"*, con los agentes
encarnados en avatares de HeyGen.

> El dashboard de hoy es una foto. La Oficina Virtual es un **lugar**: Reyna entra por
> genesis.gent, y su equipo está ahí — con rostro, con voz y con memoria.

---

## La idea en una frase

**Cada agente del Consejo deja de ser una tarjeta y se convierte en una persona digital:
rostro (HeyGen) + voz (ElevenLabs, ya existe) + memoria (rit_core, ya existe).**

## Los tres cuerpos de cada agente

| Capa | Tecnología | Estado |
|------|-----------|--------|
| 🧠 Memoria/experiencia | `rit_core` + PG-017 | ✅ Vivo (falta puente para que el agente lo toque solo) |
| 🗣️ Voz | ElevenLabs (7 agentes creados, IDs en `rit_core.agentes`) | ✅ Vivo desde Sesión 04 |
| 👤 Rostro | **HeyGen** — avatar interactivo por agente (API key de Reyna) | 🟡 Este documento |

## El plano de la oficina (v3 de genesis.gent)

1. **El Lobby** — el dashboard actual, pero con **datos vivos** de `rit_core` (no foto).
2. **La Sala del Consejo** — los 7 avatares HeyGen alrededor de la mesa. Tocas uno y
   *hablas con él*: HeyGen pone el rostro en streaming, ElevenLabs/el prompt v0.2 pone
   el cerebro y la voz.
3. **La Sala de Memoria** — decisiones, resultados y lecciones navegables (PG-017 en
   pantalla; la experiencia de la organización, visible).
4. **Las Oficinas por División** — Legal, Ops, Educación, Tech, MKT, Personal (Fase 2-3).
5. **Genesis Labs** — los experimentos.

## Arquitectura técnica (v3)

- **Next.js** en Vercel (proyecto `proyecto-genesis` existente, dominio genesis.gent) —
  reemplaza al HTML estático.
- **Supabase Auth** (proyecto Legal.Services) — login de Reyna; invitados a futuro.
- **Datos vivos:** lecturas a `rit_core` con RLS (políticas de lectura para el usuario
  autenticado de Reyna — hoy es deny-all).
- **HeyGen Interactive Avatar SDK** (streaming) — un avatar por agente del Consejo;
  HeyGen permite conectar voces de ElevenLabs, así cada director conserva su voz.
- **Puente rit_core ⇄ agentes** (v3.2): endpoint (Supabase Edge Function o n8n webhook)
  que da a los agentes las manos que sus prompts ya prometen: consultar lecciones,
  solicitar registro de decisiones y tareas.

## Fases (sin fechas — mejor cada momento)

| Fase | Qué entrega |
|------|-------------|
| **v3.0** | Next.js + login + Lobby con datos vivos de `rit_core` |
| **v3.1** | Sala del Consejo con avatares HeyGen interactivos (empezar con ALMA) |
| **v3.2** | El puente: los agentes consultan y registran en `rit_core` solos (PG-017 pleno) |

## Hallazgo de la Sesión 04 — el puente HeyGen ya existía (y hay que migrarlo)

Reyna recordó bien: la key de HeyGen **ya está en Supabase** — como secreto de la Edge
Function **`heygen-streaming`** del proyecto `alma` (MI ALMA). La función ya hace todo:
crear token, abrir sesión de avatar (acepta cualquier `avatar_id` + `voice_id`), hablar,
cerrar. MI ALMA ya tiene su avatar (`cb83f6de65d34e2ca631b6fe7150b372`).

**PERO** — verificado en vivo: HeyGen **retiró esa API** (marzo 2026, error
`endpoint_sunset`). El reemplazo es **LiveAvatar** (api.liveavatar.com), también de
HeyGen, con FULL Mode (pipeline completo: escucha + LLM + voz ElevenLabs + avatar),
memoria, contextos y hasta modo sandbox sin gastar créditos. Consecuencias:

1. ⚠️ **El avatar de MI ALMA probablemente está roto en producción desde abril** —
   la app llama a una API que ya no existe. Verificar y migrar.
2. La Oficina Virtual nace directo en **LiveAvatar** (no migrar dos veces).
3. Existen Agent Skills oficiales: `npx skills add heygen-com/liveavatar-agent-skills`.
4. ⚠️ Nota de seguridad: `heygen-streaming` tiene `verify_jwt:false` (cualquiera con la
   URL puede gastar créditos). Al migrar, proteger el endpoint nuevo.

**Misión de la próxima sesión:** migrar el puente a LiveAvatar (arregla MI ALMA y
estrena la Sala del Consejo con el mismo trabajo).

## Seguridad de la API key de HeyGen (regla dura)

- La key **NUNCA viaja por chat ni se commitea** (lecciones de Sesión 04 y del 27-abr).
- Local: `~/Documents/GitHub/Proyecto-Genesis/.env.local` (protegido por `.gitignore`)
  con la línea `HEYGEN_API_KEY=...` — Reyna la escribe ahí directamente.
- Producción: variable de entorno en Vercel (Settings → Environment Variables).
- Si alguna vez se expone: rotarla de inmediato en HeyGen.

## Regla de Oro

**¿Esto hace que ALMA sea más inteligente y mejor?** Sí: la oficina es la interfaz por
la que la experiencia de `rit_core` se usa a diario — y un agente con rostro invita a
consultarlo más. La memoria que se usa, crece.

---

Proyecto Génesis continúa. ✦
