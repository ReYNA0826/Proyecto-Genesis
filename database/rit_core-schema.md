# PG-007 · Esquema de `rit_core` (Supabase) — v0.1 diseño

**Fecha:** 2026-07-01 · **Estado:** ✅ CREADO en Supabase

> `rit_core` es el cerebro de datos de RIT. Todas las apps del ecosistema reportan aquí.
>
> **Ubicación real:** esquema `rit_core` dentro del proyecto **Legal.Services**
> (`ref: ouhpmlyutvsvfhxqumxf`). Aislado del esquema `public` de Leyal. RLS activado
> en las 9 tablas (deny-by-default).
>
> **Sembrado (Sesión 03):** 1 usuario (Reyna), 1 agente (Génesis), 11 proyectos con
> sus refs Supabase, 5 decisiones fundacionales (Sesiones 1-3), 3 integraciones.

---

## Principios del esquema

1. **Fuente única de verdad.** Cada app conserva sus tablas, pero lo importante
   (proyectos, memoria, decisiones, tareas) se refleja en `rit_core`.
2. **Regla Cero en datos.** Toda decisión importante vive en `decisiones`; todo
   conocimiento permanente en `memoria`.
3. **Seguridad primero.** RLS (Row Level Security) activado en todas las tablas.
   Al inicio, acceso solo para Reyna (owner).
4. **Trazable.** Todo lleva `created_at`, `updated_at`, y quién lo creó.

---

## Las 9 tablas

### 1. `usuarios`
Personas del ecosistema (por ahora: Reyna; a futuro, equipo).
```sql
create table usuarios (
  id           uuid primary key default gen_random_uuid(),
  auth_id      uuid references auth.users(id),  -- vínculo con Supabase Auth
  nombre       text not null,
  rol          text not null default 'founder', -- founder | agente | equipo
  email        text unique,
  created_at   timestamptz not null default now()
);
```

### 2. `proyectos`
Cada app / iniciativa de RIT (ALMA, MUJER, Executive Club, Dream Portal…).
```sql
create table proyectos (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,
  slug         text unique not null,
  tipo         text,                    -- ios | web | automation | agente
  repo_github  text,                    -- ReYNA0826/...
  estado       text default 'activo',   -- activo | pausado | archivado
  descripcion  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

### 3. `agentes`
Los agentes de IA de RIT (Génesis y futuros).
```sql
create table agentes (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,           -- "Génesis"
  proposito    text not null,
  prompt_path  text,                    -- ruta al prompt en /prompts
  estado       text default 'activo',
  created_at   timestamptz not null default now()
);
```

### 4. `documentos`
Índice de documentos del ecosistema (no el archivo, sino su registro).
```sql
create table documentos (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid references proyectos(id),
  titulo       text not null,
  tipo         text,                    -- constitucion | diario | acta | doc
  ubicacion    text,                    -- ruta o URL
  created_at   timestamptz not null default now()
);
```

### 5. `memoria`
Conocimiento permanente (la memoria de RIT). Regla Cero.
```sql
create table memoria (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid references proyectos(id),
  clave        text not null,           -- slug corto
  contenido    text not null,
  tipo         text default 'hecho',    -- hecho | preferencia | referencia
  created_at   timestamptz not null default now()
);
```

### 6. `tareas`
Trabajo pendiente y hecho del ecosistema.
```sql
create table tareas (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid references proyectos(id),
  titulo       text not null,
  estado       text default 'pendiente', -- pendiente | en_progreso | hecho
  prioridad    text default 'media',     -- baja | media | alta
  asignado_a   uuid references usuarios(id),
  created_at   timestamptz not null default now(),
  completado_at timestamptz
);
```

### 7. `decisiones`
Decisiones importantes (corazón de la Regla Cero).
```sql
create table decisiones (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid references proyectos(id),
  titulo       text not null,
  contexto     text,
  decision     text not null,
  sesion       int,                      -- nº de diario de sesión
  created_at   timestamptz not null default now()
);
```

### 8. `logs`
Registro de actividad del ecosistema.
```sql
create table logs (
  id           uuid primary key default gen_random_uuid(),
  origen       text,                     -- app / agente que generó el log
  evento       text not null,
  detalle      jsonb,
  created_at   timestamptz not null default now()
);
```

### 9. `integraciones`
Conexiones activas (n8n, Stripe, Monday, Gmail…).
```sql
create table integraciones (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,            -- "n8n blog visas"
  herramienta  text not null,            -- n8n | stripe | monday | gmail
  estado       text default 'activo',    -- activo | roto | pausado
  notas        text,
  created_at   timestamptz not null default now()
);
```

---

## Datos de arranque (seed) sugeridos

Al crear `rit_core`, sembrar de inmediato lo que ya sabemos:
- `usuarios`: Reyna (founder).
- `agentes`: Génesis.
- `proyectos`: los 11 módulos del `REPOS-INVENTORY.md`.
- `decisiones`: las tomadas en Sesiones 1-3 (nombre RIT, arquitectura hub+módulos, Constitución v1.0).
- `integraciones`: blog de visas n8n (activo pendiente), Eleven Love→Monday (roto).

## Seguridad (RLS)

- Activar RLS en las 9 tablas.
- Política inicial: solo el `auth_id` de Reyna puede leer/escribir.
- A futuro, políticas por rol cuando entren agentes o equipo.

## Decisión pendiente de Reyna

1. ¿`rit_core` es un **proyecto nuevo** en Supabase, o un **esquema dentro de uno
   existente**? (Recomendación: proyecto nuevo y dedicado, para no mezclar con las
   apps.)
2. ¿En qué organización de Supabase? (tienes varias por proyecto).

> Cuando se decida, este diseño se convierte en migración SQL y se ejecuta.
