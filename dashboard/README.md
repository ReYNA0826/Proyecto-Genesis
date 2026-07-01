# RIT Dashboard — el "Lobby"

Punto de entrada visual a Reyna Intelligence Team. Muestra los proyectos,
decisiones, integraciones y agentes del ecosistema.

## Versiones

- **v1 (snapshot) — ✅ hecho.** `index.html` autónomo. Muestra un snapshot de
  `rit_core` capturado el 2026-07-01 (Sesión 03). Se abre en cualquier navegador,
  sin login ni servidor. Desplegable tal cual (Vercel/Netlify/GitHub Pages).
- **v2 (en vivo) — ⬜ pendiente.** Leer `rit_core` en tiempo real, con login. Como
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
los datos en `index.html`. En v2 esto será automático.
