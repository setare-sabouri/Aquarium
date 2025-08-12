import { useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from "three"

const Lights = () => {
    const DirectionalLight = useRef()
    useHelper(DirectionalLight,THREE.DirectionalLightHelper,3)
    return (
        <>
            <ambientLight  intensity={0.5} />
            <directionalLight castShadow ref={DirectionalLight} position={[2, 3, 5]} intensity={1} />
        </>
    )
}

export default Lights
