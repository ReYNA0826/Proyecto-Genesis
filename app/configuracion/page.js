import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "../../lib/supabase";
import ConfigAvatares from "../../components/ConfigAvatares";

export const dynamic = "force-dynamic";

export default async function Configuracion() {
  const supabase = await supabaseServer();
  // Página de administración: solo la Fundadora (el Edificio es público, esto no).
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  // Los agentes en producción (Mi alma, Andrés Felipe) NO aparecen aquí: no se tocan.
  const { data: agentes } = await supabase
    .from("v_rit_agentes")
    .select("*")
    .not("elevenlabs_agent_id", "is", null)
    .neq("estado", "produccion_no_tocar")
    .order("nombre");

  return (
    <div className="of">
      <div className="topbar">
        <div className="brand">
          <img src="/genesis-icon.jpeg" alt="Génesis" width={36} height={36} style={{ borderRadius: "50%" }} />
          <b>RIT · CONFIGURACIÓN</b>
        </div>
        <Link href="/" className="btn" style={{ textDecoration: "none" }}>← Volver al Edificio</Link>
      </div>

      <div className="room-tag"><span>⚙️ Configuración de avatares</span></div>
      <ConfigAvatares agentes={agentes ?? []} />

      <footer className="foot">
        <div className="lema">✦ El futuro es brillante.</div>
      </footer>
    </div>
  );
}
