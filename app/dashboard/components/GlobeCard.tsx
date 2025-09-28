'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { useOccurrencePoints } from './hooks/useReportData';

export default function GlobeCard() {
  const occurrencePoints = useOccurrencePoints();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGlobe = async () => {
      try {
        if (!containerRef.current) return;

        // Check if dependencies are available
        try {
          await import('three');
          await import('@react-three/fiber');
          await import('@react-three/drei');
        } catch (importError) {
          console.warn('3D dependencies not available, using fallback visualization');
          setError('3D dependencies not installed');
          return;
        }

        // Dynamically import Three.js and react-three-fiber
        const THREE = await import('three');
        const { Canvas } = await import('@react-three/fiber');
        const { OrbitControls } = await import('@react-three/drei');

        // Create a simple globe component
        const GlobeComponent = () => {
          const globeRef = useRef<THREE.Mesh>(null);

          useEffect(() => {
            if (globeRef.current) {
              // Add rotation animation
              const animate = () => {
                if (globeRef.current) {
                  globeRef.current.rotation.y += 0.005;
                }
                requestAnimationFrame(animate);
              };
              animate();
            }
          }, []);

          return (
            <>
              <ambientLight intensity={0.6} />
              <directionalLight position={[1, 1, 1]} intensity={0.8} />
              <mesh ref={globeRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshPhongMaterial 
                  color="#06b6d4" 
                  transparent 
                  opacity={0.8}
                  wireframe={false}
                />
              </mesh>
              
              {/* Add occurrence points */}
              {occurrencePoints.map((point, index) => {
                const phi = (90 - point.lat) * (Math.PI / 180);
                const theta = (point.lng + 180) * (Math.PI / 180);
                const radius = 2.1;
                
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta);

                return (
                  <mesh key={index} position={[x, y, z]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshPhongMaterial 
                      color="#ef4444" 
                      emissive="#ef4444"
                      emissiveIntensity={0.3}
                    />
                  </mesh>
                );
              })}
            </>
          );
        };

        // Render the globe
        const { createRoot } = await import('react-dom/client');
        const root = createRoot(containerRef.current);
        
        root.render(
          <Canvas camera={{ position: [0, 0, 5] }}>
            <GlobeComponent />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          </Canvas>
        );

        setIsLoaded(true);
      } catch (err) {
        console.error('Error loading 3D globe:', err);
        setError('Failed to load 3D visualization');
        
        // Fallback to 2D map
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
              <div class="text-center">
                <div class="text-6xl mb-4">🌍</div>
                <h3 class="text-lg font-semibold text-slate-900 mb-2">Geographic Distribution</h3>
                <p class="text-sm text-slate-600">${occurrencePoints.length} occurrence points</p>
                <div class="mt-4 space-y-2">
                  ${occurrencePoints.map(point => `
                    <div class="text-xs text-slate-500">
                      📍 ${point.label || `${point.lat.toFixed(2)}, ${point.lng.toFixed(2)}`}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
          setIsLoaded(true);
        }
      }
    };

    loadGlobe();
  }, [occurrencePoints]);

  return (
    <Card 
      size="medium" 
      title="Geographic Distribution" 
      subtitle="3D Globe Visualization"
    >
      <div className="globe-container">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        />
        
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-slate-600">Loading 3D globe...</p>
            </div>
          </div>
        )}
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-slate-50/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-cyan-500 rounded-full" />
              <span className="text-slate-600">Globe</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-slate-600">Occurrences</span>
            </div>
          </div>
          <span className="text-xs text-slate-500">
            {occurrencePoints.length} points
          </span>
        </div>
      </motion.div>
    </Card>
  );
}
