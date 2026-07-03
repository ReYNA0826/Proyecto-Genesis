import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase";

// Mantenimiento S07 (temporal): pone el formato de salida TTS de los directores
// del Consejo en pcm_24000 — requisito de la videollamada LiveAvatar.
// Solo Fundadora. Lista blanca EXPLÍCITA: los agentes de producción (Mi alma,
// Andrés Felipe) jamás entran aquí. Lección de la casa: un get antes de cada update.
// Requiere que la llave ELEVENLABS_AGENTS_KEY tenga ElevenAgents → Escribir
// (se le puede retirar después de usar esto).

const DIRECTORES = ["LEX", "TECH", "OPS", "FIN", "MKT", "EDU"];
const EL = "https://api.elevenlabs.io/v1/convai/agents";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Solo la Fundadora" }, { status: 401 });

  const key = process.env.ELEVENLABS_AGENTS_KEY;
  if (!key) return NextResponse.json({ error: "falta ELEVENLABS_AGENTS_KEY" }, { status: 503 });

  const { data: agentes } = await supabase.from("v_rit_agentes").select("nombre, elevenlabs_agent_id");
  const resultados = [];
  for (const nombre of DIRECTORES) {
    const a = (agentes ?? []).find((x) => x.nombre === nombre);
    if (!a?.elevenlabs_agent_id) {
      resultados.push({ nombre, resultado: "sin agente en rit_core" });
      continue;
    }
    const g = await fetch(`${EL}/${a.elevenlabs_agent_id}`, { headers: { "xi-api-key": key } });
    const cfg = await g.json().catch(() => ({}));
    if (!g.ok) {
      resultados.push({ nombre, resultado: `lectura falló (${g.status})` });
      continue;
    }
    const antes = cfg?.conversation_config?.tts?.agent_output_audio_format ?? "desconocido";
    if (antes === "pcm_24000") {
      resultados.push({ nombre, antes, resultado: "ya estaba" });
      continue;
    }
    const p = await fetch(`${EL}/${a.elevenlabs_agent_id}`, {
      method: "PATCH",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_config: { tts: { agent_output_audio_format: "pcm_24000" } } }),
    });
    const pj = await p.json().catch(() => ({}));
    const despues = pj?.conversation_config?.tts?.agent_output_audio_format;
    resultados.push({
      nombre,
      antes,
      despues: despues ?? undefined,
      resultado: p.ok ? "✅ cambiado" : `falló (${p.status}): ${JSON.stringify(pj).slice(0, 140)}`,
    });
  }
  return NextResponse.json({ nota: "Mantenimiento S07 — pcm_24000 para la videollamada del Consejo", resultados });
}
