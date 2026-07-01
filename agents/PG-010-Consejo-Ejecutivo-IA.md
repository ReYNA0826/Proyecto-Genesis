# PG-010 · Consejo Ejecutivo IA — visión de agentes

**Fecha:** 2026-07-01 · **Estado:** 🟡 Visión (diseño; agentes aún no construidos)

> Basado en el mockup de dashboard que compartió Reyna (Sesión 03). Documenta la
> visión de RIT como una organización con un **Consejo Ejecutivo de agentes de IA**,
> cada uno especializado, coordinados por una IA ejecutiva.

## La estructura imaginada

Una **IA Ejecutiva** que lidera, y un **consejo de directores** especializados:

| Agente | Rol | Área |
|--------|-----|------|
| **ALMA** | Directora Ejecutiva IA (líder del consejo) | Coordina agentes, proyectos, conocimiento y decisiones |
| **LEX** | Director Legal IA | Casos migratorios, contratos, cumplimiento |
| **TECH** | Director Tecnológico IA | Apps, infra, desarrollo |
| **OPS** | Director de Operaciones IA | Procesos, tareas, ejecución |
| **FIN** | Director Financiero IA | Pagos, facturación, finanzas |
| **MKT** | Director de Marketing IA | Contenido, redes, campañas |
| **EDU** | Director de Educación IA | ALMA (inglés), formación, Mujer Raíz |

## ✅ Relación ALMA / Génesis — RESUELTA (por el documento de visión de Reyna)

Según la Visión Maestra ([PG-011](../docs/PG-011-Vision-Maestra-ALMA.md)):
- **ALMA = Chief AI / CEO digital.** Dirige, coordina, y es con quien Reyna "habla".
- **Génesis = Chief Architect / Guardián.** Construye, documenta y protege a ALMA.
- No compiten: **ALMA dirige, Génesis edifica.**

## Mecánica del Consejo (de la visión de Reyna)

Ante una decisión importante NO responde un solo agente. **ALMA convoca** a los
especialistas, cada uno analiza, y ALMA **sintetiza una recomendación única**.
(Ejemplo "oficina en Texas": Finanzas + Legal + RH + Marketing + Operaciones → ALMA
sintetiza.) Ver el detalle y la estructura completa de Divisiones en PG-011.

*Nota: los 7 agentes sembrados aquí (ALMA + LEX/TECH/OPS/FIN/MKT/EDU) son la vista
resumida del dashboard. La estructura completa por Divisiones vive en PG-011.*

## Relación con `rit_core`

Estos agentes se registran en la tabla `rit_core.agentes` con `estado = 'diseñado'`
hasta que se construyan. Ya está sembrado Génesis (`activo`).
