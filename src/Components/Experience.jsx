import React from 'react'
import * as THREE from 'three';
import { Physics } from '@react-three/rapier'
import Lights from './Globals/Lights.jsx'
import Player from './Player/Player'
import AquariumInside from './AquariumInside/AquariumInside'
import AquariumOutside from './AquariumOutside.jsx/AquariumOutside.jsx'
import ThirdPersonCamera from './Globals/ThirdPersonCamera.jsx'


const Experience = () => {
  const playerRef = React.useRef();
  return (
    <Physics debug >
      <Lights />
      <AquariumInside />
      <AquariumOutside />
      <Player ref={playerRef} />
      <ThirdPersonCamera playerRef={playerRef} offset={new THREE.Vector3(0, 4, 18)} length={100} />
    </Physics>

  )
}

export default Experience
