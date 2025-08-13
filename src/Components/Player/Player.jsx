// src/Models/Player.jsx
import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Player() {
  const playerRef = useRef();
  const [, getKeys] = useKeyboardControls(); // fixed destructuring

  useFrame(() => {
    if (!playerRef.current) return;

    const { forward, backward, left, right, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const speed = 1;

    if (forward) impulse.z -= speed;
    if (backward) impulse.z += speed;
    if (left) impulse.x -= speed;
    if (right) impulse.x += speed;
    if (jump) impulse.y += speed * 2;

    if (impulse.x || impulse.y || impulse.z) {
      playerRef.current.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      position={[-2, 3, 0]}
      colliders="ball"
      friction={1}
    >
      <mesh>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}
