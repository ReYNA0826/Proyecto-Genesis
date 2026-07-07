import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase";

// Conversación EN VIVO: LiveAvatar (rostro) + agente de ElevenLabs (cerebro y voz).
// Modo LITE + elevenlabs_agent_config — el plugin oficial. Keys solo en el servidor.

const LA = "https://api.liveavatar.com";
const SECRET_NAME = "genesis-elevenlabs-bridge";

// Agentes habilitados para conversar EN VIVO — todo el Consejo (decisión de Reyna, S07).
const HABILITADOS = ["ALMA", "Génesis", "LEX", "TECH", "OPS", "FIN", "MKT", "EDU"];

// Rostros en el catálogo LiveAvatar por agente — elegidos por Reyna (Sesión 06).
const ROSTROS = {
  "ALMA": "bf00036b-558a-44b5-b2ff-1e3cec0f4ceb", // elegido por Reyna (S07) — el de S06 rotó del catálogo
  "Génesis": "073b60a9-89a8-45aa-8902-c358f64d2852",
  // Directores — rostros elegidos por Reyna (S07, tarde):
  "LEX": "dc2935cf-5863-4f08-943b-c7478aea59fb",
  "EDU": "64b526e4-741c-43b6-a918-4e40f3261c7a",
  "OPS": "9650a758-1085-4d49-8bf3-f347565ec229",
  "MKT": "65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0",
  "TECH": "e9844e6d-847e-4964-a92b-7ecd066f69df",
  "FIN": "5e826887-4aa4-4479-9a9d-d9810263975f",
  // NOVA e INTEL aún no tienen agente de ElevenLabs (estado: diseñado) —
  // sus rostros quedan listos para cuando nazcan:
  "NOVA": "6a1906e3-6caa-4aba-995f-c49088661560",
  "INTEL": "0930fd59-c8ad-434d-ad53-b391a1768720",
};
const SANDBOX_AVATAR = "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a";

let secretIdCache = null;

