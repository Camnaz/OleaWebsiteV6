"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function AgentNetwork() {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const scroll = useScroll();
  const { mouse, viewport } = useThree();
  
  // Algorithm: Golden spiral on a sphere (Fibonacci lattice)
  // Represents ordered, harmonious agent distribution
  const { positions, originalPositions, lines } = useMemo(() => {
    const nodeCount = 300;
    const positions = new Float32Array(nodeCount * 3);
    const originalPositions = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];
    
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      // Scale up the sphere
      const scale = 4;
      const v = new THREE.Vector3(x * scale, y * scale, z * scale);
      
      nodes.push(v);
      v.toArray(positions, i * 3);
      v.toArray(originalPositions, i * 3);
    }

    // Connect nodes based on proximity (creating an organized mesh)
    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist > 0 && dist < 1.5) {
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
    
    // Harmonic overall rotation
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    group.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    
    // Zoom and position effects based on scroll
    // Start zoomed out, zoom in as we scroll, then pan
    const targetZ = scrollOffset < 0.3 
      ? THREE.MathUtils.lerp(0, 5, scrollOffset / 0.3) 
      : THREE.MathUtils.lerp(5, -2, (scrollOffset - 0.3) / 0.7);
      
    const targetY = scrollOffset < 0.3 
      ? 0 
      : THREE.MathUtils.lerp(0, 3, (scrollOffset - 0.3) / 0.7);
      
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);

    // Mouse interaction - "repel" or "attract" nodes based on mouse position
    // Convert mouse to world coordinates roughly
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    const posAttribute = pointsRef.current.geometry.attributes.position;
    
    // We'll update the points, and we need to rebuild lines if we want them to follow exactly,
    // but for performance, we apply a subtle wave to the points that the lines follow loosely
    // In a highly optimized version, we'd use shaders. Here we use CPU math for control.
    
    for (let i = 0; i < posAttribute.count; i++) {
      const idx = i * 3;
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];
      
      // Complex algorithmic motion: 
      // 1. Base breathing (sine waves based on original position)
      // 2. Scroll-based expansion/contraction
      // 3. Mouse proximity effect
      
      const breathScale = 1 + Math.sin(t * 0.5 + origY * 2) * 0.05;
      const scrollScale = 1 + scrollOffset * 0.5;
      
      // Calculate world position of this node for mouse interaction
      const nodeWorldPos = new THREE.Vector3(origX, origY, origZ);
      nodeWorldPos.applyMatrix4(group.current.matrixWorld);
      
      // Vector from mouse to node
      const distToMouse = Math.sqrt(
        Math.pow(nodeWorldPos.x - mouseX, 2) + 
        Math.pow(nodeWorldPos.y - mouseY, 2)
      );
      
      // Mouse push effect (nodes move away from mouse)
      let mousePushX = 0;
      let mousePushY = 0;
      let mousePushZ = 0;
      
      if (distToMouse < 4) {
        const force = (4 - distToMouse) * 0.5;
        const dirX = nodeWorldPos.x - mouseX;
        const dirY = nodeWorldPos.y - mouseY;
        // Normalize roughly
        const len = Math.sqrt(dirX*dirX + dirY*dirY) || 1;
        mousePushX = (dirX / len) * force;
        mousePushY = (dirY / len) * force;
        mousePushZ = force * 0.5; // Push outwards towards camera too
      }
      
      // Transform original positions back to local space after mouse push
      const finalX = origX * breathScale * scrollScale + mousePushX;
      const finalY = origY * breathScale * scrollScale + mousePushY;
      const finalZ = origZ * breathScale * scrollScale + mousePushZ;

      // Smooth interpolation to target
      posAttribute.array[idx] += (finalX - posAttribute.array[idx]) * 0.1;
      posAttribute.array[idx + 1] += (finalY - posAttribute.array[idx + 1]) * 0.1;
      posAttribute.array[idx + 2] += (finalZ - posAttribute.array[idx + 2]) * 0.1;
    }
    
    posAttribute.needsUpdate = true;
    
    // For lines, we just rotate the whole mesh and apply a global scale to match the points roughly
    // Recalculating all line segments every frame is too heavy.
    const globalScale = 1 + scrollOffset * 0.5;
    linesRef.current.scale.set(globalScale, globalScale, globalScale);
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
        <pointsMaterial 
          size={0.08} 
          color="#000000" 
          transparent 
          opacity={0.8}
          sizeAttenuation={true}
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
        <lineBasicMaterial 
          color="#9ca3af" 
          transparent 
          opacity={0.15} 
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
