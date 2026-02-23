"use client";

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Suspense } from 'react';
import { AgentNetwork } from './AgentNetwork';

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio for performance
      >
        <color attach="background" args={['#ffffff']} />
        
        {/* Soft lighting for minimalist look */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e5e7eb" />

        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.2}>
            {/* Central harmonic agent network */}
            <AgentNetwork />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
