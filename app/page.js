import { redirect } from "next/navigation";
import { supabaseServer } from "../lib/supabase";

export const dynamic = "force-dynamic";

async function signOut() {
  "use server";
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}

const INICIALES = { ALMA: "A", LEX: "L", TECH: "T", OPS: "O", FIN: "F", MKT: "M", EDU: "E", "GÉNESIS": "✦", NOVA: "N", INTEL: "I" };

// Retratos oficiales (rit_core → HeyGen), servidos como archivos propios para no caducar.
const FOTOS = {
  ALMA: "/avatars/alma.jpg", LEX: "/avatars/lex.webp", TECH: "/avatars/tech.webp",
  OPS: "/avatars/ops.webp", FIN: "/avatars/fin.webp", MKT: "/avatars/mkt.webp",
  EDU: "/avatars/edu.webp", "Génesis": "/avatars/genesis.webp",
};

function Cara({ nombre, size = 52, fontSize = 22 }) {
  const foto = FOTOS[nombre];
  if (foto) {
    return <img className="face foto" src={foto} alt={nombre} style={{ width: size, height: size }} />;
  }
  return <div className="face" style={{ width: size, height: size, fontSize }}>{INICIALES[nombre] ?? "✦"}</div>;
}

// Piso 2 — perfiles diseñados en PG-021 (prototipo de Reyna). Aún NO sembrados en
// rit_core: requieren aprobación de Reyna (regla de Génesis). Cero métricas inventadas.
const PISO2 = [
  { code: "LEX-IA", rol: "Agente Legal", reporta: "LEX" },
  { code: "INV-IA", rol: "Agente de Investigación", reporta: "LEX" },
  { code: "DOC-IA", rol: "Agente Documental", reporta: "OPS" },
  { code: "PROC-IA", rol: "Agente Procesal", reporta: "OPS" },
  { code: "FIN-IA", rol: "Agente Financiero", reporta: "FIN" },
  { code: "CRM-IA", rol: "Agente de Clientes", reporta: "OPS" },
  { code: "CONT-IA", rol: "Agente de Contenido", reporta: "MKT" },
  { code: "DIS-IA", rol: "Agente de Diseño", reporta: "MKT" },
  { code: "ANA-IA", rol: "Agente de Análisis", reporta: "INTEL" },
];

