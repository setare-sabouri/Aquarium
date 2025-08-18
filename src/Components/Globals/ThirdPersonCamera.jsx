import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThirdPersonCamera({ playerRef, offset = [0, 5, 10] }) {
  const { camera } = useThree();
  const rotation = useRef({ yaw: 0, pitch: 0 });
  const [ctrlPressed, setCtrlPressed] = useState(false);

  // Track CTRL key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") setCtrlPressed(true);
    };
    const handleKeyUp = (e) => {
      if (e.key === "Control") setCtrlPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ctrlPressed) return; // rotate only if CTRL is pressed
      const sensitivity = 0.002;
      rotation.current.yaw -= e.movementX * sensitivity;
      rotation.current.pitch -= e.movementY * sensitivity;
      rotation.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.pitch));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ctrlPressed]);

  useFrame(() => {
    if (!playerRef.current) return;
    const pos = playerRef.current.translation();

    const offsetVec = new THREE.Vector3(...offset);
    offsetVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
    offsetVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

    const camX = pos.x + offsetVec.x;
    const camY = Math.max(pos.y + offsetVec.y, 0);
    const camZ = pos.z + offsetVec.z;

    camera.position.set(camX, camY, camZ);
    camera.lookAt(pos.x, pos.y + 1, pos.z);
  });

  return null;
}
