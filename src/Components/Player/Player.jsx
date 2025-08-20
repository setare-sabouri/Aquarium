import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Shark from "./Shark";
import { useLevaControls } from '../Globals/LevaControls'
const Player = React.forwardRef((_, PlayerRef) => {
  const { Player } = useLevaControls();
  const [, getKeys] = useKeyboardControls();

  useFrame(() => {
    if (!PlayerRef.current) return;
    const { forward, backward, left, right, jump } = getKeys();


    const impulse = { x: 0, y: 0, z: 0 };
    const jumpStrength = 0.02;

    if (forward) impulse.z -= Player.speed;
    if (backward) impulse.z += Player.speed;
    if (left) impulse.x -= Player.speed;
    if (right) impulse.x += Player.speed;
    if (jump) impulse.y += jumpStrength;

    if (impulse.x || impulse.y || impulse.z) {
      PlayerRef.current.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      ref={PlayerRef}
      position={[0, 3, -10]}
      rotation={[0, Math.PI, 0]}
      gravityScale={0.04}
      colliders="trimesh"
      friction={1}
      linearDamping={0.6}
      angularDamping={0.8}  // prevents spinning

    >
      <Shark />
    </RigidBody>
  );
});

export default Player;
