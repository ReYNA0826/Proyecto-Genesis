import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabase";
import AvatarStream from "../../../components/AvatarStream";

export const dynamic = "force-dynamic";

const INICIALES = { ALMA: "A", LEX: "L", TECH: "T", OPS: "O", FIN: "F", MKT: "M", EDU: "E", "GÉNESIS": "✦" };
const FOTOS = {
  ALMA: "/avatars/alma.jpg", LEX: "/avatars/lex.webp", TECH: "/avatars/tech.webp",
  OPS: "/avatars/ops.webp", FIN: "/avatars/fin.webp", MKT: "/avatars/mkt.webp",
  EDU: "/avatars/edu.webp", "Génesis": "/avatars/genesis.webp",
};

export default async function OficinaAgente({ params }) {
  const { agente } = await params;
  const supabase = await supabaseServer();
  const nombreParam = decodeURIComponent(agente).toLowerCase();
  const [{ data: agentes }, { data: logs }] = await Promise.all([
    supabase.from("v_rit_agentes").select("*"),
    supabase.from("v_rit_logs").select("*").order("created_at", { ascending: false }).limit(30),
  ]);
  const a = (agentes ?? []).find((x) => x.nombre.toLowerCase() === nombreParam);
  if (!a || !a.elevenlabs_agent_id) notFound();

  const esAlma = a.nombre === "ALMA";
  const [rol, detalle] = (a.proposito || "").split("—");
  // Actividad REAL: solo eventos de rit_core.logs que mencionan a este agente.
  const actividad = (logs ?? []).filter(
    (l) =>
      (l.origen || "").toLowerCase().includes(a.nombre.toLowerCase()) ||
      (l.evento || "").toLowerCase().includes(a.nombre.toLowerCase())
  ).slice(0, 5);

  // Saludo honesto: se presenta con su propósito real — sin cifras inventadas.
  const saludo = `Hola Reyna. Soy ${a.nombre}, ${(rol || "").trim()}. Estoy en mi oficina de génesis punto gent, a tus órdenes.`;

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · EL EDIFICIO</b>
        </div>
        <Link href="/" className="btn" style={{ textDecoration: "none" }}>← Volver al lobby</Link>
      </div>

      <div className="room-tag"><span>🚪 Oficina de {a.nombre}</span></div>

      <section className="oficina-grid">
        <div className="roomcard" style={{ textAlign: "center", padding: "30px 22px" }}>
          {FOTOS[a.nombre] ? (
            <img className="face foto" src={FOTOS[a.nombre]} alt={a.nombre} style={{ width: 88, height: 88, margin: "0 auto 14px" }} />
          ) : (
            <div className="face" style={{ width: 88, height: 88, fontSize: 38, marginBottom: 14 }}>
              {INICIALES[a.nombre] ?? "✦"}
            </div>
          )}
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "0 0 4px" }}>
            {a.nombre}{esAlma ? " · Directora Ejecutiva" : ""}
          </h2>
          <div style={{ fontSize: 12, color: "var(--silver)", marginBottom: 14 }}>{rol}</div>
          {detalle && <p style={{ fontSize: 13, color: "#c7cfdc", lineHeight: 1.6, margin: "0 0 16px" }}>{detalle}</p>}
          <div style={{ fontSize: 12.5, color: "var(--green)", marginBottom: 6 }}>
            ● {a.nombre} está en su oficina — usa la burbuja de llamada de abajo a la derecha
          </div>
          <div style={{ fontSize: 10.5, color: "var(--silver)", marginBottom: 14 }}>
            Si la burbuja no aparece,{" "}
            <a href={`https://elevenlabs.io/app/talk-to?agent_id=${a.elevenlabs_agent_id}`} target="_blank" rel="noopener" style={{ color: "var(--gold)" }}>
              habla con {a.nombre} por la puerta de ElevenLabs →
            </a>
          </div>

          <div className="room-tag" style={{ margin: "18px 0 10px" }}><span>Actividad real</span></div>
          {actividad.length ? (
            <ul className="mem" style={{ textAlign: "left" }}>
              {actividad.map((l, i) => (
                <li key={i}><b>{l.origen}</b><span>{l.evento}</span></li>
              ))}
            </ul>
          ) : (
            <div style={{ fontSize: 11.5, color: "var(--silver)" }}>
              Sin registros de {a.nombre} en rit_core.logs todavía — aquí solo se muestran hechos reales.
            </div>
          )}
        </div>

        {/* Rostro en vivo — La Unificación (v3.1): código portado del prototipo de Reyna */}
        <AvatarStream code={a.nombre} avatarId={a.heygen_avatar_id} saludo={saludo} />
      </section>

      {/* Widget de conversación de ElevenLabs, dentro de la Oficina */}
      <elevenlabs-convai agent-id={a.elevenlabs_agent_id}></elevenlabs-convai>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />

      <footer className="foot">
        <div className="lema">✦ El futuro es brillante.</div>
      </footer>
    </div>
  );
}
