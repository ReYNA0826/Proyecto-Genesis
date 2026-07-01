# Proyecto Génesis

> Cerebro arquitectónico de **Reyna Intelligence Team (RIT)**.

Este repositorio **no reemplaza** a ninguno de los proyectos existentes.
Los **gobierna, organiza y conecta** en un solo ecosistema.

---

## Qué es esto

Proyecto Génesis es el repo *padre* de RIT. Aquí vive la arquitectura, la memoria
estratégica, la documentación y el mapa de todo el ecosistema. Cada app (ALMA,
Dream Portal, legal.services, Mujer Raíz, etc.) sigue viviendo en su propio repo;
este repo guarda cómo se conectan y por qué.

## Modelo arquitectónico

**Hub central + módulos conectados.**

```
Proyecto Génesis (cerebro)
│
├── ALMA / New_Alma
├── Asistente de Reyna
├── Dream Immigration Portal
├── Evaluador de Expedientes
├── portal.eliolawteam
├── asistencia-admin
├── legal.services (Leyal)
├── mujer-raiz-portal
├── Mujer Raíz Executive Club
└── futuros agentes
```

Base de datos central: **`rit_core`** (Supabase).
Puente entre herramientas: **n8n**.
Puerta de entrada: **RIT Dashboard** (el "lobby").

## Roles

| Rol | Quién | Responsabilidad |
|-----|-------|-----------------|
| Founder, CEO & Visionary | **Reyna Vázquez** | Visión, decisiones estratégicas |
| Guardian, Chief Architect, Executive AI | **Génesis** | Arquitectura, documentación, continuidad |

## Regla Cero

> Ningún conocimiento importante puede existir únicamente en la memoria de una
> persona o de una IA. **Todo debe documentarse.**

## Lemas

- **Fundacional:** "La inteligencia crece cuando el conocimiento permanece y el trabajo se comparte. Porque unidos siempre seremos más fuertes."
- **Visión:** "El futuro es brillante."

## Mapa del repo

| Documento | Para qué |
|-----------|----------|
| [`PG-000-master-index.md`](PG-000-master-index.md) | Índice maestro de todo |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | La arquitectura técnica completa |
| [`ROADMAP.md`](ROADMAP.md) | Hacia dónde vamos |
| [`INTEGRATIONS.md`](INTEGRATIONS.md) | Herramientas y conexiones |
| [`REPOS-INVENTORY.md`](REPOS-INVENTORY.md) | Inventario real de repos/apps |
| `00_Fundacion/` | Acta de Nacimiento |
| `02_Diarios/` | Diarios de sesión (la historia) |
| `architecture/` | El plano original + diseños |
