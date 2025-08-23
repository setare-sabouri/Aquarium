import { useAnimations, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'

const Fishes = ({position}) => {
    const fishes = useGLTF("./models/fishes.glb")
    console.log(fishes)
    const groupRef = useRef();
    const { actions, names } = useAnimations(fishes.animations, groupRef);
    useEffect(() => {
        if (actions[names[0]]) {
            actions[names[0]].play();
        }
    }, [actions, names]);

    return (
        <RigidBody type='fixed' colliders="trimesh" position={position}>
            <primitive object={fishes.scene} scale={5} ref={groupRef}/>
        </RigidBody>
    )
}

export default Fishes
