// dashboard/components/Globe.tsx

'use client';

import { OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useOccurrencePoints } from './hooks/useReportData';

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null!);
  const occurrencePoints = useOccurrencePoints();

  // A lightweight, public domain texture for the globe
  const [earthTexture] = useTexture(['/earth-texture-map.jpg']);

  // This auto-rotation logic has been removed.
  // useFrame(() => {
  //   if (globeRef.current) {
  //     globeRef.current.rotation.y += 0.001;
  //   }
  // });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />

      {/* A subtle blue sphere to simulate an atmospheric halo */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* The main textured globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, , 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      {/* Map occurrence points onto the globe's surface */}
      {occurrencePoints.map((point, index) => {
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (point.lng + 180) * (Math.PI / 180);
        const radius = 2.01; // Slightly above the surface

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#FF0000" toneMapped={false} />
          </mesh>
        );
      })}
    </>
  );
}

export function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <GlobeMesh />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={3.5}
        maxDistance={10}
        zoomSpeed={0.6}
      />
    </Canvas>
  );
}