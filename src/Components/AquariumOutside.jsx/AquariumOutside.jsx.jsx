import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import Fishes from './fishes';
import MovingCreature from './MovingCreature';

const AquariumOutside = () => {
  const fish = useGLTF("./models/fishes.glb");

  const fishPositions = useMemo(() => [
    [20, 1, -40],
    [-11, 10, -70],
    [-22, 1, -150],
    [20, 1, -200]
  ], []);

  const movingCreatures = useMemo(() => [
    {
      modelPath: "./models/Turtle.glb",
      position: [12, 4, -100],
      rotation: [0, Math.PI, Math.PI / 4],
      scale: 2,
      speed: 0.02,
      turnSpeed: 5,
      zRange: [-180, -20]
    },
    {
      modelPath: "./models/shark.glb",
      position: [-13.5, 2, -10],
      rotation: [0, Math.PI, -Math.PI / 3],
      scale: 3,
      speed: 0.09,
      turnSpeed: 5,
      zRange: [-180, -20]
    }
  ], []);

  return (
    <>
      {fishPositions.map((pos, i) => (
        <Fishes key={i} scene={fish.scene} animations={fish.animations} position={pos} />
      ))}

      {movingCreatures.map((creature, i) => (
        <MovingCreature key={i} {...creature} />
      ))}
    </>
  );
};

export default AquariumOutside;
