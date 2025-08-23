import { useAnimations } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import { SkeletonUtils } from 'three-stdlib'

const Fishes = ({ scene, animations, position }) => {
  const groupRef = useRef()
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, names } = useAnimations(animations, groupRef)

  useEffect(() => {
    if (actions[names[0]]) actions[names[0]].play()
  }, [actions, names])

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position}>
      <primitive object={clonedScene} ref={groupRef} scale={5} />
    </RigidBody>
  )
}

export default Fishes
