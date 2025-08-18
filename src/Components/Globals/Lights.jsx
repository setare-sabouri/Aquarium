import { Environment } from '@react-three/drei'
import React from 'react'
import * as THREE from "three"

const Lights = () => {
  return (
    <>
      {/* Soft overall light */}
      <ambientLight intensity={0.4} color={"#88ccee"} />

      {/* A couple of dim colored point lights to mimic caustics */}
      <pointLight position={[5, 5, 5]} intensity={1.2} color={"#66aaff"} distance={15} decay={2} />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color={"#44ffee"} distance={12} decay={2} />

      {/* Subtle directional to simulate “sunlight” filtering down */}
      <directionalLight
        castShadow
        position={[2, 6, 5]}
        intensity={0.6}
        color={"#aaddff"}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Environment map for subtle reflections */}
      <Environment preset="sunset" />

      {/* Fog for depth – feels underwater */}
      <fog attach="fog" args={["#0d1b2a", 5, 40]} />
    </>
  )
}

export default Lights
