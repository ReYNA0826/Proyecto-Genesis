"use client";
// =============================================================
// EdificioGenesis3D.jsx — RIT · Reyna Intelligence Team
// Puerta de entrada 3D al Edificio Génesis (genesis.gent).
// Clic en una sala → panel → "Entrar" → navega a la oficina real
// (/oficina/[nombre]) o a la Sala de Reuniones (/sala-de-reuniones).
//
// Paleta oficial: Oro #D4AF37 · Azul Génesis #0A1D3A · Deep #051226.
// Roster fiel al Consejo (11). Se monta solo en el navegador
// (la página lo importa con next/dynamic { ssr:false }).
// =============================================================

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Edges, Text } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  bg: "#051226", // Deep
  panel: "#0A1D3A", // Azul Génesis
  gold: "#D4AF37", // Oro
  active: "#7fd3a3", // verde "viva" del sitio
  special: "#D4AF37",
  locked: "#3a4258",
  text: "#F8F8F8", // Pearl
};

const FLOOR_H = 1.15;
const GAP = 0.28;
const DEPTH = 2.6;
const floorY = (n) => n * (FLOOR_H + GAP);

// state: "active" = oficina real (navega a href)
//        "special" = sala del edificio (navega a href)
//        "locked" = agente del Consejo con oficina en preparación
const ROOMS = [
  // Planta baja
  { n: "Lobby", d: "Entrada del edificio. Vista clásica del lobby.", x: -2.6, y: 0, w: 2.3, state: "special", href: "/" },
  { n: "Recepción", d: "Registro y dirección hacia ALMA.", x: 0, y: 0, w: 2.3, state: "special", href: "/" },
  { n: "ALMA", d: "Directora Ejecutiva IA (CEO). Avatar y voz en vivo.", x: 2.6, y: 0, w: 2.3, state: "active", href: "/oficina/alma" },
  // Piso 1
  { n: "GÉNESIS", d: "Chief Architect · Guardián del Sistema.", x: -2.6, y: 1, w: 2.3, state: "active", href: "/oficina/génesis" },
  { n: "PRISM", d: "Director de Análisis. Perspectivas y escenarios.", x: 0, y: 1, w: 2.3, state: "locked" },
  { n: "Sala del Consejo", d: "Reunión ejecutiva. ALMA preside.", x: 2.6, y: 1, w: 2.3, state: "special", href: "/sala-de-reuniones" },
  // Piso 2
  { n: "EDU", d: "Chief Learning Officer. Dream Education y Mujer Raíz.", x: -3.15, y: 2, w: 1.75, state: "active", href: "/oficina/edu" },
  { n: "FIN", d: "Director Financiero (CFO). Stripe, cobros y balances.", x: -1.05, y: 2, w: 1.75, state: "active", href: "/oficina/fin" },
  { n: "NOVA", d: "Director de Innovación. Nuevos productos y pruebas.", x: 1.05, y: 2, w: 1.75, state: "locked" },
  { n: "INTEL", d: "Director de Inteligencia. Investigación y tendencias.", x: 3.15, y: 2, w: 1.75, state: "locked" },
  // Piso 3
  { n: "LEX", d: "Directora Legal (CLO). Evaluación de casos y RFEs.", x: -3.15, y: 3, w: 1.75, state: "active", href: "/oficina/lex" },
  { n: "TECH", d: "Director Tecnológico (CTO). Apps, n8n y plataformas.", x: -1.05, y: 3, w: 1.75, state: "active", href: "/oficina/tech" },
  { n: "OPS", d: "Director de Operaciones (COO). Paralegales y flujos.", x: 1.05, y: 3, w: 1.75, state: "active", href: "/oficina/ops" },
  { n: "MKT", d: "Director de Crecimiento (CGO). Meta Ads y contenido.", x: 3.15, y: 3, w: 1.75, state: "active", href: "/oficina/mkt" },
  // Pisos altos
  { n: "Sala de Memoria", d: "Historial, conocimiento y decisiones.", x: 0, y: 4, w: 7.9, state: "special", href: "/" },
  { n: "Laboratorio de Innovación", d: "Prototipos y experimentos con IA.", x: 0, y: 5, w: 7.9, state: "special", href: "/" },
];

