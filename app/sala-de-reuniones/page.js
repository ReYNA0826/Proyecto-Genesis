import Link from "next/link";
import Script from "next/script";
import { supabaseServer } from "../../lib/supabase";

export const dynamic = "force-dynamic";

const INICIALES = { ALMA: "A", LEX: "L", TECH: "T", OPS: "O", FIN: "F", MKT: "M", EDU: "E" };
const ALMA_ID = "agent_6001kwg57ym6ewybg6dcjj9agff1";

export default async function SalaDeReuniones() {
  const supabase = await supabaseServer();
  const { data: agentes } = await supabase.from("v_rit_agentes").select("*");
  const consejo = (agentes ?? []).filter((a) => a.elevenlabs_agent_id && INICIALES[a.nombre]);
  const alma = consejo.find((a) => a.nombre === "ALMA");

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · LA OFICINA</b>
        </div>
        <Link href="/" className="btn" style={{ textDecoration: "none" }}>← Volver al lobby</Link>
      </div>

      <div className="room-tag"><span>🏛️ Sala de Reuniones del Consejo</span></div>
      <div className="room-sub">La mesa donde ALMA convoca a los directores y sintetiza UNA recomendación (PG-010)</div>

      <section className="roomcard" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "30px 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {consejo.map((a) => (
            <div key={a.nombre} title={a.nombre} className="face" style={{ margin: 0, width: 46, height: 46, fontSize: 19, opacity: a.nombre === "ALMA" ? 1 : 0.85 }}>
              {INICIALES[a.nombre]}
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: "0 0 10px" }}>La mesa está puesta</h2>
        <p style={{ fontSize: 13, color: "#c7cfdc", lineHeight: 1.65, maxWidth: 540, margin: "0 auto 16px" }}>
          Hoy, la reunión funciona así: <b style={{ color: "var(--gold)" }}>ALMA preside la mesa</b> — cuéntale tu
          decisión con la burbuja de llamada (abajo a la derecha) y ella analizará el tema desde las perspectivas de
          sus directores (legal, técnica, operativa, financiera, marketing y educativa) y te dará una sola
          recomendación con riesgos y alternativas.
        </p>
        <div style={{ fontSize: 10.5, color: "var(--silver)", borderTop: "1px dashed #17294a", paddingTop: 12, maxWidth: 540, margin: "0 auto" }}>
          Honestidad de Génesis: la deliberación automática entre los 7 agentes (cada director hablando por sí mismo
          en la misma mesa) es la fase v3.3 de PG-018/PG-010 — requiere el puente entre agentes. Por ahora, la mesa
          la modera ALMA en una sola llamada.
        </div>
      </section>

      {alma && (
        <>
          <elevenlabs-convai agent-id={ALMA_ID}></elevenlabs-convai>
          <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
        </>
      )}

      <footer className="foot">
        <div className="lema">✦ El futuro es brillante.</div>
      </footer>
    </div>
  );
}
