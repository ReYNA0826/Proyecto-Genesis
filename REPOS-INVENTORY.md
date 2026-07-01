# INVENTARIO DE REPOS / APPS — RIT

> Verificado el 2026-07-01. **Local** = confirmado en disco de Reyna.
> **GitHub** = confirmado vía SSH autenticado (`ReYNA0826`).
> Nota: GitHub trata los nombres sin distinguir mayúsculas; el caso mostrado es aproximado.

## Módulos del ecosistema

| Módulo | Local | GitHub (`ReYNA0826/`) | Ubicación local |
|--------|:-----:|-----------------------|-----------------|
| ALMA / New_Alma | ✅ | `New_Alma` | `~/Projects/ALMA` |
| MUJER (iOS) | ✅ | ⚠️ sin remoto | `~/Projects/MUJER` |
| Mujer Raíz Executive Club | ✅ | ⚠️ remoto apunta a `mujer-raiz-portal` | `~/Projects/executive-club` |
| legal.services (Leyal) | ✅ | `leyal.services` | `~/Documents/GitHub/leyal.services` |
| mujer-raiz-portal | ✅ | `mujer-raiz-portal` | `~/Documents/GitHub/mujer-raiz-portal` |
| Dream Immigration Portal | ❌ | `Dream-Immigration-Portal` | — (solo GitHub) |
| Evaluador de Expedientes | ❌ | `Evaluador` | — (solo GitHub) |
| Asistente de Reyna | ❌ | `Reyna` | — (solo GitHub) |
| portal.eliolawteam | ❌ | `portal.eliolawteam` (público) | — (solo GitHub) |
| asistencia-admin | ❌ | `asistencia-admin` | — (solo GitHub) |
| Inmigración al Día | ❌ | `Imigracionaldia` (público) | — (nuevo; no estaba en el plano) |

## Repo padre

| Repo | Estado |
|------|--------|
| `Proyecto-Genesis` (local) | ✅ `~/Documents/GitHub/Proyecto-Genesis` |
| `ReYNA0826/Proyecto-Genesis` (GitHub) | ✅ Subido — actualmente **público** |

## Pendientes detectados (para revisar con Reyna)

- 🟡 **MUJER** (local): antes SIN historial git. **Resuelto parcialmente 2026-07-01** →
  primer commit local hecho (`2f9f975`, 30 archivos, sin secretos). **Falta:** crear
  repo remoto en GitHub + `push` (requiere token). `.mcp.json` añadido al `.gitignore`.
- 🟡 **executive-club / mujer-raiz-portal — confusión de NOMBRES (no es peligro).**
  Diagnóstico read-only: los folders `~/Projects/executive-club` y
  `~/Documents/GitHub/mujer-raiz-portal` son **dos copias del MISMO repo**
  (`ReYNA0826/mujer-raiz-portal`), y ese repo **contiene el código de `executive-club`**
  (ambos `package.json` → `"name": "executive-club"`). Están sincronizados; nada roto.
  **Decisión de Reyna pendiente:** ¿renombrar el repo a `executive-club`? ¿son 1 o 2
  proyectos? NO tocar el remote sin su OK (romper el enlace sí sería peligroso).
- Confirmar si `Reyna` es efectivamente "Asistente de Reyna".
- Confirmar qué es `Imigracionaldia` y si entra al ecosistema RIT.

## Nota de arquitectura

Ninguno de estos repos se clona ni se absorbe dentro del padre. El padre solo
guarda este inventario y las conexiones. Cada módulo permanece en su propio repo.
