import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLevaControls } from '../Globals/LevaControls'
import Shark from "./Shark";

const Player = React.forwardRef((_, PlayerRef) => {
  const { Player } = useLevaControls();
  const [, getKeys] = useKeyboardControls();

  useFrame(() => {
    if (!PlayerRef.current) return;

    const { forward, backward, left, right, jump } = getKeys();
    const Impulse = { x: 0, y: 0, z: 0 };


    if (forward) Impulse.z -= Player.speed;
    if (backward) Impulse.z += Player.speed;
    if (left) Impulse.x -= Player.speed;
    if (right) Impulse.x += Player.speed;
    if (jump) Impulse.y += Player.jumpStrength;
    
    if (Impulse.x || Impulse.y || Impulse.z) {
      PlayerRef.current.applyImpulse(Impulse, true);
    }
  });

  return (
      <Shark playerRef={PlayerRef}/>
  );
});

export default Player;