async function laFetch(path, key, init = {}) {
  const res = await fetch(`${LA}${path}`, {
    ...init,
    headers: { "X-API-KEY": key, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

// Asegura que la llave de ElevenLabs esté registrada como secret en LiveAvatar
// (una sola vez; se reutiliza por nombre).
async function ensureSecretId(laKey) {
  if (secretIdCache) return secretIdCache;
  const list = await laFetch("/v1/secrets", laKey, { method: "GET" });
  if (list.ok) {
    const items = list.json?.data?.items ?? list.json?.data ?? [];
    const found = Array.isArray(items)
      ? items.find((s) => s.secret_name === SECRET_NAME || s.name === SECRET_NAME)
      : null;
    if (found?.id) {
      secretIdCache = found.id;
      return secretIdCache;
    }
  }
  const elKey = process.env.ELEVENLABS_AGENTS_KEY || process.env.ELEVENLABS_API_KEY;
  if (!elKey) throw new Error("Falta ELEVENLABS_AGENTS_KEY (llave con permisos convai_read, user_read, voices_read).");
  const created = await laFetch("/v1/secrets", laKey, {
    method: "POST",
    body: JSON.stringify({ secret_type: "ELEVENLABS_API_KEY", secret_value: elKey, secret_name: SECRET_NAME }),
  });
  if (!created.ok) throw new Error(`LiveAvatar secrets ${created.status}: ${JSON.stringify(created.json).slice(0, 180)}`);
  secretIdCache = created.json?.data?.id;
  if (!secretIdCache) throw new Error("LiveAvatar no devolvió el id del secret");
  return secretIdCache;
}

// Diagnóstico temporal: prueba las llaves contra sus APIs SIN exponerlas.
// Devuelve solo presencia, largo y códigos de estado.
export async function GET() {
  const elAgents = process.env.ELEVENLABS_AGENTS_KEY || "";
  const elTts = process.env.ELEVENLABS_API_KEY || "";
  const la = process.env.LIVEAVATAR_API_KEY || "";
  const probar = async (key) => {
    if (!key) return { presente: false };
    const [user, agents, voices] = await Promise.all([
      fetch("https://api.elevenlabs.io/v1/user", { headers: { "xi-api-key": key } })
        .then(async (r) => ({ status: r.status, detalle: r.ok ? undefined : await r.json().catch(() => null) }))
        .catch(() => ({ status: -1 })),
      fetch("https://api.elevenlabs.io/v1/convai/agents?page_size=1", { headers: { "xi-api-key": key } }).then((r) => r.status).catch(() => -1),
      fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": key } }).then((r) => r.status).catch(() => -1),
    ]);
    return {
      presente: true,
      largo: key.length,
      user_read: user.status,
      // Motivo textual que da ElevenLabs cuando /v1/user falla (sin valores de llaves).
      user_read_motivo: user.detalle ?? undefined,
      convai_read: agents,
      voices_read: voices,
    };
  };
  return NextResponse.json({
    // ¿Las dos variables contienen exactamente la misma llave?
    agents_key_igual_a_api_key: Boolean(elAgents) && elAgents === elTts,
    ELEVENLABS_AGENTS_KEY: await probar(elAgents),
    ELEVENLABS_API_KEY: await probar(elTts),
    LIVEAVATAR_API_KEY: { presente: Boolean(la), largo: la.length },
  });
}

export async function POST(req) {
  const laKey = process.env.LIVEAVATAR_API_KEY;
  if (!laKey) {
    return NextResponse.json(
      { error: "La conversación en vivo aún no está conectada (falta LIVEAVATAR_API_KEY en el servidor)." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const agente = String(body?.agente ?? "").trim();
  if (!HABILITADOS.some((h) => h.toLowerCase() === agente.toLowerCase())) {
    return NextResponse.json({ error: `${agente || "Ese agente"} aún no tiene conversación en vivo habilitada.` }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: agentes } = await supabase.from("v_rit_agentes").select("nombre, elevenlabs_agent_id");
  const a = (agentes ?? []).find((x) => x.nombre.toLowerCase() === agente.toLowerCase());
  if (!a?.elevenlabs_agent_id) {
    return NextResponse.json({ error: `${agente} no tiene agente de ElevenLabs en rit_core.` }, { status: 404 });
  }

  try {
    const secretId = await ensureSecretId(laKey);
    const rostro = ROSTROS[a.nombre];
    const payload = {
      mode: "LITE",
      avatar_id: rostro || SANDBOX_AVATAR,
      ...(rostro ? {} : { is_sandbox: true }),
      elevenlabs_agent_config: { secret_id: secretId, agent_id: a.elevenlabs_agent_id },
    };
    const tok = await laFetch("/v1/sessions/token", laKey, { method: "POST", body: JSON.stringify(payload) });
    if (!tok.ok) {
      return NextResponse.json(
        { error: `LiveAvatar token ${tok.status}: ${JSON.stringify(tok.json).slice(0, 200)}` },
        { status: 502 }
      );
    }
    const sessionToken = tok.json?.data?.session_token;
    if (!sessionToken) return NextResponse.json({ error: "LiveAvatar no devolvió session_token" }, { status: 502 });

    // Puente de logs (PG-022): la conversación arrancó de verdad → registra la actividad
    // del agente en rit_core.logs para que su oficina se encienda. Best-effort: un fallo
    // de log NUNCA debe romper la llamada. La función valida el agente y deduplica (<10 min).
    supabase.rpc("registrar_conversacion_agente", { p_agente: a.nombre }).then(
      ({ error }) => { if (error) console.error("registrar_conversacion_agente:", error.message); },
      (e) => console.error("registrar_conversacion_agente:", e?.message || e)
    );

    return NextResponse.json({ sessionToken, sandbox: !rostro });
  } catch (e) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 502 });
  }
}
