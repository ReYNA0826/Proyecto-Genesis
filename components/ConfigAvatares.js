"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "genesis.heygen.agents.v1";

function cargar() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function ConfigAvatares({ agentes }) {
  const [overrides, setOverrides] = useState({});
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setOverrides(cargar());
    setListo(true);
  }, []);

  const guardar = (code, avatarId) => {
    const all = cargar();
    if (avatarId) {
      all[code] = { avatarId, type: avatarId.endsWith("_public") ? "public" : "private" };
    } else {
      delete all[code];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("genesis:heygen-config-changed"));
    setOverrides(all);
  };

  if (!listo) return null;

  return (
    <div className="roomcard">
      <h3>Avatares HeyGen por agente</h3>
      <div className="sub">
        La fuente de verdad es <b>rit_core</b>. El campo "prueba local" cambia el avatar
        solo en ESTE navegador (para probar antes de oficializar) — no toca la base.
      </div>
      <table className="cfg">
        <thead>
          <tr><th>Agente</th><th>Oficial (rit_core)</th><th>Prueba local</th><th></th></tr>
        </thead>
        <tbody>
          {agentes.map((a) => {
            const ov = overrides[a.nombre]?.avatarId || "";
            return (
              <tr key={a.nombre}>
                <td><b>{a.nombre}</b></td>
                <td className="mono">{a.heygen_avatar_id || <span style={{ color: "var(--silver)" }}>— sin rostro</span>}</td>
                <td>
                  <input
                    className="mono"
                    defaultValue={ov}
                    placeholder="avatar_id de prueba"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v !== ov) guardar(a.nombre, v);
                    }}
                  />
                </td>
                <td>
                  {ov && (
                    <button className="btn" onClick={() => guardar(a.nombre, "")}>Quitar</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="sub" style={{ marginTop: 12 }}>
        Para oficializar un rostro: dime cuál va con quién y Génesis lo escribe en rit_core
        (verificándolo primero con un get — lección aprendida).
      </div>
    </div>
  );
}
