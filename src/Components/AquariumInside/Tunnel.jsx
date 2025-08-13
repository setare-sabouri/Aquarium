import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';

const Tunnel = () => {
  return (
    <RigidBody
      colliders="trimesh"
      type="fixed"
      restitution={0.2}
      friction={1}
    >
      <mesh
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        {/* radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength */}
        <cylinderGeometry
          args={[10, 10, 50, 64, 1, false, 0, Math.PI]}
        />
        <meshStandardMaterial
          side={THREE.BackSide}
          color="#1b4d6b"
          transparent
          opacity={0.3}
        />
      </mesh>
    </RigidBody>
  );
};

export default Tunnel;
