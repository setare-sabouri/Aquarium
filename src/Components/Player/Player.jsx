import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLevaControls } from '../Globals/LevaControls';
import { usePlayerStore } from "../../Store/useGame";
import Diver from "./Diver";
import * as THREE from "three"


const Player = React.forwardRef((_, playerRef) => {

  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);
  const { Player } = useLevaControls();
  const targetRotationY = useRef(0);
  const getKeys = useKeyboardControls((state) => state);


  useFrame((state) => {
    if (!playerRef.current) return;
    const { forward, backward, left, right, jump } = getKeys;

    // update player position - needed for rocks
    const pos = playerRef.current.translation();
    setPlayerPosition([pos.x, pos.y, pos.z]);

    // camera offset
    const offset = new THREE.Vector3(0, 2, 7).applyQuaternion(state.camera.quaternion);
    let camPos = new THREE.Vector3(pos.x, pos.y, pos.z).add(offset);

    // clamp camera inside tunnel - rotate limitations
    camPos.x = THREE.MathUtils.clamp(camPos.x, -8, 8);
    camPos.y = THREE.MathUtils.clamp(camPos.y, -3, 10);
    camPos.z = THREE.MathUtils.clamp(camPos.z, -180, -5);

    state.camera.position.copy(camPos);

    // rotate player to camera yaw
    const playerDir = new THREE.Vector3();
    state.camera.getWorldDirection(playerDir);
    const yaw = Math.atan2(playerDir.x, playerDir.z);

    if (playerRef.current.mesh) {
      playerRef.current.mesh.rotation.y = yaw;
    }

    const Impulse = { x: 0, y: 0, z: 0 };
    if (forward) { Impulse.z -= Player.speed; targetRotationY.current = 0; }
    if (backward) { Impulse.z += Player.speed; targetRotationY.current = Math.PI; }
    if (left) { Impulse.x -= Player.speed; targetRotationY.current = Math.PI / 2; }
    if (right) { Impulse.x += Player.speed; targetRotationY.current = -Math.PI / 2; }
    if (jump) Impulse.y += 9;

    if (Impulse.x || Impulse.y || Impulse.z) {
      playerRef.current.applyImpulse(Impulse, true);
    }
  });

  return <Diver playerRef={playerRef} targetRotationY={targetRotationY} />;
});

export default Player;

//checked