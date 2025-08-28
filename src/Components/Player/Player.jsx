import React, { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLevaControls } from '../Globals/LevaControls';
import { usePlayerStore } from "../../Store/useGame";
import Diver from "./Diver";


const Player = React.forwardRef((_, playerRef) => {

  const setPlayerPosition = usePlayerStore((state) => state.setPlayerPosition);
  const { Player } = useLevaControls();
  const [, getKeys] = useKeyboardControls();
  const targetRotationY = useRef(0);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    // updates player position,needed elsewhere to track treasure and open rocks
    const pos = playerRef.current.translation();
    setPlayerPosition([pos.x, pos.y, pos.z]);


    // player movement
    const { forward, backward, left, right, jump } = getKeys();
    const Impulse = { x: 0, y: 0, z: 0 };
    if (forward) { Impulse.z -= Player.speed; targetRotationY.current = 0; }
    if (backward) { Impulse.z += Player.speed; targetRotationY.current = Math.PI; }
    if (left) Impulse.x -= Player.speed;
    if (right) Impulse.x += Player.speed;
    if (jump) Impulse.y += 9;

    if (Impulse.x || Impulse.y || Impulse.z) {
      playerRef.current.applyImpulse(Impulse, true);
    }
  });

  return <Diver playerRef={playerRef} targetRotationY={targetRotationY} />;
});

export default Player;

//checked