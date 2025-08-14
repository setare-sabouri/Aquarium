import React from 'react'
import { Physics } from '@react-three/rapier'
import TextGlobal from '../Globals/TextGlobal'
import Lights from '../Globals/Lights'
import Player from './Player/Player'
import AquariumInside from './AquariumInside/AquariumInside'
import AquariumOutside from './AquariumOutside.jsx/AquariumOutside.jsx'
import ThirdPersonCamera from '../Globals/ThirdPersonCamera.jsx'
import './Experience.module.scss'
import * as THREE from 'three';
const Experience = () => {
  const playerRef = React.useRef();
  return (
    <Physics >
      <Lights />
      <AquariumInside />
      <AquariumOutside />
      <TextGlobal text={"Aquarium"} size={1} position={[-2, 18, 0]} />
      <Player ref={playerRef} />
      {/* <ThirdPersonCamera playerRef={playerRef} offset={new THREE.Vector3(0, 5, 10)} /> */}
    </Physics>

  )
}

export default Experience
