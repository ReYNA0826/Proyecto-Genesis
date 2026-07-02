"use client";

import { useEffect, useRef, useState } from "react";

// Override local por navegador (misma llave que el prototipo de Reyna):
// permite probar otro avatar sin tocar rit_core ni el código.
const STORAGE_KEY = "genesis.heygen.agents.v1";

export function getOverride(code) {
  if (typeof window === "undefined") return null;
  try {
    const all = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return all[code]?.avatarId || null;
  } catch {
    return null;
  }
}

export default function AvatarStream({ code, avatarId, saludo }) {
  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const audioRef = useRef(null);
  const [estado, setEstado] = useState("idle"); // idle | connecting | live | error
  const [voz, setVoz] = useState("idle"); // idle | loading | playing | error
  const [mensaje, setMensaje] = useState("");
  const [idActivo, setIdActivo] = useState(avatarId || null);

  useEffect(() => {
    setIdActivo(getOverride(code) || avatarId || null);
  }, [code, avatarId]);

  const detener = async () => {
    try {
      await avatarRef.current?.stopAvatar();
    } catch {}
    avatarRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setEstado("idle");
  };

  useEffect(() => () => { void detener(); audioRef.current?.pause(); }, [code]);

  const iniciar = async () => {
    if (!idActivo) return;
    setEstado("connecting");
    setMensaje("");
    try {
      // El SDK de HeyGen se carga solo en el navegador (rompe en SSR).
      const mod = await import("@heygen/streaming-avatar");
      const StreamingAvatar = mod.default ?? mod.StreamingAvatar;
      const { StreamingEvents, AvatarQuality } = mod;

      const r = await fetch("/api/heygen/token", { method: "POST" });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);

      const avatar = new StreamingAvatar({ token: j.token });
      avatarRef.current = avatar;

      avatar.on(StreamingEvents.STREAM_READY, (evt) => {
        if (videoRef.current) {
          videoRef.current.srcObject = evt.detail;
          videoRef.current.onloadedmetadata = () => videoRef.current?.play().catch(() => undefined);
        }
        setEstado("live");
      });
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => setEstado("idle"));

      await avatar.createStartAvatar({ avatarName: idActivo, quality: AvatarQuality.Low });

      if (saludo) {
        try { await avatar.speak({ text: saludo }); } catch {}
      }
    } catch (e) {
      setEstado("error");
      setMensaje(e?.message || String(e));
      avatarRef.current = null;
    }
  };

  const hablar = async () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setVoz("loading");
    setMensaje("");
    try {
      const r = await fetch("/api/voz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, text: saludo }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${r.status}`);
      }
      const blob = await r.blob();
      const el = new Audio(URL.createObjectURL(blob));
      audioRef.current = el;
      el.onended = () => setVoz("idle");
      el.onerror = () => setVoz("error");
      await el.play();
      setVoz("playing");
    } catch (e) {
      setVoz("error");
      setMensaje(e?.message || String(e));
    }
  };

  return (
    <div className="avbox">
      <div className="avhead">
        <span>Avatar en vivo · HeyGen</span>
        <span className={`avdot ${estado}`}>
          {estado === "live" ? "en vivo" : estado === "connecting" ? "conectando…" : estado === "error" ? "error" : "listo"}
        </span>
      </div>

      {idActivo ? (
        <>
          <div className="avvideo">
            <video ref={videoRef} playsInline autoPlay muted={false} />
            {estado !== "live" && (
              <div className="avwait">
                {estado === "connecting" ? "Abriendo sesión con HeyGen…" : `${code} en espera — inicia la transmisión`}
              </div>
            )}
          </div>
          <div className="avbtns">
            <button className="btn gold" disabled={estado === "connecting" || estado === "live"} onClick={iniciar}>
              {estado === "error" ? "Reintentar" : estado === "live" ? "En transmisión" : "Iniciar transmisión"}
            </button>
            <button className="btn" disabled={estado !== "live"} onClick={detener}>Finalizar</button>
            <button className="btn" disabled={voz === "loading"} onClick={hablar}>
              {voz === "loading" ? "Generando voz…" : voz === "playing" ? "Hablando…" : "Solo voz"}
            </button>
          </div>
          <div className="avmeta">avatar_id: {idActivo} · <a href="/configuracion">configurar →</a></div>
        </>
      ) : (
        <div className="avwait" style={{ position: "static", padding: "18px 10px" }}>
          {code} todavía no tiene rostro asignado en rit_core — sala en construcción.
        </div>
      )}
      {mensaje && <div className="averr">{mensaje}</div>}
    </div>
  );
}
