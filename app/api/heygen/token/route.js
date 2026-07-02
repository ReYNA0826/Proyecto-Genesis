import { NextResponse } from "next/server";

// Mintea un session token de un solo uso para HeyGen Streaming Avatar.
// El API key nunca sale del servidor (regla de TECH, portado del prototipo de Reyna).
export async function POST() {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "El avatar aún no está conectado (falta HEYGEN_API_KEY en el servidor)." },
      { status: 503 }
    );
  }
  const res = await fetch("https://api.heygen.com/v1/streaming.create_token", {
    method: "POST",
    headers: { "x-api-key": key, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: `HeyGen token ${res.status}: ${err.slice(0, 200)}` }, { status: 502 });
  }
  const json = await res.json();
  const token = json?.data?.token;
  if (!token) return NextResponse.json({ error: "HeyGen no devolvió token" }, { status: 502 });
  return NextResponse.json({ token });
}
