import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Player = React.forwardRef((props, ref) => {
  const [, getKeys] = useKeyboardControls();

  useFrame(() => {
    if (!ref.current) return;
    const { forward, backward, left, right, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const speed = 1;
    if (forward) impulse.z -= speed;
    if (backward) impulse.z += speed;
    if (left) impulse.x -= speed;
    if (right) impulse.x += speed;
    if (jump) impulse.y += speed * 2;
    if (impulse.x || impulse.y || impulse.z) ref.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody ref={ref} position={[0, 1, -10]} colliders="ball" friction={1}>
      <mesh>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
});

export default Player;
