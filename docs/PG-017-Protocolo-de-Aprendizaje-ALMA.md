# PG-017 · Protocolo de Aprendizaje de ALMA — "Experiencia, no memoria"

**Fecha:** 2026-07-01 (Sesión 04) · **Estado:** ✅ v1.0 — Activo y obligatorio
**Autores:** Reyna Vázquez (visión) + Génesis (diseño)

> Este documento convierte la innovación clave de PG-011 en un protocolo operativo.
> Las tablas ya existían (`decisiones`, `resultados_decisiones`, `lecciones_aprendidas`
> en `rit_core`); lo que faltaba era el **ciclo que las hace vivir**. Sin este
> protocolo, las tablas son memoria muerta. Con él, son experiencia.

---

## La diferencia (recordatorio de PG-011)

- **Memoria:** "El 3 de marzo hablamos de esto." *(recordar)*
- **Experiencia:** "Hace seis meses intentamos esto, falló por X, lo resolvimos con Y.
  Te recomiendo Y." *(decisión + resultado + lección aplicable)*

La experiencia se construye con un ciclo, no con una tabla.

## El Ciclo de Experiencia (5 pasos)

```
   1.DECIDIR → 2.OBSERVAR → 3.DESTILAR
        ↑                        ↓
   5.REFORZAR ← ← ← ← ← ← 4.CONSULTAR
```

### 1. DECIDIR — toda decisión importante se registra
En `rit_core.decisiones`: título, **contexto** (por qué se decidió, qué alternativas
había), la decisión, y el número de sesión. Una decisión sin contexto no enseña nada.

### 2. OBSERVAR — toda decisión se vuelve a mirar
Cuando el resultado se conoce (días, semanas o meses después), se registra en
`rit_core.resultados_decisiones`: `funciono` / `no_funciono` / `parcial`, el impacto,
y el aprendizaje crudo. **Regla dura: los fracasos se registran igual que los éxitos —
valen más.** Una decisión sin resultado registrado es un ciclo abierto.

### 3. DESTILAR — el aprendizaje transferible se vuelve lección
Si el aprendizaje sirve más allá del caso concreto, se escribe en
`rit_core.lecciones_aprendidas`:
- **Una lección = una sola idea transferible.** Si hay dos ideas, son dos lecciones.
- Se escribe para el lector del futuro (ALMA en 2030), no para quien vivió el momento:
  contexto suficiente para entenderla sin haber estado ahí.
- Se le asigna **confianza 1–5**:

| Confianza | Significado |
|:---:|---|
| 1 | Hipótesis — lo vimos una vez, puede ser casualidad |
| 2 | Indicio — patrón posible, sin confirmar |
| 3 | Probada — funcionó al menos una vez con evidencia clara *(default)* |
| 4 | Confirmada — aplicada varias veces con buen resultado |
| 5 | Regla de oro — nunca ha fallado; violarla tiene costo conocido |

### 4. CONSULTAR — obligatorio antes de recomendar
**Antes de cualquier recomendación o decisión importante, Génesis/ALMA debe consultar
las lecciones** (por categoría y/o proyecto). Este paso es lo que convierte el archivo
en inteligencia. Al activarse una sesión, se leen las lecciones de confianza ≥ 4.

```sql
-- Al inicio de sesión:
select titulo, leccion, confianza from rit_core.lecciones_aprendidas
where confianza >= 4 order by confianza desc;

-- Antes de una decisión sobre un tema:
select * from rit_core.lecciones_aprendidas
where categoria = '<tema>' or proyecto_id = '<proyecto>'
order by confianza desc, veces_aplicada desc;
```

### 5. REFORZAR — las lecciones se ganan su confianza
Cada vez que una lección se aplica: `veces_aplicada + 1`. Si volvió a funcionar y
tiene evidencia acumulada, sube la confianza. Si falló, **baja** — o se reescribe.
Una lección que nadie aplica en un año se revisa: ¿sigue siendo cierta?

## Rituales (cuándo corre el ciclo)

- **Al abrir sesión:** leer lecciones de confianza ≥ 4 (junto con PG-000 y PG-012).
- **Durante la sesión:** consultar lecciones antes de decisiones importantes (paso 4).
- **Al cerrar sesión:** revisar las decisiones tomadas → registrarlas (paso 1);
  revisar decisiones viejas con resultado ya visible → cerrarlas (paso 2);
  destilar lecciones nuevas si las hay (paso 3). Esto va junto con el diario.

## Quién escribe

Hoy: **Génesis** (manualmente, con Reyna). Fase 1: **ALMA** ejecuta este mismo
protocolo de forma programática. El protocolo no cambia; cambia la mano.

## Lo que NO hacemos todavía (Regla de Oro aplicada a sí misma)

- ❌ Embeddings / búsqueda semántica — con decenas de lecciones, SQL basta.
  Cuando haya cientos, se evalúa. No construir infraestructura antes de necesitarla.
- ❌ Automatizar la destilación — el juicio de qué es transferible sigue siendo
  humano + Génesis. ALMA lo heredará cuando exista.

## Estado al activarse este protocolo (2026-07-01, Sesión 04)

- `decisiones`: 8 (7 fundacionales + la adopción de este protocolo)
- `resultados_decisiones`: ciclo cerrado para las decisiones fundacionales verificables
- `lecciones_aprendidas`: 6 (4 previas + 2 destiladas del incidente del token de hoy)
- Primera evidencia real del sistema: **PG-000 funcionó** — un modelo nuevo (Fable)
  despertó como Génesis leyendo la documentación. La continuidad quedó probada.

---

**Regla de Oro:** ¿esto hace que ALMA sea más inteligente y mejor — en cada momento?
**Sí — este documento es literalmente el mecanismo por el cual eso ocurre.**

Proyecto Génesis continúa. ✦
