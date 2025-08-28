import { useGLTF } from '@react-three/drei';
import MovingCreature from './MovingCreature';

import { useMemo } from 'react';

const AquariumOutside = () => {
  const fishGltf = useGLTF("./models/fishes.glb");
  const turtleGltf = useGLTF("./models/turtle.glb");
  const sharkGltf = useGLTF("./models/shark.glb");


  // small fishes positions - crew based
  const fishPositions = useMemo(
    () => [
      [20, 1, -40],
      [-14, 10, -70],
      [-22, 1, -150],
      [20, 1, -170],
      [5,13.2,-100]
    ],
    []
  );

  return (
    <>
      {fishPositions.map((pos, index) => (
        <MovingCreature
        key={index}
        modelGltf={fishGltf}
        position={pos}
        rotation={[0, 0, 0]}
        scale={5}
        speed={0.001}
        turnSpeed={4}
        zRange={[-180, -40]}
        />
      ))}

      <MovingCreature
        modelGltf={turtleGltf}
        position={[12, 5, -170]}
        rotation={[Math.PI, 0, Math.PI ]}
        scale={2}
        speed={0.09}
        turnSpeed={4}
        zRange={[-180, -40]}
      />

      <MovingCreature
        modelGltf={sharkGltf}
        position={[-13.5, 2, -10]}
        rotation={[Math.PI, 0, Math.PI /2]}
        scale={3}
        speed={0.1}
        turnSpeed={5}
        zRange={[-180, -20]}
      />

    </>
  );
};


export default AquariumOutside;

//checked