import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useLevaControls } from '../Globals/LevaControls';

const Tunnel = ({ length }) => {
  const{TunnelMaterials} =useLevaControls();
  const TunnelRef = useRef();
  
  // Load normal map
  const normalMap = new THREE.TextureLoader().load('./textures/water/4141-normal.jpg');
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(TunnelMaterials.repeatX, TunnelMaterials.repeatY);

  useFrame(({ clock }) => {
    if (TunnelRef.current) {
      // Different speeds on X/Y to get a wavy feel
      normalMap.offset.x = clock.elapsedTime * TunnelMaterials.speed * 0.2;
      normalMap.offset.y = clock.elapsedTime * TunnelMaterials.speed * 0.6;
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
      <mesh ref={TunnelRef} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <cylinderGeometry args={[10, 10, length * 2, 40, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          side={THREE.BackSide}
          color={TunnelMaterials.color}
          transparent
          opacity={TunnelMaterials.opacity}
          roughness={TunnelMaterials.roughness}
          metalness={TunnelMaterials.metalness}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(TunnelMaterials.normalScale, TunnelMaterials.normalScale)}
        />

      </mesh>
    </RigidBody>
  );
};

export default Tunnel;
