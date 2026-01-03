import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;
const IS_TABLET =
  typeof window !== 'undefined' &&
  window.innerWidth >= 768 &&
  window.innerWidth < 1024;

const AppName = () => {
  const { scene } = useGLTF('/rhymetime-text.glb');
  const textRef = useRef<THREE.Group>(null);
  const startTime = useRef<number>(0);
  const opacity = useRef<number>(0);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = 0;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

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
      scale={
        IS_MOBILE ? [0.5, 0.5, 0.5] : IS_TABLET ? [0.75, 0.75, 0.75] : [1, 1, 1]
      }
    >
      <primitive object={scene} />
    </group>
  );
};

export default AppName;
