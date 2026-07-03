import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase";

// Catálogo de rostros disponibles en LiveAvatar — solo con login (administración).
export async function GET() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Solo la Fundadora" }, { status: 401 });

  const key = process.env.LIVEAVATAR_API_KEY;
  if (!key) return NextResponse.json({ error: "falta LIVEAVATAR_API_KEY" }, { status: 503 });

  const res = await fetch("https://api.liveavatar.com/v1/avatars", {
    headers: { "X-API-KEY": key },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json({ error: `LiveAvatar ${res.status}` }, { status: 502 });
  return NextResponse.json(json);
}
