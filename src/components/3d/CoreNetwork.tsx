"use client";

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CoreNetwork() {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [networkData, setNetworkData] = useState<{positions: Float32Array, lines: Float32Array} | null>(null);
  
  useEffect(() => {
    const nodeCount = 50;
    const positions = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      nodes.push(v);
      v.toArray(positions, i * 3);
    }

    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3) {
          lines.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    
    const timeout = setTimeout(() => {
      setNetworkData({ 
        positions, 
        lines: new Float32Array(lines) 
      });
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x += delta * 0.02;
  });

  if (!networkData) return null;

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={networkData.positions.length / 3}
            array={networkData.positions}
            itemSize={3}
            args={[networkData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#6b7280" transparent opacity={0.6} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={networkData.lines.length / 3}
            array={networkData.lines}
            itemSize={3}
            args={[networkData.lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#d1d5db" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}
