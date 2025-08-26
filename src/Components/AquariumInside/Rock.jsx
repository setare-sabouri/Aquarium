import { RigidBody, BallCollider } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { usePlayerStore } from '../../Store/useGame';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Rock = ({ position, rotationY, radius, scale }) => {
  const { scene } = useGLTF('./models/rock.glb');
  const rockGroupRef = useRef();

  useFrame((_, delta) => {
    if (!rockGroupRef.current) return;

    // Read player position without causing re-renders
    const playerPosition = usePlayerStore.getState().Playerposition;

    // Compute distance to player
    const rockPos = new THREE.Vector3(...position);
    const playerVec = new THREE.Vector3(...playerPosition);
    const distance = rockPos.distanceTo(playerVec);
    const threshold = 3;

    // Target rotation and position values
    const targetRotationX = distance < threshold ? Math.PI / 2 : 0;
    const targetOffsetY = distance < threshold ? 2 : 0; 

    // animate to target values
    rockGroupRef.current.rotation.x = THREE.MathUtils.lerp(rockGroupRef.current.rotation.x,targetRotationX,3 * delta);
    rockGroupRef.current.position.y = THREE.MathUtils.lerp(rockGroupRef.current.position.y,targetOffsetY,3 * delta);
  });

  return (
    <RigidBody
      rotation={[0, rotationY, 0]}
      colliders={false}
      type="fixed"
      position={position}
    >
      <BallCollider args={[radius]} />
      <group ref={rockGroupRef} position={[0, 0, 0]}>
        <primitive object={scene.clone()} scale={scale} />
      </group>
    </RigidBody>
  );
};

export default Rock;
