import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useLevaControls } from '../Globals/LevaControls';

const Tunnel = ({ length }) => {
  const { TunnelMaterials } = useLevaControls();
  const TunnelRef = useRef();

  // Load textures using useLoader
  const [colorMap, dispMap, normalMap, occMap, specMap] = useLoader(THREE.TextureLoader, [
    './textures/Water/color.jpg',
    './textures/Water/DISP.png',
    './textures/Water/NOR.jpg',
    './textures/Water/OCC.jpg',
    './textures/Water/SPEC.jpg',
  ]);

  // Apply wrapping & repeat
  [colorMap, dispMap, normalMap, occMap, specMap].forEach((map) => {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(TunnelMaterials.repeatX, TunnelMaterials.repeatY);
  });

  // Animate textures for flow
  useFrame(({ clock }) => {
    if (TunnelRef.current) {
      const t = clock.elapsedTime * TunnelMaterials.speed;
      normalMap.offset.set(t * 0.2, t * 0.6);
      dispMap.offset.set(t * 0.15, t * 0.25);
      specMap.offset.set(t * 0.1, t * 0.2);
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
        <cylinderGeometry args={[10, 10, (length * 2) - 1, 128, 64, false, 0, Math.PI]} />
        <meshStandardMaterial
          transparent
          side={THREE.BackSide}
          map={colorMap}
          displacementMap={dispMap}
          normalMap={normalMap}
          aoMap={occMap}
          metalnessMap={specMap}
          normalScale={new THREE.Vector2(TunnelMaterials.normalScale, TunnelMaterials.normalScale)}
          displacementScale={TunnelMaterials.displacementScale}
          color={TunnelMaterials.color}
          opacity={TunnelMaterials.opacity}
          roughness={TunnelMaterials.roughness}
          metalness={TunnelMaterials.metalness}
        />
      </mesh>
    </RigidBody>
  );
};

export default Tunnel;
