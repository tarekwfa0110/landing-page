
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField({ count = 5000 }) {
  const points = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    const distance = 50;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;
    }
    
    return positions;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.05;
    if (points.current) {
      points.current.rotation.set(Math.sin(t) * 0.2, Math.cos(t) * 0.2, 0);
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

function FloatingCube() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 4);
      mesh.current.rotation.y = Math.sin(t / 2);
      mesh.current.position.y = Math.sin(t / 1.5) * 0.5;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2563eb" />
    </mesh>
  );
}

function FloatingTorus() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.cos(t / 4) * 2;
      mesh.current.rotation.y = Math.sin(t / 1.5) * 2;
      mesh.current.position.x = Math.sin(t / 2) * 2;
    }
  });

  return (
    <mesh ref={mesh} position={[2, 0, 0]}>
      <torusGeometry args={[0.7, 0.2, 16, 100]} />
      <meshStandardMaterial color="#7c3aed" />
    </mesh>
  );
}

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.position.y = Math.cos(t) * 1.5;
      mesh.current.position.x = Math.sin(t) * 1.5;
    }
  });

  return (
    <mesh ref={mesh} position={[-2, 0, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#10b981" />
    </mesh>
  );
}

export function ShowcaseHero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <StarField />
        <group position={[0, 0, 0]}>
          <FloatingCube />
          <FloatingTorus />
          <FloatingSphere />
        </group>
      </Canvas>
    </div>
  );
}
