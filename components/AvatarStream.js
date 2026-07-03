"use client";

import { useEffect, useRef, useState } from "react";

// Rostro en vivo con HeyGen Avatar Realtime (v3, HLS 720p).
// ⚠️ Costo real ~$0.05/seg — sesiones cortas, se cierran solas al terminar el saludo.

// Override local por navegador (misma llave que /configuracion):
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
  const hlsRef = useRef(null);
  const pollRef = useRef(null);
  const audioRef = useRef(null);
  const [estado, setEstado] = useState("idle"); // idle | connecting | live | done | error
  const [voz, setVoz] = useState("idle"); // idle | loading | playing | error
  const [mensaje, setMensaje] = useState("");
  const [idActivo, setIdActivo] = useState(avatarId || null);
  const [necesitaToque, setNecesitaToque] = useState(false); // autoplay bloqueado
  const streamIdRef = useRef(null);

  useEffect(() => {
    setIdActivo(getOverride(code) || avatarId || null);
  }, [code, avatarId]);

  const limpiar = () => {
    clearInterval(pollRef.current);
    pollRef.current = null;
    hlsRef.current?.destroy?.();
    hlsRef.current = null;
    if (videoRef.current) {
      videoRef.current.pause?.();
      videoRef.current.removeAttribute("src");
      videoRef.current.load?.();
    }
  };

  const detener = () => {
    limpiar();
    setEstado("idle");
  };

  useEffect(() => () => { limpiar(); audioRef.current?.pause(); }, [code]);

  // Si el navegador bloquea la reproducción automática, pedimos un toque.
  const intentarPlay = (video) => {
    video.play().then(() => setNecesitaToque(false)).catch(() => setNecesitaToque(true));
  };

  const reproducirHls = async (url) => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url; // Safari: HLS nativo
      intentarPlay(video);
    } else {
      const { default: Hls } = await import("hls.js");
      if (!Hls.isSupported()) throw new Error("Este navegador no soporta HLS");
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => intentarPlay(video));
    }
    video.onended = () => { limpiar(); setEstado("done"); };
    setEstado("live");

    // El saludo es corto: cuando HeyGen marque la sesión como terminada, cerramos limpio.
    pollRef.current = setInterval(async () => {
      try {
        const s = await fetch(`/api/heygen/realtime?id=${encodeURIComponent(streamIdRef.current)}`);
        const sj = await s.json().catch(() => ({}));
        if (sj.status === "completed") {
          setTimeout(() => { limpiar(); setEstado("done"); setNecesitaToque(false); }, 2500);
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      } catch {}
    }, 3000);
  };

  const iniciar = async () => {
    if (!idActivo || !saludo) return;
    setEstado("connecting");
    setMensaje("");
    try {
      const r = await fetch("/api/heygen/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarId: idActivo, text: saludo }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      streamIdRef.current = j.streamId;

      // Sondear hasta que el stream HLS esté listo (máx ~30s)
      let intentos = 0;
      pollRef.current = setInterval(async () => {
        intentos += 1;
        try {
          const s = await fetch(`/api/heygen/realtime?id=${encodeURIComponent(j.streamId)}`);
          const sj = await s.json().catch(() => ({}));
          if (sj.url) {
            clearInterval(pollRef.current);
            pollRef.current = null;
            await reproducirHls(sj.url);
          } else if (sj.status === "completed") {
            throw new Error("La transmisión terminó antes de conectar — intenta de nuevo");
          } else if (intentos > 15) {
            throw new Error(sj.error || "El stream no llegó a estar listo");
          }
        } catch (e) {
          clearInterval(pollRef.current);
          pollRef.current = null;
          setEstado("error");
          setMensaje(e?.message || String(e));
        }
      }, 2000);
    } catch (e) {
      setEstado("error");
      setMensaje(e?.message || String(e));
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
        <span>Avatar en vivo · HeyGen Realtime</span>
        <span className={`avdot ${estado}`}>
          {estado === "live" ? "en vivo" : estado === "connecting" ? "conectando…" : estado === "done" ? "saludo terminado" : estado === "error" ? "error" : "listo"}
        </span>
      </div>

      {idActivo ? (
        <>
          <div className="avvideo">
            <video ref={videoRef} playsInline autoPlay />
            {estado === "live" && necesitaToque && (
              <button className="avplay" onClick={() => { const v = videoRef.current; if (v) { v.muted = false; intentarPlay(v); } }}>
                ▶ Toca para ver y oír a {code}
              </button>
            )}
            {estado !== "live" && (
              <div className="avwait">
                {estado === "connecting"
                  ? "Abriendo transmisión con HeyGen… (puede tardar unos segundos)"
                  : estado === "done"
                    ? `${code} terminó su saludo — transmisión cerrada`
                    : `${code} en espera — inicia la transmisión`}
              </div>
            )}
          </div>
          <div className="avbtns">
            <button className="btn gold" disabled={estado === "connecting" || estado === "live"} onClick={iniciar}>
              {estado === "error" ? "Reintentar" : estado === "live" ? "En transmisión" : "Ver saludo en vivo"}
            </button>
            <button className="btn" disabled={estado !== "live" && estado !== "connecting"} onClick={detener}>Finalizar</button>
            <button className="btn" disabled={voz === "loading"} onClick={hablar}>
              {voz === "loading" ? "Generando voz…" : voz === "playing" ? "Hablando…" : "Solo voz"}
            </button>
          </div>
          <div className="avmeta">
            El video saluda pero no escucha — para CONVERSAR usa la burbuja de llamada (ElevenLabs).
            <br />Transmisión HeyGen ≈ $0.05/seg · "Solo voz" es la opción económica · <a href="/configuracion">configurar →</a>
          </div>
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
