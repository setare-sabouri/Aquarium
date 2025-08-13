import { RigidBody } from "@react-three/rapier";
import React from "react";

const Floor = () => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={1}>
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[20, 0.3, 50]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
