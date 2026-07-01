# INTEGRACIONES — RIT

> Cómo se conectan las herramientas del ecosistema. n8n es el puente principal.

## Herramientas del ecosistema

| Herramienta | Uso | Estado |
|-------------|-----|--------|
| **Supabase** | Base central `rit_core` + Auth | 🟡 En uso por apps sueltas; falta central |
| **n8n** | Puente entre herramientas | 🟡 Hay workflows activos (ej. blog de visas) |
| **GitHub** | Mapa técnico + código | ✅ En uso |
| **Monday** | Gestión / boards (clientes, pagos) | ✅ En uso |
| **Stripe** | Pagos | 🟡 Parcial |
| **Gmail** | Correo | ✅ En uso |
| **Google Drive** | Documentos | ✅ En uso |
| **ElevenLabs** | Voz (ALMA, MUJER, agente de llamadas) | ✅ En uso |
| **Apple/Google Login** | Acceso unificado | ⬜ Pendiente |

## Flujo objetivo

```
Herramientas externas ──► n8n ──► API Génesis ──► rit_core
                                      │
                                      └──► módulos (ALMA, Dream Portal, Evaluador…)
```

## Workflows n8n conocidos

| Workflow | Función | Estado |
|----------|---------|--------|
| Blog de visas | USCIS → Claude → WordPress | 🟡 Construido, pendiente activar |
| Eleven Love → Monday | Llamadas de voz → board | 🔴 Roto desde 24-jun-2026 |

> Nota: este inventario se irá completando. Regla Cero — si se conecta algo nuevo,
> se anota aquí.
