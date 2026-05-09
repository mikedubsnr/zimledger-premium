"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  MeshReflectorMaterial,
  Float,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────
   REALISTIC BRIDGE SCENE
   Inspired by the great bridges of Zimbabwe — Birchenough Bridge,
   Victoria Falls Bridge. Features: stone pillars, steel deck,
   suspension cables, water reflection, atmospheric fog.
   ────────────────────────────────────────────────────────────── */

function BridgePillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main stone pillar */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[0.8, 3, 0.8]} />
        <meshStandardMaterial
          color="#8B8680"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      {/* Pillar base (wider) */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial
          color="#7A756F"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>
      {/* Pillar cap */}
      <mesh castShadow position={[0, 3.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial
          color="#6B665F"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      {/* Zimbabwe accent — green band */}
      <mesh position={[0, 2.2, 0.41]}>
        <boxGeometry args={[0.82, 0.15, 0.02]} />
        <meshStandardMaterial
          color="#009739"
          emissive="#009739"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 2.0, 0.41]}>
        <boxGeometry args={[0.82, 0.15, 0.02]} />
        <meshStandardMaterial
          color="#FCD116"
          emissive="#FCD116"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 1.8, 0.41]}>
        <boxGeometry args={[0.82, 0.15, 0.02]} />
        <meshStandardMaterial
          color="#DC143C"
          emissive="#DC143C"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function BridgeDeck() {
  return (
    <group>
      {/* Main road deck */}
      <mesh castShadow receiveShadow position={[0, 3.3, 0]}>
        <boxGeometry args={[14, 0.15, 2.2]} />
        <meshStandardMaterial
          color="#4A4A4A"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      {/* Road surface (asphalt) */}
      <mesh receiveShadow position={[0, 3.39, 0]}>
        <boxGeometry args={[13.8, 0.02, 2]} />
        <meshStandardMaterial
          color="#333333"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      {/* Center line (yellow) */}
      <mesh position={[0, 3.41, 0]}>
        <boxGeometry args={[13.8, 0.01, 0.08]} />
        <meshStandardMaterial
          color="#FCD116"
          emissive="#FCD116"
          emissiveIntensity={0.2}
          roughness={0.5}
        />
      </mesh>
      {/* Side railings */}
      {[-1.05, 1.05].map((z, i) => (
        <group key={i}>
          {/* Railing posts */}
          {Array.from({ length: 15 }, (_, j) => (
            <mesh key={j} castShadow position={[-6.5 + j * 0.93, 3.7, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
              <meshStandardMaterial
                color="#C9A96E"
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
          ))}
          {/* Top rail */}
          <mesh castShadow position={[0, 4.1, z]}>
            <boxGeometry args={[14, 0.06, 0.06]} />
            <meshStandardMaterial
              color="#B8945F"
              roughness={0.25}
              metalness={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SuspensionCables() {
  const cablePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const x = -7 + t * 14;
      // Catenary curve: y = a * cosh(x/a)
      const y = 3.3 + 0.3 * Math.cosh((x * 0.15)) * 0.5;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(cablePoints), [cablePoints]);

  return (
    <group>
      {/* Main suspension cables */}
      {[-1.05, 1.05].map((z, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
          <meshStandardMaterial
            color="#8A8A8A"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
      ))}
      {/* Vertical suspenders */}
      {Array.from({ length: 13 }, (_, i) => {
        const x = -6 + i;
        const cableY = 3.3 + 0.3 * Math.cosh((x * 0.15)) * 0.5;
        const height = cableY - 3.3;
        return (
          <mesh key={i} position={[x, 3.3 + height / 2, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, height, 6]} />
            <meshStandardMaterial
              color="#999999"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function WaterPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.normalMap) {
        material.normalMap.offset.y = state.clock.elapsedTime * 0.02;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[30, 30, 128, 128]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#1a3a4a"
        metalness={0.8}
        mirror={0.5}
      />
    </mesh>
  );
}

function Terrain() {
  return (
    <group>
      {/* Left bank */}
      <mesh receiveShadow position={[-10, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[8, 3, 12]} />
        <meshStandardMaterial
          color="#5C4A3A"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      {/* Right bank */}
      <mesh receiveShadow position={[10, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[8, 3, 12]} />
        <meshStandardMaterial
          color="#5C4A3A"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      {/* Vegetation hints — low poly trees/bushes */}
      {[
        [-7, 2, 3], [-8, 2.5, -2], [-6.5, 1.8, 4],
        [7, 2, -3], [8.5, 2.2, 2], [6.8, 1.9, -4],
      ].map((pos, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={pos as [number, number, number]} castShadow>
            <icosahedronGeometry args={[0.4 + Math.random() * 0.3, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2D5A27" : "#3A6B32"}
              roughness={0.9}
              metalness={0.0}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      scale: Math.random() * 0.08 + 0.02,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      color: i % 5 === 0 ? "#009739" : i % 5 === 1 ? "#FCD116" : i % 5 === 2 ? "#DC143C" : i % 5 === 3 ? "#C9A96E" : "#ffffff",
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.y = p.position[1] + Math.sin(state.clock.elapsedTime * p.speed + p.phase) * 0.3;
        child.rotation.x = state.clock.elapsedTime * 0.2 + p.phase;
        child.rotation.y = state.clock.elapsedTime * 0.15 + p.phase;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function BridgeStructure() {
  return (
    <group>
      {/* Pillars */}
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <BridgePillar key={x} position={[x, 0, 0]} />
      ))}
      <BridgeDeck />
      <SuspensionCables />
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#F5F0E8" />
      <directionalLight
        position={[8, 12, 5]}
        intensity={1.5}
        color="#FFF8E7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight
        position={[-5, 6, -3]}
        intensity={0.4}
        color="#87CEEB"
      />
      {/* Warm accent light from below (water reflection) */}
      <pointLight
        position={[0, -0.3, 3]}
        intensity={0.8}
        color="#4A90A4"
        distance={15}
      />
      {/* Zimbabwe gold accent */}
      <pointLight
        position={[0, 5, 2]}
        intensity={0.5}
        color="#C9A96E"
        distance={12}
      />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.08) * 4;
    state.camera.position.y = 4 + Math.sin(t * 0.05) * 0.8;
    state.camera.position.z = 8 + Math.cos(t * 0.06) * 1.5;
    state.camera.lookAt(0, 2.5, 0);
  });
  return null;
}

export default function BridgeScene() {
  return (
    <div className="w-full h-[90vh] relative bg-[#0a151a]">
      <Canvas
        shadows
        camera={{ position: [4, 4, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={["#0a151a"]} />
        <fog attach="fog" args={["#0a151a", 12, 35]} />

        <SceneLighting />
        <CameraRig />

        <BridgeStructure />
        <Terrain />
        <WaterPlane />
        <FloatingParticles />

        <ContactShadows
          position={[0, -0.48, 0]}
          opacity={0.6}
          scale={25}
          blur={2.5}
          far={10}
          color="#0a2a3a"
        />

        <Environment preset="sunset" />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <p className="font-display text-sm tracking-[0.3em] text-white/40 uppercase">
          Scroll to explore
        </p>
      </div>
    </div>
  );
}
