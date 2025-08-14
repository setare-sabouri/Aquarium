import { RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Tunnel = ({ length }) => {
  const meshRef = useRef();

  // Load normal map
  const normalMap = new THREE.TextureLoader().load('./images/4141-normal.jpg');
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(5, 20); // repeat along width (circumference) and height

  useFrame(({ clock }) => {
    if (meshRef.current) {
      normalMap.offset.x = clock.elapsedTime * 0.05;
      normalMap.offset.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <RigidBody
      position={[0, 0, -length]}
      colliders="trimesh"
      type="fixed"
      restitution={0.2}
      friction={1}
    >
      <mesh
        ref={meshRef}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      >
        {/* Increased heightSegments to 64 for better normal mapping */}
        <cylinderGeometry
          args={[10, 10, length*2, 64, 64, false, 0, Math.PI]}
        />
        <meshStandardMaterial
          side={THREE.BackSide}
          color="#1b4d6b"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
          normalMap={normalMap}
        />
      </mesh>
    </RigidBody>
  );
};

export default Tunnel;
