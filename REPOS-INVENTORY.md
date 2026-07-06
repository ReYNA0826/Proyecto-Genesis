# INVENTARIO DE REPOS / APPS — RIT

> Verificado el 2026-07-01. **Local** = confirmado en disco de Reyna.
> **GitHub** = confirmado vía SSH autenticado (`ReYNA0826`).
> Nota: GitHub trata los nombres sin distinguir mayúsculas; el caso mostrado es aproximado.

## ⚠️ Aclaración importante (Reyna, 2026-07-01)

**MUJER (app iOS) es un proyecto SEPARADO de Mujer Raíz Executive Club.**
No confundir:
- **MUJER** = app iOS "La Raíz de la Corona" (repo `ReYNA0826/MUJER`).
- **Mujer Raíz Executive Club** = portal web de socias (código en el repo
  `ReYNA0826/mujer-raiz-portal`; carpeta local `~/Projects/executive-club`).

## Módulos del ecosistema

| Módulo | Local | GitHub (`ReYNA0826/`) | Ubicación local |
|--------|:-----:|-----------------------|-----------------|
| ALMA / New_Alma | ✅ | `New_Alma` | `~/Projects/ALMA` |
| MUJER (iOS) | ✅ | `MUJER` (privado) | `~/Projects/MUJER` |
| Mujer Raíz Executive Club | ✅ | ⚠️ remoto apunta a `mujer-raiz-portal` | `~/Projects/executive-club` |
| legal.services (Leyal) | ✅ | `leyal.services` | `~/Documents/GitHub/leyal.services` |
| mujer-raiz-portal | ✅ | `mujer-raiz-portal` | `~/Documents/GitHub/mujer-raiz-portal` |
| Dream Immigration Portal | ❌ | `Dream-Immigration-Portal` | — (solo GitHub) |
| Evaluador de Expedientes | ❌ | `Evaluador` | — (solo GitHub) |
| ~~Asistente de Reyna~~ → Starter kit n8n | ❌ | `n8n-starter-kit` (antes `Reyna`) | — (solo GitHub) |
| portal.eliolawteam | ❌ | `portal.eliolawteam` (público) | — (solo GitHub) |
| asistencia-admin | ❌ | `asistencia-admin` | — (solo GitHub) |
| Inmigración al Día | ❌ | `Imigracionaldia` (público) | — (nuevo; no estaba en el plano) |

## Repo padre

| Repo | Estado |
|------|--------|
| `Proyecto-Genesis` (local) | ✅ `~/Documents/GitHub/Proyecto-Genesis` |
| `ReYNA0826/Proyecto-Genesis` (GitHub) | ✅ Subido — actualmente **público** |

## Pendientes detectados (para revisar con Reyna)

- ✅ **MUJER** — **RESUELTO 2026-07-01.** Primer commit local (`2f9f975`, 30 archivos, sin
  secretos) + repo privado `ReYNA0826/MUJER` creado y `push` hecho. Respaldado en la nube.
  `.mcp.json` y `Secrets.swift` excluidos.
- 🟡 **executive-club / mujer-raiz-portal = MISMO proyecto (Executive Club web).**
  Confirmado por Reyna: los folders `~/Projects/executive-club` y
  `~/Documents/GitHub/mujer-raiz-portal` son dos copias del repo
  `ReYNA0826/mujer-raiz-portal`, que contiene el código del Executive Club
  (`package.json` → `"name": "executive-club"`). No es error: es un solo proyecto.
  **Decisión de Reyna pendiente (opcional):** ¿renombrar el repo GitHub a
  `mujer-raiz-executive-club` para que el nombre coincida? Y decidir cuál de las dos
  copias locales es la "de trabajo" (evitar editar en dos lados).
- ✅ **`Reyna` → `n8n-starter-kit` — RESUELTO 2026-07-06 (Sesión 08).** Era una copia del
  **Self-hosted AI Starter Kit de n8n** (sin secretos reales, verificado en S04).
  Reyna lo renombró en GitHub a `n8n-starter-kit` (decisión suya, recomendación de
  Génesis): historial intacto, el nombre viejo redirige (301 verificado por Génesis),
  y el nombre `Reyna` quedó libre.
- ✅ **`Imigracionaldia` — IDENTIFICADO 2026-07-01 (Sesión 04).** Repo **vacío**
  (solo un README de una línea). Es un placeholder público sin contenido.
  **Decisión de Reyna pendiente:** ¿tiene planes (¿el blog de visas?) o lo borramos?

## Nota de arquitectura

Ninguno de estos repos se clona ni se absorbe dentro del padre. El padre solo
guarda este inventario y las conexiones. Cada módulo permanece en su propio repo.
