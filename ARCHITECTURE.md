# ARQUITECTURA — Reyna Intelligence Team

> Fuente original: `architecture/Sistema Operativo Personal IA (plano original).pdf`
> Este documento es la versión viva y editable de ese plano.

---

## Principio rector

**Hub central + módulos conectados.**
No se mezclan todos los repos en uno solo (eso sería desordenado). Existe un repo
padre — **Proyecto Génesis** — que actúa como cerebro arquitectónico. Los demás
repos siguen existiendo y quedan conectados como módulos.

> Proyecto Génesis no reemplaza lo que ya existe. Lo organiza, lo conecta y lo
> convierte en un solo ecosistema.

---

## 1. Un solo login

Todos los sistemas comparten el mismo acceso:

```
Supabase Auth  /  Google Login  /  Apple Login
```

Reyna entra una sola vez y accede a todo.

## 2. Base de datos central — `rit_core` (Supabase)

Base central donde vive el conocimiento organizacional:

| Tabla | Contenido |
|-------|-----------|
| `usuarios` | Personas y accesos |
| `proyectos` | Cada app / iniciativa |
| `agentes` | Los agentes de IA de RIT |
| `documentos` | Documentos del ecosistema |
| `memoria` | Memoria permanente |
| `tareas` | Trabajo pendiente y hecho |
| `decisiones` | Decisiones importantes (Regla Cero) |
| `logs` | Registro de actividad |
| `integraciones` | Conexiones activas |

Cada app puede tener sus propias tablas, pero **todas reportan a `rit_core`**.

## 3. Dashboard principal — RIT Dashboard

La app principal, el "lobby" de RIT. Desde ahí se accede a todo:

```
Legal · Clientes · ALMA · Evaluador · Mujer Raíz
Dream Portal · Documentos · Genesis Labs · Tareas · Memoria
```

## 4. APIs comunes

Cada repo se comunica con Génesis vía API. Ejemplos:

```
Dream Portal → API Génesis → Memoria / tareas / documentos
Evaluador    → API Génesis → resultado / cliente / expediente
ALMA         → API Génesis → consulta todo el ecosistema
```

## 5. n8n como puente

n8n conecta herramientas sin que todo tenga que enlazarse directamente:

```
Monday · Stripe · Gmail · Google Drive · Supabase · GitHub · Dream Portal · ALMA
```

## 6. GitHub como mapa técnico

El repo `Proyecto-Genesis` contiene:

```
/docs  /architecture  /prompts  /agents  /database  /integrations  /roadmap
```

Ese repo no reemplaza a los demás: **los gobierna.**

---

## Estado de implementación

| Capa | Estado |
|------|--------|
| Repo padre (andamiaje) | ✅ Creado (Sesión 02) |
| Base `rit_core` en Supabase | ⬜ Pendiente |
| Un solo login | ⬜ Pendiente |
| RIT Dashboard | ⬜ Pendiente |
| APIs comunes | ⬜ Pendiente |
| n8n como puente | 🟡 Parcial (ya hay workflows sueltos) |
