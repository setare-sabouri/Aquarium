import React, { memo } from 'react';
import { Environment } from '@react-three/drei';

const Lights = memo(() => {
  return (
    <>
      <ambientLight intensity={3} color={"#060a7e"} />
      <Environment preset="sunset" background={false} />
      <fog attach="fog" args={["#0d1b2a", 5, 35]} />
    </>
  );
});

export default Lights;
