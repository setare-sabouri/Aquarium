import React from 'react';
import * as THREE from 'three';
import { Physics } from '@react-three/rapier';
import Lights from './Globals/Lights.jsx';
import Player from './Player/Player';
import AquariumInside from './AquariumInside/AquariumInside';
import AquariumOutside from './AquariumOutside.jsx/AquariumOutside.jsx';
import ThirdPersonCamera from './Globals/ThirdPersonCamera.jsx';

const Experience = ({ playerRef }) => {
  return (
    <Physics>
      <Lights />
      <AquariumInside />
      <AquariumOutside />
      <Player ref={playerRef} />
      <ThirdPersonCamera playerRef={playerRef} offset={new THREE.Vector3(0, 3, 10)} />
    </Physics>
  );
};

export default Experience;
