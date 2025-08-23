import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThirdPersonCamera({ playerRef, offset = [0, 5, 10] ,length}) {
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


  // code below to have wider look , outside Aquarium
  // useFrame(() => {
  //   if (!playerRef.current) return;
  //   const pos = playerRef.current.translation();

  //   const offsetVec = new THREE.Vector3(...offset);
  //   offsetVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
  //   offsetVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

  //   const camX = pos.x + offsetVec.x;
  //   const camY = Math.max(pos.y + offsetVec.y, 0);
  //   const camZ = pos.z + offsetVec.z;

  //   camera.position.set(camX, camY, camZ);
  //   camera.lookAt(pos.x, pos.y + 1, pos.z);
  // });


  useFrame(() => {
    if (!playerRef.current) return;
    const pos = playerRef.current.translation();

    const offsetVec = new THREE.Vector3(...offset);
    offsetVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
    offsetVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

    // Clamp Y so camera never goes below floor
    const floorHeight = 0;
    const camMinHeight = floorHeight + 0.5;
    let camY = Math.max(pos.y + offsetVec.y, camMinHeight);

    let camX = pos.x + offsetVec.x;
    let camZ = pos.z + offsetVec.z;

    //Clamp camera inside tunnel
    const tunnelRadius = 10; 
    const tunnelLength = length+60; 

    // Clamp Z (along tunnel)
    camZ = Math.min(-1, Math.max(-tunnelLength, camZ)); // tunnel goes from 0 to -length

    // Clamp radial distance from center
    const radial = Math.sqrt(camX * camX + camY * camY);
    if (radial > tunnelRadius - 0.1) { // 0.1 buffer
      const angle = Math.atan2(camY, camX);
      camX = (tunnelRadius - 0.1) * Math.cos(angle);
      camY = (tunnelRadius - 0.1) * Math.sin(angle);

      // Ensure camY still above floor after radial clamp
      camY = Math.max(camY, camMinHeight);
    }

    camera.position.set(camX, camY, camZ);
    camera.lookAt(pos.x, pos.y + 1, pos.z);
  });



  return null;
}
