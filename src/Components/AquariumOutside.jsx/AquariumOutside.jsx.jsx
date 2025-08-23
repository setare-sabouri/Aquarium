import { useGLTF } from '@react-three/drei'
import Fishes from './fishes'
import MovingCreature from './MovingCreature'

const AquariumOutside = () => {
  const fish = useGLTF("./models/fishes.glb")

  return (
    <>
      <Fishes scene={fish.scene} animations={fish.animations} position={[20, 1, -40]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[-11, 10, -70]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[-22, 1, -150]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[20, 1, -200]} />
      <MovingCreature
        modelPath="./models/Turtle.glb"
        position={[12, 4, -100]}
        rotation={[0, Math.PI, Math.PI/4]}
        scale={2}
        speed={0.02}
        turnSpeed={5}
        zRange={[-180, -20]}
      />
        <MovingCreature
        modelPath="./models/shark.glb"
        position={[-13.5, 2, -10]}
        rotation={[0, Math.PI, -Math.PI/3]}
        scale={3}
        speed={0.09}
        turnSpeed={5}
        zRange={[-180, -20]}
      />
    </>
  )
}

export default AquariumOutside
