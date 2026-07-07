"use client";
// Puerta de entrada 3D — /edificio. El edificio se monta solo en el
// navegador (ssr:false) porque three.js necesita WebGL.
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const EdificioGenesis3D = dynamic(() => import("../../components/EdificioGenesis3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "#051226",
        color: "#D4AF37",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16,
        letterSpacing: 1,
      }}
    >
      Levantando el Edificio Génesis…
    </div>
  ),
});

export default function EdificioPage() {
  const router = useRouter();
  return (
    <EdificioGenesis3D
      onEnterRoom={(room) => {
        if (room.href) router.push(room.href);
      }}
    />
  );
}
