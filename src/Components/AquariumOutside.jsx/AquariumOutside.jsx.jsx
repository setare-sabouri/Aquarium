import { useGLTF } from '@react-three/drei';
import Fishes from './fishes';
import MovingCreature from './MovingCreature';
import { useCloneScene } from '../../Utils/Scene';
import { useMemo } from 'react';

const AquariumOutside = () => {
  const fishGltf = useGLTF("./models/fishes.glb");
  const turtleGltf = useGLTF("./models/turtle.glb");
  const sharkGltf = useGLTF("./models/shark.glb");

  // Clone the fish scene only once
  const baseFishScene = useCloneScene(fishGltf);

  // Memoize fish positions
  const fishPositions = useMemo(
    () => [
      [20, 1, -40],
      [-14, 10, -70],
      [-22, 1, -150],
      [20, 1, -170]
    ],
    []
  );

  return (
    <>
      {fishPositions.map((pos, index) => (
        <Fishes
          key={index}
          baseScene={baseFishScene}
          animations={fishGltf.animations}
          position={pos}
          scale={5}
        />
      ))}

      <MovingCreature
        modelGltf={turtleGltf}
        position={[12, 4, -100]}
        rotation={[0, Math.PI, Math.PI / 4]}
        scale={2}
        speed={0.02}
        turnSpeed={5}
        zRange={[-180, -20]}
      />

      <MovingCreature
        modelGltf={sharkGltf}
        position={[-13.5, 2, -10]}
        rotation={[0, Math.PI, -Math.PI / 3]}
        scale={3}
        speed={0.09}
        turnSpeed={5}
        zRange={[-180, -20]}
      />
    </>
  );
};

useGLTF.preload("./models/fishes.glb");
useGLTF.preload("./models/turtle.glb");
useGLTF.preload("./models/shark.glb");

export default AquariumOutside;
