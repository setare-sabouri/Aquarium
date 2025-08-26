import { useAnimations } from '@react-three/drei';
import { useEffect, useRef, memo } from 'react';

const Fishes = ({ baseScene, animations = [], position = [0, 0, 0], scale = 5 }) => {
  const groupRef = useRef();

  // Clone the scene on-demand (cheap because we use a prepared base clone)
  const instance = baseScene ? baseScene.clone(true) : null;

  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    names.forEach((name) => actions[name]?.play());
  }, [actions, names]);

  return instance ? (
    <primitive object={instance} ref={groupRef} position={position} scale={scale} />
  ) : null;
};

export default memo(Fishes);
