"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorGreen: { value: new THREE.Color("#009739") },
      uColorYellow: { value: new THREE.Color("#FCD116") },
      uColorRed: { value: new THREE.Color("#DC143C") },
      uColorBlack: { value: new THREE.Color("#1a1a1a") },
      uColorGold: { value: new THREE.Color("#C9A96E") },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorGreen;
    uniform vec3 uColorYellow;
    uniform vec3 uColorRed;
    uniform vec3 uColorBlack;
    uniform vec3 uColorGold;
    varying vec2 vUv;

    void main() {
      float t = uTime * 0.05;

      // Subtle wave distortion
      vec2 uv = vUv;
      uv.x += sin(uv.y * 3.0 + t) * 0.02;
      uv.y += cos(uv.x * 2.0 + t * 0.7) * 0.015;

      // Zimbabwe flag-inspired gradient bands
      float band = smoothstep(0.0, 0.25, uv.y) * (1.0 - smoothstep(0.25, 0.5, uv.y));
      vec3 color = mix(uColorBlack, uColorGreen, band);

      band = smoothstep(0.25, 0.5, uv.y) * (1.0 - smoothstep(0.5, 0.75, uv.y));
      color = mix(color, uColorYellow, band);

      band = smoothstep(0.5, 0.75, uv.y) * (1.0 - smoothstep(0.75, 1.0, uv.y));
      color = mix(color, uColorRed, band);

      // Gold accent line (subtle)
      float goldLine = smoothstep(0.48, 0.5, uv.y) * (1.0 - smoothstep(0.5, 0.52, uv.y));
      color = mix(color, uColorGold, goldLine * 0.3);

      // Vignette
      float vignette = 1.0 - length((vUv - 0.5) * 1.2);
      color *= smoothstep(0.0, 0.7, vignette);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function BridgeScene() {
  return (
    <div className="w-full h-[50vh] md:h-[60vh] relative bg-[#0f0f0f] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ antialias: true }}
        style={{ background: "#0f0f0f" }}
      >
        <GradientPlane />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">
          Inspired by Zimbabwe
        </p>
        <h3 className="font-display text-3xl md:text-5xl text-white/80 text-center">
          Built for <em className="italic text-gold">every business</em>
        </h3>
      </div>
    </div>
  );
}
