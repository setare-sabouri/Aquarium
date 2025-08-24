import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThirdPersonCamera({ playerRef, offset = [0, 5, 10], length = 100 }) {
  const { camera } = useThree();
  const rotation = useRef({ yaw: 0, pitch: 0 });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const offsetVec = useRef(new THREE.Vector3(...offset));
  const tempVec = useRef(new THREE.Vector3());

  // Track CTRL key
  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Control" && setCtrlPressed(true);
    const handleKeyUp = (e) => e.key === "Control" && setCtrlPressed(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ctrlPressed) return;
      const sensitivity = 0.002;
      rotation.current.yaw -= e.movementX * sensitivity;
      rotation.current.pitch -= e.movementY * sensitivity;
      rotation.current.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.pitch));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ctrlPressed]);

  useFrame(() => {
    if (!playerRef?.current) return;
    const pos = playerRef.current.translation();

    // Apply rotation to offsetVec
    tempVec.current.copy(offsetVec.current);
    tempVec.current.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
    tempVec.current.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

    let camX = pos.x + tempVec.current.x;
    let camY = Math.max(pos.y + tempVec.current.y, 0.5); // floor clamp
    let camZ = pos.z + tempVec.current.z;

    // Clamp Z inside tunnel
    const tunnelRadius = 10;
    const tunnelLength = length + 60;
    camZ = Math.min(-1, Math.max(-tunnelLength, camZ));

    // Clamp radial distance
    const radial = Math.sqrt(camX * camX + camY * camY);
    if (radial > tunnelRadius - 0.1) {
      const angle = Math.atan2(camY, camX);
      camX = (tunnelRadius - 0.1) * Math.cos(angle);
      camY = Math.max((tunnelRadius - 0.1) * Math.sin(angle), 0.5);
    }

    camera.position.set(camX, camY, camZ);
    camera.lookAt(pos.x, pos.y + 1, pos.z);
  });

  return null;
}
