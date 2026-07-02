import { NextResponse } from "next/server";

// Voces ElevenLabs por director — propuesta v1 (PG-021, extraída del prototipo de Reyna).
// La voz de Génesis en su agente conversacional es la voz clonada de Reyna;
// aquí (TTS puntual) usa una voz de catálogo hasta que Reyna decida la definitiva.
const VOCES = {
  ALMA: "EXAVITQu4vr4xnSDxMaL", // Sarah — cálida, ejecutiva
  LEX: "Xb7hH8MSUJpSbSDYk0k2", // Alice — clara, profesional
  TECH: "nPczCjzI2devNBz1zQrb", // Brian — técnico, sereno
  OPS: "onwK4e9ZLuTAKqWW03F9", // Daniel — directo
  MKT: "FGY2WhTYpPnrIDTdsKH5", // Laura — expresiva
  EDU: "JBFqnCBsd6RMkjVDRZzb", // George — narrador cálido
  FIN: "cjVigY5qzO86Huf0OWal", // Eric — formal
  "GÉNESIS": "EXAVITQu4vr4xnSDxMaL", // provisional femenina (Reyna decide la definitiva)
};

export async function POST(req) {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "La voz aún no está conectada (falta ELEVENLABS_API_KEY en el servidor)." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const code = String(body?.code ?? "").toUpperCase();
  const text = String(body?.text ?? "").trim();
  if (!code || !text) return NextResponse.json({ error: "code y text son requeridos" }, { status: 400 });
  if (text.length > 800) return NextResponse.json({ error: "Texto demasiado largo (máx. 800)" }, { status: 400 });

  const voiceId = VOCES[code] ?? VOCES.ALMA;
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.4, use_speaker_boost: true },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: `TTS ${res.status}: ${err.slice(0, 200)}` }, { status: 502 });
  }
  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
