"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ouhpmlyutvsvfhxqumxf.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable__UNk8C7t_kKPC5q7ADK-_w_Itp_P9nc";

export default function Actualizar() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    if (p1.length < 8) {
      setError("Mínimo 8 caracteres.");
      return;
    }
    if (p1 !== p2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setBusy(true);
    setError("");
    const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
    const { error: err } = await supabase.auth.updateUser({ password: p1 });
    if (err) {
      setError("El enlace expiró o ya se usó. Pide uno nuevo desde 'Recuperar acceso'.");
      setBusy(false);
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={save}>
        <div className="lobby" style={{ padding: "0 0 14px" }}>
          <img src="/genesis-icon.jpeg" alt="Génesis" width={72} height={72} style={{ borderRadius: "50%", display: "block", margin: "0 auto 12px" }} />
          <h1 style={{ fontSize: 22 }}>Contraseña nueva</h1>
        </div>
        <input type="password" placeholder="Contraseña nueva" value={p1} onChange={(e) => setP1(e.target.value)} autoComplete="new-password" required />
        <input type="password" placeholder="Repítela" value={p2} onChange={(e) => setP2(e.target.value)} autoComplete="new-password" required />
        <button className="btn gold" style={{ width: "100%", padding: 11 }} disabled={busy}>
          {busy ? "Guardando…" : "Guardar y entrar"}
        </button>
        <div className="err">{error}</div>
      </form>
    </div>
  );
}
