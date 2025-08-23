import { useGLTF, useAnimations } from '@react-three/drei'
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react'

const Shark = ({playerRef}) => {
  const Shark = useGLTF("./models/shark.glb")
  const groupRef = useRef();
  const { actions, names } = useAnimations(Shark.animations, groupRef);

  useEffect(() => {
    if (actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  return (
      <RigidBody
        ref={playerRef}
        position={[0, 3, -10]}
        rotation={[0, Math.PI, 0]}
        gravityScale={0.2}
        linearDamping={4}
        angularDamping={1}  // prevents spinning
        colliders={false}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[1.8, 1.5]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, -1.2]} />
        <primitive object={Shark.scene} scale={2} ref={groupRef} />
      </RigidBody>

  )
}

export default Shark
