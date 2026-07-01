# ROADMAP — Proyecto Génesis / RIT

> Construir paso a paso. Claridad sobre velocidad. Cada paso debe hacer más
> fuerte a Proyecto Génesis.

## Fase 0 — Fundación ✅ (2026-07-01)

- [x] Acta de Nacimiento
- [x] Diario Sesión 01
- [x] Definir arquitectura (plano "Sistema Operativo Personal IA")
- [x] Crear repo padre `Proyecto-Genesis` con andamiaje
- [x] Consolidar carpetas dispersas en un solo lugar
- [x] Inventario real de repos

## Fase 1 — Cimientos (próxima)

- [ ] Redactar **Constitución de RIT v0.1**
- [ ] Subir `Proyecto-Genesis` a GitHub (`ReYNA0826/Proyecto-Genesis`)
- [ ] Confirmar ubicación de los repos ⚠️ (Dream Portal, Evaluador, etc.)
- [ ] Definir el prompt oficial de **Génesis** (guardarlo en `/prompts`)

## Fase 2 — Cerebro de datos

- [x] Definir esquema de tablas (9 tablas — ver `database/rit_core-schema.md`)
- [x] Crear `rit_core` en Supabase (esquema dentro de Legal.Services, $0 extra)
- [x] Sembrar datos reales (1 usuario, 1 agente, 11 proyectos, 5 decisiones, 3 integraciones)
- [ ] Definir políticas RLS por rol (hoy: deny-by-default)
- [ ] Un solo login (Supabase Auth / Google / Apple) — pendiente (cada app tiene su auth)

## Fase 3 — El lobby

- [x] Diseñar y construir **RIT Dashboard v1** (snapshot) — `dashboard/index.html`
- [ ] Dashboard v2: datos en vivo desde `rit_core` con login (server-side)
- [ ] Desplegar el dashboard (Vercel / GitHub Pages)
- [ ] Conectar el primer módulo vía API

## Fase 4 — Conexiones

- [ ] n8n como puente central (Monday, Stripe, Gmail, Drive, GitHub)
- [ ] APIs comunes por módulo

## Futuro

- [ ] Definir agentes especializados de RIT
- [ ] Abrir **Genesis Labs**

---

**Regla de oro para cada tarea:** ¿esto hace más fuerte a Proyecto Génesis?
Si la respuesta no es un sí claro, se documenta la duda y se pospone.
