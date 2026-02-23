"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function AgentNetwork() {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const scroll = useScroll();
  const { mouse, viewport } = useThree();
  
  // Algorithm: A structured, calm 3D grid representing an organized computational matrix of agents
  const { positions, originalPositions, lines } = useMemo(() => {
    const size = 8; // 8x8x8 grid = 512 nodes
    const spacing = 1.2;
    const offset = (size * spacing) / 2 - (spacing / 2);
    
    const positions = new Float32Array(size * size * size * 3);
    const originalPositions = new Float32Array(size * size * size * 3);
    const nodes: THREE.Vector3[] = [];
    
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const px = x * spacing - offset;
          const py = y * spacing - offset;
          const pz = z * spacing - offset;
          
          const v = new THREE.Vector3(px, py, pz);
          nodes.push(v);
          
          v.toArray(positions, idx * 3);
          v.toArray(originalPositions, idx * 3);
          idx++;
        }
      }
    }

    // Connect adjacent nodes to form the matrix structure
    const lines: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        // Only connect immediate orthogonal neighbors (distance exactly equal to spacing)
        // Add a tiny epsilon for float comparison
        if (Math.abs(dist - spacing) < 0.01) {
          lines.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    
    return { 
      positions,
      originalPositions,
      lines: new Float32Array(lines) 
    };
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !pointsRef.current || !linesRef.current) return;
    
    const t = state.clock.elapsedTime;
    const scrollOffset = scroll.offset; // 0 to 1
    
    // Very slow, calm, majestic rotation
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    
    // Zoom out effect based on scroll (start inside the matrix, zoom out to see the whole structure)
    const targetZ = scrollOffset < 0.5 
      ? THREE.MathUtils.lerp(2, -15, scrollOffset * 2) 
      : THREE.MathUtils.lerp(-15, -20, (scrollOffset - 0.5) * 2);
      
    // Pan slightly up as we scroll down
    const targetY = scrollOffset * 5;
      
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);

    // Mouse interaction - precise, subtle displacement
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    const posAttribute = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < posAttribute.count; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];
      
      // Calculate world position for mouse interaction
      const nodeWorldPos = new THREE.Vector3(origX, origY, origZ);
      nodeWorldPos.applyMatrix4(group.current.matrixWorld);
      
      const distToMouse = Math.sqrt(
        Math.pow(nodeWorldPos.x - mouseX, 2) + 
        Math.pow(nodeWorldPos.y - mouseY, 2)
      );
      
      // Subtle magnetic repulsion
      let mousePushX = 0;
      let mousePushY = 0;
      let mousePushZ = 0;
      
      if (distToMouse < 3) {
        const force = (3 - distToMouse) * 0.3;
        const dirX = nodeWorldPos.x - mouseX;
        const dirY = nodeWorldPos.y - mouseY;
        const len = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
        mousePushX = (dirX / len) * force;
        mousePushY = (dirY / len) * force;
        mousePushZ = force * 0.2; 
      }
      
      // Add a very subtle, slow sine wave based on position to make it feel "alive" but calm
      const wave = Math.sin(t * 0.5 + origX * 0.5 + origZ * 0.5) * 0.05;
      
      const finalX = origX + mousePushX;
      const finalY = origY + mousePushY + wave;
      const finalZ = origZ + mousePushZ;

      posAttribute.array[idx] += (finalX - posAttribute.array[idx]) * 0.05;
      posAttribute.array[idx + 1] += (finalY - posAttribute.array[idx + 1]) * 0.05;
      posAttribute.array[idx + 2] += (finalZ - posAttribute.array[idx + 2]) * 0.05;
    }
    
    posAttribute.needsUpdate = true;
    
    // Rotate the lines to match the group, but we don't deform the lines per-vertex 
    // to maintain performance and keep the structural "ghost" intact behind the moving nodes
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
        {/* Sick, high-value aesthetic for the nodes (bright cyan/blue indicating active agents) */}
        <pointsMaterial 
          size={0.15} 
          color="#00f0ff" 
          transparent 
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
            args={[lines, 3]}
          />
        </bufferGeometry>
        {/* Subtle, dark skeletal structure */}
        <lineBasicMaterial 
          color="#1f2937" 
          transparent 
          opacity={0.4} 
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
