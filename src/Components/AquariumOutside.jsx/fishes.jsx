import { useAnimations } from '@react-three/drei';
import { useEffect, useRef, memo } from 'react';
import { useCloneScene } from '../../Utils/Scene';

const Fishes = ({ fishGltf, animations = [], position = [0, 0, 0], scale = 5 }) => {
  const groupRef = useRef();
  const { actions, names } = useAnimations(animations, groupRef);
  const clonedScene = useCloneScene(fishGltf);

  useEffect(() => {
    names.forEach(name => actions[name]?.play());
  }, [actions, names]);
  
  return <primitive object={clonedScene} ref={groupRef} scale={scale} position={position} />;
};

export default memo(Fishes);
