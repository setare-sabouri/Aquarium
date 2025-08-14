import React from 'react'
import { Physics } from '@react-three/rapier'
import TextGlobal from './Globals/TextGlobal.jsx'
import Lights from './Globals/Lights.jsx'
import Player from './Player/Player'
import AquariumInside from './AquariumInside/AquariumInside'
import AquariumOutside from './AquariumOutside.jsx/AquariumOutside.jsx'
import ThirdPersonCamera from './Globals/ThirdPersonCamera.jsx'
import './Experience.module.scss'
import * as THREE from 'three';
const Experience = () => {
  const playerRef = React.useRef();
  return (
    <Physics >
      <Lights />
      <AquariumInside />
      <AquariumOutside />
      <Player ref={playerRef} />
      <ThirdPersonCamera playerRef={playerRef} offset={new THREE.Vector3(0, 2, 10)} />
    </Physics>

  )
}

export default Experience