export default async function Edificio() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const [agentes, proyectos, lecciones, decisiones, logs, briefings] = await Promise.all([
    supabase.from("v_rit_agentes").select("*"),
    supabase.from("v_rit_proyectos").select("*"),
    supabase.from("v_rit_lecciones").select("*").order("confianza", { ascending: false }),
    supabase.from("v_rit_decisiones").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("v_rit_logs").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("v_rit_briefings").select("*").order("created_at", { ascending: false }).limit(1),
  ]);

  const todos = agentes.data ?? [];
  const alma = todos.find((a) => a.nombre === "ALMA");
  const genesis = todos.find((a) => a.nombre === "Génesis");
  const directores = todos.filter(
    (a) => a.elevenlabs_agent_id && INICIALES[a.nombre] && !["ALMA"].includes(a.nombre)
  );
  const enDiseno = todos.filter((a) => a.estado === "diseñado" && INICIALES[a.nombre]);
  const proys = (proyectos.data ?? []).filter((p) => p.estado === "activo");
  const lecs = lecciones.data ?? [];
  const decs = decisiones.data ?? [];
  const acts = logs.data ?? [];
  const brief = (briefings.data ?? [])[0];
  const fecha = new Date().toLocaleDateString("es-US", { dateStyle: "long", timeZone: "America/New_York" });

  // Luces vivas (PG-022): una oficina "enciende" según la actividad REAL de su agente
  // en rit_core.logs. Sin métricas inventadas — si un agente no registró, no brilla.
  const ultimaActividad = {};
  for (const l of acts) {
    if (l.origen && !ultimaActividad[l.origen]) ultimaActividad[l.origen] = l.created_at; // acts viene ordenado desc
  }
  const diaNY = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const hoyNY = diaNY(new Date());
  function actividadDe(nombre) {
    const last = ultimaActividad[nombre];
    if (!last) return { nivel: "inactiva", texto: null };
    const lastNY = diaNY(last);
    if (lastNY === hoyNY) return { nivel: "viva", texto: "EN LÍNEA · activa hoy" };
    const dias = Math.max(1, Math.round((new Date(hoyNY) - new Date(lastNY)) / 86400000));
    if (dias <= 7) return { nivel: "reciente", texto: `activa hace ${dias} d` };
    return { nivel: "inactiva", texto: `última actividad hace ${dias} d` };
  }
  const actAlma = actividadDe("ALMA");
  const actGenesis = actividadDe("Génesis");
  const encendidasHoy = new Set(Object.keys(ultimaActividad).filter((n) => diaNY(ultimaActividad[n]) === hoyNY));

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · EL EDIFICIO GÉNESIS</b>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/configuracion" className="btn" style={{ textDecoration: "none" }}>Configuración</a>
          {user ? (
            <>
              <span className="who">{user.email} · Fundadora &amp; CEO</span>
              <form action={signOut}><button className="btn">Salir</button></form>
            </>
          ) : (
            <span className="who">Edificio abierto · Fundadora: Reyna Vázquez</span>
          )}
        </div>
      </div>

      <header className="lobby">
        <img
          src="/genesis-icon.jpeg"
          alt="Génesis — el futuro es brillante"
          width={72}
          height={72}
          style={{ borderRadius: "50%", boxShadow: "0 0 30px rgba(212,175,55,.3)" }}
        />
        <h1>Bienvenida, Reyna 👋</h1>
        <p>“La inteligencia crece cuando el conocimiento permanece y el trabajo se comparte.”</p>
        <div className="hi">{fecha} · datos en vivo desde rit_core · v3.2 · el edificio respira</div>
      </header>

      <div className="room-tag"><span>◆ Nivel 3 · Oficinas de Directores</span></div>
      <div className="room-sub">
        Toca una oficina: perfil real, rostro en vivo (HeyGen) y conversación (ElevenLabs) ·
        las luces se encienden por actividad real en <code style={{ color: "var(--gold)" }}>rit_core.logs</code>
        {" — "}
        <span className="leyenda"><span className="luz viva ing"></span> hoy</span>
        <span className="leyenda"><span className="luz reciente ing"></span> esta semana</span>
        <span className="leyenda"><span className="luz inactiva ing"></span> en reposo</span>
        {encendidasHoy.size > 0 && <b style={{ color: "var(--green)" }}> · {encendidasHoy.size} activa{encendidasHoy.size > 1 ? "s" : ""} hoy</b>}
      </div>
      <section className="consejo">
        {alma && (
          <a className={`desk ceo dua${actAlma.nivel === "viva" ? " viva" : ""}`} href="/oficina/alma">
            <span className={`luz ${actAlma.nivel}`} title={actAlma.texto || "sin actividad reciente"}></span>
            <Cara nombre="ALMA" size={62} fontSize={26} />
            <div className="body">
              <span className="nm" style={{ fontSize: 17 }}>ALMA · Directora Ejecutiva</span>
              <span className={`badge${actAlma.nivel === "viva" ? " on" : ""}`}>{actAlma.nivel === "viva" ? "EN LÍNEA · hoy" : "en su oficina"}</span>
              <p>{alma.proposito} <b style={{ color: "var(--gold)" }}>Entra a su oficina y habla con ella →</b></p>
            </div>
          </a>
        )}
        {genesis && genesis.elevenlabs_agent_id && (
          <a className={`desk ceo dua${actGenesis.nivel === "viva" ? " viva" : ""}`} href="/oficina/génesis">
            <span className={`luz ${actGenesis.nivel}`} title={actGenesis.texto || "sin actividad reciente"}></span>
            <Cara nombre="Génesis" size={62} fontSize={26} />
            <div className="body">
              <span className="nm" style={{ fontSize: 17 }}>GÉNESIS · Chief Architect</span>
              <span className={`badge${actGenesis.nivel === "viva" ? " on" : ""}`}>{actGenesis.nivel === "viva" ? "EN LÍNEA · hoy" : "en su oficina"}</span>
              <p>{genesis.proposito || "Guardiana del sistema y memoria estratégica de RIT."} <b style={{ color: "var(--gold)" }}>Entra a su oficina y habla con ella →</b></p>
            </div>
          </a>
        )}
        {directores.filter((d) => d.nombre !== "Génesis").map((d) => {
          const act = actividadDe(d.nombre);
          return (
            <a key={d.nombre} className={`desk${act.nivel === "viva" ? " viva" : ""}`} href={`/oficina/${d.nombre.toLowerCase()}`}>
              <span className={`luz ${act.nivel}`} title={act.texto || "sin actividad reciente"}></span>
              <Cara nombre={d.nombre} />
              <div className="nm">{d.nombre}</div>
              <div className="rl">{(d.proposito || "").split("—")[0]}</div>
              <div className={`st ${act.nivel}`}>
                {act.nivel === "viva" ? "● EN LÍNEA · hoy" : act.texto ? `○ ${act.texto}` : "● entrar a su oficina"}
              </div>
            </a>
          );
        })}
        {enDiseno.map((d) => {
          const act = actividadDe(d.nombre);
          return (
            <div key={d.nombre} className="desk obra">
              <span className={`luz ${act.nivel}`} title={act.texto || "sin actividad reciente"}></span>
              <Cara nombre={d.nombre} />
              <div className="nm">{d.nombre}</div>
              <div className="rl">{(d.proposito || "").split("—")[0]}</div>
              <div className="st" style={{ color: act.nivel === "viva" ? "var(--green)" : "var(--silver)" }}>
                {act.nivel === "viva" ? "● trabajando · oficina en obra" : "🚧 oficina en construcción"}
              </div>
            </div>
          );
        })}
        <a className="desk ceo" href="/sala-de-reuniones" style={{ borderColor: "var(--gold)" }}>
          <div className="face">🏛️</div>
          <div className="body">
            <span className="nm" style={{ fontSize: 16 }}>Nivel 2 · Sala del Consejo Ejecutivo</span>
            <p>Trae una decisión a la mesa: ALMA la analiza con las perspectivas de todos sus directores y te entrega UNA recomendación. <b style={{ color: "var(--gold)" }}>Entrar a la sala →</b></p>
          </div>
        </a>
      </section>

      <div className="room-tag"><span>⚙️ Piso 2 · Agentes Operativos</span></div>
      <div className="room-sub">Perfiles diseñados en PG-021/PG-022 — pendientes de tu aprobación para sembrarse en rit_core</div>
      <section className="piso2">
        {PISO2.map((p) => (
          <div key={p.code} className="desk obra" style={{ padding: "12px 8px 10px" }}>
            <div className="nm" style={{ fontSize: 12 }}>{p.code}</div>
            <div className="rl">{p.rol}</div>
            <div className="st" style={{ color: "var(--silver)" }}>→ {p.reporta} · 🚧 diseñado</div>
          </div>
        ))}
      </section>

      {brief && (
        <>
          <div className="room-tag"><span>💡 Sala de Innovación · Briefing de NOVA</span></div>
          <div className="room-sub">
            {new Date(brief.fecha + "T12:00:00").toLocaleDateString("es-US", { dateStyle: "long" })} · {brief.redactado_por}
          </div>
          <section className="roomcard">
            <h3>{brief.titulo}</h3>
            <p style={{ whiteSpace: "pre-line", fontSize: 13, color: "#c7cfdc", lineHeight: 1.65, margin: "10px 0 0" }}>{brief.cuerpo}</p>
            {Array.isArray(brief.fuentes) && brief.fuentes.length > 0 && (
              <p style={{ fontSize: 11, color: "var(--silver)", marginTop: 12 }}>
                Fuentes:{" "}
                {brief.fuentes.map((f, i) => (
                  <span key={f.url}>
                    {i > 0 ? " · " : ""}
                    <a href={f.url} target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>{f.titulo}</a>
                  </span>
                ))}
              </p>
            )}
          </section>
        </>
      )}

      <div className="room-tag"><span>🧠 Nivel 4 · Sala de Memoria · 📊 Tablero</span></div>
      <section className="wings">
        <div className="roomcard">
          <h3>Lecciones aprendidas ({lecs.length})</h3>
          <div className="sub">Experiencia, no memoria — Protocolo PG-017 · ordenadas por confianza</div>
          <ul className="mem">
            {lecs.slice(0, 7).map((l) => (
              <li key={l.titulo}><b>{"★".repeat(l.confianza)}</b><span><strong>{l.titulo}.</strong> {l.leccion}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="roomcard" style={{ marginBottom: 14 }}>
            <h3>El tablero</h3>
            <div className="sub">rit_core en tiempo real — solo hechos</div>
            <div className="kpis">
              <div className="kpi"><div className="n">{todos.length}</div><div className="l">Agentes</div><div className="x">{directores.length + (alma ? 1 : 0) + (genesis?.elevenlabs_agent_id ? 1 : 0)} con oficina</div></div>
              <div className="kpi"><div className="n">{proys.length}</div><div className="l">Proyectos activos</div><div className="x">de {(proyectos.data ?? []).length} totales</div></div>
              <div className="kpi"><div className="n">{decs.length ? `${decs.length}+` : 0}</div><div className="l">Decisiones recientes</div><div className="x">con resultados (PG-017)</div></div>
              <div className="kpi"><div className="n">{lecs.length}</div><div className="l">Lecciones</div><div className="x">la experiencia de RIT</div></div>
            </div>
          </div>
          <div className="roomcard">
            <h3>Actividad reciente</h3>
            <div className="sub">registro vivo de la organización</div>
            <ul className="mem">
              {acts.slice(0, 6).map((a, i) => (
                <li key={i}><b>{a.origen}</b><span>{a.evento}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="room-tag"><span>📁 Decisiones recientes</span></div>
      <section className="roomcard">
        <ul className="mem">
          {decs.map((d) => (
            <li key={d.titulo}>
              <b>S{d.sesion}</b>
              <span>
                <strong>{d.titulo}.</strong> {d.decision}
                {d.resultado ? <em style={{ color: "var(--green)" }}> · resultado: {d.resultado}</em> : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="room-tag"><span>🚪 Nivel 5 · Pasillo de Proyectos</span></div>
      <section className="hall">
        {proys.map((p) => (
          <div className="door" key={p.slug}>{p.nombre}<small>{p.descripcion || p.tipo}</small></div>
        ))}
      </section>

      <footer className="foot">
        <div className="lema">✦ El futuro es brillante.</div>
        <div className="dom">GENESIS.GENT · PROYECTO GÉNESIS · EL EDIFICIO v3.2 — LUCES VIVAS</div>
      </footer>
    </div>
  );
}
