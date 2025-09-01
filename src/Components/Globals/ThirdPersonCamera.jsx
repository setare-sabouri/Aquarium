import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThirdPersonCamera({ 
  playerRef, 
  offset = new THREE.Vector3(0, 4, 12), 
  tunnelRadius = 10, 
  tunnelLength = 100 
}) {
  const { camera } = useThree();
  const rotation = useRef({ yaw: 0, pitch: 0 });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const targetPos = useRef(new THREE.Vector3());
  const camPos = useRef(new THREE.Vector3());

  // Track CTRL
  useEffect(() => {
    const down = (e) => e.key === "Control" && setCtrlPressed(true);
    const up = (e) => e.key === "Control" && setCtrlPressed(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Mouse rotation (only while CTRL is held)
  useEffect(() => {
    const handle = (e) => {
      if (!ctrlPressed) return;
      const sens = 0.002;
      rotation.current.yaw -= e.movementX * sens;

      // Clamp pitch so camera never goes below the floor
      rotation.current.pitch = THREE.MathUtils.clamp(
        rotation.current.pitch - e.movementY * sens,
        -0.2,   // -0.2 rad ≈ -11° (slightly below horizon)
         0.6    // 0.6 rad ≈ +34° (look down at player a bit)
      );
    };
    document.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  }, [ctrlPressed]);

  useFrame(() => {
    if (!playerRef?.current) return;

    const pos = playerRef.current.translation();

    // Calculate rotated offset
    const rotated = offset.clone();
    rotated.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
    rotated.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

    // Desired camera position
    targetPos.current.set(
      pos.x + rotated.x,
      Math.max(pos.y + rotated.y, 0.5), // clamp so camera never below floor
      pos.z + rotated.z
    );

    // Clamp inside tunnel (cylinder walls)
    const radial = Math.sqrt(
      targetPos.current.x ** 2 + targetPos.current.y ** 2
    );
    if (radial > tunnelRadius - 0.1) {
      const angle = Math.atan2(targetPos.current.y, targetPos.current.x);
      targetPos.current.x = (tunnelRadius - 0.1) * Math.cos(angle);
      targetPos.current.y = (tunnelRadius - 0.1) * Math.sin(angle);
    }

    // Clamp forward/back (tunnel length)
    targetPos.current.z = THREE.MathUtils.clamp(
      targetPos.current.z,
      -tunnelLength,
      -1
    );

    // Smooth follow
    camPos.current.lerp(targetPos.current, 0.1);

    camera.position.copy(camPos.current);
    camera.lookAt(pos.x, pos.y + 1, pos.z);
  });

  return null;
}
