import { useAnimations, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'

const MovingCreature = ({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  speed = 0.05,
  turnSpeed = 5,
  zRange = [-180, -20], 
}) => {
  const gltf = useGLTF(modelPath)
  const groupRef = useRef()
  const rigidRef = useRef()
  const { actions, names } = useAnimations(gltf.animations, groupRef)
    const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  
  const [direction, setDirection] = useState(1)
  const [targetRotation, setTargetRotation] = useState(0)

  useEffect(() => {
    if (actions[names[0]]) {
      actions[names[0]].reset().play()
    }
  }, [actions, names])

  useFrame((_, delta) => {
    if (!rigidRef.current || !groupRef.current) return
    const t = rigidRef.current.translation()

    // Flip direction and set target rotation
    if (t.z <= zRange[0] && direction === 1) {
      setDirection(-1)
      setTargetRotation(Math.PI)
    }
    if (t.z >= zRange[1] && direction === -1) {
      setDirection(1)
      setTargetRotation(0)
    }

    // Move along Z
    rigidRef.current.setTranslation(
      { x: t.x, y: t.y, z: t.z + speed * delta * 60 * direction * -1 },
      true
    )

    // Smoothly rotate towards target
    const currentY = groupRef.current.rotation.y
    const diff = targetRotation - currentY
    groupRef.current.rotation.y =
      currentY + diff * Math.min(turnSpeed * delta, 1)
  })

  return (
    <RigidBody
      ref={rigidRef}
      type="kinematicPosition"
      colliders="cuboid"
      position={position}
      rotation={rotation}
    >
      <primitive object={clonedScene} scale={scale} ref={groupRef} />
    </RigidBody>
  )
}

export default MovingCreature