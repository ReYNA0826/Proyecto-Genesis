"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ouhpmlyutvsvfhxqumxf.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable__UNk8C7t_kKPC5q7ADK-_w_Itp_P9nc";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar`,
    });
    if (err) {
      setError("No pude enviar el correo. Intenta de nuevo en un minuto.");
      setBusy(false);
      return;
    }
    setSent(true);
    setBusy(false);
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={send}>
        <div className="lobby" style={{ padding: "0 0 14px" }}>
          <img src="/genesis-icon.jpeg" alt="Génesis" width={72} height={72} style={{ borderRadius: "50%", display: "block", margin: "0 auto 12px" }} />
          <h1 style={{ fontSize: 22 }}>Recuperar acceso</h1>
        </div>
        {sent ? (
          <div className="note" style={{ fontSize: 13, color: "var(--pearl)" }}>
            📬 Revisa tu correo: te envié un enlace para crear una contraseña nueva.
            <br /><br />
            <a href="/login" style={{ color: "var(--gold)" }}>Volver a la puerta</a>
          </div>
        ) : (
          <>
            <input type="email" placeholder="Tu correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn gold" style={{ width: "100%", padding: 11 }} disabled={busy}>
              {busy ? "Enviando…" : "Enviarme el enlace"}
            </button>
            <div className="err">{error}</div>
            <div className="note"><a href="/login" style={{ color: "var(--silver)" }}>← Volver</a></div>
          </>
        )}
      </form>
    </div>
  );
}
