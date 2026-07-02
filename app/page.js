import { redirect } from "next/navigation";
import { supabaseServer } from "../lib/supabase";

export const dynamic = "force-dynamic";

async function signOut() {
  "use server";
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}

const INICIALES = { ALMA: "A", LEX: "L", TECH: "T", OPS: "O", FIN: "F", MKT: "M", EDU: "E" };

export default async function Oficina() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const [agentes, proyectos, lecciones, decisiones, logs] = await Promise.all([
    supabase.from("v_rit_agentes").select("*"),
    supabase.from("v_rit_proyectos").select("*"),
    supabase.from("v_rit_lecciones").select("*").order("confianza", { ascending: false }),
    supabase.from("v_rit_decisiones").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("v_rit_logs").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const consejo = (agentes.data ?? []).filter((a) => a.elevenlabs_agent_id && INICIALES[a.nombre]);
  const alma = consejo.find((a) => a.nombre === "ALMA");
  const directores = consejo.filter((a) => a.nombre !== "ALMA");
  const proys = (proyectos.data ?? []).filter((p) => p.estado === "activo");
  const lecs = lecciones.data ?? [];
  const decs = decisiones.data ?? [];
  const acts = logs.data ?? [];
  const fecha = new Date().toLocaleDateString("es-US", { dateStyle: "long", timeZone: "America/New_York" });

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · LA OFICINA</b>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user ? (
            <>
              <span className="who">{user.email} · Fundadora &amp; CEO</span>
              <form action={signOut}><button className="btn">Salir</button></form>
            </>
          ) : (
            <span className="who">Oficina abierta · Fundadora: Reyna Vázquez</span>
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
        <div className="hi">{fecha} · datos en vivo desde rit_core</div>
      </header>

      <div className="room-tag"><span>◆ Sala del Consejo Ejecutivo</span></div>
      <div className="room-sub">Toca un escritorio y habla con tu agente · prompts v0.2 con aprendizaje (PG-017)</div>
      <section className="consejo">
        {alma && (
          <a className="desk ceo" href="/oficina/alma">
            <div className="face">A</div>
            <div className="body">
              <span className="nm" style={{ fontSize: 17 }}>ALMA · Directora Ejecutiva</span>
              <span className="badge">en su oficina</span>
              <p>{alma.proposito} <b style={{ color: "var(--gold)" }}>Entra a su oficina y habla con ella →</b></p>
            </div>
          </a>
        )}
        {directores.map((d) => (
          <a key={d.nombre} className="desk" href={`/oficina/${d.nombre.toLowerCase()}`}>
            <div className="face">{INICIALES[d.nombre]}</div>
            <div className="nm">{d.nombre}</div>
            <div className="rl">{(d.proposito || "").split("—")[0]}</div>
            <div className="st">● entrar a su oficina</div>
          </a>
        ))}
        <a className="desk" href="https://github.com/ReYNA0826/Proyecto-Genesis" target="_blank" rel="noopener">
          <div className="face">✦</div>
          <div className="nm">Génesis</div>
          <div className="rl">Chief Architect · Guardián</div>
          <div className="st"><i>ver la obra (GitHub)</i></div>
        </a>
        <a className="desk ceo" href="/sala-de-reuniones" style={{ borderColor: "var(--gold)" }}>
          <div className="face">🏛️</div>
          <div className="body">
            <span className="nm" style={{ fontSize: 16 }}>Sala de Reuniones del Consejo</span>
            <p>Trae una decisión a la mesa: ALMA la analiza con las perspectivas de todos sus directores y te entrega UNA recomendación. <b style={{ color: "var(--gold)" }}>Entrar a la sala →</b></p>
          </div>
        </a>
      </section>

      <div className="room-tag"><span>🧠 Sala de Memoria · 📊 Tablero</span></div>
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
            <div className="sub">rit_core en tiempo real</div>
            <div className="kpis">
              <div className="kpi"><div className="n">{(agentes.data ?? []).length}</div><div className="l">Agentes</div><div className="x">{consejo.length} en el Consejo</div></div>
              <div className="kpi"><div className="n">{proys.length}</div><div className="l">Proyectos activos</div><div className="x">de {(proyectos.data ?? []).length} totales</div></div>
              <div className="kpi"><div className="n">{decs.length ? `${decs.length}+` : 0}</div><div className="l">Decisiones recientes</div><div className="x">con resultados (PG-017)</div></div>
              <div className="kpi"><div className="n">{lecs.length}</div><div className="l">Lecciones</div><div className="x">la experiencia de RIT</div></div>
            </div>
          </div>
          <div className="roomcard">
            <h3>Actividad reciente</h3>
            <div className="sub">registro vivo de la organización</div>
            <ul className="mem">
              {acts.map((a, i) => (
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

      <div className="room-tag"><span>🚪 Pasillo de Proyectos</span></div>
      <section className="hall">
        {proys.map((p) => (
          <div className="door" key={p.slug}>{p.nombre}<small>{p.descripcion || p.tipo}</small></div>
        ))}
      </section>

      <footer className="foot">
        <div className="lema">✦ El futuro es brillante.</div>
        <div className="dom">GENESIS.GENT · PROYECTO GÉNESIS · OFICINA v3.0</div>
      </footer>
    </div>
  );
}
