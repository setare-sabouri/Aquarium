// Diver.js
import { useGLTF, useAnimations } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

const Diver = React.memo(({ playerRef, targetRotationY }) => {
  const { scene, animations } = useGLTF("./models/diver.glb");
  const groupRef = useRef();
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions?.[names[0]]) actions[names[0]].play();
  }, [actions, names]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const currentY = groupRef.current.rotation.y;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetRotationY.current, 5 * delta);
  });

  return (
    <RigidBody
      ref={playerRef}
      position={[0, 3, -10]}
      rotation={[-Math.PI / 7, Math.PI, 0]}
      gravityScale={0.2}
      linearDamping={4}
      angularDamping={1}
      colliders={false}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[1.1, 1.1]} position={[0, 1.4, 0]} />
      <primitive object={scene} scale={0.5} ref={groupRef} />
    </RigidBody>
  );
});

export default Diver;
