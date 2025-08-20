import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

const Shark = () => {
  const Shark = useGLTF("./models/shark.glb")
  const groupRef = useRef();

  const { actions, names } = useAnimations(Shark.animations, groupRef);

  useEffect(() => {
    console.log("Available animations:", names);
    if (actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  return (
    <primitive
      object={Shark.scene}
      ref={groupRef}
    />

  )
}

export default Shark