function Room({ room, selected, onSelect, onLockedTap }) {
  const mat = useRef(null);
  const [hover, setHover] = useState(false);
  const isLocked = room.state === "locked";
  const edge = COLORS[room.state];

  useFrame(({ clock }) => {
    if (!mat.current) return;
    const t = clock.getElapsedTime();
    const base = isLocked ? 0.03 : 0.12 + Math.sin(t * 2 + room.x) * 0.05;
    mat.current.emissiveIntensity = hover && !isLocked ? base + 0.15 : base;
  });

  return (
    <group position={[room.x, floorY(room.y), 0]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          isLocked ? onLockedTap(room) : onSelect(room);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          if (!isLocked) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[room.w, FLOOR_H, DEPTH]} />
        <meshStandardMaterial
          ref={mat}
          color={COLORS.panel}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={0.88}
          emissive={edge}
          emissiveIntensity={0.1}
        />
        <Edges color={edge} />
      </mesh>
      <Text
        position={[0, 0, DEPTH / 2 + 0.02]}
        fontSize={Math.min(0.26, (room.w * 0.85) / Math.max(room.n.length, 4))}
        color={COLORS.text}
        anchorX="center"
        anchorY="middle"
        fillOpacity={isLocked ? 0.4 : 0.95}
      >
        {room.n}
      </Text>
      {selected?.n === room.n && (
        <mesh position={[0, FLOOR_H / 2 + 0.25, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={edge} />
        </mesh>
      )}
    </group>
  );
}

function CameraRig({ selected, controlsRef }) {
  const { camera } = useThree();
  const goal = useRef(null);

  useEffect(() => {
    if (selected) {
      const y = floorY(selected.y);
      goal.current = {
        cam: new THREE.Vector3(selected.x * 0.6, y + 0.8, 6.5),
        tgt: new THREE.Vector3(selected.x, y, 0),
      };
    } else {
      goal.current = {
        cam: new THREE.Vector3(9, 6.5, 12),
        tgt: new THREE.Vector3(0, 3, 0),
      };
    }
  }, [selected]);

  useFrame(() => {
    if (!goal.current || !controlsRef.current) return;
    camera.position.lerp(goal.current.cam, 0.06);
    controlsRef.current.target.lerp(goal.current.tgt, 0.06);
    controlsRef.current.update();
    if (camera.position.distanceTo(goal.current.cam) < 0.05) goal.current = null;
  });
  return null;
}

export default function EdificioGenesis3D({ onEnterRoom }) {
  const [selected, setSelected] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const controlsRef = useRef(null);
  const toastTimer = useRef(undefined);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
      clearTimeout(toastTimer.current);
    };
  }, []);

  const toast = (msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2400);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: COLORS.bg }}>
      <Canvas
        camera={{ position: [9, 6.5, 12], fov: 45 }}
        dpr={[1, 2]}
        onPointerMissed={() => setSelected(null)}
      >
        <fog attach="fog" args={[COLORS.bg, 14, 34]} />
        <ambientLight color="#405078" intensity={1.2} />
        <pointLight position={[6, 10, 8]} color={COLORS.gold} intensity={1.4} distance={40} />
        <pointLight position={[-8, 4, -6]} color="#3EC9DD" intensity={0.5} distance={30} />

        {/* Base */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[9, 9, 0.15, 48]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.9} />
        </mesh>

        {/* Terraza */}
        <mesh position={[0, floorY(6) - 0.35, 0]}>
          <boxGeometry args={[8.3, 0.18, DEPTH + 0.4]} />
          <meshStandardMaterial color="#12224a" roughness={0.6} metalness={0.4} />
          <Edges color={COLORS.gold} />
        </mesh>

        {ROOMS.map((r) => (
          <Room
            key={r.n}
            room={r}
            selected={selected}
            onSelect={setSelected}
            onLockedTap={(room) => toast(`La oficina de ${room.n} se inaugura pronto`)}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={5}
          maxDistance={26}
          minPolarAngle={0.35}
          maxPolarAngle={1.45}
          autoRotate={!selected}
          autoRotateSpeed={0.4}
        />
        <CameraRig selected={selected} controlsRef={controlsRef} />
      </Canvas>

      {selected && (
        <div style={panelStyle}>
          <button onClick={() => setSelected(null)} style={closeStyle} aria-label="Cerrar">
            ✕
          </button>
          <h2 style={titleStyle}>{selected.n}</h2>
          <span
            style={{ ...statusStyle, color: selected.state === "active" ? COLORS.active : COLORS.gold }}
          >
            {selected.state === "active" ? "● Oficina en línea" : "◆ Sala del edificio"}
          </span>
          <p style={descStyle}>{selected.d}</p>
          <button style={btnStyle} onClick={() => onEnterRoom?.(selected)}>
            Entrar a {selected.n}
          </button>
        </div>
      )}

      {toastMsg && <div style={toastStyle}>{toastMsg}</div>}

      <div style={hintStyle}>Arrastra para rotar · Rueda para acercar · Clic en una sala iluminada</div>
      <div style={brandStyle}>
        Edificio Génesis · <span style={{ color: COLORS.gold }}>RIT</span>
      </div>
    </div>
  );
}

const panelStyle = {
  position: "absolute", right: 24, top: 90, width: 320,
  background: "rgba(10,29,58,.92)", border: `1px solid ${COLORS.gold}`,
  borderRadius: 14, padding: 20, backdropFilter: "blur(6px)",
  color: COLORS.text, fontFamily: "Montserrat, sans-serif", zIndex: 20,
};
const closeStyle = {
  position: "absolute", top: 10, right: 14, background: "none",
  border: "none", color: "#A7A9AC", fontSize: 18, cursor: "pointer",
};
const titleStyle = { fontFamily: "'Cormorant Garamond', serif", color: COLORS.gold, fontSize: 24, fontWeight: 700, margin: "0 0 4px" };
const statusStyle = { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 12 };
const descStyle = { fontSize: 13, color: "#A7A9AC", lineHeight: 1.6, marginBottom: 14 };
const btnStyle = {
  width: "100%", background: COLORS.gold, color: "#1A1405", border: "none",
  borderRadius: 8, padding: 11, fontWeight: 600, cursor: "pointer", fontSize: 13,
};
const toastStyle = {
  position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)",
  background: "rgba(20,30,56,.95)", border: `1px solid ${COLORS.gold}`,
  borderRadius: 10, padding: "11px 20px", fontSize: 13, color: COLORS.text, zIndex: 30,
};
const hintStyle = {
  position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
  fontSize: 12, color: "#A7A9AC", background: "rgba(10,29,58,.8)",
  border: "1px solid rgba(212,175,55,.25)", borderRadius: 20, padding: "8px 16px",
  whiteSpace: "nowrap", pointerEvents: "none",
};
const brandStyle = {
  position: "absolute", bottom: 20, left: 24, fontSize: 12, letterSpacing: 2,
  textTransform: "uppercase", color: "#A7A9AC", fontFamily: "'Cormorant Garamond', serif",
  pointerEvents: "none",
};
