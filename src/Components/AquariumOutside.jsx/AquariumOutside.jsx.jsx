import { useGLTF } from '@react-three/drei';
import Fishes from './fishes';
import MovingCreature from './MovingCreature';


const AquariumOutside = () => {
  const fishGltf = useGLTF("./models/fishes.glb");
  const TurtleGltf= useGLTF("./models/turtle.glb")
  const SharkeGltf= useGLTF("./models/shark.glb")


  const fishPositions = [
    [20, 1, -40],
    [-14, 10, -70],
    [-22, 1, -150],
    [20, 1, -170]
  ];

  return (
    <>
      {fishPositions.map((pos, index) => (
        <Fishes
          key={index}
          fishGltf={fishGltf}
          animations={fishGltf.animations}
          position={pos}
          scale={5}
        />
      ))}

      <MovingCreature
        modelGltf={TurtleGltf}
        position={[12, 4, -100]}
        rotation={[0, Math.PI, Math.PI/4]}
        scale={2}
        speed={0.02}
        turnSpeed={5}
        zRange={[-180, -20]}
      />

      <MovingCreature
        modelGltf={SharkeGltf}
        position={[-13.5, 2, -10]}
        rotation={[0, Math.PI, -Math.PI/3]}
        scale={3}
        speed={0.09}
        turnSpeed={5}
        zRange={[-180, -20]}
      />
    </>
  );
};

export default AquariumOutside;
