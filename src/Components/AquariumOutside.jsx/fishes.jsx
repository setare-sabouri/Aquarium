import { useAnimations } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import React from 'react';

const Fishes = ({ scene, animations = [], position = [0, 0, 0], scale = 5, usePhysics = true }) => {
  const groupRef = useRef();

  // Clone scene only once
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions?.[names[0]]) actions[names[0]].play();
  }, [actions, names]);

  if (usePhysics) {
    return (
      <RigidBody type="fixed" colliders="trimesh" position={position}>
        <primitive object={clonedScene} ref={groupRef} scale={scale} />
      </RigidBody>
    );
  }

  return <primitive object={clonedScene} ref={groupRef} scale={scale} position={position} />;
};

// Prevent unnecessary re-renders
export default React.memo(Fishes);
