import { NextResponse } from "next/server";

// HeyGen Avatar Realtime (v3) — reemplaza la API de streaming apagada (410 sunset).
// La key nunca sale del servidor. Transmite a 720p vía HLS.
// ⚠️ Costo real: ~$0.05/seg de transmisión — solo sesiones cortas (saludos).

const DEFAULT_VOICE = "64350af473fe4712ae7fb8162e74a2f7"; // voz por defecto de la cuenta (provisional)
const MAX_TEXT = 300; // guarda de costo: saludos cortos

export async function POST(req) {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "El avatar aún no está conectado (falta HEYGEN_API_KEY en el servidor)." },
      { status: 503 }
    );
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const avatarId = String(body?.avatarId ?? "").trim();
  const text = String(body?.text ?? "").trim().slice(0, MAX_TEXT);
  const voiceId = String(body?.voiceId ?? "").trim() || DEFAULT_VOICE;
  if (!avatarId || !text) return NextResponse.json({ error: "avatarId y text son requeridos" }, { status: 400 });

  const res = await fetch("https://api.heygen.com/v3/avatar-realtime", {
    method: "POST",
    headers: { "X-Api-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "tts", avatar_id: avatarId, voice_id: voiceId, text }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || json?.message || JSON.stringify(json).slice(0, 200);
    return NextResponse.json({ error: `Avatar Realtime ${res.status}: ${msg}` }, { status: 502 });
  }
  const streamId = json?.data?.stream_id;
  if (!streamId) return NextResponse.json({ error: "HeyGen no devolvió stream_id" }, { status: 502 });
  return NextResponse.json({ streamId });
}

// Estado + URL HLS del stream: el cliente sondea hasta que esté listo.
export async function GET(req) {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) return NextResponse.json({ error: "falta HEYGEN_API_KEY" }, { status: 503 });
  const streamId = new URL(req.url).searchParams.get("id");
  if (!streamId) return NextResponse.json({ error: "id requerido" }, { status: 400 });

  const res = await fetch(`https://api.heygen.com/v3/avatar-realtime/${encodeURIComponent(streamId)}`, {
    headers: { "X-Api-Key": key },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || json?.message || JSON.stringify(json).slice(0, 200);
    return NextResponse.json({ error: `Avatar Realtime ${res.status}: ${msg}` }, { status: 502 });
  }
  // La URL de reproducción (hls_url) solo existe mientras status = "streaming".
  const d = json?.data ?? {};
  return NextResponse.json({ status: d.status ?? null, url: d.hls_url ?? null });
}
