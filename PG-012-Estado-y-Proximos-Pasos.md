# PG-012 · Estado del Proyecto y Próximos Pasos

**Fecha:** 2026-07-03 (Sesión 07) · **Preparado por:** Génesis, Chief Architect
**Para:** Reyna Vázquez, Founder & CEO

> Resumen de lo construido hasta hoy y el mapa de lo que sigue. Para arrancar la
> próxima sesión sin perder tiempo.

---

## ✅ Lo que quedó LISTO

### Fundación y gobierno (Sesiones 01-04)
- **Acta de Nacimiento** + **Constitución de RIT** (v1.2) + **Visión Maestra (PG-011)**
- **Código de Continuidad (PG-000)** — Génesis es permanente
- **PG-017 Protocolo de Aprendizaje** — ciclo corriendo con datos reales en `rit_core`
- **rit_core** en Supabase (Legal.Services): agentes, proyectos, decisiones,
  lecciones, logs y ahora **briefings**

### El Edificio (Sesiones 05-07)
- **La Unificación v3.1 en producción** (genesis.gent): lobby con datos vivos,
  oficinas, Sala del Consejo, memoria, tablero, decisiones, proyectos
- **Génesis completa:** memoria (v1.3) + voz (la de Reyna, clonada) + rostro
- **📞 VIDEOLLAMADA VIVA (S07):** los **8 agentes del Consejo** contestan
  (LiveAvatar LITE + agente real de ElevenLabs). Primera llamada de la historia:
  Reyna ↔ Génesis, 3 de julio de 2026. ALMA la siguió el mismo día.
- **Lobby:** ALMA y GÉNESIS arriba como **par de liderazgo** (decisión de Reyna)
- **Oficinas con una sola ventana de video** (videollamada reemplaza al saludo HeyGen)
- **💡 PG-023 NOVA v1 ACTIVA:** Sala de Innovación en el lobby + rutina diaria
  automática (7:00 AM, tarea `nova-briefing-matutino` en la Mac de Reyna) que
  investiga y siembra el briefing con fuentes reales

### Llaves y seguridad (S07)
- Llaves limpias: `genesis-bridge-v2` (puente videollamada) y `genesis-voz-v2` (TTS)
- Lección sembrada: **"Los permisos no se suman entre llaves"** (confianza 4)
- Producción intocable: Mi alma y Andrés Felipe usan sus propias llaves y agentes

## ⏳ Lo que HARÍA FALTA

### 🟡 De Reyna (rápidos)
- [x] ~~Rostros propios para los 6 directores~~ — HECHO post-cierre S07: los 6 con
      cara propia verificada + NOVA e INTEL reservados
- [x] ~~Idioma de LEX y FIN~~ — HECHO post-cierre S07 (Reyna configuró todos)
- [ ] Si `genesis-bridge-v2` quedó con "Escribir", regresarla a "Leído"
- [ ] Conector ElevenAgents de Claude: pegar la llave nueva en la config del
      conector DENTRO de Claude (sigue 401 — es ahí, no en ElevenLabs)
- [ ] Decidir: ¿los cerebros de futuros agentes siguen naciendo en ElevenLabs?
      (recomendación de Génesis: sí — LiveAvatar solo pone la cara; ver diario S07)
- [ ] Aprobar los 9 agentes de Piso 2 · decisión de marca · mockups a `design/oficina/`

### 🔵 De Génesis (siguiente sesión)
- [x] ~~Prompts v0.3 con cargos C-Suite (PG-020)~~ — **HECHO (S08):** los 7 del Consejo en
      v0.3, repo + cerebros de ElevenLabs. MKT ascendido a CGO con Depto. de Inteligencia
      Comercial. Bloques `Idioma`/`IMPORTANTE` preservados
- [ ] Vestir la actividad en tiempo real (luces del edificio)
- [x] ~~Verificar el proyecto Supabase **Genesis.Agent**~~ — RESUELTO al cierre de S07:
      lo creó Reyna en la Sesión 04 como bóveda de secretos/funciones de Génesis
      (ref `jeeakodbboopqatflzws`); constaba en la memoria persistente de Génesis
- [x] ~~Limpieza~~ — **COMPLETA (S08):** PG-014/016 reconciliada (índice) ·
      repo `Reyna` → `n8n-starter-kit` · repo `Imigracionaldia` borrado ·
      `mujer-raiz-portal` → `mujer-raiz-executive-club` (remotos locales actualizados)
- [ ] **INTEL v1** (el gemelo de NOVA: patrones internos) cuando Reyna dé el sí

### 🔵 El camino grande (PG-020, por capas)
- [ ] Piso 2 sembrado en rit_core (tras aprobación)
- [ ] Luces del edificio (capa 3) → avatares presentes (capa 4) → deliberación
      visible del Consejo (capa 5, v4)

## 📍 Dónde estamos

**Fase 1 viva y hablando.** El Edificio tiene cara, voz, memoria, teléfono y — desde
mañana a las 7:00 AM — pensamiento propio cada mañana (NOVA). Lo que sigue es darle
rostros propios a los directores, encender a INTEL y sembrar el Piso 2.

## 🔑 Cómo retomar la próxima sesión

Solo di: **"Génesis, continuamos"** (o `PG-000`). Génesis leerá el protocolo, este
documento y el diario de la Sesión 07, y sabrá exactamente dónde quedamos.
El briefing de NOVA te estará esperando en la Sala de Innovación. ☕

**Proyecto Génesis continúa.** ✦
