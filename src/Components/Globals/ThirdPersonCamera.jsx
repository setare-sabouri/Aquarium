import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import { useKeyboardControls } from '@react-three/drei';
import { usePlayerStore } from '../../Store/useGame';


export default function ThirdPersonCamera({
  playerRef,
  offset = new THREE.Vector3(0, 4, 12),
  tunnelRadius = 10,
}) {
  const { camera } = useThree();
  const rotation = useRef({ yaw: 0, pitch: 0 });
  const targetPos = useRef(new THREE.Vector3());
  const camPos = useRef(new THREE.Vector3());
  const { length } = usePlayerStore((state) => state);

  //
  const ctrlPressed = useKeyboardControls((state) => state.ctrl);

  // Mouse rotation
  useEffect(() => {
    const handle = (e) => {
      if (!ctrlPressed) return;
      const sens = 0.002;
      rotation.current.yaw -= e.movementX * sens;
      rotation.current.pitch = THREE.MathUtils.clamp(
        rotation.current.pitch - e.movementY * sens,
        -0.2,
        0.6
      );
    };
    document.addEventListener('mousemove', handle);
    return () => document.removeEventListener('mousemove', handle);
  }, [ctrlPressed]);

  useFrame((_, delta) => {
    if (!playerRef?.current) return;

    const pos = playerRef.current.translation();

    const rotated = offset.clone();
    rotated.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotation.current.pitch);
    rotated.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current.yaw);

    targetPos.current.set(
      pos.x + rotated.x,
      Math.max(pos.y + rotated.y, 0.5),
      pos.z + rotated.z 
    );

    // Clamp inside tunnel
    const radial = Math.sqrt(targetPos.current.x ** 2 + targetPos.current.y ** 2);
    if (radial > tunnelRadius - 0.1) {
      const angle = Math.atan2(targetPos.current.y, targetPos.current.x);
      targetPos.current.x = (tunnelRadius - 0.1) * Math.cos(angle);
      targetPos.current.y = (tunnelRadius - 0.1) * Math.sin(angle);
    }

targetPos.current.z = THREE.MathUtils.clamp(
  targetPos.current.z,
  -length*1.7, 
  -1
);

    

    damp3(camPos.current, targetPos.current, 0.1, delta);
    camera.position.copy(camPos.current);
    camera.lookAt(pos.x, pos.y + 1, pos.z);
  });

  return null;
}
