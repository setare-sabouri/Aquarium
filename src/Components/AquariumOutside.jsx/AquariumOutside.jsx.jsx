import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import Fishes from './fishes'
import Turtle from './Turtle'

const AquariumOutside = () => {
  const fish = useGLTF("./models/fishes.glb")
  
  return (
    <>
      <Fishes scene={fish.scene} animations={fish.animations} position={[20, 1, -40]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[-11, 10, -70]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[-20, 1, -150]} />
      <Fishes scene={fish.scene} animations={fish.animations} position={[20, 1, -200]} />
      <Turtle position={[12,4,-20]} rotation={[0,Math.PI,Math.PI/4]}/>

    </>
  )
}

export default AquariumOutside
  