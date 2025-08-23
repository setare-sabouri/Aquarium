import { useAnimations, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'

const Fishes = ({ position }) => {
  const fishes = useGLTF("./models/fishes.glb")
  // Clone the scene to allow multiple independent instances
  const clonedScene = useMemo(() => SkeletonUtils.clone(fishes.scene), [fishes.scene])

  const groupRef = useRef()
  const { actions, names } = useAnimations(fishes.animations, groupRef)

  useEffect(() => {
    if (actions[names[0]]) {
      actions[names[0]].play()
    }
  }, [actions, names])

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position}>
      <primitive object={clonedScene} scale={5} ref={groupRef} />
    </RigidBody>
  )
}

export default Fishes
