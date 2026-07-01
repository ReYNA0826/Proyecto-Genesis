# RIT Dashboard — Centro de Comando (el "Lobby")

Punto de entrada visual a Reyna Intelligence Team. No es solo un dashboard: es un
**centro de comando** que responde una pregunta —
*¿qué necesita saber Reyna para dirigir todo hoy?* Cada bloque existe para
**decidir, actuar o recordar** (spec: `PG-000`).

## Estructura (PG-000)

1. **Header** — logo Génesis, saludo, lema, fecha/hora, buscador global, notificaciones, perfil.
2. **Sidebar** — Dashboard · ALMA · Consejo Ejecutivo IA · Agentes · Memoria · Proyectos · Tareas · Documentos · Analíticas · Genesis Labs · Configuración · Ayuda + Estado del Sistema.
3. **ALMA (hero)** — tarjeta de la Executive AI + Hablar con ALMA · Informe Ejecutivo · Nueva Solicitud.
4. **Resumen General** — Agentes · Proyectos · Tareas de hoy · Documentos · Memoria utilizada (con sparklines).
5. **Consejo Ejecutivo IA** — ALMA · LEX · TECH · OPS · FIN · MKT · EDU.
6. **Proyectos principales** — con progreso.
7. **Tareas de hoy** — completadas / en progreso / pendientes / bloqueadas.
8. **Actividad reciente** — documentos, commits, n8n, alertas.
9. **Memoria permanente** — conversaciones, documentos, decisiones, personas, proyectos, lecciones (dona).
10. **Acceso rápido inferior** — nueva tarea, proyecto, documento, memoria, ALMA, Labs.

## Versiones

- **v3 (centro de comando) — ✅ hecho.** `index.html` autónomo de alta fidelidad
  con la estructura completa PG-000 (paleta command-center violeta/índigo sobre
  base Azul Génesis). Se abre en cualquier navegador, sin login ni servidor.
  Desplegable tal cual (Vercel/Netlify/GitHub Pages). Datos = snapshot de referencia.
- **v4 (en vivo) — ⬜ pendiente.** Leer `rit_core` en tiempo real, con login. Como
  `rit_core` vive en Legal.Services y su anon key es pública, la lectura en vivo debe
  hacerse **del lado del servidor** (Next.js + service role) o con un login propio —
  NO exponiendo rit_core al anon key compartido. Decisión de arquitectura para la
  próxima sesión.

## Cómo verlo hoy

Abrir `dashboard/index.html` en el navegador (doble clic). O servirlo:
```
cd dashboard && python3 -m http.server 8080   # http://localhost:8080
```

## Para regenerar el snapshot

Volver a consultar `rit_core` (proyectos, decisiones, integraciones) y actualizar
los datos en `index.html`. En v4 esto será automático.
