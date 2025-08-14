import { Environment, useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from "three"

const Lights = () => {
    const DirectionalLight = useRef()
    useHelper(DirectionalLight,THREE.DirectionalLightHelper,3)
    return (
        <>
            {/* <ambientLight  intensity={0.5} /> */}
            <Environment preset='park'/>
            {/* <directionalLight castShadow ref={DirectionalLight} position={[2, 2, 5]} intensity={10} lookAt={[5,5,5]}/> */}
        </>
    )
}

export default Lights
