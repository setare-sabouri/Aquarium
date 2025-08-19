import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useLevaControls } from '../Globals/LevaControls';

const Tunnel = ({ length }) => {
  const { wireframe, opacity, roughness, metalness, color, speed, normalScale, repeatX, repeatY } = useLevaControls();
  const meshRef = useRef();
  
  // Load normal map
  const normalMap = new THREE.TextureLoader().load('./images/4141-normal.jpg');
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatX, repeatY);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Different speeds on X/Y to get a wavy feel
      normalMap.offset.x = clock.elapsedTime * speed * 0.2;
      normalMap.offset.y = clock.elapsedTime * speed * 0.6;
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
      <mesh ref={meshRef} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <cylinderGeometry args={[10, 10, length * 2, 40, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          wireframe={wireframe}
          side={THREE.BackSide}
          color={color}
          transparent
          opacity={opacity}
          roughness={roughness}
          metalness={metalness}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(normalScale, normalScale)}
        />

      </mesh>
    </RigidBody>
  );
};

export default Tunnel;
