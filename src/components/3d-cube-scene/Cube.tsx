import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMotionValue, useSpring, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { AnimationAction, Group, MathUtils } from 'three';

const Cube = () => {
  const motionVal = useMotionValue<number>(0);
  const spring = useSpring(motionVal, { stiffness: 20 });
  const group = useRef<Group>(null);
  const { animations, scene } = useGLTF('/3d-cube-explosion.glb');
  const { actions } = useAnimations(animations, scene);
  useFrame(() => {
    group.current?.rotateY(MathUtils.degToRad(0.2));
    Object.keys(actions).forEach((key) => {
      const action = actions[key] as AnimationAction;
      action.play().paused = true;
      action.time = spring.get();
    });
  });
  useEffect(() => {
    const controls = animate(0, 3, {
      duration: 2.5,
      onUpdate: (val) => motionVal.set(val),
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [motionVal]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
};
export default Cube;
