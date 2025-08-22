import { useGLTF, useAnimations } from '@react-three/drei'
import { CapsuleCollider, CuboidCollider, CylinderCollider } from '@react-three/rapier';
import { useEffect, useRef } from 'react'

const Shark = () => {
  const Shark = useGLTF("./models/shark.glb")
  const groupRef = useRef();
  const { actions, names } = useAnimations(Shark.animations, groupRef);
  console.log(Shark)
  useEffect(() => {
    if (actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  return (
    <group ref={groupRef}>
      <CapsuleCollider args={[1.8, 1.5]} rotation={[Math.PI/2,0,0]} position={[0,-0.5,-1.2]}/>
      <primitive object={Shark.scene} scale={2}
      />
    </group>


  )
}

export default Shark
