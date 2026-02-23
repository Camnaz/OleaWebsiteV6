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
    { type: 'icosahedron', position: [-2, 1, 0] as [number, number, number], scale: 1 },
    { type: 'torus', position: [2, -1, -2] as [number, number, number], scale: 1.2 },
    { type: 'octahedron', position: [0, -3, 1] as [number, number, number], scale: 0.8 },
  ], []);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Smooth scroll interpolation
    const r1 = scroll.range(0, 1 / 3);
    const r2 = scroll.range(1 / 3, 1 / 3);
    const r3 = scroll.range(2 / 3, 1 / 3);

    // Rotate the whole group slowly
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x += delta * 0.05;

    // Animate individual shapes based on scroll
    group.current.children[0].rotation.x = state.clock.elapsedTime * 0.2 + r1 * Math.PI;
    group.current.children[0].rotation.y = state.clock.elapsedTime * 0.3;
    group.current.children[0].position.y = 1 + r1 * 2 - r2 * 4;

    group.current.children[1].rotation.y = state.clock.elapsedTime * 0.2 + r2 * Math.PI;
    group.current.children[1].rotation.z = state.clock.elapsedTime * 0.1;
    group.current.children[1].position.x = 2 - r2 * 4 + r3 * 2;

    group.current.children[2].rotation.x = state.clock.elapsedTime * 0.3 + r3 * Math.PI;
    group.current.children[2].rotation.z = state.clock.elapsedTime * 0.2;
    group.current.children[2].position.y = -3 + r3 * 6;
  });

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({ 
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.9,
    thickness: 1.5,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  }), []);

  return (
    <group ref={group}>
      <mesh position={shapes[0].position} scale={shapes[0].scale} material={material}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={shapes[1].position} scale={shapes[1].scale} material={material}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={shapes[2].position} scale={shapes[2].scale} material={material}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}
