# Genesis Dev Console

**Proyecto:** Proyecto Génesis  
**Estado:** Diseño inicial  
**Versión:** 0.1

---

## 1. Propósito

Genesis Dev Console será la consola técnica desde donde Génesis podrá analizar el estado del ecosistema de Proyecto Génesis sin depender de acceso directo e inseguro a cada herramienta.

Su objetivo es actuar como una capa de lectura, auditoría y recomendación sobre:

- GitHub
- Supabase
- Vercel
- n8n
- Monday
- Google Drive
- Stripe
- Gmail
- Google Calendar
- Otros módulos futuros

---

## 2. Principio de seguridad

Génesis no debe tener acceso ilimitado a herramientas críticas.

Todo acceso debe pasar por una capa controlada, auditable y con permisos mínimos.

Principio rector:

> Acceso mínimo. Trazabilidad máxima. Acción humana final.

---

## 3. Capacidades iniciales

La primera versión de Genesis Dev Console deberá permitir:

1. Ver repositorios conectados.
2. Leer estructura de archivos.
3. Identificar documentación faltante.
4. Revisar commits recientes.
5. Detectar duplicación de módulos.
6. Analizar issues y roadmap.
7. Evaluar riesgos de arquitectura.
8. Generar reportes ejecutivos.
9. Proponer próximos pasos.
10. Actualizar PG-000 cuando sea aprobado.

---

## 4. Acciones restringidas

En la primera etapa, Genesis Dev Console no debe:

- borrar archivos;
- desplegar producción;
- modificar bases de datos;
- enviar correos externos;
- ejecutar pagos;
- cambiar permisos;
- alterar configuraciones críticas.

Estas acciones requerirán aprobación explícita de Reyna.

---

## 5. Arquitectura conceptual

```text
Reyna
  |
  v
Genesis Dev Console
  |
  v
Genesis Gateway
  |
  +-- GitHub Connector
  +-- Supabase Connector
  +-- Vercel Connector
  +-- n8n Connector
  +-- Monday Connector
  +-- Google Drive Connector
  +-- Stripe Connector
```

---

## 6. Fases

### Fase 0
Documentación y diseño del agente.

### Fase 1
Lectura de GitHub y generación de reportes.

### Fase 2
Integración con Supabase y Vercel.

### Fase 3
Integración con n8n, Monday y Google Drive.

### Fase 4
Consola ejecutiva dentro de Reyna Intelligence Team.

---

## 7. Resultado esperado

Genesis Dev Console permitirá que Proyecto Génesis tenga una visión técnica centralizada, sin depender de conversaciones sueltas ni accesos inseguros.

Será el primer instrumento real para que Génesis pueda actuar como guardián técnico del ecosistema.

---

**Proyecto Génesis continúa.**
