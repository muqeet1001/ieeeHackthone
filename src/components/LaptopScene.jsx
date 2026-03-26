/**
 * LaptopScene.jsx
 * ─────────────────────────────────────────────────────────────────
 * Renders a procedural 3D gaming laptop (Alienware-inspired) using
 * React Three Fiber.  No external model file required.
 *
 * Features:
 *  • Metallic chassis with PBR materials
 *  • Neon green + purple emissive glow (keyboard rows, vents, edges)
 *  • Slow floating animation tied to clock
 *  • Mouse-driven tilt (rotation follows cursor)
 *  • Fully transparent canvas — sits behind hero text
 *  • Responsive: scales down on small viewports
 * ─────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

/* ── Colour palette ──────────────────────────────────────────── */
const NEON   = '#00ff99';
const PURPLE = '#8b5cf6';
const METAL  = '#1a1a20';
const DARK   = '#050508';

/* ── Laptop geometry ─────────────────────────────────────────── */
function LaptopModel({ mouse }) {
  const group = useRef();
  const { viewport } = useThree();

  /* Responsive scale: shrink on narrow viewports */
  const scale = viewport.width < 5 ? 0.5 : viewport.width < 8 ? 0.72 : 0.88;
  /* On wide screens push model to the right so it doesn't cover centred text */
  const xShift = viewport.width > 8 ? 2.8 : 0;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    /* Gentle float */
    group.current.position.y = Math.sin(t * 0.65) * 0.12;

    /* Slow Y drift + mouse follow */
    group.current.rotation.y =
      -0.45 + mouse.current[0] * 0.13 + Math.sin(t * 0.18) * 0.04;

    /* Vertical tilt from mouse */
    group.current.rotation.x = mouse.current[1] * 0.07;
  });

  return (
    <group ref={group} position={[xShift, 0, 0]} scale={scale}>

      {/* ── Base chassis ───────────────────────────────────────── */}
      <mesh castShadow>
        <boxGeometry args={[4.4, 0.2, 3.0]} />
        <meshStandardMaterial color={METAL} metalness={0.96} roughness={0.1} />
      </mesh>

      {/* ── Keyboard LED rows (3 neon strips) ─────────────────── */}
      {[
        { z: -0.72, color: NEON,   intensity: 2.0 },
        { z:  0,    color: PURPLE, intensity: 1.8 },
        { z:  0.72, color: NEON,   intensity: 2.0 },
      ].map(({ z, color, intensity }, i) => (
        <mesh key={i} position={[0, 0.11, z]}>
          <boxGeometry args={[3.6, 0.005, 0.14]} />
          <meshStandardMaterial emissive={color} emissiveIntensity={intensity} color={DARK} />
        </mesh>
      ))}

      {/* ── Touchpad ───────────────────────────────────────────── */}
      <mesh position={[0, 0.11, 1.1]}>
        <boxGeometry args={[1.4, 0.004, 0.9]} />
        <meshStandardMaterial
          color="#111118"
          metalness={0.65}
          roughness={0.35}
          emissive={PURPLE}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* ── Left / right chassis vent glow ────────────────────── */}
      {[-2.22, 2.22].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.05, 0.12, 2.4]} />
          <meshStandardMaterial emissive={NEON} emissiveIntensity={4} color={DARK} />
        </mesh>
      ))}

      {/* ── Front lip accent strip ─────────────────────────────── */}
      <mesh position={[0, -0.06, 1.55]}>
        <boxGeometry args={[4.2, 0.07, 0.05]} />
        <meshStandardMaterial emissive={PURPLE} emissiveIntensity={3.5} color={DARK} />
      </mesh>

      {/* ── Rear exhaust glow ──────────────────────────────────── */}
      <mesh position={[0, 0.04, -1.55]}>
        <boxGeometry args={[3.6, 0.08, 0.05]} />
        <meshStandardMaterial emissive={NEON} emissiveIntensity={3} color={DARK} />
      </mesh>

      {/* ── Screen (tilted ~115° open) ─────────────────────────── */}
      <group position={[0, 0.1, -1.45]} rotation={[-Math.PI * 0.31, 0, 0]}>

        {/* Lid outer shell */}
        <mesh>
          <boxGeometry args={[4.4, 2.8, 0.15]} />
          <meshStandardMaterial color={METAL} metalness={0.96} roughness={0.08} />
        </mesh>

        {/* Display panel (slightly emissive dark green) */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[4.0, 2.45, 0.01]} />
          <meshStandardMaterial
            color="#000d05"
            emissive={NEON}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Faux screen content — horizontal UI lines */}
        {[0.75, 0.3, -0.1, -0.5, -0.85].map((y, i) => (
          <mesh key={i} position={[0, y, 0.09]}>
            <boxGeometry args={[i % 2 === 0 ? 3.2 : 2.0, 0.05, 0.001]} />
            <meshStandardMaterial
              emissive={i % 2 === 0 ? NEON : PURPLE}
              emissiveIntensity={0.65}
              color={DARK}
            />
          </mesh>
        ))}

        {/* Alienware-style hexagonal logo (back of lid) */}
        <mesh position={[0, 0.2, -0.09]}>
          <torusGeometry args={[0.32, 0.05, 6, 6]} />
          <meshStandardMaterial emissive={NEON} emissiveIntensity={6} color={DARK} />
        </mesh>
        {/* Inner hex fill */}
        <mesh position={[0, 0.2, -0.085]} rotation={[0, 0, Math.PI / 6]}>
          <circleGeometry args={[0.22, 6]} />
          <meshStandardMaterial emissive={NEON} emissiveIntensity={2} color={DARK} transparent opacity={0.4} />
        </mesh>

        {/* Top edge LED strip */}
        <mesh position={[0, 1.42, 0]}>
          <boxGeometry args={[4.2, 0.05, 0.15]} />
          <meshStandardMaterial emissive={PURPLE} emissiveIntensity={3.5} color={DARK} />
        </mesh>

        {/* Left / right screen edge accents */}
        {[-2.22, 2.22].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.05, 2.6, 0.15]} />
            <meshStandardMaterial emissive={NEON} emissiveIntensity={2.5} color={DARK} />
          </mesh>
        ))}

        {/* Bottom screen edge (hinge area glow) */}
        <mesh position={[0, -1.42, 0]}>
          <boxGeometry args={[4.2, 0.05, 0.15]} />
          <meshStandardMaterial emissive={NEON} emissiveIntensity={2} color={DARK} />
        </mesh>
      </group>

    </group>
  );
}

/* ── Scene wrapper ───────────────────────────────────────────── */
export default function LaptopScene() {
  const mouse = useRef([0, 0]);

  /* Track mouse via window — no pointer-events needed on canvas */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    /* absolute inset + z-0 → renders behind all hero text */
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 1.4, 8.5], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,                    /* transparent background */
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}                    /* cap at 1.5× for performance */
      >
        {/* ── Lighting ─────────────────────────────────────────── */}
        {/* Very dim ambient so shadows read */}
        <ambientLight intensity={0.15} />

        {/* Main neon-green key light from top-left */}
        <pointLight
          position={[-5, 5, 5]}
          color={NEON}
          intensity={5}
          distance={22}
          decay={2}
        />

        {/* Purple fill from top-right */}
        <pointLight
          position={[5, 3, 4]}
          color={PURPLE}
          intensity={4}
          distance={20}
          decay={2}
        />

        {/* Soft white bounce from below (rim light) */}
        <pointLight
          position={[0, -4, 6]}
          color="#ffffff"
          intensity={0.7}
          distance={14}
          decay={2}
        />

        <LaptopModel mouse={mouse} />
      </Canvas>
    </div>
  );
}
