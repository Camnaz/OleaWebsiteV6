"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function GeometricShapes() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  
  // Create 3 main shapes that will animate on scroll
  const shapes = useMemo(() => [
    { type: 'icosahedron', position: [-2.5, 1.5, 0] as [number, number, number], scale: 1 },
    { type: 'torus', position: [2.5, -1, -2] as [number, number, number], scale: 1.2 },
    { type: 'octahedron', position: [0, -3.5, 1] as [number, number, number], scale: 0.8 },
  ], []);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Smooth scroll interpolation
    const r1 = scroll.range(0, 1 / 3);
    const r2 = scroll.range(1 / 3, 1 / 3);
    const r3 = scroll.range(2 / 3, 1 / 3);

    // Rotate the whole group slowly
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x += delta * 0.025;

    // Animate individual shapes based on scroll with a slight floating effect
    const t = state.clock.elapsedTime;
    
    group.current.children[0].rotation.x = t * 0.2 + r1 * Math.PI;
    group.current.children[0].rotation.y = t * 0.3;
    group.current.children[0].position.y = 1.5 + Math.sin(t * 0.5) * 0.2 + r1 * 2 - r2 * 4;

    group.current.children[1].rotation.y = t * 0.2 + r2 * Math.PI;
    group.current.children[1].rotation.z = t * 0.1;
    group.current.children[1].position.x = 2.5 + Math.cos(t * 0.4) * 0.2 - r2 * 4 + r3 * 2;

    group.current.children[2].rotation.x = t * 0.3 + r3 * Math.PI;
    group.current.children[2].rotation.z = t * 0.2;
    group.current.children[2].position.y = -3.5 + Math.sin(t * 0.6) * 0.2 + r3 * 6;
  });

  // Premium frosted glass material
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.95,
    thickness: 2.0,
    ior: 1.5,
    envMapIntensity: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
  }), []);

  // Soft wireframe material
  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#e5e7eb',
    wireframe: true,
    transparent: true,
    opacity: 0.3
  }), []);

  return (
    <group ref={group}>
      <mesh position={shapes[0].position} scale={shapes[0].scale} material={material}>
        <icosahedronGeometry args={[1, 0]} />
        <mesh material={wireframeMaterial}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
      </mesh>
      <mesh position={shapes[1].position} scale={shapes[1].scale} material={material}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <mesh material={wireframeMaterial}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
        </mesh>
      </mesh>
      <mesh position={shapes[2].position} scale={shapes[2].scale} material={material}>
        <octahedronGeometry args={[1, 0]} />
        <mesh material={wireframeMaterial}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
      </mesh>
    </group>
  );
}
