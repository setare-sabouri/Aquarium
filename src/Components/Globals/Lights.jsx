import React, { memo } from 'react';
import { Environment } from '@react-three/drei';

const Lights = memo(() => {
  return (
    <>
      <ambientLight intensity={0.35} color={"#88ccee"} />
      <Environment preset="sunset" background={false} />
      <fog attach="fog" args={["#0d1b2a", 5, 35]} />
    </>
  );
});

export default Lights;
