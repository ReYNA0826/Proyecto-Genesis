import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

const INICIALES = { ALMA: "A", LEX: "L", TECH: "T", OPS: "O", FIN: "F", MKT: "M", EDU: "E" };

export default async function OficinaAgente({ params }) {
  const { agente } = await params;
  const supabase = await supabaseServer();
  const { data: agentes } = await supabase.from("v_rit_agentes").select("*");
  const a = (agentes ?? []).find((x) => x.nombre.toLowerCase() === decodeURIComponent(agente).toLowerCase());
  if (!a || !a.elevenlabs_agent_id) notFound();

  const esAlma = a.nombre === "ALMA";
  const [rol, detalle] = (a.proposito || "").split("—");

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · LA OFICINA</b>
        </div>
        <Link href="/" className="btn" style={{ textDecoration: "none" }}>← Volver al lobby</Link>
      </div>

      <div className="room-tag"><span>🚪 Oficina de {a.nombre}</span></div>

      <section className="roomcard" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "34px 24px" }}>
        <div className="face" style={{ width: 88, height: 88, fontSize: 38, marginBottom: 14 }}>
          {INICIALES[a.nombre] ?? "✦"}
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "0 0 4px" }}>
          {a.nombre}{esAlma ? " · Directora Ejecutiva" : ""}
        </h2>
        <div style={{ fontSize: 12, color: "var(--silver)", marginBottom: 14 }}>{rol}</div>
        {detalle && <p style={{ fontSize: 13, color: "#c7cfdc", lineHeight: 1.6, margin: "0 0 18px" }}>{detalle}</p>}
        <div style={{ fontSize: 12.5, color: "var(--green)", marginBottom: 6 }}>
          ● {a.nombre} está en su oficina — usa la burbuja de llamada de abajo a la derecha
        </div>
        <div style={{ fontSize: 10.5, color: "var(--silver)", marginBottom: 18 }}>
          Si la burbuja no aparece o no responde,{" "}
          <a href={`https://elevenlabs.io/app/talk-to?agent_id=${a.elevenlabs_agent_id}`} target="_blank" rel="noopener" style={{ color: "var(--gold)" }}>
            habla con {a.nombre} por la puerta de ElevenLabs →
          </a>
        </div>
        <div style={{ fontSize: 10, color: "var(--silver)", borderTop: "1px dashed #17294a", paddingTop: 12 }}>
          Próximamente (PG-018 v3.1): {a.nombre} con rostro — avatar en vivo aquí mismo.
        </div>
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
