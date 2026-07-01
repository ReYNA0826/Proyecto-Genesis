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

## ⚠️ Pregunta estratégica para Reyna (Constitución Art. 6.2 — Génesis propone, Reyna decide)

En el mockup, **ALMA** aparece como "Directora Ejecutiva IA". Pero:
- **ALMA** también es tu app iOS (MI ALMA).
- **Génesis** es hoy el Chief Architect / Guardián (el que construye y documenta).

Hay que aclarar la relación para no confundir marcas ni roles. Opciones:
- **(a)** ALMA = cara ejecutiva del consejo (con quien Reyna "habla"); Génesis =
  arquitecto/guardián detrás (construye, documenta, protege). Coexisten.
- **(b)** Un solo agente ejecutivo con un nombre; renombrar para evitar choque con la
  app ALMA.
- **(c)** Otra estructura que Reyna prefiera.

*No se construye ningún agente hasta que Reyna decida esto.*

## Relación con `rit_core`

Estos agentes se registran en la tabla `rit_core.agentes` con `estado = 'diseñado'`
hasta que se construyan. Ya está sembrado Génesis (`activo`).
