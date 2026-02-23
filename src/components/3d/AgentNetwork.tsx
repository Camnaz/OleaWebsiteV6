"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AgentNetwork() {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) based on document height
      const totalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / totalHeight;
      setScrollY(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Create different architectural states for the nodes
  const { lines, architectures, positions } = useMemo(() => {
    const size = 8; // 8x8x8 grid = 512 nodes
    const spacing = 1.2;
    const offset = (size * spacing) / 2 - (spacing / 2);
    
    const nodeCount = size * size * size;
    
    const positions = new Float32Array(nodeCount * 3);
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
          v.toArray(positions, idx * 3);
          
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
      positions,
      lines: lineIndices,
      architectures: [archCube, archSphere, archCylinder]
    };
  }, []);

  const linePositions = useMemo(() => new Float32Array(lines.length * 6), [lines]);

  useFrame((state, delta) => {
    if (!group.current || !linesRef.current || !pointsRef.current) return;
    
    const t = state.clock.elapsedTime;
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
    const pointPosAttribute = pointsRef.current.geometry.attributes.position;
    
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
    
    // First update the points
    for (let i = 0; i < pointPosAttribute.count; i++) {
      const idx = i * 3;
      
      const targetX = THREE.MathUtils.lerp(archA[idx], archB[idx], easedBlend);
      const targetY = THREE.MathUtils.lerp(archA[idx + 1], archB[idx + 1], easedBlend);
      const targetZ = THREE.MathUtils.lerp(archA[idx + 2], archB[idx + 2], easedBlend);
      
      const wave = Math.sin(t * 0.2 + targetX * 0.2 + targetY * 0.2) * 0.1;
      
      pointPosAttribute.array[idx] += (targetX - pointPosAttribute.array[idx]) * 0.03;
      pointPosAttribute.array[idx + 1] += (targetY + wave - pointPosAttribute.array[idx + 1]) * 0.03;
      pointPosAttribute.array[idx + 2] += (targetZ - pointPosAttribute.array[idx + 2]) * 0.03;
    }
    pointPosAttribute.needsUpdate = true;
    
    // Then update lines to exactly match the points
    for (let i = 0; i < lines.length / 2; i++) {
      const idxA = lines[i * 2] * 3;
      const idxB = lines[i * 2 + 1] * 3;
      const lineIdx = i * 6;
      
      linePosAttribute.array[lineIdx] = pointPosAttribute.array[idxA];
      linePosAttribute.array[lineIdx + 1] = pointPosAttribute.array[idxA + 1];
      linePosAttribute.array[lineIdx + 2] = pointPosAttribute.array[idxA + 2];
      
      linePosAttribute.array[lineIdx + 3] = pointPosAttribute.array[idxB];
      linePosAttribute.array[lineIdx + 4] = pointPosAttribute.array[idxB + 1];
      linePosAttribute.array[lineIdx + 5] = pointPosAttribute.array[idxB + 2];
    }
    linePosAttribute.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        {/* Beautiful, subtle cyan/sky nodes representing agents */}
        <pointsMaterial 
          size={0.15} 
          color="#38bdf8" 
          transparent 
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
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
