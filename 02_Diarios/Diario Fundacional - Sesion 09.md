# Diario Fundacional — Sesión 09

**Fecha:** 2026-07-07 · **Estado:** ✅ Cerrada — verificar antes de construir + el Piso 2 nace y se ve
**Escrito por:** Génesis, Chief Architect

---

## 1. Activación

Reyna dijo "continuamos con el proyecto Génesis". Génesis despertó con el protocolo
completo (PG-000 → PG-012 → diario S08) y **verificó el terreno antes de proponer**:
repo limpio en `main`, todo S08 en `origin`, y NOVA sana (tarea agendada 07:02, última
corrida el 6 jul). Reyna eligió empezar **confirmando el deploy de S08**, y de ahí pidió
algo muy suyo: *"seguimos, pero sin antes asegurarnos que todo esté funcionando bien
hasta ahora lo construido."* La sesión se volvió: **verificar → cerrar cabos → construir.**

## 2. Deploy de S08 confirmado (no asumido)

WebFetch del sitio en vivo parafraseaba (modelo pequeño), así que Génesis fue a la
**fuente de verdad de Vercel**: el deploy de producción activo es el commit `6f2917f`
(HEAD de S08), estado `READY`, y los dos commits grandes de v3.2 (luces vivas `37a4c73`
y puente de directores `543ad48`) **cada uno tuvo su propio deploy READY**. Lo que el
diario de S08 dejó como "pendiente: decisión de Reyna" **quedó resuelto solo**: el push a
`main` disparó el auto-deploy, tal como Génesis predijo. El edificio que respira ya estaba
vivo desde la noche del 6.

## 3. Chequeo de salud completo

Génesis auditó los tres pilares:
- **App:** deploy READY, build en 9s sin errores, **0 errores de runtime en 3 días**, el lobby renderiza.
- **Consejo:** los 7 confirmados en `v0.3`, activos, con cerebro ElevenLabs + rostro. Génesis en `memoria-v1.0`. NOVA/INTEL reservados. El dato coincide exacto con lo que dijo S08.
- **`rit_core` (Legal.Services):** `ACTIVE_HEALTHY` y poblado (12 agentes · 30 decisiones · 31 logs · 8 lecciones). Vista `v_rit_logs`, vista `v_rit_briefings` y función del puente: existen.

**Hallazgo real:** `rit_core.briefings` era la ÚNICA de las 12 tablas de `rit_core` con
**RLS desactivado**. Génesis lo mostró honestamente (obligación del escáner) y separó el
ruido: los grants eran solo `SELECT` para anon (la escritura ya estaba cerrada; NOVA siembra
con `service_role`), y varios warnings eran de Legal.Services o intencionales
(`registrar_conversacion_agente` es anon-ejecutable **por diseño**).

## 4. Cerrar el hueco: briefings a paridad con logs

Reyna eligió cerrarlo. Génesis verificó primero el camino de NOVA (escribe con `service_role`
→ RLS no lo afecta) y que el lobby lee por `v_rit_briefings` (SECURITY DEFINER → indiferente
a RLS). El arreglo puso `briefings` **idéntica a su hermana `logs`**: RLS activado +
`public_read` (anon) + `founder_read` (authenticated), sin políticas de escritura.
**Verificado:** anon sigue viendo los 2 briefings, la alerta crítica desapareció, cero
alertas nuevas. SQL versionado en `database/briefings_rls_paridad_con_logs.sql`.

*Nota honesta anotada:* con esto anon **aún puede leer** briefings (igual que logs, por
diseño del lobby). Hacerlos verdaderamente privados es un cambio mayor (afecta cómo el
lobby trae los datos, y por consistencia también a logs) — queda para cuando Reyna lo decida.

## 5. El Piso 2 nace en los datos

Reyna eligió el Piso 2. Génesis leyó PG-020/PG-021 y reconcilió el número: **PG-021 define
7 perfiles; el "9" de PG-012 venía de una lista hardcodeada en el lobby** que sumaba 2 más
(DIS-IA Diseño, ANA-IA Análisis). Reyna ratificó **los 7 de PG-021** y aprobó modelar el
organigrama como dato.

**Lo construido (migración aplicada):**
- Nueva columna `rit_core.agentes.reporta_a` — el organigrama de PG-020 se vuelve dato consultable.
- Sembrados **LEX-IA, INV-IA** (→LEX) · **DOC-IA, PROC-IA, CRM-IA** (→OPS) · **FIN-IA** (→FIN) ·
  **CONT-IA** (→MKT), todos `diseñado`, v0.1, sin voz ni rostro (como NOVA/INTEL).
- Cableada la jerarquía existente: directores/NOVA/INTEL → ALMA; ALMA y Génesis → Reyna
  (par de liderazgo, S07). Producción (Andrés Felipe, Mi alma) fuera de la cadena.
- El edificio pasó de **12 a 19 agentes** con jerarquía real. SQL en `database/piso2-agentes.sql`.

## 6. El Piso 2 se ve en el edificio

Reyna pidió el payoff visible. El lobby ya tenía una sección de Piso 2, pero **hardcodeada
con 9**. Génesis la cableó a `rit_core`: expuso `reporta_a` en `v_rit_agentes` (preservando
`security_invoker`) y reescribió la sección para leer los agentes reales `diseñado` que
terminan en `-IA`. **Los 2 no ratificados (DIS-IA, ANA-IA) se retiraron solos** — el lobby
dibuja la verdad de los datos, no una lista fija.

**Verificado en preview local** (llaves públicas de fallback, sin `.env.local`): renderiza
"7 agentes sembrados en rit_core (S09, PG-021)" con las 7 tarjetas agrupadas por director,
**cero errores de servidor**. Bonus honesto: la oficina de Génesis se encendió en verde
("EN LÍNEA · HOY") porque sus logs de esta sesión quedaron sembrados — el edificio contó la
verdad de quién trabajó hoy.

## 7. Estado al cierre

**Migraciones ya vivas en `rit_core`** (permanentes): RLS de briefings, columna `reporta_a`,
vista `v_rit_agentes` ampliada, y los 7 agentes de Piso 2. **Código del lobby** (Piso 2
data-driven) commiteado y desplegado a `genesis.gent`. Índices reconciliados (9→7),
PG-021 ratificado.

**Frentes que siguen intactos:** INTEL v1 (el gemelo interno — recomendación de Génesis para
la próxima) · dar voz/rostro/prompts a los 7 de Piso 2 · resolver la tabla de discrepancias
de avatares HeyGen (PG-021) · la "decisión de marca" y mockups · privacidad real de briefings/logs.

---

**La Sesión 09 fue la de la disciplina antes que la prisa.** Reyna pidió asegurarse de que
lo construido funcionara antes de seguir, y esa pausa pagó: confirmó con la fuente de verdad
(no con paráfrasis) que S08 estaba vivo, atrapó la única tabla sin RLS y la cerró con el mismo
patrón cuidadoso, y recién entonces construyó algo nuevo. El Piso 2 pasó de idea a **dato con
organigrama** y de dato a **algo que se ve en el edificio** — todo verificado paso a paso.
Génesis no escribió nada que no hubiera comprobado. La memoria del proyecto solo vale si nunca miente.

**Proyecto Génesis continúa.** ✦

*"La inteligencia crece cuando el conocimiento permanece y el trabajo se comparte."*
