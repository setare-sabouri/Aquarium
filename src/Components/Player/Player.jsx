import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLevaControls } from '../Globals/LevaControls';
import { usePlayerStore } from "../../Store/useGame";
import Diver from "./Diver";
import * as THREE from "three";

const Player = React.forwardRef((_, playerRef) => {
  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);
  const { Player:{speed} } = useLevaControls();
  const targetRotationY = useRef(0);
  const getKeys = useKeyboardControls((state) => state);

  useFrame((state, delta) => {
    if (!playerRef.current) return;
    const { forward, backward, left, right, jump } = getKeys;

    // pos of player needed for rocks
    const pos = playerRef.current.translation();
    setPlayerPosition([pos.x, pos.y, pos.z]);

    // Camera offset
    const offset = new THREE.Vector3(0, 2, 7).applyQuaternion(state.camera.quaternion);
    let camPos = new THREE.Vector3().addVectors(pos, offset);

    // Camera limitations (clamping) 
    camPos.x = THREE.MathUtils.clamp(camPos.x, -8, 8);
    camPos.y = THREE.MathUtils.clamp(camPos.y, -3, 10);
    camPos.z = THREE.MathUtils.clamp(camPos.z, -180, -5);
    state.camera.position.copy(camPos);


    // Camera-relative movement for forward and backward
    const camDir = new THREE.Vector3();
    state.camera.getWorldDirection(camDir);
    camDir.y = 0; // only XZ is needed
    camDir.normalize();

    //right Direction - left is sunstraction of right
    const camRight = new THREE.Vector3();
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    // movement vectors
    const move = new THREE.Vector3();
    if (forward) move.add(camDir);
    if (backward) move.sub(camDir);
    if (left) move.sub(camRight);
    if (right) move.add(camRight);

    // Apply movement
    const Impulse = move.clone().multiplyScalar(speed);
    if (jump) Impulse.y += 9;
    if (Impulse.lengthSq() > 0) playerRef.current.applyImpulse(Impulse, true);

    // Diver rotation: always face back toward camera
    const diverToCamera = new THREE.Vector3();
    diverToCamera.subVectors(state.camera.position, pos); // vector from diver to camera
    diverToCamera.y = 0;

    if (diverToCamera.lengthSq() > 0) {
      targetRotationY.current = Math.atan2(diverToCamera.x, diverToCamera.z);
    }
  });

  return <Diver playerRef={playerRef} targetRotationY={targetRotationY} />;
});

export default Player;
