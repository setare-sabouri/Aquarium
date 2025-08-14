import { RigidBody } from "@react-three/rapier";
import React from "react";

const Floor = ({length}) => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={1} position={[0, -0.2, -length]}>
      <mesh>
        <boxGeometry args={[20, 0.3, length*2]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
