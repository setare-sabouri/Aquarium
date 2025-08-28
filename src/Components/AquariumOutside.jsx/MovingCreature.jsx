import { useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCloneScene } from '../../Utils/Scene'

const MovingCreature = ({
  modelGltf,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  speed = 0.05,
  turnSpeed = 5,
  zRange = [-180, -20],
}) => {
  const groupRef = useRef()
  const directionRef = useRef(1) 
  const targetRotationRef = useRef([rotation[1], rotation[2]])

  // Model animation
  const { actions, names } = useAnimations(modelGltf.animations, groupRef)
  useEffect(() => {
    if (actions[names[0]]) {
      actions[names[0]].reset().play()
    }
  }, [actions, names])


  // Flip direction and set target rotation when needed
  useFrame((_, delta) => {
    if (!groupRef.current) return
    const t = groupRef.current.position

    if (t.z <= zRange[0] && directionRef.current === 1) {
      directionRef.current = -1
      targetRotationRef.current = [Math.PI, -rotation[2]]
    }
    if (t.z >= zRange[1] && directionRef.current === -1) {
      directionRef.current = 1
      targetRotationRef.current = [0, rotation[2]]
    }

    // Move along Z
    t.z += speed * delta * 60 * directionRef.current * -1

    // Smoothly rotate towards target rotation
    const [targetY, targetZ] = targetRotationRef.current
    const currentY = groupRef.current.rotation.y
    const currentZ = groupRef.current.rotation.z

    groupRef.current.rotation.y += (targetY - currentY) * Math.min(turnSpeed * delta, 1)
    groupRef.current.rotation.z += (targetZ - currentZ) * Math.min(turnSpeed * delta, 1)
  })


  const clonedScene = useCloneScene(modelGltf)
  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={clonedScene} />
    </group>
  )
}

export default MovingCreature


//checked