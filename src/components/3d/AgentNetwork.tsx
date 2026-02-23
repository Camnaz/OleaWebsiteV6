"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AgentNetwork() {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) based on document height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollY(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Create different architectural states for the nodes
  const { lines, architectures } = useMemo(() => {
    const size = 8; // 8x8x8 grid = 512 nodes
    const spacing = 1.2;
    const offset = (size * spacing) / 2 - (spacing / 2);
    
    const nodeCount = size * size * size;
    
    const archCube = new Float32Array(nodeCount * 3);
    const archSphere = new Float32Array(nodeCount * 3);
    const archCylinder = new Float32Array(nodeCount * 3);
    
    const nodes: THREE.Vector3[] = [];
    
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          // 1. Cube State
          const px = x * spacing - offset;
          const py = y * spacing - offset;
          const pz = z * spacing - offset;
          
          archCube[idx * 3] = px;
          archCube[idx * 3 + 1] = py;
          archCube[idx * 3 + 2] = pz;
          
          const v = new THREE.Vector3(px, py, pz);
          nodes.push(v);
          
          // 2. Sphere State
          const radius = 6;
          const length = Math.sqrt(px*px + py*py + pz*pz) || 1;
          const blend = 0.8;
          archSphere[idx * 3] = px + ((px / length) * radius - px) * blend;
          archSphere[idx * 3 + 1] = py + ((py / length) * radius - py) * blend;
          archSphere[idx * 3 + 2] = pz + ((pz / length) * radius - pz) * blend;
          
          // 3. Cylinder / DNA State
          const twist = py * 0.4;
          const cx = px * Math.cos(twist) - pz * Math.sin(twist);
          const cz = px * Math.sin(twist) + pz * Math.cos(twist);
          archCylinder[idx * 3] = cx * 0.7;
          archCylinder[idx * 3 + 1] = py * 1.5; 
          archCylinder[idx * 3 + 2] = cz * 0.7;
          
          idx++;
        }
      }
    }

    const lineIndices: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (Math.abs(dist - spacing) < 0.01) {
          lineIndices.push(i, j); 
        }
      }
    }
    
    return { 
      lines: lineIndices,
      architectures: [archCube, archSphere, archCylinder]
    };
  }, []);

  const linePositions = useMemo(() => new Float32Array(lines.length * 6), [lines]);

  useFrame((state, delta) => {
    if (!group.current || !linesRef.current) return;
    
    const t = state.clock.elapsedTime;
    // We use the raw native scrollY state we track manually
    const scrollOffset = scrollY; 
    
    // Extremely slow, majestic rotation
    group.current.rotation.y += delta * 0.02;
    group.current.rotation.x = Math.sin(t * 0.02) * 0.1;
    group.current.rotation.z = Math.cos(t * 0.02) * 0.05;
    
    // Very subtle zoom based on scroll
    const targetZ = scrollOffset < 0.5 
      ? THREE.MathUtils.lerp(0, -6, scrollOffset * 2) 
      : THREE.MathUtils.lerp(-6, -10, (scrollOffset - 0.5) * 2);
      
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.02);

    const linePosAttribute = linesRef.current.geometry.attributes.position;
    
    let archA = architectures[0];
    let archB = architectures[0];
    let blend = 0;
    
    if (scrollOffset < 0.33) {
      archA = architectures[0];
      archB = architectures[1];
      blend = scrollOffset / 0.33;
    } else if (scrollOffset < 0.66) {
      archA = architectures[1];
      archB = architectures[2];
      blend = (scrollOffset - 0.33) / 0.33;
    } else {
      archA = architectures[2];
      archB = architectures[0];
      blend = (scrollOffset - 0.66) / 0.34;
    }
    
    const easedBlend = blend * blend * (3 - 2 * blend); 
    
    // Update lines directly, skipping points since we are removing them
    for (let i = 0; i < lines.length / 2; i++) {
      const idxA = lines[i * 2] * 3;
      const idxB = lines[i * 2 + 1] * 3;
      
      const targetXA = THREE.MathUtils.lerp(archA[idxA], archB[idxA], easedBlend);
      const targetYA = THREE.MathUtils.lerp(archA[idxA + 1], archB[idxA + 1], easedBlend);
      const targetZA = THREE.MathUtils.lerp(archA[idxA + 2], archB[idxA + 2], easedBlend);
      
      const targetXB = THREE.MathUtils.lerp(archA[idxB], archB[idxB], easedBlend);
      const targetYB = THREE.MathUtils.lerp(archA[idxB + 1], archB[idxB + 1], easedBlend);
      const targetZB = THREE.MathUtils.lerp(archA[idxB + 2], archB[idxB + 2], easedBlend);
      
      const waveA = Math.sin(t * 0.2 + targetXA * 0.2 + targetYA * 0.2) * 0.1;
      const waveB = Math.sin(t * 0.2 + targetXB * 0.2 + targetYB * 0.2) * 0.1;
      
      const lineIdx = i * 6;
      
      linePosAttribute.array[lineIdx] += (targetXA - linePosAttribute.array[lineIdx]) * 0.03;
      linePosAttribute.array[lineIdx + 1] += (targetYA + waveA - linePosAttribute.array[lineIdx + 1]) * 0.03;
      linePosAttribute.array[lineIdx + 2] += (targetZA - linePosAttribute.array[lineIdx + 2]) * 0.03;
      
      linePosAttribute.array[lineIdx + 3] += (targetXB - linePosAttribute.array[lineIdx + 3]) * 0.03;
      linePosAttribute.array[lineIdx + 4] += (targetYB + waveB - linePosAttribute.array[lineIdx + 4]) * 0.03;
      linePosAttribute.array[lineIdx + 5] += (targetZB - linePosAttribute.array[lineIdx + 5]) * 0.03;
    }
    
    linePosAttribute.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        {/* Cleaner, unique blue/gray skeletal architecture look */}
        <lineBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.15} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
