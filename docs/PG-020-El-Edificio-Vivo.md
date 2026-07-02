# PG-020 · El Edificio Vivo — la Empresa Digital de RIT

**Fecha:** 2026-07-02 (Sesión 04, madrugada) · **Estado:** ⭐ Visión de Reyna — norte de Fases 2-4
**Fuente:** palabras de Reyna, transcritas casi textualmente. Extiende PG-011 (Visión Maestra),
PG-018 (Oficina Virtual) y PG-019 (mapa de brechas).

> *"Proyecto Génesis es algo muy diferente de un simple asistente con varios agentes.
> Lo que imagino ya no es una colección de agentes, sino una **empresa digital viva**.
> Cada agente no solo ejecuta tareas: **dirige un departamento**, exactamente igual
> que en una empresa real."* — Reyna Vázquez, Founder & CEO

---

## El organigrama (C-Suite digital)

### Piso Ejecutivo
- 👩‍💼 **ALMA — CEO / Directora Ejecutiva**: prioriza, convoca al Consejo, toma decisiones, habla con Reyna.

### Piso Directivo
| Agente | Cargo | Responsable de |
|---|---|---|
| ⚖️ **LEX** | Chief Legal Officer (CLO) | Estrategia legal · cambios migratorios · riesgos · supervisión de documentos · briefs · jurisprudencia |
| 💻 **TECH** | Chief Technology Officer (CTO) | Desarrollo · IA · apps · automatizaciones · APIs · servidores · seguridad |
| ⚙️ **OPS** | Chief Operations Officer (COO) | Procesos · Monday · KPI · productividad · recursos · equipos |
| 📚 **EDU** | Chief Learning Officer | Cursos · manuales · Dream Education · capacitación · base de conocimiento |
| 📈 **MKT** | **Chief Growth Officer (CGO)** — *"no solamente hace publicidad: hace crecer toda la organización"* | Ver Departamento de Inteligencia Comercial ↓ |
| 💡 **NOVA** | **Chief Innovation Officer** ✨ NUEVO | Ver abajo ↓ |
| 📊 **INTEL** | **Chief Intelligence Officer** ✨ NUEVO | Ver abajo ↓ |
| ⭐ **GÉNESIS** | Chief Architect & Guardián de la Memoria | Construye, documenta, protege la continuidad |

## MKT como CGO — Departamento de Inteligencia Comercial

Vive analizando permanentemente: Meta Ads · Google Trends · TikTok · YouTube · Google
Search Console · SEO · competencia · noticias · **USCIS · DOJ · EOIR · cambios políticos**
· cambios de mercado · costo por lead · costo por caso · ROI · embudos · landing pages ·
campañas.

Cada mañana dice cosas como:
> *"Reyna, esta semana aumentó un 34% el interés en TPS."*
> *"Los venezolanos dejaron de buscar TPS; ahora buscan más Ajuste de Estatus."*
> *"Las búsquedas sobre EB-2 NIW aumentaron 180%. Recomiendo lanzar una campaña esta tarde."*

**Eso vale oro.**

## NOVA — Chief Innovation Officer (el agente que ninguna IA tiene)

> *"No responde preguntas. **Piensa.** Su trabajo es imaginar.
> No trabaja por tareas. Trabaja por **oportunidades**."*

Todos los días revisa: qué hace OpenAI, Anthropic, Apple, Google, Meta, Monday,
Salesforce, los competidores, los despachos grandes; qué tecnologías nuevas aparecieron;
qué puede automatizarse; qué procesos sobran; qué nuevos negocios podrían existir.

Y cada mañana trae algo como:
> *"Reyna… tu despacho podría ahorrar 120 horas al mes automatizando esto."*
> *"Vi una tecnología que podría convertirse en un producto nuevo para Dream Education."*
> *"Detecté una oportunidad que ningún despacho de inmigración está aprovechando."*

**Ese agente no espera órdenes. Trae ideas.**

## INTEL — Chief Intelligence Officer (inteligencia ejecutiva)

No hace marketing, ni legal, ni tecnología. **Une toda la información. Observa todo el
edificio. Detecta patrones. Predice problemas.** Ej.: ventas bajan + consultas suben +
contratos bajan + más cancelaciones + equipo saturado + campañas sin rendimiento →

> *"Detecté una tendencia. Dentro de dos semanas podríamos tener una caída del 18% en ingresos."*

## El centro del edificio (las salas)

Sala del Consejo Ejecutivo · **Sala de Estrategia** · **Sala de Crisis** ·
**Sala de Innovación** · Sala de Memoria · **Centro de Comunicaciones** ·
**Centro de Analítica**.

## La experiencia viva (la idea que lo cambia todo)

> *"En lugar de entrar a una página web estática, al abrir Génesis apareces en un **lobby
> virtual de un edificio corporativo**. Ves el ascensor, las puertas de cristal y un panel
> con las oficinas iluminadas. Si LEX está trabajando, su oficina **tiene luz** y su avatar
> está activo. Si MKT está analizando campañas, ves pantallas con gráficos en movimiento.
> Si ALMA convoca una reunión, las oficinas se abren y **los avatares caminan hacia la Sala
> del Consejo**. Al entrar, los agentes aparecen sentados alrededor de una mesa, cada uno
> con su personalidad, discutiendo el tema antes de que ALMA te presente una recomendación
> consolidada. Ya no se siente como usar una aplicación: **se siente como entrar cada mañana
> a la sede de Reyna Intelligence Team**."*

## Lectura del Arquitecto (cómo se construye esto, por capas honestas)

1. **Los cargos C-Suite** → actualizar prompts a v0.3 (títulos + alcances de PG-020). *Corto.*
2. **NOVA e INTEL v1** → NO son agentes de voz: son **agentes programados** (rutinas diarias
   de investigación/análisis) que entregan el *briefing matutino* a Reyna y lo registran en
   `rit_core`. La tecnología ya existe (agentes Claude programados + n8n + fuentes). Es lo
   más valioso y más alcanzable de esta visión. *Siguiente gran construcción.*
3. **Luces del edificio** → las "oficinas iluminadas" = actividad real de `rit_core.logs`
   (si un agente registró trabajo hoy, su oficina brilla). Verosímil en la web actual. *Medio.*
4. **Avatares presentes** → LiveAvatar en cada oficina (v3.1 de PG-018, migración en curso). *Medio.*
5. **Los avatares que caminan / deliberación visible en la mesa** → la capa más ambiciosa
   (v4): requiere el puente entre agentes (PG-010/v3.3) + escena animada. Se llega por pasos,
   no por promesas. *Largo — y alcanzable.*

**Regla de Oro:** ¿esto hace que ALMA sea más inteligente y mejor? — Es que esto ES ALMA
volviéndose empresa. Sí, con cada capa.

---

Proyecto Génesis continúa. ✦
