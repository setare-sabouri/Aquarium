import { RigidBody } from '@react-three/rapier';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useLevaControls } from '../Globals/LevaControls';
import { usePlayerStore } from '../../Store/useGame';

const Tunnel = ({ length,width }) => {

  // Texture Setup
  const { TunnelMaterials } = useLevaControls();
  const tunnelRef = useRef();
  const [colorMap, dispMap, normalMap, occMap, specMap] = useLoader(THREE.TextureLoader, [
    './textures/Water/color.jpg',
    './textures/Water/DISP.png',
    './textures/Water/NOR.jpg',
    './textures/Water/OCC.jpg',
    './textures/Water/SPEC.jpg',
  ]);
  useMemo(() => {
    [colorMap, dispMap, normalMap, occMap, specMap].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(TunnelMaterials.repeatX, TunnelMaterials.repeatY);
    });
  }, [TunnelMaterials.repeatX, TunnelMaterials.repeatY, colorMap, dispMap, normalMap, occMap, specMap]);

  useFrame(({ clock }) => {
    if (TunnelMaterials.speed > 0 && tunnelRef.current) {
      const t = clock.elapsedTime * TunnelMaterials.speed;
      normalMap.offset.set(t * 0.2, t * 0.3);
      dispMap.offset.set(t * 0.15, t * 0.25);
      specMap.offset.set(t * 0.1, t * 0.2);
    }
  });

  // open Gate when Treasure is found
  const TreasureFound = usePlayerStore((state) => state.TreasureFound);

  return (
    <RigidBody
      key={TreasureFound ? 'gate-open' : 'gate-closed'} // only to force remount of collider 
      position={[0, 0, -length]}
      colliders='trimesh'
      type="fixed"
    >
      <mesh ref={tunnelRef} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <cylinderGeometry args={[width, width, length * 2 -0.9, 64, 32, TreasureFound, 0, Math.PI]}/>
        <meshStandardMaterial
          transparent
          side={THREE.BackSide}
          map={colorMap}
          displacementMap={dispMap}
          normalMap={normalMap}
          aoMap={occMap}
          metalnessMap={specMap}
          normalScale={new THREE.Vector2(TunnelMaterials.normalScale, TunnelMaterials.normalScale)}
          color={TunnelMaterials.color}
          opacity={TunnelMaterials.opacity}
          roughness={TunnelMaterials.roughness}
          metalness={TunnelMaterials.metalness}
          displacementScale={0.7}

        />
      </mesh>
    </RigidBody>
  );
};

export default Tunnel;

//checked