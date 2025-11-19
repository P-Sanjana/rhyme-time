import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
const AppName = () => {
  const { scene } = useGLTF('/rhymetime-text.glb');
  const textRef = useRef<THREE.Group>(null);
  const startTime = useRef<number>(0);
  const opacity = useRef<number>(0);

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      child.material.transparent = true;
      child.material.opacity = 0;
      child.material.needsUpdate = true;
    }
  });

  useEffect(() => {
    startTime.current = performance.now();
  }, []);

  useFrame(() => {
    const elapsed = performance.now() - startTime.current;
    if (elapsed > 2500 && opacity.current < 1) {
      opacity.current = Math.min(1, opacity.current + 0.02);
      textRef.current?.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = opacity.current;
          child.material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group
      ref={textRef}
      position={[0, 1, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 1, 1]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default AppName;
