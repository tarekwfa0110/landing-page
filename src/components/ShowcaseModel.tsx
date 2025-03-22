
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, PresentationControls } from '@react-three/drei';
import { Group } from 'three';

type ModelProps = {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

function Model({ modelPath, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<Group>(null);
  
  // Fallback 3D object when no model is provided
  if (!modelPath) {
    // Create rotating cube
    useFrame((state) => {
      if (group.current) {
        group.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      }
    });

    return (
      <group ref={group} position={position} rotation={rotation} scale={scale}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </group>
    );
  }

  // If a model path is provided, use it
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export function ShowcaseModel({ modelPath = "" }: { modelPath?: string }) {
  return (
    <div className="h-[400px] w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#111827']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <Float rotationIntensity={0.4}>
            <Model 
              modelPath={modelPath} 
              position={[0, -1, 0]} 
              scale={1.5}
            />
          </Float>
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Preload models
useGLTF.preload('/models/scene.gltf');
