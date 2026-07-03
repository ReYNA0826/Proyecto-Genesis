"use client";

import { useEffect, useRef, useState } from "react";

// Conversación EN VIVO: el agente de ElevenLabs (cerebro + voz) con rostro LiveAvatar.
// Te escucha por el micrófono y te responde cara a cara, sin salir de genesis.gent.

export default function ConversarVivo({ code }) {
  const videoRef = useRef(null);
  const sessionRef = useRef(null);
  const [estado, setEstado] = useState("idle"); // idle | connecting | live | error
  const [mensaje, setMensaje] = useState("");
  const [sandbox, setSandbox] = useState(false);

  const colgar = async () => {
    try { await sessionRef.current?.stop(); } catch {}
    sessionRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setEstado("idle");
  };

  useEffect(() => () => { void colgar(); }, [code]);

  const llamar = async () => {
    setEstado("connecting");
    setMensaje("");
    try {
      const r = await fetch("/api/liveavatar/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agente: code }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setSandbox(Boolean(j.sandbox));

      const { ElevenLabsAgentSession, SessionEvent } = await import("@heygen/liveavatar-web-sdk");
      const session = new ElevenLabsAgentSession(j.sessionToken, { voiceChat: true });
      sessionRef.current = session;

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        if (videoRef.current) session.attach(videoRef.current);
        setEstado("live");
      });
      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        sessionRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
        setEstado("idle");
      });

      await session.start();
    } catch (e) {
      setEstado("error");
      setMensaje(e?.message || String(e));
      sessionRef.current = null;
    }
  };

  return (
    <div className="avbox" style={{ border: "1px solid rgba(212,175,55,.4)" }}>
      <div className="avhead">
        <span>📞 Conversar EN VIVO · beta</span>
        <span className={`avdot ${estado}`}>
          {estado === "live" ? "en llamada" : estado === "connecting" ? "llamando…" : estado === "error" ? "error" : "lista"}
        </span>
      </div>

      <div className="avvideo">
        <video ref={videoRef} playsInline autoPlay />
        {estado !== "live" && (
          <div className="avwait">
            {estado === "connecting"
              ? `Llamando a ${code}… acepta el micrófono cuando el navegador lo pida`
              : `Habla CON ${code}: te escucha y te responde cara a cara`}
          </div>
        )}
      </div>

      <div className="avbtns" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <button className="btn gold" disabled={estado === "connecting" || estado === "live"} onClick={llamar}>
          {estado === "error" ? "Reintentar llamada" : estado === "live" ? "En llamada" : `Llamar a ${code}`}
        </button>
        <button className="btn" disabled={estado !== "live" && estado !== "connecting"} onClick={colgar}>
          Colgar
        </button>
      </div>

      <div className="avmeta">
        {sandbox && estado !== "idle"
          ? "Rostro provisional (sandbox, ~1 min gratis) — el rostro definitivo se elige en el catálogo LiveAvatar."
          : `La voz y el cerebro son el agente real de ${code} en ElevenLabs; el rostro lo pone LiveAvatar.`}
      </div>
      {mensaje && <div className="averr">{mensaje}</div>}
    </div>
  );
}
