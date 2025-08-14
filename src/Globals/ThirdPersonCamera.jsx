import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThirdPersonCamera({ playerRef, offset = [0, 5, 10] }) {
  const { camera, gl } = useThree();
  const [enabled, setEnabled] = useState(false);
  const rotation = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!enabled) return;
      const sensitivity = 0.002;
      rotation.current.yaw -= e.movementX * sensitivity;
      rotation.current.pitch -= e.movementY * sensitivity;
      // clamp pitch to avoid flipping over
      rotation.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.pitch));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  useEffect(() => {
    const handleClick = () => gl.domElement.requestPointerLock();
    const handlePointerLockChange = () => setEnabled(document.pointerLockElement === gl.domElement);

    document.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [gl.domElement]);

useFrame(() => {
  if (!playerRef.current) return;
  const pos = playerRef.current.translation();

  // apply yaw and pitch rotations to the offset
  const offsetVec = new THREE.Vector3(...offset);

  // rotate around X for pitch
  offsetVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
  // rotate around Y for yaw
  offsetVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

  // calculate camera position
  const camX = pos.x + offsetVec.x;
  const camY = Math.max(pos.y + offsetVec.y, 0); // clamp Y to 0
  const camZ = pos.z + offsetVec.z;

  camera.position.set(camX, camY, camZ);
  camera.lookAt(pos.x, pos.y + 1, pos.z);
});


  return null;
}
