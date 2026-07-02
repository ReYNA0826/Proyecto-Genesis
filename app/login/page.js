"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ouhpmlyutvsvfhxqumxf.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable__UNk8C7t_kKPC5q7ADK-_w_Itp_P9nc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("No pude abrirte la puerta: revisa tu correo y contraseña.");
      setBusy(false);
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={signIn}>
        <div className="lobby" style={{ padding: "0 0 14px" }}>
          <div className="g">G</div>
          <h1 style={{ fontSize: 26 }}>La Oficina</h1>
          <p>Reyna Intelligence Team</p>
        </div>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button className="btn gold" style={{ width: "100%", padding: "11px" }} disabled={busy}>
          {busy ? "Abriendo la puerta…" : "Entrar a la Oficina"}
        </button>
        <div className="err">{error}</div>
        <div className="note">
          Acceso privado de la Fundadora. Usa tu cuenta de Legal.Services.
          <br />✦ El futuro es brillante.
        </div>
      </form>
    </div>
  );
}
